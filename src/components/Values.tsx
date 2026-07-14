import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const values = [
  {
    n: 'I',
    title: 'Innovation',
    text: 'Proficient artists and engineers who manifest their creative expertise for precise work on every project. We welcome new ideas and innovative ways of approaching the business.',
  },
  {
    n: 'II',
    title: 'Creativity',
    text: 'A company of storytellers. Our studio environment supports collaboration and artistry at every level, with a research team constantly setting new benchmarks of excellence.',
  },
  {
    n: 'III',
    title: 'Professionalism',
    text: 'We are constantly evaluating the quality of work being created across every discipline, challenging ourselves to raise our standards.',
  },
  {
    n: 'IV',
    title: 'Inspiration',
    text: 'A passionate and respectful work environment that inspires our people to do their best, most considered work.',
  },
];

export default function Values() {
  return (
    <section id="principles" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="How We Work"
          title={<>A few basic rules we live by.</>}
        />

        <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} direction="up" delay={(i % 2) * 0.08}>
              <div className="border-t border-line pt-7">
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-sm text-accent">{v.n}</span>
                  <h3 className="heading-lg">{v.title}</h3>
                </div>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted md:text-base">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
