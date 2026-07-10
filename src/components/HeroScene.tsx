import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Cinematic hero: thousands of glowing fireflies drift in a night sky, swirl
 * through orbital rings, then assemble into "SYMBIOSYS TECHNOLOGIES".
 * Behind them, counter-rotating particle halos, a deep starfield, free-flying
 * fireflies and occasional shooting stars. A dolly-in → crane → slow-orbit camera.
 *
 * Built on raw three.js with custom GLSL for performance (all motion happens on
 * the GPU; the CPU only advances a handful of uniforms per frame).
 */

interface Props {
  onFormed?: () => void;
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

// Brand-luminous palette (bright enough to glow additively on black)
const CYAN = new THREE.Color('#00B5E2');
const ROYAL = new THREE.Color('#2E9BD6');
const ORANGE = new THREE.Color('#F58220');
const GREEN = new THREE.Color('#8FD44A');
const WHITE = new THREE.Color('#EAF7FF');
const FIREFLY = new THREE.Color('#FFD46B');

export default function HeroScene({ onFormed }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    const cleanups: (() => void)[] = [];

    const start = async () => {
      // Ensure the display font is ready so the text sampling is crisp.
      try {
        await document.fonts.load('700 200px "Space Grotesk"');
        await document.fonts.load('600 120px "Space Grotesk"');
        await document.fonts.ready;
      } catch {
        /* ignore — falls back to sans-serif */
      }
      if (disposed || !mountRef.current) return;
      init();
    };

    const init = () => {
      const pr = Math.min(window.devicePixelRatio || 1, 2);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, mount.clientWidth / mount.clientHeight, 0.1, 400);
      camera.position.set(0, 2, 60);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(pr);
      mount.appendChild(renderer.domElement);

      const glow = makeGlowTexture();

      // ---- 1. Text target positions -------------------------------------------------
      const { targets, aspect } = sampleText();
      const COUNT = targets.length / 3;

      const scatter = new Float32Array(COUNT * 3);
      const ring = new Float32Array(COUNT * 3);
      const seed = new Float32Array(COUNT);
      const colors = new Float32Array(COUNT * 3);
      const tmp = new THREE.Color();

      const RINGS = 6;
      for (let i = 0; i < COUNT; i++) {
        // scattered firefly cloud (wide, mostly ahead of camera)
        scatter[i * 3] = (Math.random() - 0.5) * 150;
        scatter[i * 3 + 1] = (Math.random() - 0.5) * 90 + 6;
        scatter[i * 3 + 2] = (Math.random() - 0.5) * 90 - 20;

        // mid-phase vortex: concentric rotating rings
        const r = 9 + (i % RINGS) * 3.4 + Math.random() * 1.2;
        const a = i * 2.399963 + (i % RINGS) * 0.6; // golden-angle spread
        ring[i * 3] = Math.cos(a) * r;
        ring[i * 3 + 1] = Math.sin(a) * r * 0.62 + 2;
        ring[i * 3 + 2] = Math.sin(a * 1.7) * 2.2;

        seed[i] = Math.random();

        // colour: cyan/royal dominant, white sparkle, orange + green accents
        const rr = Math.random();
        if (rr < 0.14) tmp.copy(ORANGE);
        else if (rr < 0.26) tmp.copy(WHITE);
        else if (rr < 0.33) tmp.copy(GREEN);
        else {
          const nx = clamp01(targets[i * 3] / 46 + 0.5);
          tmp.copy(CYAN).lerp(ROYAL, nx);
        }
        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(scatter, 3)); // used as scatter in shader
      geo.setAttribute('aRing', new THREE.BufferAttribute(ring, 3));
      geo.setAttribute('aTarget', new THREE.BufferAttribute(new Float32Array(targets), 3));
      geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

      const uniforms = {
        uTime: { value: 0 },
        uRing: { value: reduced ? 1 : 0 },
        uForm: { value: reduced ? 1 : 0 },
        uSize: { value: 1.15 * pr },
        uFire: { value: FIREFLY },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: MAIN_VERT,
        fragmentShader: MAIN_FRAG,
      });
      const points = new THREE.Points(geo, material);
      points.frustumCulled = false;

      // Everything that forms the title lives in one stage group so it can be
      // scaled + repositioned together to fit any aspect ratio.
      const stage = new THREE.Group();
      stage.add(points);
      scene.add(stage);

      // ---- 2. Starfield -------------------------------------------------------------
      const stars = makeStars(1500, glow);
      scene.add(stars.points);

      // ---- 3. Counter-rotating halos ------------------------------------------------
      const halo1 = makeHalo(420, 24, CYAN, glow);
      const halo2 = makeHalo(360, 30, ROYAL, glow);
      halo1.position.z = -10;
      halo2.position.z = -14;
      halo1.rotation.x = 0.5;
      halo2.rotation.x = 0.5;
      stage.add(halo1, halo2);

