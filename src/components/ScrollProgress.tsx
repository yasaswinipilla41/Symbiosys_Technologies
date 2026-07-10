import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg,#0A4D80,#00B5E2,#7BC043,#FFC107,#F58220)',
      }}
    />
  );
}
