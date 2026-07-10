import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiSparkles } from 'react-icons/hi2';
import MagneticButton from './ui/MagneticButton';

const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero() {
  const [revealed, setRevealed] = useState(false);

  // Fallback in case the WebGL "formed" callback never fires.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setRevealed(true), reduced ? 200 : 9000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#02060d]">
      {/* Night sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#01040a] via-[#041020] to-[#062033]" />

      {/* Moonlight */}
      <div
        className="pointer-events-none absolute -right-28 -top-28 h-[340px] w-[340px] rounded-full opacity-70 blur-[10px] md:h-[520px] md:w-[520px]"
        style={{ background: 'radial-gradient(circle, rgba(190,225,255,0.55) 0%, rgba(120,180,230,0.18) 35%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-6 top-4 h-24 w-24 rounded-full opacity-90 md:right-10 md:top-10 md:h-40 md:w-40"
        style={{ background: 'radial-gradient(circle at 40% 40%, #f4faff 0%, #cfe6ff 45%, rgba(180,215,245,0.2) 70%, transparent 75%)', boxShadow: '0 0 120px 40px rgba(160,205,245,0.35)' }}
      />

      {/* Aurora / nebula gradients */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[420px] w-[560px] rounded-full bg-brand-cyan/10 blur-[130px] animate-pulseglow" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[360px] w-[460px] rounded-full bg-brand-orange/10 blur-[130px] animate-pulseglow" style={{ animationDelay: '2s' }} />

      {/* Particle scene */}
      <Suspense fallback={null}>
        <HeroScene onFormed={() => setRevealed(true)} />
      </Suspense>

      {/* Volumetric light rays */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{ background: 'conic-gradient(from 200deg at 80% 0%, transparent 0deg, rgba(150,200,240,0.12) 20deg, transparent 40deg, transparent 320deg, rgba(150,200,240,0.10) 350deg, transparent 360deg)' }}
      />

      {/* Meadow silhouette + mist */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[38%]">
        <div
          className="absolute inset-x-0 bottom-0 h-40 animate-floaty-slow"
          style={{ background: 'linear-gradient(to top, rgba(150,200,235,0.10), transparent)' }}
        />
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,220 L0,150 C120,120 180,90 260,110 C300,60 340,70 380,105 C440,80 470,120 520,110 C560,150 620,130 680,140 C720,90 760,100 800,125 C860,95 900,140 960,120 C1020,150 1080,110 1140,130 C1200,100 1260,120 1320,110 C1380,130 1420,150 1440,140 L1440,220 Z" fill="#01040a" />
          <path d="M0,220 L0,185 C160,165 260,180 360,170 C480,160 560,190 680,182 C820,172 900,195 1040,185 C1180,175 1300,192 1440,182 L1440,220 Z" fill="#000206" />
        </svg>
      </div>

      {/* Vignette + film grain */}
      <div className="pointer-events-none absolute inset-0 z-[6]" style={{ boxShadow: 'inset 0 0 220px 60px rgba(0,0,0,0.85)' }} />
      <div className="pointer-events-none absolute inset-0 z-[6] opacity-[0.06] mix-blend-overlay noise-grain" />

      {/* Content */}
      <div className="container-x relative z-10 flex min-h-[100svh] flex-col items-center justify-between py-28 text-center">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6"
        >
          <span className="eyebrow border-white/15 bg-white/5 text-brand-cyan backdrop-blur">
            <HiSparkles /> Innovation, Delivered
          </span>
        </motion.div>

        {/* Accessible headline (visual title is drawn by the particle scene) */}
        <h1 className="sr-only">Symbiosys Technologies — Transforming Businesses Through Innovation</h1>

        {/* Lower reveal: tagline + CTAs, appear once fireflies form the name */}
        <motion.div
          initial={false}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 flex flex-col items-center"
        >
          <p className="max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            We deliver AI, Digital Transformation, Cloud Solutions, Enterprise Applications,
            Staffing, and IT Consulting that help organizations grow.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <MagneticButton href="#services" variant="primary">
              Explore Services
              <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost" className="!border-white/25 !bg-white/5 !text-white">
              Contact Us
            </MagneticButton>
          </div>

          {/* Scroll cue */}
          <a href="#about" className="mt-12 inline-flex flex-col items-center gap-2" aria-label="Scroll down">
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/25 p-1.5">
              <motion.span
                className="h-2 w-1 rounded-full bg-brand-cyan"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Fade into the (light) next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[7] h-28 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
