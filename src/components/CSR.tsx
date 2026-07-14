import { lazy, Suspense } from 'react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const HeroParticles = lazy(() => import('./hero/HeroParticles'));

const initiatives = [
  {
    title: 'Health Care',
    text: 'A key contributor in bringing the L. V. Prasad Eye Hospital to Visakhapatnam — recognised as one of its founders, standing as testimony to social entrepreneurship.',
  },
  {
    title: 'Eye Care Initiative',
    text: 'Several eye-screening camps conducted for citizens of Visakhapatnam and surrounding areas, including free screening for women, the elderly and children.',
  },
  {
    title: 'Community',
    text: 'Ongoing blood-donation initiatives and donations, alongside active engagement in the health and education development of the city.',
  },
];

export default function CSR() {
  return (
    <section id="csr" className="relative overflow-hidden bg-void py-24 md:py-32">
      {/* Ambient floating triangles */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Suspense fallback={null}>
          <HeroParticles density={0.22} />
        </Suspense>
      </div>
      <div className="container-x relative">
        <SectionHeading
          index="07"
          label="Corporate Social Responsibility"
          title={<>Improving the quality of life of the community.</>}
          lead="Beyond promoting the IT sector, our leadership is actively engaged in the health and education development of Visakhapatnam, working to preserve ecological balance and heritage."
        />

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {initiatives.map((it, i) => (
            <Reveal key={it.title} direction="up" delay={i * 0.08}>
              <div className="border-t border-line pt-7">
                <span className="label label-dot">0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl text-ink">{it.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
