import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useTheme } from '../../lib/useTheme';

interface ThemeToggleProps {
  /** true when the toggle sits on a dark surface (e.g. over the hero) */
  onDark?: boolean;
  className?: string;
}

/** Sun/moon theme switch — legible on both dark and light surfaces. */
export default function ThemeToggle({ onDark = true, className = '' }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      data-cursor="hover"
      className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${
        onDark
          ? 'border-white/20 bg-white/5 text-white hover:border-accent hover:text-accent'
          : 'border-black/15 bg-black/5 text-[#0B1622] hover:border-accent hover:text-accent'
      } ${className}`}
    >
      {theme === 'dark' ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
    </button>
  );
}
