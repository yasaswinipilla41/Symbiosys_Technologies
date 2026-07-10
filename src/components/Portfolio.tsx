import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const categories = ['All', 'AI & ML', 'Cloud', 'Web', 'Mobile', 'Data'] as const;
type Category = (typeof categories)[number];

interface Project {
  title: string;
  tag: Exclude<Category, 'All'>;
  blurb: string;
  gradient: string;
}

const projects: Project[] = [
  { title: 'NeuralDesk AI Copilot', tag: 'AI & ML', blurb: 'Enterprise support copilot cutting resolution time 62%.', gradient: 'from-[#0A4D80] to-[#00B5E2]' },
  { title: 'AtlasCloud Migration', tag: 'Cloud', blurb: 'Zero-downtime migration of 140 workloads to AWS.', gradient: 'from-[#083a5c] to-[#7BC043]' },
  { title: 'RetailPulse Commerce', tag: 'Web', blurb: 'Headless commerce platform scaling to 2M sessions.', gradient: 'from-[#F58220] to-[#FFC107]' },
  { title: 'MediTrack Mobile', tag: 'Mobile', blurb: 'HIPAA-compliant patient companion app, 4.9★ rated.', gradient: 'from-[#0A4D80] to-[#7BC043]' },
  { title: 'InsightGrid Analytics', tag: 'Data', blurb: 'Real-time analytics lakehouse for a global logistics firm.', gradient: 'from-[#00B5E2] to-[#0A4D80]' },
  { title: 'VisionForge ML', tag: 'AI & ML', blurb: 'Computer-vision QA detecting defects at 99.3% accuracy.', gradient: 'from-[#7BC043] to-[#00B5E2]' },
  { title: 'FinServe Core', tag: 'Cloud', blurb: 'Cloud-native core banking platform, PCI-DSS certified.', gradient: 'from-[#062B45] to-[#0A4D80]' },
  { title: 'EduSphere LMS', tag: 'Web', blurb: 'Adaptive learning platform for 300k+ students.', gradient: 'from-[#F58220] to-[#00B5E2]' },
];

export default function Portfolio() {
  const [active, setActive] = useState<Category>('All');
  const filtered = active === 'All' ? projects : projects.filter((p) => p.tag === active);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-gradient-to-b from-white via-[#f4f8fc] to-white py-28">
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Selected Work"
          title={<>Outcomes we're <span className="text-gradient">proud of</span></>}
          subtitle="A glimpse of the products and platforms we've engineered across industries."
        />

        {/* Filters */}
        <Reveal direction="up">
          <div className="mb-12 flex flex-wrap justify-center gap-2.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active === c ? 'text-white' : 'text-navy/60 hover:text-navy'
                }`}
              >
                {active === c && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-royal to-brand-cyan shadow-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-72 cursor-pointer overflow-hidden rounded-3xl shadow-soft"
              >
                {/* "Image" */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} transition-transform duration-700 group-hover:scale-110`}>
                  <div className="absolute inset-0 grid-lines opacity-20" />
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 40%)' }} />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
                  <span className="mb-3 w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {p.tag}
                  </span>
                  <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {p.blurb}
                  </p>
                  <div className="mt-4 flex translate-y-3 items-center gap-1.5 text-sm font-semibold text-brand-cyan opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    View case study <HiArrowUpRight />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
