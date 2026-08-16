import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollParallaxDecor } from './ScrollParallaxDecor';
import {
  Car,
  Coffee,
  Sparkles,
  Utensils,
  MoonStar,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ShieldCheck,
  Users,
  Flame,
  Cake,
  Award,
  Calendar,
  Volume2,
  Crown
} from 'lucide-react';

export interface TimelineStep {
  id: string;
  stepNumber: string;
  timeSlot: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  image: string;
  highlights: string[];
  badge: string;
  location: string;
  ambientSoundTitle?: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'arrival',
    stepNumber: '01',
    timeSlot: '08:00 مساءً',
    title: 'الوصول والترحيب الملكي',
    subtitle: 'استقبال ضيوفكم الكرام في المواقف والمدخل الخارجي',
    description:
      'تبدأ رحلة ليلتكم المباركة مع وصول ضيوفكم إلى مواقف القاعة الواسعة بالحرازات. يستقبلهم حارس أمن بوابة النساء وطاقم الاستقبال في قسم الرجال برحابة صدر ودقة تنظيم.',
    icon: Car,
    image: '/Videos/posters/hospitality.jpg',
    badge: 'استقبال منظم وخصوصية تامة',
    location: 'المواقف والمدخل الخارجي وقسم الرجال',
    highlights: [
      'مواقف سيارات واسعة ومظللة ومستقلة',
      'حارس أمن متواجد عند بوابة صالة النساء',
      'طاقم استقبال بشوش في المدخل الملكي'
    ],
    ambientSoundTitle: 'أجواء الترحيب والهدوء الملكي'
  },
  {
    id: 'hospitality',
    stepNumber: '02',
    timeSlot: '09:00 مساءً',
    title: 'ضيافة الطاولات والقهوة السعودية',
    subtitle: 'تقديم أصناف الحلا والمعجنات والقهوة العربية',
    description:
      'يتوزع الضيوف في صالة النساء وقسم الرجال لتلقي أصول الضيافة. يتم تقديم القهوة والشاي عبر القهوجي المباشر وطاقم المباشرات، مع توزيع 40 صحن حلا و40 صحن معجنات مجانية.',
    icon: Coffee,
    image: '/Videos/posters/hall-tour.jpg',
    badge: 'مشمول 40 صحن حلا + 40 معجنات',
    location: 'صالة النساء (40 طاولة) وقسم الرجال',
    highlights: [
      '40 صحن حلا فاخر + 40 صحن معجنات طازجة',
      '10 مباشرات للصالة + 10 مباشرين للرجال',
      'قهوجي مختص لتوفير الشاي والقهوة الأصيلة'
    ],
    ambientSoundTitle: 'نغمات العود والهيل السعودي'
  },
  {
    id: 'zaffa',
    stepNumber: '03',
    timeSlot: '10:30 مساءً',
    title: 'الزفة الملكية والمؤثرات الضوئية',
    subtitle: 'لحظة دخولة العروسة المبهجة تحت أضواء الكشاف والبخار',
    description:
      'اللحظة الأهم والأكثر سحراً! تبدأ دخلة العروسة مع تشغيل كشاف العروسة المباشر، جهاز البخار، جهاز الليزر المزدوج، وعاملات مسك الفستان لضمان زفة ملكية لا تُنسى.',
    icon: Sparkles,
    image: '/Videos/posters/hall-tour.jpg',
    badge: 'جميع المؤثرات والدي جي مجانًا',
    location: 'مسرح صالة النساء والكوشة الفخمة',
    highlights: [
      'كشاف العروسة المباشر المخصص للزفة',
      'جهاز البخار المكثف وجهاز الليزر المزدوج',
      'مشرفة الصالة وعاملات مسك الفستان والدي جي'
    ],
    ambientSoundTitle: 'مؤثرات الزفة والبخار الضوئي'
  },
  {
    id: 'buffet',
    stepNumber: '04',
    timeSlot: '11:30 مساءً',
    title: 'افتتاح البوفيه المفتوح الفضي 10m',
    subtitle: 'تجربة عشاء فندقية مع تورتة من 3 أدوار وعصائر طازجة',
    description:
      'تُفتح أبواب صالة الطعام لاستعراض البوفيه الفضي الممتد لـ 10 متر بألذ الأطباق الساخنة والسلطات. وتقوم العروس بتقطيع تورتة الزفاف الفاخرة المكونة من 3 دور.',
    icon: Utensils,
    image: '/Videos/posters/table-decor.jpg',
    badge: 'بوفيه 10m + تورتة من 3 أدوار + 30L عصائر',
    location: 'صالة الطعام الملكية',
    highlights: [
      'بوفيه مفتوح فضي ممتد 10 متر بأطباق متعددة',
      'تورتة زفاف ملكية مصممة من 3 دور',
      '30 لتر عصائر طازجة مع فريق خدمة البوفيه'
    ],
    ambientSoundTitle: 'أجواء عشاء فندقي فاخر'
  },
  {
    id: 'outdoor',
    stepNumber: '05',
    timeSlot: '12:30 صباحاً',
    title: 'جلسات الحوش والتوديع الفاخر',
    subtitle: 'أجواء شعبية في الحوش مع 100 فرش ورائحة البخور',
    description:
      'تستمر السهرة في جلسات الحوش الخارجي للرجال المجهزة بـ 100 فرش تراثي، مع تقديم البخور الفاخر وتوديع الضيوف بكل أمان وحفاوة.',
    icon: MoonStar,
    image: '/Videos/posters/welcome-display.jpg',
    badge: '100 فرش حوش + مباخر وفحم',
    location: 'الحوش الخارجي والتراس الملكي',
    highlights: [
      '100 فرش حوش خارجي للجلسات الشعبية',
      'تأمين الفحم والمباخر والبخور الفاخر',
      'توديع الضيوف بابتسامة وذكرى لا تُنسى'
    ],
    ambientSoundTitle: 'نفحات البخور والتوديع الملكي'
  }
];

