import React from 'react';
import { motion, Variants } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  distance = 35,
  className = '',
  viewportMargin = '0px 0px 120px 0px',
  once = true,
}) => {
  const getInitial = () => {
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

  return (
    <motion.div
      initial={getInitial()}
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
        ease: [0.22, 1, 0.36, 1], // Smooth luxury cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Container with Staggered children reveal
interface ScrollRevealStaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const ScrollRevealStagger: React.FC<ScrollRevealStaggerProps> = ({
  children,
  staggerDelay = 0.12,
  className = '',
  viewportMargin = '0px 0px 100px 0px',
  once = true,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin, amount: 0.08 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Child item for ScrollRevealStagger
interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  className = '',
  distance = 30,
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: distance, scale: 0.96, filter: 'blur(3px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
