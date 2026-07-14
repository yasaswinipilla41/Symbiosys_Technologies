import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

const steps = [
  'Requirement Analysis',
  'Strategy & Planning',
  'UI / UX Design',
  'Software Development',
  'AI & Automation',
  'Testing & QA',
  'Deployment',
  'Monitoring',
  'Optimization',
  'Continuous Innovation',
];

// Auto-rotation choreography: each card flips once per cycle, one after
// another (180ms stagger), looping forever while the section is on screen.
const FLIP = 1.1; // seconds per flip
const STAGGER = 0.18;
const REST = 1.4; // beat after the wave completes
const CYCLE = steps.length * STAGGER + FLIP + REST;

function CardFace({ n, name, back = false }: { n: string; name: string; back?: boolean }) {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#070707] p-5 md:p-6"
      style={{ backfaceVisibility: 'hidden', transform: back ? 'rotateY(180deg)' : undefined }}
    >
      <span className="font-display text-xs text-muted transition-colors">{n}</span>
      <p className="font-display text-base leading-tight text-white md:text-lg">{name}</p>
    </div>
  );
}

function LifecycleCard({ name, i, active }: { name: string; i: number; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  const n = String(i + 1).padStart(2, '0');
  const spinning = active && !hovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (i % 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: 1100 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor="hover"
    >
      {/* soft glow — blooms while the card is hovered */}
      <div
        className={`pointer-events-none absolute -inset-2 rounded-3xl bg-accent/15 blur-xl transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
      />
      <motion.div
        animate={
          spinning
            ? { rotateY: 360, scale: 1 }
            : { rotateY: 0, scale: hovered ? 1.05 : 1 }
        }
        transition={
          spinning
            ? {
                rotateY: {
                  duration: FLIP,
                  ease: [0.45, 0, 0.25, 1],
                  delay: i * STAGGER,
                  repeat: Infinity,
                  repeatDelay: CYCLE - FLIP,
                },
                scale: { duration: 0.3 },
              }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative h-32 transition-shadow duration-500 md:h-40 ${hovered ? 'z-10' : ''}`}
      >
        {/* identical front + back faces → the card reads as a solid slab spinning */}
        <CardFace n={n} name={name} />
        <CardFace n={n} name={name} back />
        {/* accent edge on hover */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl border transition-colors duration-500 ${hovered ? 'border-accent/60' : 'border-transparent'}`}
          style={{ backfaceVisibility: 'hidden' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  // not `once` — the wave pauses off-screen and resumes on return
  const inView = useInView(ref, { amount: 0.25 });
  const reduced = useReducedMotion();
  const active = inView && !reduced;

  return (
    <section id="process" ref={ref} className="relative overflow-hidden bg-void py-24 md:py-32">
      {/* soft ambient wash */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/[0.06] blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          index="04"
          label="Development Lifecycle"
          title={<>A single point of contact, from brief to delivery.</>}
          lead="Central to our delivery is a proactive communications culture — potential issues are spotted and resolved early, with regular reviews and status reports throughout."
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <LifecycleCard key={s} name={s} i={i} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
