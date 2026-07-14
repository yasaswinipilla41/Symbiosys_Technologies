import Reveal from './Reveal';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  index?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  /** kept for API compatibility — the whole site is now on the void */
  light?: boolean;
}

/** Section header on the void: index · spark label, sculptural white title, ultra-light lead. */
export default function SectionHeading({ index, label, title, lead, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}>
      <Reveal direction="up">
        <div className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
          {index && <span className="text-[13px] font-normal text-muted">{index}</span>}
          <span className="label label-dot">{label}</span>
        </div>
      </Reveal>
      <Reveal direction="up" delay={0.06}>
        <h2 className="heading-xl mt-7 text-balance">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal direction="up" delay={0.12}>
          <p className={`lead mt-7 ${centered ? 'mx-auto' : ''} max-w-2xl`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
