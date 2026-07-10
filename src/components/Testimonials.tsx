import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { FaQuoteRight } from 'react-icons/fa6';
import SectionHeading from './ui/SectionHeading';

const testimonials = [
  {
    quote: "Symbiosys felt less like a vendor and more like our own engineering team. They shipped our AI platform months ahead of plan.",
    name: 'Elena Vasquez', role: 'VP Engineering, FinServe Global', initials: 'EV', color: '#00B5E2',
  },
  {
    quote: "Their cloud migration was flawless — zero downtime across 140 workloads. The rigor and communication were exceptional.",
    name: 'Daniel Osei', role: 'CTO, AtlasLogistics', initials: 'DO', color: '#7BC043',
  },
  {
    quote: "The design and data teams transformed how our customers experience the product. Engagement is up 3x since launch.",
    name: 'Priya Nair', role: 'Chief Product Officer, RetailPulse', initials: 'PN', color: '#F58220',
  },
  {
    quote: "From staffing to delivery, Symbiosys scaled with us at every stage. Genuinely a symbiotic partnership.",
    name: 'Marcus Bauer', role: 'Founder, EduSphere', initials: 'MB', color: '#0A4D80',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-navy py-28 text-white">
      <div className="absolute inset-0 bg-mesh opacity-50" />
      <div className="pointer-events-none absolute right-1/4 top-10 h-80 w-80 rounded-full bg-brand-cyan/15 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Testimonials"
          title={<>Trusted by leaders who <span className="text-gradient">demand results</span></>}
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-dark relative rounded-[2rem] border border-white/10 p-10 md:p-12"
              >
                <FaQuoteRight
                  className="absolute right-8 top-8 text-6xl opacity-10"
                  style={{ color: t.color }}
                />
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="block font-display text-7xl leading-none"
                  style={{ color: t.color }}
                >
                  "
                </motion.span>
                <p className="mt-2 text-xl leading-relaxed text-white/90 md:text-2xl">{t.quote}</p>
                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-full font-display text-lg font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}77)` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display font-bold">{t.name}</div>
                    <div className="text-sm text-white/60">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15"
              aria-label="Previous"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-brand-cyan' : 'w-2 bg-white/25'}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15"
              aria-label="Next"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
