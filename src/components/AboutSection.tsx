import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Music, Utensils, Zap, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { HALL_SPECS } from '../data/hallData';
import { ScrollCountUp } from './ScrollCountUp';
import { ScrollParallaxDecor } from './ScrollParallaxDecor';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Utensils,
      title: 'بوفيه مفتوح فضي 10 متر وتورتة من 3 أدوار',
      desc: 'معدات تقديم فندقية راقية، ومجموعة متنوعة من المأكولات والمقبلات، وطاولة بوفيه فضية فاخرة.',
    },
    {
      icon: Users,
      title: 'طاقم ضيافة متكامل رجال ونساء',
      desc: '10 مباشرات للنساء مع مشرفة الصالة، و10 مباشرين للرجال مع مسؤول تقديم القهوة.',
    },
    {
      icon: Music,
      title: 'شامل الدي جي والمؤثرات مجانًا',
      desc: 'بخار، ليزرات مزدوجة، زفة العروسة، وكشاف المسرح المباشر مشمولة مجانًا.',
    },
    {
      icon: Zap,
      title: 'عصائر طازجة وحلويات على الطاولات',
      desc: '30 لتر عصائر طازجة، 40 صحن حلا، و40 صحن معجنات على طاولات النساء مجانًا.',
    },
  ];

  const highlights = [
    'صالة للنساء فخمة ومكيفة بالكامل مع بوفيه بطول 10 أمتار.',
    'قسم رجال متكامل مع 100 فرش حوش خارجي تراثي.',
    'تأمين القهوجي والقهوة والشاي (أحمر وأخضر) بالكامل.',
    'حارس أمن متواجد عند بوابة النساء لضمان الخصوصية والراحة.',
    'عاملات متفرغات لمسك فستان العروسة أثناء الزفة.',
    'موقف واسع وسلس لسيارات الضيوف بعد محطة المدينة بـ 500 متر.',
  ];

  return (
    <section id="about" className="py-20 relative bg-[var(--color-navy-950)]/60 backdrop-blur-md overflow-hidden">
      {/* Subtle Scroll Parallax Ambient Floating Accents */}
      <ScrollParallaxDecor speed={0.2} variant="geometric-luxury" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> هويتنا الفاخرة بجدة
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tajawal gold-text mb-4">
            عن قاعة الباخرة للاحتفالات
          </h2>
          <p className="text-[var(--color-navy-100)] font-cairo text-base sm:text-lg leading-relaxed">
            جدة - الحرازات - بعد محطة المدينة بـ 500 متر | العنوان الأبرز للأفراح والمناسبات الراقية بجدة مع كافة خدمات الضيافة والبوفيه والخدمة المعتمدة.
          </p>
        </motion.div>

        {/* Live Animated Milestone Numbers on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <div className="dark-overlay-card p-4 rounded-2xl text-center bg-[var(--color-navy-900)]/80">
            <div className="flex items-baseline justify-center gap-1 text-2xl sm:text-3xl font-black gold-text font-tajawal mb-0.5">
              <span dir="ltr"><ScrollCountUp end={15} duration={1.8} />+</span><span>سنة</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[var(--color-text-muted)] font-cairo">خبرة في تنظيم أفراح جدة</span>
          </div>

          <div className="dark-overlay-card p-4 rounded-2xl text-center bg-[var(--color-navy-900)]/80">
            <div className="flex items-baseline justify-center gap-1 text-2xl sm:text-3xl font-black gold-text font-tajawal mb-0.5">
              <span dir="ltr"><ScrollCountUp end={2500} duration={2.2} />+</span><span>حفل</span>
            </div>
            <span className="text-[11px] sm:text-xs text-[var(--color-text-muted)] font-cairo">مناسبة وزفاف ناجح</span>
          </div>

          <div className="dark-overlay-card p-4 rounded-2xl text-center bg-[var(--color-navy-900)]/80">
            <div className="text-2xl sm:text-3xl font-black gold-text font-tajawal mb-0.5">
              <ScrollCountUp end={100} duration={1.5} suffix="%" />
            </div>
            <span className="text-[11px] sm:text-xs text-[var(--color-text-muted)] font-cairo">التزام بكافة بنود العقد</span>
          </div>

          <div className="dark-overlay-card p-4 rounded-2xl text-center bg-[var(--color-navy-900)]/80">
            <div className="text-2xl sm:text-3xl font-black gold-text font-tajawal mb-0.5">
              <ScrollCountUp end={400} duration={2} suffix="+" />
            </div>
            <span className="text-[11px] sm:text-xs text-[var(--color-text-muted)] font-cairo">ضيف بالسعة الاستيعابية</span>
          </div>
        </motion.div>

        {/* Feature Grid with Large Image Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Visual Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass-card border border-[var(--color-champagne-500)]/40 shadow-2xl group">
              <img
                loading="lazy"
                decoding="async"
                src="/Videos/posters/hall-tour.jpg"
                alt="داخلية قاعة الباخرة بجدة"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 right-6 left-6 text-right">
                <span className="inline-block px-3 py-1 rounded-md bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] text-xs font-bold mb-2">
                  الفخامة والخدمة المكتملة
                </span>
                <h3 className="text-2xl font-bold font-tajawal text-white mb-1">
                  صالة النساء وبوفيه الـ 10 متر الفضي
                </h3>
                <p className="text-xs text-[var(--color-navy-100)]">
                  تجهيز فندقي راقي مع الكوشة وتنسيق المداخل والحلويات المباشرة على الطاولات.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Details & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold font-tajawal text-white">
              لماذا تختار <span className="gold-text">قاعة الباخرة</span> لمناسبتك بجدة؟
            </h3>
            <p className="text-[var(--color-navy-100)] text-sm sm:text-base leading-relaxed">
              نصنع تجربة احتفالية متكاملة بضيافة سعودية رفيعة وأعلى درجات التنسيق والأمان المعتمد.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-[var(--color-navy-900)]/50 p-3 rounded-xl border border-[var(--color-champagne-500)]/20">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-champagne-500)] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[var(--color-navy-100)] font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--color-champagne-500)]/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-black gold-text font-tajawal">جدة</div>
                  <div className="text-[11px] text-[var(--color-text-muted)]">الحرازات - بعد محطة المدينة بـ 500م</div>
                </div>
                <div className="h-8 w-px bg-[var(--color-champagne-500)]/30" />
                <div className="text-center">
                  <div className="text-2xl font-black gold-text font-tajawal">0500292974</div>
                  <div className="text-[11px] text-[var(--color-text-muted)]">جوال الحجوزات والمبيعات</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars Card Grid with Motion Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, i) => {
            const Icon = item.icon;
            const directions: ('right' | 'up' | 'up' | 'left')[] = ['right', 'up', 'up', 'left'];
            return (
              <GlassCard
                key={i}
                direction={directions[i % directions.length]}
                distance={35}
                delay={i * 0.12}
                variant="luxury"
                hoverEffect="lift"
                borderAccent
                className="p-6 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center text-[var(--color-champagne-500)] mb-5 border border-[var(--color-champagne-500)]/30 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-tajawal text-white mb-2 group-hover:text-[var(--color-champagne-300)] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed font-cairo">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
