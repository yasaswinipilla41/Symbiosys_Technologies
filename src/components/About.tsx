import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';
import { HiOutlineUsers, HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineClock } from 'react-icons/hi2';
import Reveal from './ui/Reveal';
import Counter from './ui/Counter';
import SectionHeading from './ui/SectionHeading';

const stats = [
  { icon: HiOutlineUsers, to: 250, suffix: '+', label: 'Global Clients' },
  { icon: HiOutlineBriefcase, to: 680, suffix: '+', label: 'Projects Delivered' },
  { icon: HiOutlineUserGroup, to: 400, suffix: '+', label: 'Team Members' },
  { icon: HiOutlineClock, to: 15, suffix: '+', label: 'Years of Experience' },
];

const pillars = [
  {
    icon: FiTarget,
    title: 'Our Mission',
    text: 'To empower organizations with intelligent, scalable technology that turns ambition into measurable outcomes.',
    color: 'from-brand-cyan to-royal',
  },
  {
    icon: FiEye,
    title: 'Our Vision',
    text: 'To be the symbiotic partner enterprises trust to navigate every wave of digital transformation.',
    color: 'from-brand-green to-brand-cyan',
  },
  {
    icon: FiHeart,
    title: 'Core Values',
    text: 'Integrity, innovation, ownership, and an obsession with client success guide everything we build.',
    color: 'from-brand-orange to-brand-yellow',
  },
];

const timeline = [
  { year: '2010', title: 'Founded', text: 'Symbiosys begins as a boutique software consultancy.' },
  { year: '2015', title: 'Global Expansion', text: 'Delivery centers open across three continents.' },
  { year: '2019', title: 'AI & Cloud Practice', text: 'Dedicated AI, ML and cloud engineering divisions launch.' },
  { year: '2024', title: 'Enterprise at Scale', text: 'Trusted by 250+ organizations worldwide.' },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-28">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-brand-cyan/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Who We Are"
          title={<>A Symbiosys of <span className="text-gradient">people & technology</span></>}
          subtitle="For over a decade Symbiosys Technologies has helped enterprises modernize, scale, and innovate — blending deep engineering craft with a partnership mindset."
        />

        {/* Split layout */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal direction="right">
            <div className="relative">
              <div className="border-glow overflow-hidden rounded-3xl">
                <div className="relative rounded-3xl bg-gradient-to-br from-navy to-royal p-10 text-white shadow-card">
                  <div className="absolute inset-0 grid-lines opacity-20" />
                  <div className="relative">
                    <h3 className="font-display text-2xl font-bold">Engineering outcomes, not just software.</h3>
                    <p className="mt-4 text-white/70">
                      From strategy to delivery, our cross-functional teams plug into your business like a natural
                      extension — shipping resilient products that compound value over time.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {['ISO-aligned delivery', 'Dedicated pods', '24/7 global support', 'Security-first'].map((f) => (
                        <div key={f} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* floating accent card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="glass absolute -bottom-8 -right-4 hidden w-52 p-5 sm:block"
              >
                <div className="text-3xl font-bold text-gradient-sunset font-display">98%</div>
                <div className="mt-1 text-sm text-navy/60">Client retention across engagements</div>
              </motion.div>
            </div>
          </Reveal>

          {/* Timeline */}
          <Reveal direction="left">
            <div className="relative pl-8">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-brand-cyan via-brand-green to-brand-orange" />
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative mb-9 last:mb-0"
                >
                  <span className="absolute -left-[26px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-white ring-2 ring-brand-cyan">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                  </span>
                  <div className="text-sm font-bold uppercase tracking-widest text-brand-cyan">{item.year}</div>
                  <div className="mt-1 font-display text-xl font-bold text-navy">{item.title}</div>
                  <div className="mt-1 text-navy/60">{item.text}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Mission / Vision / Values */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} direction="up" delay={i * 0.08}>
              <div className="group border-glow h-full rounded-3xl bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card">
                <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-glow transition-transform duration-500 group-hover:rotate-6`}>
                  <p.icon size={26} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-navy">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-navy/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} direction="scale" delay={i * 0.08}>
              <div className="glass group flex flex-col items-center p-8 text-center transition-transform duration-500 hover:-translate-y-1.5">
                <s.icon className="mb-3 text-3xl text-royal transition-transform duration-500 group-hover:scale-110" />
                <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-medium text-navy/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
