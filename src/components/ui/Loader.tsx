import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Cinematic brand intro — sketch layout, centered:
 *
 *      Symbiosys Technologies        (floating title, 3D letters, glow)
 *      Engineering intelligent…      (light description)
 *          [ building card ]         (blur-to-focus, counter-floating)
 *        ~ Symbiosys ~               (signature overlapping the card)
 *
 * Holds ~5s, then the stage scrolls up with layered parallax (title fastest,
 * building slowest, signature fading first) into the untouched landing page.
 *
 * The exit is animation-driven on an always-mounted overlay (no
 * AnimatePresence) so React StrictMode's dev double-mount can never
 * trigger a premature unmount. Letter/float/reveal motion is pure CSS;
 * GPU transforms + opacity throughout.
 */
const TITLE_WORDS = ['SYMBIOSYS', 'TECHNOLOGIES'];
const HOLD_MS = 5200;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setDone(true), reduced ? 150 : HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <motion.div
      initial={false}
      animate={done ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => done && setGone(true)}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
      aria-label="Symbiosys Technologies"
      role="img"
    >
      {/* premium animated backdrop — technical grid + drifting edge glows */}
      <div className="intro-grid pointer-events-none absolute inset-0" />
      <div
        className="intro-glow -bottom-28 -left-32 h-[52vmin] w-[52vmin]"
        style={{ background: 'radial-gradient(closest-side, rgba(128,82,255,0.30), transparent 70%)', filter: 'blur(46px)' }}
      />
      <div
        className="intro-glow -right-24 -top-28 h-[46vmin] w-[46vmin]"
        style={{ background: 'radial-gradient(closest-side, rgba(245,130,32,0.24), transparent 70%)', filter: 'blur(52px)', animationDelay: '2.4s' }}
      />
      <div
        className="intro-glow -bottom-36 left-[38%] h-[44vmin] w-[58vmin]"
        style={{ background: 'radial-gradient(closest-side, rgba(0,181,226,0.18), transparent 70%)', filter: 'blur(58px)', animationDelay: '4.6s' }}
      />
      {/* faint cinematic rays + breathing center light */}
      <div
        className="intro-halo pointer-events-none absolute left-1/2 top-1/2 h-[85vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(0,181,226,0.10), rgba(10,77,128,0.05) 55%, transparent 75%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{ background: 'conic-gradient(from 200deg at 75% -5%, transparent 0deg, rgba(0,181,226,0.09) 12deg, transparent 28deg)' }}
      />
      {/* floating light motes */}
      {[
        { left: '14%', top: '30%', size: 3, color: 'rgba(0,181,226,0.9)', delay: '0s', dur: '9s' },
        { left: '26%', top: '68%', size: 2, color: 'rgba(255,255,255,0.8)', delay: '2.1s', dur: '11s' },
        { left: '72%', top: '24%', size: 2, color: 'rgba(245,130,32,0.85)', delay: '3.4s', dur: '10s' },
        { left: '84%', top: '58%', size: 3, color: 'rgba(128,82,255,0.8)', delay: '1.2s', dur: '12s' },
        { left: '58%', top: '82%', size: 2, color: 'rgba(255,255,255,0.7)', delay: '4.8s', dur: '9.5s' },
        { left: '40%', top: '14%', size: 2, color: 'rgba(0,181,226,0.7)', delay: '5.6s', dur: '10.5s' },
      ].map((p, i) => (
        <span
          key={i}
          className="intro-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 8px 1px ${p.color}`,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay grain" />

      {/* centered stack */}
      <div className="relative flex w-full flex-col items-center px-6 text-center" style={{ perspective: 1200 }}>
        {/* Title — floating, staggered 3D letters (exits fastest) */}
        <motion.h1
          initial={false}
          animate={done ? { y: -150, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.6, 1] }}
          className="intro-float relative font-display font-normal leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(1.9rem, 5.8vw, 4.2rem)' }}
        >
          <span aria-hidden="true" className="block">
            {TITLE_WORDS.map((word, w) => (
              <span key={word} className="inline-block whitespace-nowrap">
                {word.split('').map((ch, i) => {
                  const idx = w * 10 + i;
                  return (
                    <span key={i} className="intro-letter intro-depth" style={{ animationDelay: `${0.25 + idx * 0.035}s` }}>
                      {ch}
                    </span>
                  );
                })}
                {w < TITLE_WORDS.length - 1 && <span className="inline-block w-[0.28em]" />}
              </span>
            ))}
          </span>
          <div className="intro-shine" />
        </motion.h1>

        {/* Description — light, two lines max, floats with the title */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={done ? { y: -120, opacity: 0 } : { opacity: 1, y: 0 }}
          transition={done ? { duration: 0.75, ease: [0.4, 0, 0.6, 1] } : { delay: 1.15, duration: 0.9, ease: EASE }}
          className="intro-float mt-5 max-w-xl font-extralight leading-relaxed text-white/70"
          style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', animationDelay: '0.4s' }}
        >
          Engineering intelligent software, AI, automation, and digital experiences that
          transform businesses through innovation.
        </motion.p>

        {/* Building — centered card, blur-to-focus, breathing, counter-float (exits slowest = parallax) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={done ? { y: -55, opacity: 0 } : { opacity: 1, y: 0 }}
          transition={done ? { duration: 0.9, ease: [0.4, 0, 0.6, 1] } : { delay: 0.7, duration: 1.2, ease: EASE }}
          className="relative mt-9 w-[min(80vw,680px)]"
        >
          <div className="intro-counterfloat">
            <div className="intro-img relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_60px_rgba(0,181,226,0.08)]">
              <div className="intro-kenburns">
                <img
                  src="/campus.jpg"
                  alt=""
                  aria-hidden="true"
                  width={1200}
                  height={800}
                  className="block h-auto w-full"
                />
              </div>
              {/* cinematic grade for blend + legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}
