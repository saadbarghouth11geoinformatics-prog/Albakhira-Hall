import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface ScrollCountUpProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export const ScrollCountUp: React.FC<ScrollCountUpProps> = ({
  end,
  start = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}) => {
  const [count, setCount] = useState<number>(start);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth cubic ease-out calculation
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);
      
      const currentVal = start + (end - start) * easedProgress;
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, end, start, duration]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('ar-EG');

  return (
    <span ref={ref} className={`inline-block font-mono tracking-tight ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};
