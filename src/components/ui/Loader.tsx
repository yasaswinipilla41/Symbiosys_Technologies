import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Cinematic brand intro — a monumental 3D reveal of SYMBIOSYS TECHNOLOGIES.
 * Letters rise out of depth with perspective, a light beam sweeps the mark,
 * a soft floor reflection grounds it, then the stage lifts away into the
 * (already-settled) landing page. All letter/beam/float motion is pure CSS
 * keyframes on transform/opacity; React only orchestrates entry/exit.
 */
const WORD_1 = 'SYMBIOSYS';
const WORD_2 = 'TECHNOLOGIES';
const HOLD_MS = 3600;

function Letters({ word, base, step, className }: { word: string; base: number; step: number; className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {word.split('').map((ch, i) => (
        <span key={i} className="intro-letter intro-depth" style={{ animationDelay: `${base + i * step}s` }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setDone(true), reduced ? 150 : HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-void"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Symbiosys Technologies"
          role="img"
        >
          {/* stage lighting */}
          <div
            className="intro-halo pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(0,181,226,0.16), rgba(10,77,128,0.08) 55%, transparent 75%)' }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay grain" />

          {/* the mark — scales gently as the curtain lifts */}
          <motion.div
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.6, 1] }}
            className="relative px-6 text-center"
            style={{ perspective: 1200 }}
          >
            <div className="intro-float relative">
              <div className="relative overflow-hidden">
                <h1 className="font-display font-normal leading-none tracking-[-0.03em]">
                  <Letters
                    word={WORD_1}
                    base={0.25}
                    step={0.055}
                    className="block whitespace-nowrap text-[clamp(2.6rem,9.5vw,8.5rem)]"
                  />
                </h1>
                <div
                  className="mt-3 font-display font-normal uppercase text-white/85 md:mt-5"
                  style={{ letterSpacing: '0.34em' }}
                >
                  <Letters word={WORD_2} base={0.85} step={0.04} className="block whitespace-nowrap text-[clamp(0.85rem,2.4vw,1.6rem)]" />
                </div>
                {/* sweeping light */}
                <div className="intro-shine" />
              </div>

              {/* floor reflection */}
              <div className="intro-reflect mt-1 select-none" aria-hidden="true">
                <div className="font-display leading-none tracking-[-0.03em] text-white">
                  <span className="block whitespace-nowrap text-[clamp(2.6rem,9.5vw,8.5rem)]">{WORD_1}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
