import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

const quotes = [
  {
    text: 'IT specialists and technicians who have developed a niche market and an appreciation for mastering solutions to complex engineering problems, and built software solutions in profound disciplines.',
    name: 'Ramesh',
  },
  {
    text: 'Our engineers constantly keep themselves abreast with the latest trends in technology — helping Symbiosys stay one step ahead in its quest for knowledge and perfection.',
    name: 'Lohari',
  },
];

/**
 * Cinematic testimonials — the heading enters as a layered 3D sequence driven
 * by scroll (each layer at its own depth and rate), then the glass quote cards
 * rise out of perspective with staggered, eased motion. Everything animates on
 * transform/opacity only; content and structure are unchanged.
 */

/**
 * Layered interactive card: base glass → animated conic border → drifting
 * sheen → cursor-follow highlight → content lifted on the Z axis. The card
 * tilts toward the cursor on smoothed springs and lifts on hover.
 */
function TiltCard({
  q,
  i,
  reduced,
  parallaxY,
}: {
  q: (typeof quotes)[number];
  i: number;
  reduced: boolean;
  parallaxY: MotionValue<number>;
}) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 140, damping: 18, mass: 0.6 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 140, damping: 18, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(nx * 9);
    rotateX.set(-ny * 7);
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div style={reduced ? undefined : { y: parallaxY, perspective: 1100 }}>
      {/* entrance layer — separate from the tilt so transforms never fight */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 80, rotateX: 16, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.95, delay: i * 0.16, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        <motion.figure
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={reduced ? undefined : { scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_0_36px_rgba(0,181,226,0.12),0_24px_60px_rgba(0,0,0,0.5)] md:p-10"
          data-cursor="hover"
        >
          {/* animated gradient border */}
          <span className="tilt-border" aria-hidden="true" />
          {/* drifting light sheen */}
          <span className="tilt-sheen" aria-hidden="true" />
          {/* cursor-follow highlight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(340px circle at var(--mx,30%) var(--my,20%), rgba(0,181,226,0.1), transparent 62%)' }}
          />
          {/* floating highlight orb */}
          <motion.span
            aria-hidden="true"
            animate={reduced ? undefined : { y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={{ repeat: Infinity, duration: 6 + i * 1.5, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-[50px]"
          />

          {/* content — lifted off the card plane */}
          <div className="relative flex h-full flex-col" style={reduced ? undefined : { transform: 'translateZ(34px)' }}>
            <motion.span
              aria-hidden="true"
              animate={reduced ? undefined : { y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 4.5 + i, ease: 'easeInOut' }}
              className="font-display text-5xl leading-none text-spark"
            >
              &ldquo;
            </motion.span>
            <blockquote className="mt-4 font-display text-xl font-medium leading-snug text-ink md:text-2xl">
              {q.text}
            </blockquote>
            <figcaption className="mt-8 text-sm uppercase tracking-[0.2em] text-muted">— {q.name}</figcaption>
          </div>
        </motion.figure>
      </motion.div>
    </motion.div>
  );
}
export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Layered heading choreography — index/label, then the title, at different rates
  const labelY = useTransform(scrollYProgress, [0, 0.3], [64, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.03, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.38], [130, 0]);
  const titleRotateX = useTransform(scrollYProgress, [0, 0.38], [24, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.06, 0.3], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.38], [0.96, 1]);
  // Cards drift at slightly different depths while scrolling (parallax)
  const cardY0 = useTransform(scrollYProgress, [0.2, 1], [50, -26]);
  const cardY1 = useTransform(scrollYProgress, [0.2, 1], [90, -10]);
  // The whole stage eases upward as the section hands off to the next
  const exitY = useTransform(scrollYProgress, [0.78, 1], [0, -48]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  const cardParallax = [cardY0, cardY1];

  return (
    <section id="testimonials" ref={ref} className="relative overflow-hidden bg-void py-24 md:py-32">
      {/* stage lighting — fades in with the story */}
      <motion.div
        style={reduced ? undefined : { opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-[8%] top-16 h-72 w-72 rounded-full bg-accent/[0.07] blur-[110px]" />
        <div className="absolute bottom-10 right-[10%] h-80 w-80 rounded-full bg-spark/[0.06] blur-[120px]" />
      </motion.div>

      <motion.div style={reduced ? undefined : { y: exitY }} className="container-x relative">
        {/* Heading — layered 3D entrance driven by scroll */}
        <div className="max-w-4xl" style={{ perspective: 1000 }}>
          <motion.div
            style={reduced ? undefined : { y: labelY, opacity: labelOpacity }}
            className="flex items-center gap-4"
          >
            <span className="text-[13px] font-normal text-muted">06</span>
            <span className="label label-dot">Testimonials</span>
          </motion.div>
          <motion.h2
            style={
              reduced
                ? undefined
                : { y: titleY, rotateX: titleRotateX, scale: titleScale, opacity: titleOpacity, transformPerspective: 900 }
            }
            className="heading-xl mt-7 origin-bottom text-balance"
          >
            In their words.
          </motion.h2>
        </div>

        {/* Cards — layered, cursor-reactive, 3D tilt (Work Experience-grade) */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12">
          {quotes.map((q, i) => (
            <TiltCard key={q.name} q={q} i={i} reduced={!!reduced} parallaxY={cardParallax[i]} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