interface EventTimelineProps {
  onOpenBooking: (packageId?: string, prefilled?: any) => void;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ onOpenBooking }) => {
  const [activeStepId, setActiveStepId] = useState<string>('zaffa');

  const activeStep = TIMELINE_STEPS.find((s) => s.id === activeStepId) || TIMELINE_STEPS[2];

  return (
    <section className="py-20 relative bg-[var(--color-navy-950)]/60 backdrop-blur-md border-y border-[var(--color-champagne-500)]/30 overflow-hidden">
      {/* Subtle Scroll Parallax Ambient Decor */}
      <ScrollParallaxDecor speed={0.18} variant="ambient-glow" />

      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-champagne-500)_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/15 border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] text-xs font-bold"
          >
            <Clock className="w-4 h-4 text-[var(--color-champagne-500)]" />
            مسار التسلسل الزمني للحفل
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black font-tajawal gold-text leading-tight"
          >
            رحلة الضيف والمناسبة في قاعة الباخرة
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo leading-relaxed max-w-2xl mx-auto"
          >
            عش تجربة الحفل خطوة بخطوة من لحظة وصول أول الضيوف في المواقف وحتى اختتام الليلة السعيدة بأبهى التفاصيل والمؤثرات.
          </motion.p>
        </div>

        {/* Step Selector Pills (Quick Nav Bar) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-12">
          {TIMELINE_STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'gold-gradient text-[var(--color-navy-950)] border-[var(--color-champagne-500)] shadow-xl scale-105'
                    : 'bg-[var(--color-navy-900)]/80 text-[var(--color-navy-100)] hover:text-white border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)]/50'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isActive ? 'bg-[var(--color-navy-950)] text-[var(--color-champagne-500)]' : 'bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)]'
                  }`}
                >
                  {step.stepNumber}
                </span>
                <Icon className="w-4 h-4" />
                <span className="font-tajawal hidden sm:inline">{step.title.split(' ')[0]}</span>
                <span className="font-tajawal sm:hidden">{step.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Vertical Timeline Navigation Column (Left/Right depending on RTL) */}
          <div className="lg:col-span-5 space-y-4 relative">
            {/* Animated Connector Line with Scroll Reveal */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-6 bottom-6 right-8 w-1 bg-gradient-to-b from-[var(--color-champagne-500)] via-[var(--color-champagne-500)]/50 to-transparent rounded-full hidden sm:block origin-top shadow-[0_0_8px_var(--color-champagne-500)]"
            />

            {TIMELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = step.id === activeStepId;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveStepId(step.id)}
                  className={`relative z-10 p-5 rounded-2xl border transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-[var(--color-navy-800)] via-[var(--color-navy-900)] to-[var(--color-navy-900)] border-[var(--color-champagne-500)] shadow-2xl scale-[1.02]'
                      : 'bg-[var(--color-navy-900)]/70 hover:bg-[var(--color-navy-800)] border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)]/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Icon Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                        isActive
                          ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg'
                          : 'bg-[var(--color-navy-900)] text-[var(--color-champagne-500)] border border-[var(--color-champagne-500)]/30'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[var(--color-champagne-500)] flex items-center gap-1 font-cairo">
                          <Clock className="w-3 h-3" /> {step.timeSlot}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/30">
                          المرحلة {step.stepNumber}
                        </span>
                      </div>

                      <h3
                        className={`text-base font-bold font-tajawal truncate ${
                          isActive ? 'gold-text' : 'text-white group-hover:text-[var(--color-champagne-300)]'
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="text-xs text-[var(--color-text-muted)] font-cairo line-clamp-1 mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>

                    <ChevronLeft
                      className={`w-5 h-5 transition-transform ${
                        isActive
                          ? 'text-[var(--color-champagne-500)] translate-x-[-4px]'
                          : 'text-[var(--color-text-secondary)] group-hover:text-white'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Step Feature Showcase Card (Desktop & Mobile) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-b from-[var(--color-navy-800)] via-[var(--color-navy-900)] to-[var(--color-navy-950)] rounded-3xl border-2 border-[var(--color-champagne-500)]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-24 -left-24 w-60 h-60 bg-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Badge & Time */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--color-champagne-500)]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl gold-gradient text-[var(--color-navy-950)] font-black text-xs flex items-center justify-center">
                      {activeStep.stepNumber}
                    </span>
                    <div>
                      <span className="text-xs text-[#25D366] font-bold block">
                        {activeStep.badge}
                      </span>
                      <span className="text-[11px] text-[var(--color-navy-100)] font-cairo">
                        الموقع: {activeStep.location}
                      </span>
                    </div>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-xl bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] text-xs font-bold flex items-center gap-1.5 font-cairo">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                    <span>التوقيت المتوقع: {activeStep.timeSlot}</span>
                  </div>
                </div>

                {/* Image & Title Header */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                  <div className="md:col-span-7 space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black font-tajawal text-white gold-text">
                      {activeStep.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-champagne-300)] font-bold font-cairo leading-relaxed">
                      {activeStep.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo leading-relaxed pt-1">
                      {activeStep.description}
                    </p>
                  </div>

                  <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl group h-48 sm:h-52">
                  <img
                    loading="lazy"
                    decoding="async"
                      src={activeStep.image}
                      alt={activeStep.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 right-3 left-3 bg-[var(--color-navy-950)]/80 backdrop-blur-md p-2 rounded-xl border border-[var(--color-champagne-500)]/30 text-center">
                      <span className="text-[10px] text-[var(--color-champagne-500)] font-bold flex items-center justify-center gap-1">
                        <Crown className="w-3 h-3" /> قاعة الباخرة للااحتفالات بجدة
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checklist Highlights */}
                <div className="space-y-3 bg-[var(--color-navy-950)]/80 p-4 sm:p-5 rounded-2xl border border-[var(--color-champagne-500)]/20 mb-6">
                  <span className="text-xs font-bold text-[var(--color-champagne-500)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> التجهيزات والخدمات المشمولة في هذه المرحلة:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {activeStep.highlights.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-[var(--color-navy-100)] font-cairo bg-[var(--color-navy-900)] p-2.5 rounded-xl border border-[var(--color-champagne-500)]/15"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-champagne-500)] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-[var(--color-text-muted)] font-cairo flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[var(--color-champagne-500)]" />
                    <span>مشمول ضمن العرض الشامل المعتمد لقاعة الباخرة</span>
                  </div>

                  <button
                    onClick={() =>
                      onOpenBooking(undefined, {
                        notes: `استفسار بخصوص مرحلة: ${activeStep.title}`
                      })
                    }
                    className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>احجز ليلتك بنفس هذا الترتيب</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
