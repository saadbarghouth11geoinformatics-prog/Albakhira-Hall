import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { Sparkles, Ship, Calendar, Users, Award, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';
import { ScrollCountUp } from './ScrollCountUp';
import { ScrollParallaxDecor } from './ScrollParallaxDecor';
import { EASING, DURATION, heroTitleRevealVariant, goldLineExpandVariant, fadeUpVariant } from '../lib/motion';

interface HeroProps {
  onOpenBooking: (packageId?: string) => void;
  onOpenVideoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenVideoModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Section reference for Framer Motion Parallax tracking
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring physics for scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  // Parallax transformations for background video/image
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.9, 0.68]);

  // Parallax transformations for content & headlines
  const contentY = useTransform(smoothProgress, [0, 1], ['0px', '24px']);

  // Parallax transformations for floating luxury imagery cards (multi-layered depth)
  // Parallax transformation for stats grid
  const statsY = useTransform(smoothProgress, [0, 1], ['0px', '15px']);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-[58svh] sm:min-h-[64svh] flex items-center justify-center overflow-hidden py-7 sm:py-10 md:py-12 bg-[var(--color-ivory)] text-[var(--color-text)]">
      {/* AUTOPLAYING PARALLAX VIDEO/IMAGE BACKGROUND LAYER - CRYSTAL CLEAR */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: bgY, scale: bgScale, opacity: bgOpacity }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: DURATION.cinematic + 0.3, ease: EASING.cinematic }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none origin-center bg-[var(--color-navy-950)]"
      >
        <img
          src="/Videos/posters/hall-tour.jpg"
          alt="قاعة الباخرة للاحتفالات بجدة"
          className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          loading="eager"
          decoding="async"
        />
        <video
          poster="/Videos/posters/hall-tour.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-center filter contrast-[1.08] brightness-[0.96]"
          aria-label="جولة قصيرة داخل قاعة الباخرة بجدة"
        >
          <source src="/Videos/video_01.mp4" type="video/mp4" />
        </video>
        {/* Crisp subtle framing gradient (no foggy white veil) */}
        <div className="absolute inset-0 bg-[var(--color-navy-950)]/38 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-950)]/55 via-transparent to-[var(--color-navy-950)]/72 pointer-events-none" />
      </motion.div>

      {/* Subtle Scroll Parallax Ambient Decor */}
      <ScrollParallaxDecor speed={0.25} variant="gold-sparkles" />

      {/* Hero Content Wrapper with Presentation Reveal */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Floating Luxury Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.standard, delay: 0.15, ease: EASING.luxury }}
          className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-2 rounded-full glass-card border border-[var(--color-champagne-300)] shadow-[var(--shadow-sm)] mb-3 sm:mb-6"
        >
          <Ship className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
          <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[var(--color-navy-900)]">
            جدة - الحرازات (بعد محطة المدينة بـ 500 متر)
          </span>
          <Sparkles className="w-3 h-3 text-[var(--color-champagne-500)]" />
        </motion.div>

        {/* Hero Headline & Subtitle Container - Completely Transparent */}
        <div className="relative max-w-5xl mb-6 p-2 sm:p-4 text-center">
          {/* Main Royal Heading with Presentation Mask Reveal */}
          <motion.div
            variants={heroTitleRevealVariant}
            initial="hidden"
            animate="visible"
            className="relative max-w-5xl mb-3 sm:mb-5"
          >
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-black font-tajawal tracking-tight text-white leading-tight text-shadow-strong">
              أفراح ومناسبات ملكية فاخرة بـ <br className="hidden md:block" />
              <span className="gold-text">قاعة الباخرة للاحتفالات بجدة</span>
            </h1>

            {/* Animated Gold Line Reveal below title */}
            <motion.div
              variants={goldLineExpandVariant}
              custom={0.35}
              initial="hidden"
              animate="visible"
              className="w-36 sm:w-64 h-[2px] mx-auto mt-3 sm:mt-4 bg-[var(--color-champagne-500)] shadow-sm"
            />
          </motion.div>

          {/* Descriptive Subtitle */}
          <motion.p
            variants={fadeUpVariant}
            custom={0.4}
            initial="hidden"
            animate="visible"
            className="text-xs sm:text-lg md:text-xl text-white/90 font-cairo max-w-3xl mx-auto mb-5 sm:mb-7 leading-relaxed font-bold text-shadow-strong"
          >
            احجز حفل زفافك أو مناسبتك الشاملة في <strong className="text-[var(--color-champagne-700)] bg-[var(--color-champagne-500)]/15 px-2.5 py-0.5 rounded-md border border-[var(--color-champagne-500)]/40 font-black">أفخم قاعات الحرازات بجدة</strong>، مع بوفيه مفتوح بطول 10 أمتار، تورتة من 3 أدوار، وقسم رجال متكامل.
          </motion.p>

          {/* Action Button */}
          <motion.div
            variants={fadeUpVariant}
            custom={0.55}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center w-full sm:w-auto"
          >
            <button
              onClick={() => onOpenBooking('midweek-deal')}
              className="btn-on-dark w-full sm:w-auto font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group hover:-translate-y-0.5 active:scale-95 shadow-xl"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>احجز حفل زفافك أو مناسبتك</span>
            </button>
          </motion.div>
        </div>

        {/* Key Feature Stats Grid with Parallax Motion */}
        <motion.div
          style={shouldReduceMotion ? {} : { y: statsY }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mt-2"
        >
          <div className="glass-card p-4 md:p-6 rounded-2xl text-center border border-[var(--color-champagne-500)]/30 backdrop-blur-md hover:border-[var(--color-champagne-500)] transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center mb-3 text-[var(--color-champagne-500)]">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-black font-tajawal text-[var(--color-navy-950)] mb-1 flex items-center justify-center gap-1">
              <ScrollCountUp end={40} duration={1.8} />
              <span>طاولة نساء</span>
            </div>
            <div className="text-xs md:text-sm text-[var(--color-text-muted)]">صالة النساء المكيفة</div>
          </div>

          <div className="glass-card p-4 md:p-6 rounded-2xl text-center border border-[var(--color-champagne-500)]/30 backdrop-blur-md hover:border-[var(--color-champagne-500)] transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center mb-3 text-[var(--color-champagne-500)]">
              <Ship className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-black font-tajawal text-[var(--color-navy-950)] mb-1 flex items-center justify-center gap-1">
              <ScrollCountUp end={100} duration={2} />
              <span>فرش حوش</span>
            </div>
            <div className="text-xs md:text-sm text-[var(--color-text-muted)]">قسم الرجال الخارجي</div>
          </div>

          <div className="glass-card p-4 md:p-6 rounded-2xl text-center border border-[var(--color-champagne-500)]/30 backdrop-blur-md hover:border-[var(--color-champagne-500)] transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center mb-3 text-[var(--color-champagne-500)]">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-black font-tajawal text-[var(--color-navy-950)] mb-1 flex items-center justify-center gap-1">
              <ScrollCountUp end={10} duration={1.5} />
              <span>متر بوفيه</span>
            </div>
            <div className="text-xs md:text-sm text-[var(--color-text-muted)]">بوفيه فضي + تورتة من 3 أدوار</div>
          </div>

          <div className="glass-card p-4 md:p-6 rounded-2xl text-center border border-[var(--color-champagne-500)]/30 backdrop-blur-md hover:border-[var(--color-champagne-500)] transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center mb-3 text-[var(--color-champagne-500)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-black font-tajawal text-[var(--color-navy-950)] mb-1 flex items-center justify-center gap-1">
              <span>شامل</span>
            </div>
            <div className="text-xs md:text-sm text-[var(--color-text-muted)]">خدمات وتجهيزات متكاملة</div>
          </div>
        </motion.div>

        {/* Location Sub-banner */}
        <div className="mt-8 flex items-center gap-2 text-xs md:text-sm text-[var(--color-text-secondary)]">
          <MapPin className="w-4 h-4 text-[var(--color-champagne-500)]" />
          <span>{HALL_SPECS.locationAr}</span>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="mt-12 text-[var(--color-champagne-500)] hover:text-[var(--color-champagne-300)] transition-colors flex flex-col items-center gap-1 text-xs cursor-pointer group"
        >
          <span>استكشف تفاصيل القاعة والعروض</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[var(--color-champagne-500)] group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};
