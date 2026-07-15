import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * The living globe — a scroll companion.
 *
 * A fixed, full-viewport WebGL layer hosting the brand-spectrum particle
 * sphere. It floats and tilts toward the pointer in the hero, then travels
 * with the user as they scroll (drifting from the right column toward
 * center), and finally — as the services section ("container-x") arrives —
 * dissolves into thousands of scattering, fading particles that hand the eye
 * to the next section. Scrolling back up reassembles it.
 *
 * All motion is transform/opacity-only on the GPU side; the CPU updates one
 * 2.4k-point buffer during the dissolve window. Hidden entirely (zero work)
 * once the journey completes. Reduced-motion: static sphere in the hero that
 * simply fades out on scroll.
 */
const SPECTRUM = ['#00B5E2', '#F58220', '#15846E', '#2E8BFF', '#FFC107', '#7BC043', '#ffffff'];
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

export default function ParticleSphere() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.z = 7.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // --- Point sphere (fibonacci distribution) + scatter directions ---
    const COUNT = 2400;
    const base = new Float32Array(COUNT * 3);
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const scatter = new Float32Array(COUNT * 3);
    const tmp = new THREE.Color();
    const R = 2.35;
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = R * (0.98 + Math.random() * 0.06);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      base.set([x, y, z], i * 3);
      positions.set([x, y, z], i * 3);
      // scatter mostly outward + a downward-flow bias so particles "travel on"
      const m = 1.4 + Math.random() * 3.4;
      scatter[i * 3] = (x / r) * m + (Math.random() - 0.5) * 1.6;
      scatter[i * 3 + 1] = (y / r) * m - (0.6 + Math.random() * 1.8);
      scatter[i * 3 + 2] = (z / r) * m + (Math.random() - 0.5) * 1.6;
      tmp.set(SPECTRUM[(Math.random() * SPECTRUM.length) | 0]);
      colors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    geo.setAttribute('position', posAttr);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const sprite = makeGlowSprite();
    const mat = new THREE.PointsMaterial({
      size: 0.075,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    group.add(points);

    // --- Inner wireframe icosahedron ---
    const wireGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#00B5E2'), wireframe: true, transparent: true, opacity: 0.14 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    group.add(wire);

    // --- Cinematic back-glow (soft light behind the globe) ---
    const glowMat = new THREE.SpriteMaterial({ map: sprite, color: new THREE.Color('#0A4D80'), transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
    const glow = new THREE.Sprite(glowMat);
    glow.scale.setScalar(11);
    glow.position.z = -1.5;
    group.add(glow);

    // --- Layout anchors ---
    let heroH = window.innerHeight;
    let servicesTop = Infinity;
    const measure = () => {
      const hero = document.getElementById('home');
      const services = document.getElementById('services');
      heroH = hero ? hero.offsetHeight : window.innerHeight;
      servicesTop = services ? services.getBoundingClientRect().top + window.scrollY : Infinity;
    };
    measure();

    let halfH = 1;
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      halfH = Math.tan(THREE.MathUtils.degToRad(45 / 2)) * camera.position.z;
      measure();
    };
    onResize();
    window.addEventListener('resize', onResize);

    // --- Pointer tilt ---
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener('pointermove', onMove, { passive: true });

    const cleanups: (() => void)[] = [];
    let raf = 0;
    let t = 0;
    let hidden = false;
    let scattered = false;
    let lastLight = false;
    const canvasEl = renderer.domElement;
    canvasEl.style.transition = 'opacity 0.4s ease';

    const render = () => {
      t += 0.004;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      const desktop = window.innerWidth >= 1024;

      // Journey: 0 in hero → 1 as services approaches
      const journeyEnd = Math.max(servicesTop - vh * 0.85, heroH * 0.5);
      const travel = ease(clamp01(sy / journeyEnd));
      // Dissolve window: services top crossing 80% → 30% of viewport
      const dStart = servicesTop - vh * 0.8;
      const dEnd = servicesTop - vh * 0.3;
      const d = ease(clamp01((sy - dStart) / Math.max(dEnd - dStart, 1)));

      // Light theme: swap additive glow for normal blending so the globe and
      // its dissolve stay visible on light section surfaces too.
      const lightTheme = document.documentElement.classList.contains('light');
      if (lightTheme !== lastLight) {
        lastLight = lightTheme;
        mat.blending = lightTheme ? THREE.NormalBlending : THREE.AdditiveBlending;
        glowMat.blending = lightTheme ? THREE.NormalBlending : THREE.AdditiveBlending;
        mat.needsUpdate = true;
        glowMat.needsUpdate = true;
      }

      // Fully done → park (zero cost until scrolled back)
      const done = d >= 1;
      if (done !== hidden) {
        hidden = done;
        canvasEl.style.opacity = done ? '0' : '1';
      }
      if (!hidden) {
        // Position: fully on the left half of the first screen,
        // then glides to true center in sync with the scroll.
        const xStart = desktop ? -0.5 * (halfH * camera.aspect) : 0;
        const yStart = desktop ? -0.12 * halfH : -0.08 * halfH;
        group.position.x = THREE.MathUtils.lerp(xStart, 0, travel);
        group.position.y = THREE.MathUtils.lerp(yStart, -0.05 * halfH, travel) + Math.sin(t * 1.1) * 0.1 * (1 - d);
        const s = THREE.MathUtils.lerp(1, 0.82, travel) * (desktop ? 1 : 0.72);
        group.scale.setScalar(s);

        // Idle motion
        group.rotation.y += 0.0016;
        wire.rotation.y -= 0.0022;
        wire.rotation.x += 0.0011;
        const breathe = 1 + Math.sin(t * 1.6) * 0.025 * (1 - d);
        points.scale.setScalar(breathe);
        group.rotation.x += (target.y * 0.35 - group.rotation.x) * 0.04;
        group.rotation.z += (-target.x * 0.18 - group.rotation.z) * 0.04;

        // Dissolve: scatter + flow + fade
        if (d > 0) {
          scattered = true;
          const k = d * d;
          for (let i = 0; i < COUNT; i++) {
            const j = i * 3;
            const driftX = Math.sin(t * 2 + i) * 0.35 * d;
            const driftY = Math.cos(t * 1.7 + i * 0.7) * 0.3 * d;
            positions[j] = base[j] * (1 + k * 0.3) + scatter[j] * k * 3.4 + driftX;
            positions[j + 1] = base[j + 1] * (1 + k * 0.3) + scatter[j + 1] * k * 3.4 + driftY;
            positions[j + 2] = base[j + 2] * (1 + k * 0.3) + scatter[j + 2] * k * 3.4;
          }
          posAttr.needsUpdate = true;
        } else if (scattered) {
          // reassemble once when scrolled back above the dissolve window
          scattered = false;
          positions.set(base);
          posAttr.needsUpdate = true;
        }
        // Bell-curve dim: full in the hero, recedes while passing About text,
        // re-brightens as it arrives to dissolve — keeps copy readable.
        const midDim = 1 - 0.62 * Math.sin(Math.PI * travel) * (1 - d);
        mat.opacity = (1 - d) * midDim * (desktop ? 1 : 0.5) * (lightTheme ? 0.85 : 1);
        mat.size = 0.075 + d * 0.05; // particles soften as they scatter
        wireMat.opacity = 0.14 * (1 - d) * midDim * (lightTheme ? 1.6 : 1);
        glowMat.opacity = 0.5 * (1 - d) * midDim * (desktop ? 1 : 0.4) * (lightTheme ? 0.18 : 1);

        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(render);
    };

    if (reduced) {
      // Static frame in the hero; fade out past it. No animation loop.
      const desktop = window.innerWidth >= 1024;
      group.position.set(desktop ? -0.5 * halfH * camera.aspect : 0, desktop ? -0.12 * halfH : -0.08 * halfH, 0);
      group.scale.setScalar(desktop ? 1 : 0.72);
      mat.opacity = desktop ? 1 : 0.5;
      renderer.render(scene, camera);
      const onScroll = () => {
        canvasEl.style.opacity = window.scrollY > heroH * 0.6 ? '0' : '1';
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      // reuse cleanup slot
      raf = -1;
      const cleanupScroll = () => window.removeEventListener('scroll', onScroll);
      cleanups.push(cleanupScroll);
    } else {
      render();
    }

    return () => {
      if (raf > 0) cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      geo.dispose();
      mat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      glowMat.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
    />
  );
}

function makeGlowSprite() {
  const size = 48;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
