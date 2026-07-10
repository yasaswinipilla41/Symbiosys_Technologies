import {
  SiReact, SiAngular, SiVuedotjs, SiNodedotjs, SiPython, SiGooglecloud,
  SiDocker, SiKubernetes, SiTensorflow, SiSupabase, SiOpenjdk,
} from 'react-icons/si';
import { TbBrandAws, TbBrandAzure, TbBrandOpenai } from 'react-icons/tb';
import { FiPieChart } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const tech: { name: string; icon: IconType; color: string }[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031' },
  { name: 'Vue', icon: SiVuedotjs, color: '#42B883' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Java', icon: SiOpenjdk, color: '#F58220' },
  { name: 'AWS', icon: TbBrandAws, color: '#FF9900' },
  { name: 'Azure', icon: TbBrandAzure, color: '#0A84D4' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
  { name: 'Power BI', icon: FiPieChart, color: '#F2C811' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'OpenAI', icon: TbBrandOpenai, color: '#10A37F' },
  { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
];

export default function Technologies() {
  return (
    <section id="technologies" className="relative overflow-hidden bg-white py-28">
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-brand-green/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Stack"
          title={<>Technologies we <span className="text-gradient">master</span></>}
          subtitle="We choose the right tool for every job — modern, proven, and battle-tested across hundreds of deployments."
        />
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {tech.map((t, i) => (
            <Reveal key={t.name} direction="scale" delay={(i % 5) * 0.05}>
              <div
                className="group relative flex flex-col items-center gap-3 rounded-3xl border border-navy/5 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card"
                style={{ ['--tc' as string]: t.color, animation: `floaty ${5 + (i % 4)}s ease-in-out ${i * 0.2}s infinite` }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[color:var(--tc)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-25" />
                <t.icon className="relative text-4xl text-navy/60 transition-all duration-500 group-hover:scale-125 group-hover:text-[color:var(--tc)]" />
                <span className="relative text-sm font-semibold text-navy/70 transition-colors group-hover:text-navy">
                  {t.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
