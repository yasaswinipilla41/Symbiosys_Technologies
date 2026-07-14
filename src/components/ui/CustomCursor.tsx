import { useEffect, useRef } from 'react';

/**
 * Premium trailing cursor: a crisp dot + a smoothed ring that grows over
 * interactive elements. Desktop + fine-pointer only, and fully disabled under
 * reduced-motion — native cursor is never hidden on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add('has-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, input, textarea, select, [data-cursor="hover"]');
      ring.classList.toggle('is-hover', !!interactive);
      const darkCtx = el.closest('[data-theme="dark"]');
      ring.classList.toggle('is-dark', !!darkCtx);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden lg:block" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot hidden lg:block" aria-hidden="true" />
    </>
  );
}
