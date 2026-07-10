import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: 'div' | 'span' | 'li' | 'section';
}

const offset = 40;
const variants: Record<Direction, { hidden: Record<string, number | string>; show: Record<string, number | string> }> = {
  up: { hidden: { opacity: 0, y: offset }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -offset }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: offset }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -offset }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(14px)', y: 24 }, show: { opacity: 1, filter: 'blur(0px)', y: 0 } },
};

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25 }}
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
