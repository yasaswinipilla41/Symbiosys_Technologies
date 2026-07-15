import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const clients = [
  'AMD', 'Google', 'Reliance', 'L&T', 'Trimble', 'FIS', 'CSC', 'Technip', 'Kentz', 'Cambridge Systems', 'Black Cat',
];
const studios = [
  'Disney India', 'Prime Focus World', 'Reel FX', 'Titmouse', 'Animagrad', 'Mago Production', 'Postmodern', 'Metacube',
  'Stranemani', 'D-Stereo', 'DigitZ Film', 'Frame Breed', 'IonArt', 'Pigeon Studios',
];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden py-3">
      <div className={`flex shrink-0 items-center gap-16 pr-16 ${reverse ? 'animate-marquee [animation-direction:reverse]' : 'animate-marquee'}`}>
        {loop.map((c, i) => (
          <span key={i} className="whitespace-nowrap font-display text-3xl text-white/35 transition-colors hover:text-white md:text-5xl">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section id="clients" data-theme="dark" className="relative overflow-hidden bg-void py-24 text-white md:py-32">
      <div className="container-x relative">
        <SectionHeading
          light
          index="05"
          label="Selected Clients"
          title={<>Trusted across engineering, technology and studios.</>}
        />
      </div>

      <Reveal direction="up" className="relative mt-16">
        <div className="border-y border-white/10">
          <Row items={clients} />
        </div>
        <div className="border-b border-white/10">
          <Row items={studios} reverse />
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </Reveal>
    </section>
  );
}
