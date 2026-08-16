import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgressTopButton: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setIsVisible(latest > 0.25);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          className="hidden sm:block fixed bottom-8 right-8 z-40"
        >
          <button
            onClick={scrollToTop}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--color-warm-white)] border border-[var(--color-champagne-500)] flex items-center justify-center text-[var(--color-navy-900)] hover:bg-[var(--color-champagne-100)] transition-all duration-300 shadow-[var(--shadow-sm)] group cursor-pointer hover:scale-105 active:scale-95"
            title="العودة لأعلى الصفحة"
            aria-label="العودة لأعلى الصفحة"
          >
            {/* SVG Circular Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 100 100"
            >
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-white/10 fill-none"
                strokeWidth="5"
              />
              {/* Animated Progress Path */}
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-[var(--color-champagne-500)] fill-none"
                strokeWidth="5"
                strokeDasharray="264"
                style={{
                  pathLength,
                }}
                strokeLinecap="round"
              />
            </svg>

            <div className="relative z-10 flex items-center justify-center">
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 duration-200" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
