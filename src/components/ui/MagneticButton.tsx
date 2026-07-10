import { useRef, type MouseEvent, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'sunset' | 'ghost';
  className?: string;
  onClick?: () => void;
}

/** Magnetic hover + ripple-on-click button. */
export default function MagneticButton({
  children,
  href = '#',
  variant = 'primary',
  className = '',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const ripple = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const circle = document.createElement('span');
    const d = Math.max(el.clientWidth, el.clientHeight);
    const rect = el.getBoundingClientRect();
    circle.style.cssText = `position:absolute;border-radius:9999px;background:rgba(255,255,255,0.5);pointer-events:none;transform:scale(0);width:${d}px;height:${d}px;left:${e.clientX - rect.left - d / 2}px;top:${e.clientY - rect.top - d / 2}px;transition:transform .6s ease,opacity .6s ease;opacity:.7;`;
    el.appendChild(circle);
    requestAnimationFrame(() => {
      circle.style.transform = 'scale(2.6)';
      circle.style.opacity = '0';
    });
    setTimeout(() => circle.remove(), 650);
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={(e) => {
        ripple(e);
        onClick?.();
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`btn-${variant} group ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
