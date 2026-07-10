import { HiArrowUpRight } from 'react-icons/hi2';
import { FiTrendingUp, FiGlobe, FiHeart, FiAward, FiCoffee, FiBookOpen } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import MagneticButton from './ui/MagneticButton';

const benefits = [
  { icon: FiTrendingUp, label: 'Accelerated Growth' },
  { icon: FiGlobe, label: 'Remote-first Culture' },
  { icon: FiHeart, label: 'Health & Wellness' },
  { icon: FiAward, label: 'Learning Budget' },
  { icon: FiCoffee, label: 'Flexible Time-off' },
  { icon: FiBookOpen, label: 'Mentorship' },
];

const positions = [
  { role: 'Senior AI/ML Engineer', type: 'Full-time', location: 'Remote / Hybrid', dept: 'AI Practice' },
  { role: 'Cloud Solutions Architect', type: 'Full-time', location: 'On-site', dept: 'Cloud' },
  { role: 'Product Designer (UI/UX)', type: 'Full-time', location: 'Remote', dept: 'Design' },
  { role: 'Full-Stack Developer', type: 'Full-time', location: 'Remote / Hybrid', dept: 'Engineering' },
];

export default function Careers() {
  return (
    <section id="careers" className="relative overflow-hidden bg-white py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-green/10 blur-[120px]" />
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          {/* Left: culture */}
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              center={false}
              eyebrow="Careers"
              title={<>Build the future <span className="text-gradient">with us</span></>}
              subtitle="We hire curious, kind, and driven people — then give them the autonomy and support to do the best work of their careers."
            />
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <Reveal key={b.label} direction="up" delay={i * 0.05}>
                  <div className="group flex items-center gap-3 rounded-2xl border border-navy/5 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-royal to-brand-cyan text-white transition-transform duration-500 group-hover:rotate-6">
                      <b.icon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-navy/80">{b.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: open positions */}
          <div>
            <Reveal direction="left">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-navy">Open Positions</h3>
                <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                  {positions.length} roles hiring
                </span>
              </div>
            </Reveal>
            <div className="space-y-4">
              {positions.map((p, i) => (
                <Reveal key={p.role} direction="left" delay={i * 0.07}>
                  <a
                    href="#contact"
                    className="border-glow group flex items-center justify-between gap-4 rounded-3xl border border-navy/5 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
                  >
                    <div>
                      <h4 className="font-display text-lg font-bold text-navy transition-colors group-hover:text-royal">
                        {p.role}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-royal/5 px-3 py-1 font-semibold text-royal">{p.dept}</span>
                        <span className="rounded-full bg-navy/5 px-3 py-1 font-medium text-navy/60">{p.type}</span>
                        <span className="rounded-full bg-navy/5 px-3 py-1 font-medium text-navy/60">{p.location}</span>
                      </div>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy/5 text-navy transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-royal group-hover:to-brand-cyan group-hover:text-white">
                      <HiArrowUpRight />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal direction="up" delay={0.2}>
              <div className="mt-8">
                <MagneticButton href="#contact" variant="sunset">
                  Apply Now <HiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
