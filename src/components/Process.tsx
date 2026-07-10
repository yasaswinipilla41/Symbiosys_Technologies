import { motion } from 'framer-motion';
import { FiSearch, FiClipboard, FiPenTool, FiCode, FiCheckCircle, FiUploadCloud, FiLifeBuoy } from 'react-icons/fi';
import SectionHeading from './ui/SectionHeading';

const steps = [
  { icon: FiSearch, title: 'Discovery', text: 'We immerse in your goals, users and constraints to define the right problem.' },
  { icon: FiClipboard, title: 'Planning', text: 'Roadmaps, architecture and success metrics — a clear plan everyone aligns on.' },
  { icon: FiPenTool, title: 'Design', text: 'Human-centered UX and technical design that balances beauty and scale.' },
  { icon: FiCode, title: 'Development', text: 'Clean, tested code shipped in tight, transparent iterations.' },
  { icon: FiCheckCircle, title: 'Testing', text: 'Automated and manual QA ensuring quality, security and performance.' },
  { icon: FiUploadCloud, title: 'Deployment', text: 'Confident, low-risk releases with CI/CD and observability built in.' },
  { icon: FiLifeBuoy, title: 'Support', text: 'Continuous optimization, monitoring and 24/7 support after launch.' },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-gradient-to-b from-white to-[#eef4f9] py-28">
      <div className="container-x relative">
        <SectionHeading
          eyebrow="How We Work"
          title={<>A proven path from <span className="text-gradient">idea to impact</span></>}
          subtitle="Seven disciplined stages that de-risk delivery and keep you in control the whole way."
        />

        <div className="relative">
          {/* connecting line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-cyan via-brand-green to-brand-orange lg:block" />

          <div className="space-y-6 lg:space-y-2">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <div key={s.title} className="lg:grid lg:grid-cols-2 lg:gap-12">
                  {/* spacer for alternating layout */}
                  {!left && <div className="hidden lg:block" />}
                  <motion.div
                    initial={{ opacity: 0, x: left ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative ${left ? 'lg:text-right' : ''}`}
                  >
                    <div className="group relative rounded-3xl border border-navy/5 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card">
                      {/* node dot */}
                      <span
                        className={`absolute top-1/2 hidden h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-white ring-4 ring-brand-cyan/30 lg:grid ${
                          left ? '-right-[3.9rem]' : '-left-[3.9rem]'
                        }`}
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-royal to-brand-cyan" />
                      </span>
                      <div className={`flex items-center gap-4 ${left ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-royal to-brand-cyan text-white shadow-glow transition-transform duration-500 group-hover:rotate-6">
                          <s.icon size={24} />
                        </div>
                        <div>
                          <div className="font-display text-sm font-bold uppercase tracking-widest text-brand-cyan">
                            Step {String(i + 1).padStart(2, '0')}
                          </div>
                          <h3 className="font-display text-xl font-bold text-navy">{s.title}</h3>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-navy/60">{s.text}</p>
                    </div>
                  </motion.div>
                  {left && <div className="hidden lg:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
