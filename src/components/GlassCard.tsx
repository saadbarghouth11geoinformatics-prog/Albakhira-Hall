import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export type GlassCardVariant = 'luxury' | 'gold' | 'cyan' | 'dark' | 'deep' | 'minimal';
export type SlideDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';
export type HoverEffect = 'lift' | 'glow' | 'scale' | 'subtle' | 'none';

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'direction'> {
  children: React.ReactNode;
  variant?: GlassCardVariant;
  direction?: SlideDirection;
  distance?: number;
  delay?: number;
  duration?: number;
  hoverEffect?: HoverEffect;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
  glow?: boolean;
  borderAccent?: boolean;
}

const VARIANT_STYLES: Record<GlassCardVariant, string> = {
  luxury:
    'bg-[var(--color-warm-white)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:border-[var(--color-champagne-500)]',
  gold:
    'bg-[var(--color-warm-white)] border border-[var(--color-champagne-500)] shadow-[var(--shadow-sm)] hover:border-[var(--color-champagne-700)]',
  cyan:
    'bg-[var(--color-warm-white)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:border-[var(--color-champagne-500)]',
  dark:
    'bg-[var(--color-soft-beige)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:border-[var(--color-champagne-500)]',
  deep:
    'bg-[var(--color-warm-white)] border border-[var(--color-border)] shadow-[var(--shadow-md)]',
  minimal:
    'bg-[var(--color-ivory)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:border-[var(--color-champagne-500)]',
};

const HOVER_EFFECTS: Record<HoverEffect, any> = {
  lift: {
    y: -6,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  glow: {
    y: -3,
    boxShadow: 'var(--shadow-md)',
    transition: { duration: 0.3 },
  },
  scale: {
    scale: 1.03,
    transition: { duration: 0.3 },
  },
  subtle: {
    y: -2,
    transition: { duration: 0.2 },
  },
  none: {},
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'luxury',
  direction = 'up',
  distance = 35,
  delay = 0,
  duration = 0.65,
  hoverEffect = 'lift',
  className = '',
  viewportMargin = '0px 0px 100px 0px',
  once = true,
  glow = false,
  borderAccent = false,
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, filter: 'blur(4px)' };
      case 'down':
        return { opacity: 0, y: -distance, filter: 'blur(4px)' };
      case 'left':
        return { opacity: 0, x: distance, filter: 'blur(4px)' };
      case 'right':
        return { opacity: 0, x: -distance, filter: 'blur(4px)' };
      case 'zoom':
        return { opacity: 0, scale: 0.92, filter: 'blur(4px)' };
      case 'fade':
      default:
        return { opacity: 0, filter: 'blur(4px)' };
    }
  };

  const selectedVariantClass = VARIANT_STYLES[variant] || VARIANT_STYLES.luxury;
  const hoverAnimation = HOVER_EFFECTS[hoverEffect] || HOVER_EFFECTS.lift;

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once, margin: viewportMargin, amount: 0.08 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth luxury easing
      }}
      whileHover={hoverEffect !== 'none' ? hoverAnimation : undefined}
      className={`relative rounded-2xl sm:rounded-3xl transition-colors duration-300 overflow-hidden ${selectedVariantClass} ${className}`}
      {...props}
    >
      {/* Decorative Gold Top Accent Line */}
      {borderAccent && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-champagne-500)] to-transparent pointer-events-none" />
      )}

      {/* Subtle Glass Inner Glow Layer */}
      {glow && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[var(--color-champagne-500)]/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
