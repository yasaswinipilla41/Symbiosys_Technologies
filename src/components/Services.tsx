import { useRef, type MouseEvent } from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import {
  FiCpu, FiActivity, FiCloud, FiLayers, FiUsers, FiGrid,
  FiBarChart2, FiRefreshCw, FiPenTool, FiSmartphone,
} from 'react-icons/fi';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const services = [
  { icon: FiCpu, title: 'AI Solutions', text: 'Custom AI copilots, agents and automation that put intelligence at the core of your workflows.', color: '#00B5E2' },
  { icon: FiActivity, title: 'Machine Learning', text: 'Predictive models, computer vision and NLP engineered for production reliability.', color: '#7BC043' },
  { icon: FiCloud, title: 'Cloud Services', text: 'Cloud migration, DevOps and platform engineering on AWS, Azure and GCP.', color: '#0A4D80' },
  { icon: FiLayers, title: 'Application Development', text: 'Robust, scalable web and enterprise applications built for performance.', color: '#F58220' },
  { icon: FiUsers, title: 'Staffing Solutions', text: 'On-demand, vetted engineering talent that scales your teams the moment you need it.', color: '#FFC107' },
  { icon: FiGrid, title: 'Enterprise Solutions', text: 'ERP, CRM and integration platforms that unify your operations end to end.', color: '#00B5E2' },
  { icon: FiBarChart2, title: 'Data Analytics', text: 'Real-time dashboards and data pipelines that turn raw data into decisions.', color: '#7BC043' },
  { icon: FiRefreshCw, title: 'Digital Transformation', text: 'Reimagine processes, culture and technology for a modern, resilient enterprise.', color: '#F58220' },
  { icon: FiPenTool, title: 'UI/UX Design', text: 'Human-centered product design that feels effortless and looks unforgettable.', color: '#0A4D80' },
  { icon: FiSmartphone, title: 'Mobile Development', text: 'Native and cross-platform apps delivering delightful experiences on every device.', color: '#FFC107' },
];

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 8}deg) rotateX(${(0.5 - py) * 8}deg) translateY(-6px)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <Reveal direction="up" delay={(i % 3) * 0.06}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="border-glow group relative h-full overflow-hidden rounded-3xl border border-navy/5 bg-white p-7 shadow-soft transition-[box-shadow,transform] duration-300 hover:shadow-card"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* cursor glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(300px circle at var(--mx,50%) var(--my,50%), ${s.color}18, transparent 60%)` }}
        />
        <div className="relative">
          <div
            className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`, boxShadow: `0 12px 30px -8px ${s.color}88` }}
          >
            <s.icon size={26} />
          </div>
          <h3 className="mt-6 font-display text-xl font-bold text-navy">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-navy/60">{s.text}</p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-brand-cyan"
          >
            Learn More
            <HiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-white via-[#f4f8fc] to-white py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-cyan/5 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="What We Do"
          title={<>Services engineered for <span className="text-gradient">what's next</span></>}
          subtitle="A full-spectrum technology partner — from intelligent systems and cloud platforms to design, data and talent."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
