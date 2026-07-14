import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const quotes = [
  {
    text: 'IT specialists and technicians who have developed a niche market and an appreciation for mastering solutions to complex engineering problems, and built software solutions in profound disciplines.',
    name: 'Ramesh',
  },
  {
    text: 'Our engineers constantly keep themselves abreast with the latest trends in technology — helping Symbiosys stay one step ahead in its quest for knowledge and perfection.',
    name: 'Lohari',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="06" label="Testimonials" title={<>In their words.</>} />

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {quotes.map((q, i) => (
            <Reveal key={q.name} direction="up" delay={i * 0.1}>
              <figure className="flex h-full flex-col border-t border-line pt-8">
                <span className="font-display text-5xl leading-none text-spark">&ldquo;</span>
                <blockquote className="mt-4 font-display text-xl font-medium leading-snug text-ink md:text-2xl">
                  {q.text}
                </blockquote>
                <figcaption className="mt-8 text-sm uppercase tracking-[0.2em] text-muted">— {q.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
