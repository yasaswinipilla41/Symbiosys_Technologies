import { useEffect, useRef } from 'react';

/**
 * Signature constellation — thousands-feel of tiny outlined triangular glyphs
 * in a vivid brand spectrum, denser toward an organic central cluster and
 * scattered as ambient field beyond it. Slow drift + rotation + twinkle, with
 * gentle pointer parallax. Canvas 2D, capped count → effortless 60fps.
 */
const SPECTRUM = ['#00B5E2', '#F58220', '#15846E', '#2E8BFF', '#FFC107', '#7BC043', '#ffffff'];

interface Tri {
  x: number;
  y: number;
  z: number;
  size: number;
  rot: number;
  vr: number;
  vx: number;
  vy: number;
  tw: number;
  sp: number;
  color: string;
}

interface HeroParticlesProps {
  /** 0..1 — scales particle count down for ambient section backgrounds */
  density?: number;
}

export default function HeroParticles({ density = 1 }: HeroParticlesProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let tris: Tri[] = [];

    // Gaussian-ish sample for the central cluster
    const g = () => (Math.random() + Math.random() + Math.random()) / 3 - 0.5;

    const build = () => {
      const count = Math.round(Math.max(120, Math.min(280, Math.round((W * H) / 9000))) * density);
      const cx = W * 0.5;
      const cy = H * 0.48;
      tris = Array.from({ length: count }, () => {
        const clustered = Math.random() < 0.62;
        const z = 0.25 + Math.random() * 0.75;
        let x: number;
        let y: number;
        if (clustered) {
          x = cx + g() * W * 0.72;
          y = cy + g() * H * 0.82;
        } else {
          x = Math.random() * W;
          y = Math.random() * H;
        }
        return {
          x,
          y,
          z,
          size: (3 + Math.random() * 6) * z,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.006,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          tw: Math.random() * Math.PI * 2,
          sp: 0.4 + Math.random() * 1.2,
          color: SPECTRUM[(Math.random() * SPECTRUM.length) | 0],
        };
      });
    };

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener('pointermove', onMove);

    let raf = 0;
    let t = 0;
    const render = () => {
      t += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, W, H);

      for (const p of tris) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;

        const px = p.x - mouse.x * 26 * p.z;
        const py = p.y - mouse.y * 20 * p.z;
        const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * p.sp + p.tw));

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, twinkle * (0.35 + p.z * 0.6));
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.2;
        const s = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.87, s * 0.5);
        ctx.lineTo(-s * 0.87, s * 0.5);
        ctx.closePath();
        ctx.stroke();
        // occasional filled glow core on the brightest
        if (p.z > 0.85) {
          ctx.globalAlpha *= 0.5;
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    render();
    if (reduced) cancelAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [density]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
