import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';

const categories = [
  'Engineering Services',
  'Animation & VFX',
  'Geospatial Services',
  'Testing Services',
  'Publishing Services',
  'Project Management',
];

const details = [
  { label: 'Business Enquiries', value: 'info@symbiosystech.com', href: 'mailto:info@symbiosystech.com' },
  { label: 'IT-Enabled Services', value: 'ites@symbiosystech.com', href: 'mailto:ites@symbiosystech.com' },
  { label: 'Call', value: '+91 891-2550369', href: 'tel:+918912550369' },
  { label: 'Offices', value: 'Visakhapatnam, India · United States', href: undefined },
];

function Field({ label, name, type = 'text', textarea = false }: { label: string; name: string; type?: string; textarea?: boolean }) {
  return (
    <label className="block border-b border-white/10 py-4 transition-colors focus-within:border-accent">
      <span className="mb-2 block text-[12px] uppercase tracking-[0.14em] text-muted">{label}</span>
      {textarea ? (
        <textarea name={name} rows={3} required className="w-full resize-none bg-transparent font-extralight text-white outline-none placeholder:text-white/25" placeholder="Tell us about your project" />
      ) : (
        <input name={name} type={type} required className="w-full bg-transparent font-extralight text-white outline-none placeholder:text-white/25" placeholder=" " />
      )}
    </label>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative bg-void py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <Reveal direction="up">
              <span className="label label-dot">Get in touch</span>
            </Reveal>
            <Reveal direction="up" delay={0.06}>
              <h2 className="heading-xl mt-7">Want to talk?</h2>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p className="lead mt-7 max-w-md">
                We provide high-quality services and solutions to our clients worldwide. Tell us what
                you&rsquo;re building.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.16}>
              <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                {details.map((d) => (
                  <div key={d.label} className="border-t border-white/10 pt-4">
                    <dt className="text-[12px] uppercase tracking-[0.14em] text-muted">{d.label}</dt>
                    <dd className="mt-2 font-extralight text-white">
                      {d.href ? (
                        <a href={d.href} className="transition-colors hover:text-spark">{d.value}</a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.1}>
            <form onSubmit={onSubmit} className="flex h-full flex-col">
              <div className="grid gap-x-8 sm:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
              </div>
              <label className="block border-b border-white/10 py-4">
                <span className="mb-2 block text-[12px] uppercase tracking-[0.14em] text-muted">Category</span>
                <select name="category" className="w-full bg-transparent font-extralight text-white outline-none [&>option]:text-black">
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <Field label="Subject" name="subject" />
              <Field label="Message" name="message" textarea />

              <button type="submit" className="btn-solid mt-8 self-start">
                {sent ? 'Message sent ✓' : 'Send message'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-white/10"
      />
    </section>
  );
}
