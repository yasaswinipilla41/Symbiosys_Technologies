import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { HiArrowRight, HiArrowUpRight } from 'react-icons/hi2';
import MagneticButton from './ui/MagneticButton';
import HeroAtmosphere from './hero/HeroAtmosphere';

const titleWords = ['SYMBIOSYS', 'TECHNOLOGIES'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.7 });

  const bx1 = useTransform(sx, (v) => v * 48);
  const by1 = useTransform(sy, (v) => v * 34);
  const bx2 = useTransform(sx, (v) => v * -34);
  const by2 = useTransform(sy, (v) => v * -24);
  const bx3 = useTransform(sx, (v) => v * 22);
  const by3 = useTransform(sy, (v) => v * 18);
  const rx = useTransform(sx, (v) => v * 14);
  const ry = useTransform(sy, (v) => v * 10);
  const cx = useTransform(sx, (v) => v * 9);
  const cy = useTransform(sy, (v) => v * 7);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const onMove = (e: React.PointerEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative h-[100svh] overflow-hidden bg-[#05070B]"
    >
      {/* ---------- Background stack (scroll-scaled) ---------- */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
        {/* Animated gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070B] via-[#061A2D] to-[#0A3556]" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(120% 90% at 50% -10%, rgba(10,53,86,0.55) 0%, transparent 55%), radial-gradient(80% 60% at 80% 110%, rgba(6,26,45,0.8) 0%, transparent 60%)',
          }}
        />

        {/* Large floating gradient blobs (mouse + self-drift) */}
        <motion.div style={{ x: bx1, y: by1 }} className="absolute left-[8%] top-[14%]">
          <div className="animate-aurora h-[46vw] max-h-[560px] w-[46vw] max-w-[560px] rounded-full bg-brand-cyan/25 blur-[120px]" />
        </motion.div>
        <motion.div style={{ x: bx2, y: by2 }} className="absolute right-[6%] top-[8%]">
          <div className="animate-aurora-rev h-[40vw] max-h-[520px] w-[40vw] max-w-[520px] rounded-full bg-brand-orange/18 blur-[130px]" />
        </motion.div>
        <motion.div style={{ x: bx3, y: by3 }} className="absolute bottom-[2%] left-[26%]">
          <div className="animate-drift h-[42vw] max-h-[540px] w-[42vw] max-w-[540px] rounded-full bg-brand-green/14 blur-[130px]" />
        </motion.div>
        <motion.div style={{ x: bx2, y: by1 }} className="absolute bottom-[6%] right-[14%]">
          <div className="animate-aurora h-[34vw] max-h-[460px] w-[34vw] max-w-[460px] rounded-full bg-royal/40 blur-[120px]" />
        </motion.div>

        {/* Slowly rotating energy rings */}
        <motion.div style={{ x: rx, y: ry }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spinslow h-[70vh] w-[70vh] rounded-full border border-white/[0.06]" />
          <div className="animate-spinslow-rev absolute inset-0 m-auto h-[52vh] w-[52vh] rounded-full border border-brand-cyan/[0.08]" />
          <div className="animate-spinslow absolute inset-0 m-auto h-[34vh] w-[34vh] rounded-full border border-brand-orange/[0.07]" />
        </motion.div>

        {/* Particle field */}
        <HeroAtmosphere />

        {/* Light rays */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background:
              'conic-gradient(from 210deg at 68% -10%, transparent 0deg, rgba(150,205,245,0.10) 16deg, transparent 34deg, transparent 320deg, rgba(150,205,245,0.08) 344deg, transparent 360deg)',
          }}
        />

        {/* Noise + vignette */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay noise-grain" />
        <div className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 260px 80px rgba(0,0,0,0.8)' }} />
      </motion.div>

      {/* ---------- Content ---------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-[100svh] flex-col items-center justify-center px-6 text-center"
      >
        <motion.div style={{ x: cx, y: cy }} className="flex flex-col items-center">
          {/* Eyebrow (glass chip) */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_10px_2px_rgba(0,181,226,0.7)]" />
              Enterprise Technology Partner
            </span>
          </motion.div>

          {/* Headline with mask reveal */}
          <h1 className="mt-8 flex flex-wrap justify-center gap-x-[0.28em] font-display font-bold leading-[0.98] tracking-tight text-white text-glow"
              style={{ fontSize: 'clamp(2.6rem, 8.5vw, 7.5rem)' }}>
            {titleWords.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 + i * 0.14, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w === 'TECHNOLOGIES' ? (
                    <span className="bg-gradient-to-r from-white via-[#bfe9ff] to-brand-cyan bg-clip-text text-transparent">{w}</span>
                  ) : (
                    w
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg md:text-xl"
          >
            Transforming Businesses Through AI, Digital Innovation &amp; Enterprise Solutions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
          >
            <MagneticButton href="#services" variant="primary">
              Explore Services
              <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" className="!border-white/20 !bg-white/[0.04] !text-white backdrop-blur-md">
              Contact Us
              <HiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/25 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-brand-cyan"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </div>
      </motion.a>

      {/* Fade into next (light) section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
