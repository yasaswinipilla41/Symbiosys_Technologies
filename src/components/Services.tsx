import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import { TbBrain } from 'react-icons/tb';
import type { IconType } from 'react-icons';
import SectionHeading from './ui/SectionHeading';

interface Service {
  n: string;
  title: string;
  desc: string;
  tags: string[];
  icon?: IconType;
}

const services: Service[] = [
  {
    n: '01',
    title: 'Engineering Services',
    desc: 'Innovative solutions for complex project needs — combining creativity, talent and technology.',
    tags: ['Steel Detailing', 'BIM Modeling', '3D Laser Scanning', 'Point Cloud Modeling'],
  },
  {
    n: '02',
    title: 'Animation & VFX',
    desc: 'A full-service studio for storytellers — end-to-end creative from concept development to final output.',
    tags: ['2D & 3D Animation', 'Storyboarding', 'Concept Art', 'Visual Effects'],
  },
  {
    n: '03',
    title: 'Geospatial Services',
    desc: 'A wide variety of solutions altering how we perceive and comprehend our surroundings.',
    tags: ['Remote Sensing', 'Geo-Survey', 'Photogrammetry', 'LiDAR', 'GIS', 'Digital Twins'],
  },
  {
    n: '04',
    title: 'Testing Services',
    desc: 'A pioneer in delivering quality assurance across automation and consultation.',
    tags: ['Accessibility', 'Compatibility', 'Performance', 'Security', 'QA Consultation'],
  },
  {
    n: '05',
    title: 'Publishing Services',
    desc: 'Forefront of technological developments in the publishing industry, including XML-driven workflows.',
    tags: ['Typesetting', 'Editorial', 'Digital Conversion'],
  },
  {
    n: '06',
    title: 'Digital Conversion',
    desc: 'E-books for major publishers across the globe, converting a wide range of source file types.',
    tags: ['ePub2 & ePub3', 'Fixed Layout', 'Mobi / Kindle', 'IDPF Standards'],
  },
  {
    n: '07',
    title: 'Editorial Services',
    desc: 'Comprehensive, professional copy editing that ensures compliance with international rules.',
    tags: ['Copy Editing', 'Proofreading', 'Chicago / APA / AMA'],
  },
  {
    n: '08',
    title: 'Typesetting',
    desc: 'STM journals, legal documentation, trade publications and books across a wide range of subjects.',
    tags: ['Arbortext 3B2', 'QuarkXPress', 'XML Output'],
  },
  {
    n: '09',
    title: 'Project Management',
    desc: 'A single point of contact and a proactive communications culture, from start to finish.',
    tags: ['Scheduling', 'Status Reporting', 'Quality Control', 'Delivery'],
  },
  {
    n: '10',
    title: 'AI Engineer',
    desc: 'Applied artificial intelligence for the enterprise — intelligent automation, models and copilots engineered into your workflows.',
    tags: ['Machine Learning', 'LLM Integration', 'Computer Vision', 'Intelligent Automation', 'MLOps'],
    icon: TbBrain,
  },
];

export default function Services() {
  return (
    <section id="services" data-theme="dark" className="relative overflow-hidden bg-void py-24 text-white md:py-32">
      {/* prestigious backdrop: soft chromatic washes + floating light orbs */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(60% 40% at 12% 8%, rgba(0,181,226,0.08) 0%, transparent 60%), radial-gradient(50% 38% at 88% 85%, rgba(245,130,32,0.07) 0%, transparent 60%)' }} />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -22, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut' }}
        className="pointer-events-none absolute right-[12%] top-24 h-40 w-40 rounded-full bg-accent/10 blur-[70px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 18, 0] }}
        transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-32 left-[6%] h-48 w-48 rounded-full bg-spark/10 blur-[80px]"
      />
      <div className="container-x relative">
        <SectionHeading
          light
          index="02"
          label="What We Do"
          title={<>A multi-vertical practice, across ten disciplines.</>}
          lead="From steel detailing and geospatial intelligence to animation, testing and publishing — one partner for engineering, technology and creative services."
        />
        {/* signature accent underline (prestige mark) */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-[3px] w-24 origin-left rounded-full bg-gradient-to-r from-spark to-spark/0"
        />

        <div className="mt-16 border-t border-white/10">
          {services.map((s, i) => (
            <motion.a
              key={s.n}
              href="#contact"
              data-cursor="hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.004 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
              className="group relative block border-b border-white/10"
            >
              {/* cursor-following soft glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(0,181,226,0.09), transparent 65%)' }}
              />
              {/* accent hairline that grows on hover */}
              <span className="pointer-events-none absolute inset-y-5 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 rounded-2xl px-3 py-7 transition-colors duration-300 group-hover:bg-white/[0.03] md:gap-10 md:px-5 md:py-9">
                <span className="font-display text-sm text-white/40 transition-colors group-hover:text-accent">{s.n}</span>
                <div className="min-w-0">
                  <h3 className="heading-lg flex items-center gap-4 !text-white transition-transform duration-500 ease-out group-hover:translate-x-2">
                    {s.title}
                    {s.icon && (
                      <s.icon
                        aria-hidden="true"
                        className="shrink-0 text-[0.7em] text-accent transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                      />
                    )}
                  </h3>
                  <div className="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                    <div className="min-h-0">
                      <p className="max-w-2xl pt-4 text-[15px] leading-relaxed text-white/55">{s.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-royal group-hover:to-accent">
                  <HiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
