import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const strategy = [
  'High-quality, low-risk solutions to complex problems, so clients can focus on their core business.',
  'Onsite, offsite and offshore project-execution methodologies tailored to each requirement.',
  'Products and deliverables aimed squarely at customer satisfaction.',
  'Stringent timelines maintained through every deployment.',
  'Effective, efficient after-sales support and service.',
];

export default function About() {
  return (
    <section id="about" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="About Us"
          title={<>High-quality technology &amp; creative solutions for clients worldwide.</>}
        />

        <div className="mt-16 grid gap-14 md:grid-cols-12">
          <Reveal direction="up" className="md:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:text-xl">
              <p>
                The development center for Symbiosys Technologies is located in India, with offices in
                the United States. The company builds innovative, cost-effective, end-to-end technology
                solutions with high performance and security.
              </p>
              <p className="text-muted">
                Since our inception, we have been committed to delivering excellent results — catering
                to each client&rsquo;s requirements with the highest quality of offshore development
                services across a range of platforms. As results-oriented problem solvers, we thrive on
                meeting client requirements on a priority basis.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1} className="md:col-span-5">
            <div className="border-t border-line pt-6">
              <span className="label label-dot">Business Strategy &amp; Approach</span>
              <ul className="mt-6 divide-y divide-line">
                {strategy.map((s, i) => (
                  <li key={i} className="flex gap-5 py-4">
                    <span className="font-display text-sm text-muted-light">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[15px] leading-relaxed text-ink-soft">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Workforce statement */}
        <Reveal direction="up" delay={0.1}>
          <div className="mt-20 border-t border-line pt-10">
            <div className="grid gap-8 md:grid-cols-12 md:items-baseline">
              <span className="label label-dot md:col-span-3">The Workforce</span>
              <p className="heading-lg md:col-span-9">
                A team of highly trained engineers, IT specialists and technicians with a niche
                appreciation for mastering solutions to{' '}
                <span className="text-muted-light">complex engineering problems.</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
