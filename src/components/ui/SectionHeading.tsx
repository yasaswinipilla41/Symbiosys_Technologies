import Reveal from './Reveal';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} mb-14`}>
      <Reveal direction="up">
        <span className={`eyebrow ${light ? 'border-white/20 bg-white/10 text-brand-cyan' : ''}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal direction="up" delay={0.05}>
        <h2 className={`heading-lg mt-5 ${light ? '!text-white' : ''}`}>{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal direction="up" delay={0.1}>
          <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-white/70' : 'text-navy/60'}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
