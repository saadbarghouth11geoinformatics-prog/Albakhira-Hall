import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollParallaxDecorProps {
  speed?: number; // -1 to 1: positive moves down slower, negative moves up
  variant?: 'gold-sparkles' | 'nile-drift' | 'geometric-luxury' | 'ambient-glow';
  className?: string;
}

export const ScrollParallaxDecor: React.FC<ScrollParallaxDecorProps> = ({
  speed = 0.2,
  variant = 'gold-sparkles',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yOffset1 = useTransform(scrollYProgress, [0, 1], [-30 * speed, 50 * speed]);
  const yOffset2 = useTransform(scrollYProgress, [0, 1], [40 * speed, -40 * speed]);
  const yOffset3 = useTransform(scrollYProgress, [0, 1], [-20 * speed, 60 * speed]);
  const rotateOffset = useTransform(scrollYProgress, [0, 1], [0, 45 * speed]);
  const opacityOffset = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {variant === 'gold-sparkles' && (
        <>
          {/* Top-Right Floating Gold Sparkle Ring */}
          <motion.div
            style={{ y: yOffset1, rotate: rotateOffset, opacity: opacityOffset }}
            className="absolute top-12 right-[8%] w-16 h-16 rounded-full border border-[var(--color-champagne-500)]/20 flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--color-champagne-500)] shadow-[0_0_12px_var(--color-champagne-500)]" />
          </motion.div>

          {/* Mid-Left Floating Diamond Accent */}
          <motion.div
            style={{ y: yOffset2, rotate: rotateOffset }}
            className="absolute top-1/2 left-[5%] w-8 h-8 rounded-lg border border-[var(--color-champagne-500)]/30 rotate-45 flex items-center justify-center bg-[var(--color-champagne-500)]/5"
          >
            <div className="w-1.5 h-1.5 bg-[var(--color-champagne-300)] rounded-full shadow-[0_0_8px_var(--color-champagne-300)]" />
          </motion.div>

          {/* Bottom-Right Subtle Glow Orb */}
          <motion.div
            style={{ y: yOffset3 }}
            className="absolute bottom-16 right-[15%] w-32 h-32 rounded-full bg-radial from-[var(--color-champagne-500)]/8 via-[var(--color-champagne-500)]/2 to-transparent blur-2xl"
          />
        </>
      )}

      {variant === 'nile-drift' && (
        <>
          {/* Subtle Turquoise / Nile River Glowing Orb drifting on scroll */}
          <motion.div
            style={{ y: yOffset2 }}
            className="absolute top-1/4 right-[12%] w-48 h-48 rounded-full bg-radial from-[var(--color-success)]/10 via-[var(--color-navy-700)]/5 to-transparent blur-3xl"
          />
          <motion.div
            style={{ y: yOffset1, rotate: rotateOffset }}
            className="absolute bottom-1/3 left-[10%] w-20 h-20 rounded-full border border-[var(--color-success)]/20 border-dashed"
          />
        </>
      )}

      {variant === 'geometric-luxury' && (
        <>
          <motion.div
            style={{ y: yOffset1, rotate: rotateOffset }}
            className="absolute top-10 left-[8%] w-12 h-12 border border-[var(--color-champagne-500)]/25 rotate-12 rounded-xl"
          />
          <motion.div
            style={{ y: yOffset2 }}
            className="absolute bottom-10 right-[10%] w-10 h-10 border border-[var(--color-champagne-300)]/20 -rotate-12 rounded-lg"
          />
          <motion.div
            style={{ y: yOffset3 }}
            className="absolute top-2/3 left-[20%] w-40 h-40 bg-radial from-[var(--color-champagne-500)]/6 to-transparent blur-2xl rounded-full"
          />
        </>
      )}

      {variant === 'ambient-glow' && (
        <>
          <motion.div
            style={{ y: yOffset1 }}
            className="absolute top-1/3 right-1/4 w-64 h-64 bg-radial from-[var(--color-champagne-500)]/7 via-[var(--color-navy-900)]/10 to-transparent blur-3xl rounded-full"
          />
          <motion.div
            style={{ y: yOffset2 }}
            className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-radial from-[var(--color-success)]/5 via-transparent to-transparent blur-3xl rounded-full"
          />
        </>
      )}
    </div>
  );
};
