import { FiHeart, FiBookOpen, FiDollarSign, FiShoppingBag, FiSettings, FiTruck, FiHome } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const industries = [
  { icon: FiHeart, name: 'Healthcare', text: 'Connected care, compliance and clinical intelligence.', color: '#00B5E2' },
  { icon: FiBookOpen, name: 'Education', text: 'Adaptive learning platforms and campus digitization.', color: '#7BC043' },
  { icon: FiDollarSign, name: 'Finance', text: 'Secure, real-time fintech and core banking systems.', color: '#0A4D80' },
  { icon: FiShoppingBag, name: 'Retail', text: 'Omnichannel commerce and personalization at scale.', color: '#F58220' },
  { icon: FiSettings, name: 'Manufacturing', text: 'Smart factories, IoT and predictive maintenance.', color: '#FFC107' },
  { icon: FiTruck, name: 'Logistics', text: 'Route optimization and supply-chain visibility.', color: '#00B5E2' },
  { icon: FiHome, name: 'Government', text: 'Citizen services and secure digital public infrastructure.', color: '#7BC043' },
];

export default function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-white py-28">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-orange/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Industries"
          title={<>Deep expertise across <span className="text-gradient">every sector</span></>}
          subtitle="We speak the language of your industry — pairing engineering excellence with domain fluency."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} direction="up" delay={(i % 4) * 0.07}>
              <div
                className="group relative h-full overflow-hidden rounded-3xl border border-navy/5 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card"
                style={{ ['--ic' as string]: ind.color }}
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[color:var(--ic)] transition-transform duration-500 group-hover:scale-x-100" />
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--ic)_12%,transparent)] text-[color:var(--ic)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--ic)] group-hover:text-white">
                  <ind.icon size={28} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-navy">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">{ind.text}</p>
              </div>
            </Reveal>
          ))}
          {/* CTA tile */}
          <Reveal direction="up" delay={0.2}>
            <a href="#contact" className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-royal p-7 text-white shadow-card">
              <div className="absolute inset-0 grid-lines opacity-20" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-cyan/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="relative font-display text-xl font-bold">Don't see your industry?</h3>
              <p className="relative mt-2 text-sm text-white/70">We adapt fast. Let's talk about your unique challenge.</p>
              <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan">
                Start a conversation →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
