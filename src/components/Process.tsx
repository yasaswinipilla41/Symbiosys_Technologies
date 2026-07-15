import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

const steps = [
  {
    title: 'Requirement Analysis',
    desc: 'Understand business goals, user needs, and technical requirements before development begins.',
  },
  {
    title: 'Strategy & Planning',
    desc: 'Define project roadmap, timelines, milestones, and technology stack for successful execution.',
  },
  {
    title: 'UI / UX Design',
    desc: 'Design intuitive interfaces and engaging user experiences focused on usability and accessibility.',
  },
  {
    title: 'Software Development',
    desc: 'Build scalable, secure, and high-performance applications using modern technologies.',
  },
  {
    title: 'AI & Automation',
    desc: 'Integrate AI solutions and automate workflows to improve productivity and efficiency.',
  },
  {
    title: 'Testing & QA',
    desc: 'Ensure quality through comprehensive testing, bug fixing, and performance validation.',
  },
  {
    title: 'Deployment',
    desc: 'Launch applications securely with optimized infrastructure and continuous delivery practices.',
  },
  {
    title: 'Monitoring',
    desc: 'Track application health, uptime, and performance using real-time monitoring tools.',
  },
  {
    title: 'Optimization',
    desc: 'Improve speed, scalability, SEO, and user experience through continuous optimization.',
  },
  {
    title: 'Continuous Innovation',
    desc: 'Continuously enhance products with new technologies, user feedback, and market trends.',
  },
];

/**
 * Flip choreography — never a continuous spin:
 *   front 2s → flip 0.7s → back 3s (readable) → flip back 0.7s → repeat.
 * Cards are staggered 250ms apart; hover (or keyboard focus) holds the card
 * on its informative back side with a premium dark glow.
 */
const T = 2 + 0.7 + 3 + 0.7; // 6.4s cycle
const FLIP_KEYFRAMES = { rotateY: [0, 0, 180, 180, 360] };
const FLIP_TIMES = [0, 2 / T, 2.7 / T, 5.7 / T, 1];

function Face({ n, title, desc, back = false }: { n: string; title: string; desc?: string; back?: boolean }) {
  return (
    <div
      className="absolute inset-0 flex flex-col rounded-2xl border border-black/10 bg-[#E6E6FA] p-5 transition-colors duration-500 group-hover/card:border-black/25 md:p-6"
      style={{ backfaceVisibility: 'hidden', transform: back ? 'rotateY(180deg)' : undefined }}
    >
      {back ? (
        <>
          <span className="font-display text-xs font-extrabold text-black">{n}</span>
          <p className="mt-3 font-display text-lg font-normal leading-tight text-black">{title}</p>
          <p className="mt-2.5 text-[13px] font-light leading-5 text-black sm:text-sm sm:leading-6">{desc}</p>
        </>
      ) : (
        <>
          {/* number stays top-left; only the title is centered */}
          <span className="absolute left-5 top-5 font-display text-xs font-extrabold text-black md:left-6 md:top-6">{n}</span>
          <p className="absolute inset-0 flex items-center justify-center px-4 text-center font-display text-base font-normal leading-tight text-black md:text-lg">
            {title}
          </p>
        </>
      )}
    </div>
  );
}

function LifecycleCard({ step, i, active }: { step: (typeof steps)[number]; i: number; active: boolean }) {
  const [held, setHeld] = useState(false); // hover or keyboard focus
  const n = String(i + 1).padStart(2, '0');
  const flipping = active && !held;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (i % 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* hover lift + glow live here so they never fight the 3D rotation */}
      <div
        tabIndex={0}
        data-cursor="hover"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        className={`group/card rounded-2xl outline-none transition-[transform,box-shadow] duration-[400ms] ease-out ${
          held
            ? '-translate-y-1 scale-[1.02] shadow-[0_0_30px_rgba(0,181,226,0.15),0_15px_40px_rgba(0,0,0,0.45)]'
            : 'shadow-[0_4px_18px_rgba(0,0,0,0.35)]'
        }`}
        style={{ perspective: 1100 }}
        aria-label={`${n}. ${step.title} — ${step.desc}`}
      >
        <motion.div
          animate={flipping ? FLIP_KEYFRAMES : { rotateY: held ? 180 : 0 }}
          transition={
            flipping
              ? {
                  duration: T,
                  times: FLIP_TIMES,
                  ease: ['linear', 'easeInOut', 'linear', 'easeInOut'],
                  repeat: Infinity,
                  delay: i * 0.25,
                }
              : { duration: 0.55, ease: 'easeInOut' }
          }
          style={{ transformStyle: 'preserve-3d' }}
          className="relative h-64 sm:h-56 md:h-64"
        >
          <Face n={n} title={step.title} />
          <Face n={n} title={step.title} desc={step.desc} back />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  // not `once` — flipping pauses off-screen and resumes on return
  const inView = useInView(ref, { amount: 0.25 });
  const reduced = useReducedMotion();
  const active = inView && !reduced;

  return (
    <section id="process" ref={ref} className="relative overflow-hidden bg-void py-24 md:py-32">
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
            <LifecycleCard key={s.title} step={s} i={i} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
