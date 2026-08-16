import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown } from 'lucide-react';

interface SectionDividerProps {
  variant?: 'sparkle' | 'crown' | 'simple' | 'diamond';
  label?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'sparkle',
  label,
  className = '',
}) => {
  return (
    <div className={`relative w-full py-4 sm:py-10 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Background Subtle Gold Glow */}
      <div className="absolute w-1/3 h-8 bg-[var(--color-champagne-500)]/10 blur-xl rounded-full" />

      {/* Floating Gold-leaf Particles */}
      <motion.div
        animate={{
          y: [-3, 3, -3],
          opacity: [0.4, 0.9, 0.4],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-2 right-1/4 w-1.5 h-1.5 rounded-full bg-[var(--color-champagne-500)] shadow-[0_0_8px_var(--color-champagne-500)]"
      />
      <motion.div
        animate={{
          y: [3, -3, 3],
          opacity: [0.3, 0.8, 0.3],
          scale: [1.1, 0.8, 1.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-2 left-1/4 w-2 h-2 rounded-full bg-[var(--color-champagne-300)] shadow-[0_0_10px_var(--color-champagne-300)]"
      />
      <motion.div
        animate={{
          y: [-2, 4, -2],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-[var(--color-champagne-500)]"
      />
      <motion.div
        animate={{
          y: [4, -2, 4],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[var(--color-success)] shadow-[0_0_8px_var(--color-success)]"
      />

      {/* Left Gold Gradient Line with Scroll Draw */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 max-w-md h-[1.5px] bg-gradient-to-r from-transparent via-[var(--color-champagne-500)]/50 to-[var(--color-champagne-500)] origin-left"
      />

      {/* Center Emblem / Badge with Scroll Reveal */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="mx-4 flex items-center justify-center"
      >
        {label ? (
          <div className="px-4 py-1.5 rounded-full bg-[var(--color-navy-950)]/90 border border-[var(--color-champagne-500)]/60 text-[var(--color-champagne-300)] text-xs font-bold font-tajawal shadow-lg backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-500)] animate-pulse" />
            <span>{label}</span>
          </div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.15, rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 rounded-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/70 flex items-center justify-center text-[var(--color-champagne-500)] shadow-xl relative group pointer-events-auto"
          >
            {variant === 'crown' && <Crown className="w-4 h-4 text-[var(--color-champagne-500)]" />}
            {variant === 'sparkle' && <Sparkles className="w-4 h-4 text-[var(--color-champagne-500)] animate-pulse" />}
            {variant === 'diamond' && (
              <div className="w-2.5 h-2.5 bg-[var(--color-champagne-500)] rotate-45 shadow-[0_0_6px_var(--color-champagne-500)]" />
            )}
            {variant === 'simple' && (
              <div className="w-2 h-2 rounded-full bg-[var(--color-champagne-500)]" />
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Right Gold Gradient Line with Scroll Draw */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 max-w-md h-[1.5px] bg-gradient-to-l from-transparent via-[var(--color-champagne-500)]/50 to-[var(--color-champagne-500)] origin-right"
      />
    </div>
  );
};
