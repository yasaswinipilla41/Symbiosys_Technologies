const logoUrl = '/symbiosys-logo.png';

interface LogoProps {
  /** Tailwind height class controls the logo size (width auto-scales 2:1). */
  className?: string;
}

/** Official Symbiosys Technologies logo — the genuine asset, used unchanged. */
export default function Logo({ className = 'h-10' }: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Symbiosys Technologies"
      width={300}
      height={150}
      className={`${className} w-auto select-none`}
      draggable={false}
    />
  );
}
