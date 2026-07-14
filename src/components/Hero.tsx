import { lazy, Suspense, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { HiArrowDown, HiArrowRight } from 'react-icons/hi2';
import MagneticButton from './ui/MagneticButton';

const HeroParticles = lazy(() => import('./hero/HeroParticles'));

const line1 = ['Technology', 'That'];
const line2 = ['Moves', 'Business', 'Forward.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Mouse parallax for the campus image (springs → buttery)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 42, damping: 16, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 42, damping: 16, mass: 0.7 });
  const imgX = useTransform(sx, (v) => v * -18);
  const imgTilt = useTransform(sy, (v) => v * -12);

  const onMove = (e: React.PointerEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const reveal = (delay: number) => ({
    initial: { y: '115%' },
    animate: { y: 0 },
    transition: { delay, duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-void pt-28"
    >
      {/* Campus — living background composition: large, blended, breathing */}
      <motion.div
        style={{ y: imageY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] sm:h-[76%] lg:left-[16%]"
      >
        <motion.div style={{ x: imgX, y: imgTilt }} className="h-full w-full">
          <motion.div
            animate={{ scale: [1, 1.045, 1] }}
            transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <img
              src="/campus.jpg"
              alt=""
              aria-hidden="true"
              width={1200}
              height={800}
              loading="eager"
              className="h-full w-full object-cover opacity-90"
              style={{
                objectPosition: '55% 38%',
                maskImage: 'radial-gradient(120% 110% at 70% 100%, #000 55%, transparent 88%)',
                WebkitMaskImage: 'radial-gradient(120% 110% at 70% 100%, #000 55%, transparent 88%)',
              }}
            />
          </motion.div>
        </motion.div>
        {/* cinematic grade + lighting over the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/25 to-transparent" />
        <div className="absolute inset-0 mix-blend-overlay" style={{ background: 'linear-gradient(115deg, rgba(0,181,226,0.22) 0%, transparent 45%, rgba(245,130,32,0.18) 100%)' }} />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay grain" />
        {/* identity chip */}
        <span className="absolute bottom-20 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md sm:bottom-6 sm:right-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Symbiosys Technologies · Visakhapatnam
        </span>
      </motion.div>

      {/* Ambient constellation field — alive over the campus */}
      <div className="absolute inset-0 opacity-50 lg:left-[30%] lg:opacity-70">
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
      </div>

      {/* Left-side black fade to protect legibility (non-chromatic) */}
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black via-black/70 to-transparent lg:block" style={{ maskImage: 'linear-gradient(to right, #000 45%, transparent 75%)' }} />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-x relative z-10 w-full pb-24 lg:pb-0">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
            <span className="label label-dot">Symbiosys Technologies</span>
          </motion.div>

          <h1 className="display mt-8" style={{ fontSize: 'clamp(2rem, 4.2vw, 3.8rem)' }}>
            <span className="block">
              {line1.map((w, i) => (
                <span key={w} className="mr-[0.2em] inline-block overflow-hidden pb-[0.06em] align-top">
                  <motion.span className="inline-block" {...reveal(0.45 + i * 0.08)}>{w}</motion.span>
                </span>
              ))}
            </span>
            <span className="block">
              {line2.map((w, i) => (
                <span key={w} className="mr-[0.2em] inline-block overflow-hidden pb-[0.06em] align-top">
                  <motion.span
                    className={`inline-block ${
                      w === 'Forward.'
                        ? 'bg-gradient-to-r from-brand-cyan via-brand-green to-spark bg-clip-text text-transparent'
                        : ''
                    }`}
                    {...reveal(0.6 + i * 0.08)}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lead mt-9 max-w-lg !text-white"
          >
            Delivering AI-powered solutions, engineering excellence, and digital innovation that
            empower businesses to grow worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex items-center gap-8"
          >
            <MagneticButton href="#services" variant="solid">
              Explore Services
              <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost-light">
              Contact Us
            </MagneticButton>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-[13px] uppercase tracking-[0.14em] text-muted"
      >
        Scroll
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <HiArrowDown />
        </motion.span>
      </motion.a>
    </section>
  );
}
