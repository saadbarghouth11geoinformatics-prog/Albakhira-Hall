import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-black/10 z-[9999] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-l from-[var(--color-champagne-100)] via-[var(--color-champagne-500)] to-[var(--color-champagne-700)] origin-right shadow-[0_0_8px_rgba(212,175,55,0.65)] relative"
        style={{ scaleX }}
      />
    </div>
  );
};
