import { useState, type FormEvent } from 'react';
import { FaLinkedinIn, FaXTwitter, FaGithub, FaInstagram } from 'react-icons/fa6';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import Logo from './Logo';

const quickLinks = ['About', 'Portfolio', 'Industries', 'Careers', 'Process', 'Contact'];
const serviceLinks = ['AI Solutions', 'Cloud Services', 'Data Analytics', 'App Development', 'Staffing', 'UI/UX Design'];
const socials = [
  { icon: FaLinkedinIn, label: 'LinkedIn' },
  { icon: FaXTwitter, label: 'X' },
  { icon: FaGithub, label: 'GitHub' },
  { icon: FaInstagram, label: 'Instagram' },
];

export default function Footer() {
  const [done, setDone] = useState(false);
  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => setDone(false), 3500);
  };

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-cyan/10 blur-[120px]" />

      <div className="container-x relative pt-20 pb-10">
        {/* Newsletter CTA */}
        <div className="glass-dark grid gap-8 rounded-[2rem] border-white/10 p-8 md:grid-cols-2 md:items-center md:p-12">
          <div>
            <h3 className="heading-lg !text-white !text-3xl md:!text-4xl">
              Stay ahead of the <span className="text-gradient">curve</span>
            </h3>
            <p className="mt-3 text-white/60">
              Insights on AI, cloud and digital transformation — straight to your inbox, monthly.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-white placeholder:text-white/40 outline-none transition-all focus:border-brand-cyan focus:ring-4 focus:ring-brand-cyan/15"
            />
            <button type="submit" className={`btn shrink-0 text-white ${done ? 'bg-brand-green' : 'btn-primary'}`}>
              {done ? (<>Subscribed <FiCheck /></>) : (<>Subscribe <FiArrowRight /></>)}
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="inline-flex items-center rounded-xl bg-white px-3.5 py-2.5 shadow-lg">
              <Logo className="h-9" />
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Transforming businesses through innovation — AI, cloud, data and enterprise solutions
              engineered for growth.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/40 hover:bg-brand-cyan/15 hover:text-brand-cyan"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="link-underline text-sm text-white/70 transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">Services</h4>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((l) => (
                <li key={l}>
                  <a href="#services" className="link-underline text-sm text-white/70 transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">Get in Touch</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>support@symbiosystech.com</li>
              <li>Visakhapatnam, India</li>
              <li>Mon–Fri, 9am–6pm IST</li>
            </ul>
            <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan hover:text-white">
              Start a project <FiArrowRight />
            </a>
          </div>
        </div>

        {/* Animated divider */}
        <div className="relative mt-14 h-px w-full overflow-hidden bg-white/10">
          <div className="animate-shimmer absolute inset-0 h-full w-1/2 bg-gradient-to-r from-transparent via-brand-cyan to-transparent" style={{ backgroundSize: '200% 100%' }} />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-white/45 md:flex-row">
          <p>© {2026} Symbiosys Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
