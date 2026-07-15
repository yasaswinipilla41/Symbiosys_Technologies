const logoUrl = '/logo-hq.png';

interface LogoProps {
  /** Tailwind height class controls the logo size (width auto-scales). */
  className?: string;
}

/** Official Symbiosys Technologies logo — genuine high-resolution asset, unchanged. */
export default function Logo({ className = 'h-10' }: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Symbiosys Technologies"
      width={373}
      height={149}
      className={`${className} w-auto select-none`}
      draggable={false}
    />
  );
}
