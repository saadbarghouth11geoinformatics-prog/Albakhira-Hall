import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Camera, Sparkle, Layers, Award } from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

export const ParallaxImageBanner: React.FC<{
  imageUrl?: string;
  title?: string;
  subtitle?: string;
}> = ({
  imageUrl = '/Videos/posters/hall-tour.jpg',
  title = 'فخامة التفاصيل في كل زاوية من قاعة الباخرة',
  subtitle = 'تجربة مرئية سينمائية تحاكي واقع ليالي العمر بجدة - الحرازات',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth background parallax scroll translation
  const bgY = useTransform(scrollYProgress, [0, 1], ['-25%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.2, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[460px] overflow-hidden my-12 border-y-2 border-[var(--color-champagne-500)]/50 shadow-2xl flex items-center justify-center text-center"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 w-full h-[140%] -mt-[20%] pointer-events-none select-none z-0"
      >
        <img
          loading="eager"
          decoding="async"
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover filter brightness-90 contrast-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/Videos/posters/hall-tour.jpg';
          }}
        />
        {/* Luxury Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/65 to-[var(--color-navy-950)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-950)]/90 via-transparent to-[var(--color-navy-950)]/90" />
      </motion.div>

      {/* Floating Animated Particles / Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-[var(--color-champagne-500)]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[var(--color-navy-700)]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content Overlay */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-navy-950)]/80 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/60 backdrop-blur-md mb-4 shadow-xl">
          <Sparkles className="w-4 h-4 text-[var(--color-champagne-500)]" />
          <span>تأثير Parallax المباشر (تصفح سينمائي تفاعلي)</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-tajawal text-white gold-text mb-4 leading-snug drop-shadow-2xl">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-[var(--color-navy-100)] font-cairo max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-8">
          {subtitle}
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto font-cairo">
          <div className="bg-[var(--color-navy-950)]/85 border border-[var(--color-champagne-500)]/30 p-3 rounded-2xl backdrop-blur-md">
            <Camera className="w-5 h-5 text-[var(--color-champagne-500)] mx-auto mb-1" />
            <div className="text-xs font-bold text-white font-tajawal">جودة تصوير HD</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">تغطيات حية للمواسم</div>
          </div>

          <div className="bg-[var(--color-navy-950)]/85 border border-[var(--color-champagne-500)]/30 p-3 rounded-2xl backdrop-blur-md">
            <Sparkle className="w-5 h-5 text-[var(--color-champagne-500)] mx-auto mb-1" />
            <div className="text-xs font-bold text-white font-tajawal">الكوشة والتصميم</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">تأثيرات ضوئية فاخرة</div>
          </div>

          <div className="bg-[var(--color-navy-950)]/85 border border-[var(--color-champagne-500)]/30 p-3 rounded-2xl backdrop-blur-md">
            <Layers className="w-5 h-5 text-[var(--color-champagne-500)] mx-auto mb-1" />
            <div className="text-xs font-bold text-white font-tajawal">عمق بصري ثلاثي</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">انسيابية الحركة 60fps</div>
          </div>

          <div className="bg-[var(--color-navy-950)]/85 border border-[var(--color-champagne-500)]/30 p-3 rounded-2xl backdrop-blur-md">
            <Award className="w-5 h-5 text-[var(--color-champagne-500)] mx-auto mb-1" />
            <div className="text-xs font-bold text-white font-tajawal">عقود موثقة</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">100% ضمان الجودة</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
