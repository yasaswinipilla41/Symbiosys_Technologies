import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { HiArrowUpRight } from 'react-icons/hi2';
import Logo from './Logo';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Industries', href: '#industries' },
  { label: 'Careers', href: '#careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled
            ? 'border border-white/60 bg-white/75 shadow-soft backdrop-blur-xl'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <a href="#home" className="shrink-0">
          <span
            className={`inline-flex items-center rounded-xl px-3 py-1.5 transition-all duration-500 ${
              scrolled ? 'bg-transparent shadow-none' : 'bg-white/95 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]'
            }`}
          >
            <Logo className="h-7 sm:h-9" />
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-sm font-medium text-navy/70 transition-colors hover:text-navy"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contact" className="btn-primary text-[13px]">
            Contact Us <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-navy/10 bg-white/70 text-navy lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <HiX size={22} /> : <HiMenuAlt4 size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute left-4 right-4 top-[84px] rounded-2xl border border-white/60 bg-white/90 p-4 shadow-card backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-navy/80 transition-colors hover:bg-royal/5 hover:text-navy"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Contact Us <HiArrowUpRight />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
