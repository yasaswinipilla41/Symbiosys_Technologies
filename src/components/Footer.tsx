import Logo from './Logo';

const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
  { label: 'CSR', href: '#csr' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Engineering Services',
  'Animation & VFX',
  'Geospatial Services',
  'Testing Services',
  'Publishing Services',
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-void pb-10 pt-16">
      <div className="container-x">
        <div className="rule" />

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="inline-flex items-center rounded-lg bg-white px-3 py-2">
              <Logo className="h-8" />
            </span>
            <p className="mt-6 max-w-sm font-extralight leading-relaxed text-muted">
              A multi-vertical company specializing in IT, IT-enabled services, engineering services
              and 2D/3D animation &amp; VFX.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="text-[12px] uppercase tracking-[0.14em] text-muted">Navigate</span>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="font-extralight text-white/80 transition-colors hover:text-spark">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="text-[12px] uppercase tracking-[0.14em] text-muted">Services</span>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="font-extralight text-white/80 transition-colors hover:text-spark">{s}</a>
                </li>
              ))}
            </ul>
            <a href="mailto:info@symbiosystech.com" className="mt-6 inline-block font-extralight text-white transition-colors hover:text-spark">
              info@symbiosystech.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-muted sm:flex-row sm:items-center">
          <p>© {year} Symbiosys Technologies. All rights reserved.</p>
          <p className="uppercase tracking-[0.14em]">Visakhapatnam, India · United States</p>
        </div>
      </div>
    </footer>
  );
}
