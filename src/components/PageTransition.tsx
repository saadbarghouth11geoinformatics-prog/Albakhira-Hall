import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { pageRouteTransitionVariants, DURATION, EASING } from '../lib/motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`theme-page relative w-full overflow-hidden ${className}`}>
      {/* Light Gold Shimmer Beam on page load (Disabled if reduced motion is preferred) */}
      {!shouldReduceMotion && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[999] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: DURATION.slow, ease: 'easeOut' }}
        >
          {/* Diagonally Sweeping Gold Shimmer Beam */}
          <motion.div
            className="absolute inset-y-0 -left-[100%] w-[130%] bg-gradient-to-r from-transparent via-[var(--color-champagne-500)]/30 via-[var(--color-champagne-100)]/50 to-transparent skew-x-12 blur-sm"
            initial={{ x: '0%' }}
            animate={{ x: '220%' }}
            transition={{ duration: DURATION.slow, ease: EASING.luxury }}
          />

          {/* Top Gold Horizon Beam */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-champagne-100)] via-[var(--color-champagne-500)] to-transparent shadow-[0_0_15px_var(--color-champagne-500)]"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: DURATION.standard, ease: 'easeOut' }}
          />
        </motion.div>
      )}

      {/* Main Content Reveal Animation with Unified Presentation Curve */}
      <motion.div
        variants={pageRouteTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </div>
  );
};


