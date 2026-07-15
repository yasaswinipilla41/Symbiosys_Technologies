import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import Logo from './Logo';
import ThemeToggle from './ui/ThemeToggle';
import { useTheme } from '../lib/useTheme';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
  { label: 'CSR', href: '#csr' },
  { label: 'Careers', href: '#careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const light = theme === 'light';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Over the hero (unscrolled) the bar sits on the dark cinematic canvas in
  // BOTH themes; once scrolled, its surface follows the active theme.
  const darkSurface = !scrolled || !light;
  const linkCls = `text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
    darkSurface ? 'text-muted hover:text-white' : 'text-[#5C6875] hover:text-[#0B1622]'
  }`;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? (light ? 'bg-white/85 shadow-[0_1px_0_rgba(11,22,34,0.08)] backdrop-blur-md' : 'bg-black/60 backdrop-blur-md') : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between py-5">
        <a href="#home" aria-label="Symbiosys Technologies home" className="shrink-0" data-cursor="hover">
          <span
            className={`inline-flex items-center rounded-xl px-3 py-1.5 backdrop-blur-md transition-all duration-500 ${
              darkSurface
                ? 'border border-white/30 bg-white/85 shadow-[0_6px_22px_rgba(0,0,0,0.4)]'
                : 'border border-black/10 bg-white/70 shadow-[0_4px_14px_rgba(11,22,34,0.10)]'
            }`}
          >
            <Logo className="h-8 sm:h-9" />
          </span>
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkCls} data-cursor="hover">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle onDark={darkSurface} />
          <a href="#contact" className="btn-solid" data-cursor="hover">
            Contact Us
          </a>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <ThemeToggle onDark={darkSurface} />
          <button
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full border ${
              darkSurface ? 'border-white/15 text-white' : 'border-black/15 text-[#0B1622]'
            }`}
            aria-label="Toggle menu"
          >
            {open ? <HiX size={20} /> : <HiMenuAlt4 size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden lg:hidden ${light ? 'bg-white' : 'bg-black'}`}
          >
            <nav className="container-x flex flex-col gap-1 pb-6 pt-2">
              {[...links, { label: 'Contact', href: '#contact' }].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-3.5 font-display text-2xl font-normal tracking-[-0.02em] ${
                    light ? 'text-[#0B1622]' : 'text-white'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
