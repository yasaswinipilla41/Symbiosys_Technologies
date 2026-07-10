import { FiAward, FiZap, FiGlobe, FiTrendingUp, FiShield, FiClock } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const features = [
  { icon: FiAward, title: 'Experienced Team', text: 'Senior engineers and domain experts with 15+ years shipping enterprise systems.', color: '#00B5E2' },
  { icon: FiZap, title: 'Agile Development', text: 'Iterative delivery with tight feedback loops so you see value every sprint.', color: '#7BC043' },
  { icon: FiGlobe, title: 'Global Support', text: 'Follow-the-sun teams across time zones keep your products running 24/7.', color: '#F58220' },
  { icon: FiTrendingUp, title: 'Innovative Solutions', text: 'We bring emerging tech — AI, edge, automation — to real business problems.', color: '#FFC107' },
  { icon: FiShield, title: 'Security First', text: 'Security and compliance baked into every layer of design and delivery.', color: '#0A4D80' },
  { icon: FiClock, title: 'Fast Delivery', text: 'Battle-tested accelerators and pods help you ship faster without cutting corners.', color: '#00B5E2' },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-navy py-28 text-white">
      <div className="absolute inset-0 bg-mesh opacity-60" />
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-brand-cyan/20 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Why Symbiosys"
          title={<>Reasons teams choose to <span className="text-gradient">build with us</span></>}
          subtitle="We combine the rigor of an enterprise partner with the speed and creativity of a product studio."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} direction="up" delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: f.color }}
                />
                <div className="relative flex items-start gap-5">
                  <div
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}66)`, boxShadow: `0 12px 30px -10px ${f.color}` }}
                  >
                    <f.icon size={26} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{f.text}</p>
                  </div>
                </div>
                <span className="mt-6 block font-display text-5xl font-bold text-white/5 transition-colors duration-500 group-hover:text-white/10">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
