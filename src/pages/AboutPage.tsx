import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { AboutSection } from '../components/AboutSection';
import { VirtualTour } from '../components/VirtualTour';
import { NileRouteMap } from '../components/NileRouteMap';
import { GrandLuxuryFeatures } from '../components/GrandLuxuryFeatures';
import { PageTransition } from '../components/PageTransition';
import { PageVideoHeader } from '../components/PageVideoHeader';
import { SectionDivider } from '../components/SectionDivider';
import { BallroomEvolutionTimeline } from '../components/pageDetails/BallroomEvolutionTimeline';
import { EventTimeline } from '../components/EventTimeline';
import {
  Sparkles,
  ShieldCheck,
  Users,
  CheckCircle2,
  Volume2,
  Heart,
  Flame,
  Radio,
  Sliders,
  Award,
  Clock
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

interface AboutPageProps {
  onOpenBooking: () => void;
}

// Reusable Reveal on Scroll Text Wrapper Component
const RevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}> = ({ children, delay = 0, className = '', yOffset = 25 }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay, ease: [0.25, 1, 0.5, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'hall' | 'men' | 'vip' | 'catering'>('hall');
  const [lightMode, setLightMode] = useState<'zaffa' | 'slow' | 'laser'>('zaffa');

  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="عن القاعة والتجهيزات | قاعة الباخرة للاحتفالات بجدة"
        description="تعرف على المواصفات والتجهيزات لقاعة الباخرة للاحتفالات بجدة (الحرازات). بوفيه مفتوح بطول 10 أمتار، تورتة من 3 أدوار، 40 طاولة ضيافة، وجلسات حوش خارجية."
        pageType="about"
      />

      {/* Top Hero Banner with Autoplay Video Background */}
      <PageVideoHeader
        driveId="1gM2sStcxmKXT1nLfRNXTOdk6h1ERk0Uv"
        driveUrl="https://drive.google.com/file/d/1gM2sStcxmKXT1nLfRNXTOdk6h1ERk0Uv/view?usp=drive_link"
        localVideoSrc="/Videos/video_08.mp4"
        localPoster="/Videos/posters/hall-tour.jpg"
        badge="جولة مرئية داخل القاعة والكوشة"
        subtitle="جدة - الحرازات - بعد محطة المدينة بـ 500 متر"
        title="تجهيزات وخدمات الاحتفالات الفاخرة بالحرازات"
        description="تعرف على مواصفات قاعة الباخرة للاحتفالات: صالة النساء الفخمة، الكوشة الملكية، ممر الزفة، قسم الرجال الخارجي والجلسات التراثية."
      />

      {/* Interactive Ambience & Lighting Mode Simulator */}
      <section className="py-14 bg-[var(--color-ivory)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <RevealText delay={0.05}>
              <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-3 shadow-md">
                <Sliders className="w-4 h-4" /> محاكي إضاءات ومؤثرات صالة النساء
              </span>
            </RevealText>

            <RevealText delay={0.12}>
              <h2 className="text-2xl sm:text-4xl font-black font-tajawal gold-text mb-2">
                جرب المؤثرات الضوئية المجانية المشمولة في العرض
              </h2>
            </RevealText>

            <RevealText delay={0.18}>
              <p className="text-xs sm:text-sm text-[var(--color-navy-100)]">
                اختر الوضع لمشاهدة تأثير زفة العروسة، البخار، الليزرات، وكشاف العروسة:
              </p>
            </RevealText>
          </div>

          {/* Simulator Control Buttons with Reveal on Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <button
              onClick={() => setLightMode('zaffa')}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                lightMode === 'zaffa'
                  ? 'bg-amber-500 text-black shadow-lg scale-105 border-2 border-amber-300'
                  : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)]'
              }`}
            >
              <Radio className="w-4 h-4" /> دخلة زفة العروسة وكشاف العروسة
            </button>
            <button
              onClick={() => setLightMode('slow')}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                lightMode === 'slow'
                  ? 'bg-purple-600 text-white shadow-lg scale-105 border-2 border-purple-300'
                  : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)]'
              }`}
            >
              <Heart className="w-4 h-4" /> زفة العصير ودخان البخار
            </button>
            <button
              onClick={() => setLightMode('laser')}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                lightMode === 'laser'
                  ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] shadow-lg scale-105 border-2 border-[var(--color-champagne-300)]'
                  : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)]'
              }`}
            >
              <Flame className="w-4 h-4" /> شو الليزرات والدي جي الاحترافي
            </button>
          </motion.div>

          {/* Dynamic Visual Simulator View */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className={`p-8 sm:p-12 rounded-3xl border-2 transition-all duration-700 shadow-2xl relative overflow-hidden text-center ${
              lightMode === 'zaffa'
                ? 'border-amber-400 bg-gradient-to-r from-amber-950/80 via-[var(--color-navy-900)] to-amber-950/80 shadow-amber-500/20'
                : lightMode === 'slow'
                ? 'border-purple-400 bg-gradient-to-r from-purple-950/80 via-[var(--color-navy-900)] to-purple-950/80 shadow-purple-500/20'
                : 'border-[var(--color-champagne-500)] bg-gradient-to-r from-[var(--color-navy-950)] via-[var(--color-navy-900)] to-[var(--color-navy-950)] shadow-[var(--color-champagne-500)]/20'
            }`}
          >
            <motion.div
              key={lightMode}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              {lightMode === 'zaffa' && (
                <>
                  <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center border-2 border-amber-400 animate-pulse">
                    <Volume2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black font-tajawal text-amber-300">
                    وضع زفة العروسة وكشاف المسرح
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                    تسليط كشاف العروسة المباشر مع تشغيل زفة العروسة مجانًا، وعاملات متفرغات لمسك الفستان للحفاظ على هيبة اللحظة.
                  </p>
                </>
              )}

              {lightMode === 'slow' && (
                <>
                  <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center border-2 border-purple-400 animate-pulse">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black font-tajawal text-purple-300">
                    وضع زفة العصير والأجواء الشاعرية
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                    إطلاق البخار الخفيف وتجهيز كاسات العصير الفريش (30 لتر) مع تقديم التورتة الملكية الـ 3 دور بكل سلاسة.
                  </p>
                </>
              )}

              {lightMode === 'laser' && (
                <>
                  <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] flex items-center justify-center border-2 border-[var(--color-champagne-300)] animate-pulse">
                    <Sparkles className="w-8 h-8 text-[var(--color-champagne-500)]" />
                  </div>
                  <h3 className="text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">
                    وضع الليزرات والدي جي الاحترافي
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                    تشغيل جهاز الليزر المزدوج مع الدي جي المجاني قبل وصول المطربة لإضافة طاقة حماسية ومبهجة للحفل.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main About Component */}
      <SectionDivider variant="crown" label="التجهيزات الرئيسية" />
      <AboutSection />

      {/* Facility Deep Dive Tabs */}
      <SectionDivider variant="sparkle" label="تفاصيل وأقسام القاعة" />
      <section className="surface-light py-16 bg-[var(--color-soft-beige)] border-y border-[var(--color-champagne-500)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <RevealText delay={0.05}>
              <h2 className="text-2xl sm:text-3xl font-black font-tajawal text-[var(--color-navy-950)] mb-2">
                تجهيزات القاعة بالتفصيل
              </h2>
            </RevealText>

            <RevealText delay={0.12}>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium">
                اختر القسم للاطلاع على المواصفات والخدمات المشمولة فيه:
              </p>
            </RevealText>

            {/* Tabs Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-6"
            >
              <button
                onClick={() => setActiveTab('hall')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === 'hall'
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                    : 'bg-[var(--color-warm-white)] text-[var(--color-text)] border border-[var(--color-border)] hover:text-[var(--color-navy-950)] shadow-xs'
                }`}
              >
                1. صالة النساء والبوفيه بطول 10 أمتار
              </button>
              <button
                onClick={() => setActiveTab('men')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === 'men'
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                    : 'bg-[var(--color-warm-white)] text-[var(--color-text)] border border-[var(--color-border)] hover:text-[var(--color-navy-950)] shadow-xs'
                }`}
              >
                2. قسم الرجال وجلسات الحوش 100 فرش
              </button>
              <button
                onClick={() => setActiveTab('vip')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === 'vip'
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                    : 'bg-[var(--color-warm-white)] text-[var(--color-text)] border border-[var(--color-border)] hover:text-[var(--color-navy-950)] shadow-xs'
                }`}
              >
                3. الكوشة والخدمات المباشرة
              </button>
              <button
                onClick={() => setActiveTab('catering')}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeTab === 'catering'
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                    : 'bg-[var(--color-warm-white)] text-[var(--color-text)] border border-[var(--color-border)] hover:text-[var(--color-navy-950)] shadow-xs'
                }`}
              >
                4. الضيافة والحلويات والقهوة
              </button>
            </motion.div>
          </div>

          {/* Tab Content 1: Women Hall */}
          {activeTab === 'hall' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[var(--color-navy-950)] p-8 rounded-3xl border border-[var(--color-champagne-500)]/30 shadow-2xl"
            >
              <div className="space-y-4">
                <RevealText delay={0.05}>
                  <span className="text-xs font-bold text-[var(--color-champagne-500)] tracking-wider uppercase">صالة النساء الفاخرة</span>
                </RevealText>
                <RevealText delay={0.1}>
                  <h3 className="text-2xl font-black font-tajawal text-white">
                    صالة النساء وبوفيه الـ 10 متر الفضي
                  </h3>
                </RevealText>
                <RevealText delay={0.15}>
                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                    تتميز صالة النساء بجمال التجهيز والتكييف الفاخر، مع بوفيه فضي مفتوح بطول 10 أمتار ومعدات تقديم فندقية، بالإضافة إلى 40 صحن حلا و40 صحن معجنات مجانًا.
                  </p>
                </RevealText>
                <ul className="space-y-2 text-xs text-[var(--color-navy-100)] font-cairo">
                  {[
                    'بوفيه مفتوح فضي 10 متر مع تورتة زفاف فخمة 3 دور',
                    'طاقم مكون من 10 مباشرات + مشرفة الصالة لتقديم الخدمة',
                    'عاملات متفرغات لمسك فستان العروسة أثناء الزفة',
                    'تشغيل المؤثرات مجانًا (بخار - ليزر - زفة - كشاف العروسة)',
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)] shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl relative h-72 sm:h-80"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src="/Videos/posters/hall-tour.jpg"
                  alt="صالة النساء"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Tab Content 2: Men Section */}
          {activeTab === 'men' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[var(--color-navy-950)] p-8 rounded-3xl border border-[var(--color-champagne-500)]/30 shadow-2xl"
            >
              <div className="space-y-4">
                <RevealText delay={0.05}>
                  <span className="text-xs font-bold text-[var(--color-champagne-500)] tracking-wider uppercase">قسم الرجال والحوش الخارجي</span>
                </RevealText>
                <RevealText delay={0.1}>
                  <h3 className="text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">
                    قسم الرجال والضيافة الخارجية 100 فرش
                  </h3>
                </RevealText>
                <RevealText delay={0.15}>
                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                    قسم رجال متكامل يتضمن تأمين 100 فرش جلسات حوش خارجية تراثية، مع طاقم 10 مباشرين والقهوجي وحارس بوابة النساء.
                  </p>
                </RevealText>
                <ul className="space-y-2 text-xs text-[var(--color-navy-100)] font-cairo">
                  {[
                    '10 مباشرين احترافيين لخدمة كافة ضيوف الرجال',
                    'القهوجي المختص لتقديم القهوة والشاي (أحمر وأخضر)',
                    'حارس أمن خاص ببوابة صالة النساء لضمان الأمان والراحة',
                    'تأمين الفحم والمباخر الفاخرة وأدوات النظافة كاملة',
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)] shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl relative h-72 sm:h-80"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src="/Videos/posters/hospitality.jpg"
                  alt="قسم الرجال"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Tab Content 3: Decor */}
          {activeTab === 'vip' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[var(--color-navy-950)] p-8 rounded-3xl border border-[var(--color-champagne-500)]/30 shadow-2xl"
            >
              <div className="space-y-4">
                <RevealText delay={0.05}>
                  <span className="text-xs font-bold text-[var(--color-champagne-500)] tracking-wider uppercase">سياسة الديكور والتنسيق</span>
                </RevealText>
                <RevealText delay={0.1}>
                  <h3 className="text-2xl font-black font-tajawal text-white">
                    حجز الكوشة وتنسيق المداخل والكافيه
                  </h3>
                </RevealText>
                <RevealText delay={0.15}>
                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                    يتم حجز الكوشة وتنسيق صالة النساء والمداخل والكافيه حصراً عن طريق إدارة القاعة بالاتفاق المسبق لضمان التناسق والأناقة.
                  </p>
                </RevealText>
                <ul className="space-y-2 text-xs text-[var(--color-navy-100)] font-cairo">
                  {[
                    'أحدث تصاميم الكوشة والورود لمختلف الأذواق',
                    'تنسيق كامل للمداخل والممرات ومسرح العروس',
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)] shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl relative h-72 sm:h-80"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src="/Videos/posters/hall-tour.jpg"
                  alt="الكوشة والديكور"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Tab Content 4: Catering */}
          {activeTab === 'catering' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[var(--color-navy-950)] p-8 rounded-3xl border border-[var(--color-champagne-500)]/30 shadow-2xl"
            >
              <div className="space-y-4">
                <RevealText delay={0.05}>
                  <span className="text-xs font-bold text-[var(--color-champagne-500)] tracking-wider uppercase">المطابخ والحلويات والمشروبات</span>
                </RevealText>
                <RevealText delay={0.1}>
                  <h3 className="text-2xl font-black font-tajawal text-white">
                    خدمة البوفيه المفتوح والطهي الفاخر
                  </h3>
                </RevealText>
                <RevealText delay={0.15}>
                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                    حجز البوفيهات والحلويات والطبخ عن طريق القاعة حصراً بالاتفاق المكتوب لضمان أعلى معايير الجودة والطهي الطازج.
                  </p>
                </RevealText>
                <ul className="space-y-2 text-xs text-[var(--color-navy-100)] font-cairo">
                  {[
                    '30 لتر عصائر طازجة طازجة (مانجو - جوافة - كوكتيل)',
                    '40 صحن حلا + 40 صحن معجنات على 40 طاولة مجانًا',
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)] shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl relative h-72 sm:h-80"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src="/Videos/posters/table-decor.jpg"
                  alt="البوفيه المفتوح"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Grand Luxury Ballroom Specs & High-End Features */}
      <GrandLuxuryFeatures onOpenBooking={onOpenBooking} />

      {/* Wedding Night Sequence & Interactive Event Timeline */}
      <EventTimeline onOpenBooking={onOpenBooking} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BallroomEvolutionTimeline />
      </div>

      {/* Virtual Tour Section */}
      <VirtualTour />

      {/* Interactive Nile Route SVG Map Section */}
      <SectionDivider variant="crown" label="خريطة مسار ومحيط الباخرة التفاعلية" />
      <div className="px-4 sm:px-6 lg:px-8">
        <NileRouteMap />
      </div>

      {/* CTA Box */}
      <section className="surface-light py-12 bg-[var(--color-ivory)] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-900)] p-8 rounded-3xl border border-[var(--color-champagne-500)]/40 shadow-2xl"
          >
            <RevealText delay={0.05}>
              <h3 className="text-2xl font-black font-tajawal gold-text mb-3">
                يسعدنا استضافتكم لمعاينة قاعة الباخرة بجدة!
              </h3>
            </RevealText>

            <RevealText delay={0.12}>
              <p className="text-xs sm:text-sm text-[var(--color-navy-100)] mb-6 font-cairo">
                جدة - الحرازات - بعد محطة المدينة بـ 500 متر | يسعدنا استقبالكم يومياً من الساعة {HALL_SPECS.workingHours}.
              </p>
            </RevealText>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenBooking}
              className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-sm px-8 py-3.5 rounded-xl shadow-lg transition-transform cursor-pointer"
            >
              حدد موعد زيارتك ومعاينتك الآن
            </motion.button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