      // ---- 4. Free-flying fireflies -------------------------------------------------
      const fireflies = makeFireflies(240, glow, pr);
      stage.add(fireflies.points);

      // ---- 5. Shooting stars --------------------------------------------------------
      const shooters = makeShootingStars(scene);

      // ---- Pointer parallax ---------------------------------------------------------
      const pointer = { x: 0, y: 0 };
      if (!reduced) {
        const onMove = (e: PointerEvent) => {
          pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
          pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('pointermove', onMove);
        cleanups.push(() => window.removeEventListener('pointermove', onMove));
      }

      // ---- Animation loop -----------------------------------------------------------
      const clock = new THREE.Clock();
      let raf = 0;
      let formedFired = reduced;
      if (reduced) onFormed?.();

      const render = () => {
        const e = clock.getElapsedTime();
        uniforms.uTime.value = e;
        fireflies.uniforms.uTime.value = e;
        stars.material.opacity = 0.65 + Math.sin(e * 0.7) * 0.12;

        if (!reduced) {
          uniforms.uRing.value = clamp01((e - 1.6) / 2.6);
          const form = clamp01((e - 4.6) / 3.2);
          uniforms.uForm.value = easeInOut(form);
          if (!formedFired && form >= 0.98) {
            formedFired = true;
            onFormed?.();
          }

          // Camera: dolly-in (angle 0, shrinking radius) then slow orbit + crane
          const radius = THREE.MathUtils.lerp(62, 32, easeInOut(clamp01(e / 7)));
          const orbit = Math.max(0, e - 8.0) * 0.045;
          const craneY = THREE.MathUtils.lerp(2, 5.5, clamp01((e - 5) / 4));
          camera.position.x = Math.sin(orbit) * radius + pointer.x * 2.5;
          camera.position.z = Math.cos(orbit) * radius;
          camera.position.y = craneY - pointer.y * 1.5;
          camera.lookAt(0, 0.8, 0);

          halo1.rotation.z += 0.0016;
          halo2.rotation.z -= 0.0012;
          points.rotation.y = Math.sin(e * 0.15) * 0.04 * uniforms.uForm.value;
          shooters.update(e);
        } else {
          camera.position.set(0, 2, 34);
          camera.lookAt(0, 0.8, 0);
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      render();

      const onResize = () => {
        if (!mountRef.current) return;
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);
      // Scale + reposition the whole stage so the name fits and clears the copy.
      const fit = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        const portrait = h >= w;
        const camDist = 32;
        const visW = 2 * camDist * Math.tan((52 * Math.PI) / 180 / 2) * (w / h);
        const TEXT_W = 40;
        const s = Math.min(1, (visW * 0.9) / TEXT_W);
        stage.scale.setScalar(s);
        // On tall screens lift the title into the upper-middle, above the tagline/CTAs.
        stage.position.y = portrait ? 5 : 0;
      };
      fit();
      window.addEventListener('resize', fit);

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('resize', fit);
        geo.dispose();
        material.dispose();
        stars.dispose();
        halo1.geometry.dispose();
        (halo1.material as THREE.Material).dispose();
        halo2.geometry.dispose();
        (halo2.material as THREE.Material).dispose();
        fireflies.dispose();
        shooters.dispose();
        glow.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      });

      // avoid unused var lint
      void aspect;
    };

    start();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, [onFormed]);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/* ----------------------------- shaders ----------------------------- */

const MAIN_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uRing;
  uniform float uForm;
  uniform float uSize;
  attribute vec3 aRing;
  attribute vec3 aTarget;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vBlink;
  varying float vForm;

  void main() {
    float t = uTime;
    vec3 drift = vec3(
      sin(t * 0.5 + aSeed * 6.283),
      cos(t * 0.42 + aSeed * 5.17),
      sin(t * 0.33 + aSeed * 3.11)
    );

    vec3 pos = mix(position, aRing, smoothstep(0.0, 1.0, uRing));
    pos = mix(pos, aTarget, uForm);
    pos += drift * mix(2.6, 0.16, uForm);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vBlink = 0.5 + 0.5 * sin(t * (1.4 + aSeed * 2.2) + aSeed * 24.0);
    vForm = uForm;
    vColor = aColor;

    float size = uSize * (0.55 + aSeed * 0.9) * mix(1.5, 1.0, uForm);
    gl_PointSize = size * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const MAIN_FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uFire;
  varying vec3 vColor;
  varying float vBlink;
  varying float vForm;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float soft = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.16, 0.0, d);

    vec3 col = mix(uFire, vColor, vForm);
    col += core * 0.6;

    float blink = mix(0.30 + 0.70 * vBlink, 0.78 + 0.22 * vBlink, vForm);
    float alpha = soft * blink;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

