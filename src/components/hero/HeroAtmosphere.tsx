import { useEffect, useRef } from 'react';

/**
 * Calm, luminous particle field for the hero — tiny glowing dots, drifting
 * stars and the occasional slow light streak. Canvas 2D with pre-rendered glow
 * sprites (drawImage, not per-frame gradients) so it holds 60fps cheaply.
 * Gently parallaxes toward the pointer.
 */

interface Dot {
  x: number;
  y: number;
  z: number; // depth 0.2..1 → size + parallax strength
  r: number;
  vx: number;
  vy: number;
  tw: number; // twinkle phase
  sp: number; // twinkle speed
  ci: number; // colour index
}

interface Streak {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
}

const COLORS = ['#00B5E2', '#EAF4FF', '#F58220', '#8FD44A', '#2E9BD6'];

export default function HeroAtmosphere() {
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

    // Pre-rendered soft glow sprite per colour
    const sprites = COLORS.map((c) => makeSprite(c));

    let dots: Dot[] = [];
    let streaks: Streak[] = [];

    const build = () => {
      const area = W * H;
      const count = Math.max(60, Math.min(150, Math.round(area / 16000)));
      dots = Array.from({ length: count }, () => {
        const z = 0.2 + Math.random() * 0.8;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          z,
          r: (0.6 + Math.random() * 2.2) * z,
          vx: (Math.random() - 0.5) * 0.08,
          vy: -(0.05 + Math.random() * 0.12),
          tw: Math.random() * Math.PI * 2,
          sp: 0.5 + Math.random() * 1.4,
          ci: Math.random() < 0.62 ? (Math.random() < 0.5 ? 0 : 4) : Math.random() < 0.6 ? 1 : Math.random() < 0.5 ? 2 : 3,
        };
      });
      streaks = Array.from({ length: 3 }, () => spawnStreak());
    };

    function spawnStreak(): Streak {
      return {
        x: Math.random() * W,
        y: Math.random() * H * 0.8,
        len: 120 + Math.random() * 220,
        speed: 0.25 + Math.random() * 0.5,
        angle: -0.35 + Math.random() * 0.2,
        alpha: 0,
      };
    }

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

    // Pointer parallax
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
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // dots
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -10) { d.y = H + 10; d.x = Math.random() * W; }
        if (d.x < -10) d.x = W + 10;
        else if (d.x > W + 10) d.x = -10;

        const px = d.x - mouse.x * 26 * d.z;
        const py = d.y - mouse.y * 18 * d.z;
        const twinkle = 0.45 + 0.55 * Math.sin(t * d.sp + d.tw);
        const size = d.r * 7;
        ctx.globalAlpha = Math.min(1, twinkle * (0.35 + d.z * 0.5));
        const sp = sprites[d.ci];
        ctx.drawImage(sp, px - size, py - size, size * 2, size * 2);
      }

      // light streaks
      for (const s of streaks) {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha += (0.14 - s.alpha) * 0.02;
        if (s.x > W + 60 || s.y < -60) Object.assign(s, spawnStreak(), { x: -60, y: H * (0.2 + Math.random() * 0.6) });
        ctx.globalAlpha = s.alpha;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + Math.cos(s.angle) * s.len, s.y + Math.sin(s.angle) * s.len);
        grad.addColorStop(0, 'rgba(150,220,255,0)');
        grad.addColorStop(0.5, 'rgba(150,220,255,0.6)');
        grad.addColorStop(1, 'rgba(150,220,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + Math.cos(s.angle) * s.len, s.y + Math.sin(s.angle) * s.len);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(render);
    };

    if (reduced) {
      // draw a single static frame
      render();
      cancelAnimationFrame(raf);
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function makeSprite(color: string): HTMLCanvasElement {
  const size = 32;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, color);
  g.addColorStop(0.25, hexToRgba(color, 0.7));
  g.addColorStop(1, hexToRgba(color, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  return c;
}

function hexToRgba(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
