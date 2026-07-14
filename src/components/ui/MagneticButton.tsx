import { useRef, type MouseEvent, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'solid' | 'outline' | 'ghost-light';
  className?: string;
  onClick?: () => void;
}

/** Magnetic hover button, editorial minimal styling. */
export default function MagneticButton({
  children,
  href = '#',
  variant = 'solid',
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
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.28}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`btn-${variant} group ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