const FIRE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vBlink;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.55 + aSeed * 6.28) * 3.4;
    p.y += cos(uTime * 0.47 + aSeed * 4.2) * 2.4;
    p.z += sin(uTime * 0.4 + aSeed * 2.1) * 2.2;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vBlink = 0.35 + 0.65 * sin(uTime * (2.0 + aSeed * 3.0) + aSeed * 30.0);
    vColor = aColor;
    gl_PointSize = uSize * (0.5 + aSeed * 1.0) * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FIRE_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vBlink;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float soft = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.14, 0.0, d);
    vec3 col = vColor + core * 0.5;
    float alpha = soft * max(0.0, vBlink);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ----------------------------- builders ----------------------------- */

function sampleText(): { targets: number[]; aspect: number } {
  const W = 1600;
  const H = 520;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '700 210px "Space Grotesk", "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SYMBIOSYS', W / 2, H * 0.36);

  ctx.font = '600 116px "Space Grotesk", "Plus Jakarta Sans", sans-serif';
  try {
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '26px';
  } catch {
    /* older browsers */
  }
  ctx.fillText('TECHNOLOGIES', W / 2 + 12, H * 0.74);

  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: number[][] = [];
  const step = 4;
  const SCALE = 40; // world units across the canvas width
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 130) {
        const nx = (x - W / 2) / W;
        const ny = -(y - H / 2) / W;
        pts.push([nx * SCALE, ny * SCALE + 2.5, (Math.random() - 0.5) * 1.1]);
      }
    }
  }

  // shuffle + cap for performance
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  const CAP = 7000;
  const chosen = pts.slice(0, Math.min(CAP, pts.length));
  const targets: number[] = [];
  for (const p of chosen) targets.push(p[0], p[1], p[2]);
  return { targets, aspect: W / H };
}

function makeStars(count: number, glow: THREE.Texture) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 120 + Math.random() * 140;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = Math.abs(r * Math.cos(phi)) * 0.6 + 10;
    pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 40;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const material = new THREE.PointsMaterial({
    size: 1.7,
    map: glow,
    color: new THREE.Color('#dff2ff'),
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  return { points, material, dispose: () => { geo.dispose(); material.dispose(); } };
}

function makeHalo(count: number, radius: number, color: THREE.Color, glow: THREE.Texture) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r = radius + (Math.random() - 0.5) * 1.6;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = Math.sin(a) * r;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const material = new THREE.PointsMaterial({
    size: 1.5,
    map: glow,
    color,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geo, material);
}

function makeFireflies(count: number, glow: THREE.Texture, pr: number) {
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const r = 8 + Math.random() * 34;
    const a = Math.random() * Math.PI * 2;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 34 + 4;
    pos[i * 3 + 2] = Math.sin(a) * r * 0.6 + (Math.random() - 0.5) * 10;
    seed[i] = Math.random();
    c.copy(FIREFLY).lerp(GREEN, Math.random() * 0.5);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  const uniforms = { uTime: { value: 0 }, uSize: { value: 1.5 * pr } };
  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: FIRE_VERT,
    fragmentShader: FIRE_FRAG,
  });
  void glow;
  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  return { points, uniforms, dispose: () => { geo.dispose(); material.dispose(); } };
}

function makeShootingStars(scene: THREE.Scene) {
  const lines: { line: THREE.Line; next: number; dir: THREE.Vector3; from: THREE.Vector3 }[] = [];
  for (let i = 0; i < 2; i++) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    const m = new THREE.LineBasicMaterial({ color: '#dff2ff', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    const line = new THREE.Line(g, m);
    line.frustumCulled = false;
    scene.add(line);
    lines.push({ line, next: 4 + i * 3 + Math.random() * 6, dir: new THREE.Vector3(), from: new THREE.Vector3() });
  }
  const update = (e: number) => {
    for (const s of lines) {
      const m = s.line.material as THREE.LineBasicMaterial;
      if (e > s.next) {
        // spawn
        s.from.set(-60 + Math.random() * 40, 30 + Math.random() * 25, -50 - Math.random() * 20);
        s.dir.set(1, -0.35 - Math.random() * 0.2, 0).normalize();
        s.next = e + 6 + Math.random() * 8;
        m.userData = { born: e };
      }
      const born = (m.userData?.born as number) ?? -10;
      const life = e - born;
      if (life >= 0 && life < 1.1) {
        const p = life / 1.1;
        const head = s.from.clone().addScaledVector(s.dir, p * 110);
        const tail = head.clone().addScaledVector(s.dir, -8);
        const arr = (s.line.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
        arr[0] = tail.x; arr[1] = tail.y; arr[2] = tail.z;
        arr[3] = head.x; arr[4] = head.y; arr[5] = head.z;
        s.line.geometry.getAttribute('position').needsUpdate = true;
        m.opacity = Math.sin(p * Math.PI) * 0.9;
      } else {
        m.opacity = 0;
      }
    }
  };
  const dispose = () => {
    for (const s of lines) {
      s.line.geometry.dispose();
      (s.line.material as THREE.Material).dispose();
      scene.remove(s.line);
    }
  };
  return { update, dispose };
}

function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.2, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.25)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
