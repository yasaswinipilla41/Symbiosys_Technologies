import { useState, type FormEvent } from 'react';
import { FiMapPin, FiMail, FiPhone, FiSend, FiCheck } from 'react-icons/fi';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const contactCards = [
  { icon: FiMapPin, title: 'Visit Us', lines: ['Symbiosys Technologies', 'Visakhapatnam, India'], color: '#00B5E2' },
  { icon: FiMail, title: 'Email Us', lines: ['support@symbiosystech.com'], color: '#7BC043' },
  { icon: FiPhone, title: 'Call Us', lines: ['Mon–Fri, 9am–6pm IST'], color: '#F58220' },
];

function Field({ label, type = 'text', name, textarea = false }: { label: string; type?: string; name: string; textarea?: boolean }) {
  return (
    <div className="group relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder=" "
          required
          className="peer w-full resize-none rounded-2xl border border-navy/10 bg-white px-4 pt-6 pb-2 text-navy outline-none transition-all duration-300 focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/15"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder=" "
          required
          className="peer w-full rounded-2xl border border-navy/10 bg-white px-4 pt-6 pb-2 text-navy outline-none transition-all duration-300 focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/15"
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-4 text-navy/45 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-cyan peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
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
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-[#eef4f9] to-white py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand-cyan/10 blur-[130px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Get in Touch"
          title={<>Let's build something <span className="text-gradient">remarkable</span></>}
          subtitle="Tell us about your goals and we'll get back within one business day."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info + floating cards + map */}
          <div className="space-y-5 lg:col-span-2">
            {contactCards.map((c, i) => (
              <Reveal key={c.title} direction="right" delay={i * 0.08}>
                <div
                  className="group flex items-center gap-4 rounded-3xl border border-navy/5 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
                  style={{ ['--cc' as string]: c.color }}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--cc)_14%,transparent)] text-[color:var(--cc)] transition-transform duration-500 group-hover:scale-110">
                    <c.icon size={22} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-navy">{c.title}</div>
                    {c.lines.map((l) => (
                      <div key={l} className="text-sm text-navy/60">{l}</div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal direction="right" delay={0.24}>
              <div className="overflow-hidden rounded-3xl border border-navy/5 shadow-soft">
                <iframe
                  title="Symbiosys Technologies location"
                  src="https://www.google.com/maps?q=Visakhapatnam&output=embed"
                  className="h-56 w-full grayscale-[0.2]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal direction="left" className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-cyan/10 blur-3xl" />
              <div className="relative grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" name="name" />
                <Field label="Email Address" name="email" type="email" />
                <div className="sm:col-span-2">
                  <Field label="Company" name="company" />
                </div>
                <div className="sm:col-span-2">
                  <Field label="How can we help?" name="message" textarea />
                </div>
              </div>
              <button
                type="submit"
                disabled={sent}
                className={`btn mt-6 w-full text-white transition-all ${sent ? 'bg-brand-green' : 'btn-primary'}`}
              >
                {sent ? (
                  <>Message sent <FiCheck /></>
                ) : (
                  <>Send Message <FiSend className="transition-transform duration-300 group-hover:translate-x-1" /></>
                )}
              </button>
              <p className="relative mt-4 text-center text-xs text-navy/45">
                By submitting you agree to our privacy policy. We never share your data.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
