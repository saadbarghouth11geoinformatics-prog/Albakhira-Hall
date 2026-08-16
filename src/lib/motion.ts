import { Variants, Transition } from 'motion/react';

/**
 * Al Bakhera Wedding Hall - Unified Motion System
 * Inspired by luxury presentation transitions: smooth, majestic, and non-cluttered.
 */

// Luxury Easing Curves
export const EASING = {
  luxury: [0.22, 1, 0.36, 1] as const, // Smooth royal ease-out
  cinematic: [0.16, 1, 0.3, 1] as const, // Slow-settle cinematic entrance
  gentle: [0.25, 0.1, 0.25, 1] as const, // Gentle floating ease
  sharp: [0.4, 0, 0.2, 1] as const, // Crisp UI interactions (hover, clicks)
};

// Standard Duration Scales (in seconds)
export const DURATION = {
  fast: 0.25, // 250ms - hover, small badges, toggles
  standard: 0.45, // 450ms - cards, lists, normal element entrances
  slow: 0.65, // 650ms - larger section containers, banners
  cinematic: 0.95, // 950ms - hero titles, mask reveals, big showcases
  slowZoom: 7.0, // Ambient slow zoom background effect
};

// Viewport trigger settings for presentation slides
export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.22,
};

// Standard Transitions
export const TRANSITIONS: Record<string, Transition> = {
  fast: {
    duration: DURATION.fast,
    ease: EASING.sharp,
  },
  standard: {
    duration: DURATION.standard,
    ease: EASING.luxury,
  },
  cinematic: {
    duration: DURATION.cinematic,
    ease: EASING.cinematic,
  },
  springLight: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
  },
};

// 1. Text & Heading Reveal Variants (Masked / Soft Rise)
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.standard,
      delay,
      ease: EASING.luxury,
    },
  }),
};

export const heroTitleRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.cinematic,
      ease: EASING.cinematic,
    },
  },
};

// 2. Alternating Section Entrances (Right & Left)
export const slideFromRightVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.luxury,
    },
  },
};

export const slideFromLeftVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.luxury,
    },
  },
};

// 3. Staggered Container & Child Card Variants
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerCardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.standard,
      ease: EASING.luxury,
    },
  },
};

// 4. Gold Accent Line Expansion
export const goldLineExpandVariant: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: (delay: number = 0.2) => ({
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      delay,
      ease: EASING.luxury,
    },
  }),
};

// 5. Image Reveal & Subtle Hover Zoom
export const imageMaskRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(10% 0% 10% 0% round 16px)',
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0% round 16px)',
    scale: 1,
    transition: {
      duration: DURATION.cinematic,
      ease: EASING.cinematic,
    },
  },
};

// 6. Page Transition Variants (Between Routes)
export const pageRouteTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.standard,
      ease: EASING.luxury,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: {
      duration: DURATION.fast,
      ease: EASING.sharp,
    },
  },
};

// 7. Lightbox Backdrop & Image Zoom Transition
export const lightboxBackdropVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.fast, ease: EASING.sharp },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASING.sharp },
  },
};

export const lightboxImageVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION.standard,
      ease: EASING.luxury,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: -15,
    transition: {
      duration: DURATION.fast,
      ease: EASING.sharp,
    },
  },
};
