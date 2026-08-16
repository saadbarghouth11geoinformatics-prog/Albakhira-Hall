import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from './GlassCard';
import {
  Sparkles,
  Award,
  Crown,
  CheckCircle2,
  X,
  Sliders,
  ChevronLeft,
  ShieldCheck,
  Tv,
  Music,
  Wind,
  Maximize2,
  Info,
  Layers,
  ArrowRightLeft,
  PhoneCall,
  CalendarCheck,
  Camera,
  Coffee,
  Check
} from 'lucide-react';
import { GRAND_FEATURE_CATEGORIES, GRAND_LUXURY_FEATURES, GrandFeatureItem } from '../data/grandLuxuryData';

interface GrandLuxuryFeaturesProps {
  onOpenBooking?: () => void;
  showComparisonTableDefault?: boolean;
}

export const GrandLuxuryFeatures: React.FC<GrandLuxuryFeaturesProps> = ({
  onOpenBooking,
  showComparisonTableDefault = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFeatureModal, setActiveFeatureModal] = useState<GrandFeatureItem | null>(null);
  const [showComparisonTable, setShowComparisonTable] = useState<boolean>(showComparisonTableDefault);

  const filteredFeatures =
    selectedCategory === 'all'
      ? GRAND_LUXURY_FEATURES
      : GRAND_LUXURY_FEATURES.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-12 sm:py-20 bg-[var(--color-navy-950)] relative overflow-hidden" id="grand-luxury-specs">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[var(--color-champagne-500)]/10 via-[var(--color-navy-700)]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--color-champagne-500)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/40 mb-3.5 shadow-lg backdrop-blur-md"
          >
            <Crown className="w-4 h-4 text-[var(--color-champagne-500)]" />
            <span>مواصفات وتجهيزات القاعات الملكية والكبرى</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black font-tajawal text-white mb-4 leading-tight"
          >
            تفاصيل وعناصر <span className="gold-text">القاعات الكبرى</span> المشمولة بعروضنا
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-base text-[var(--color-navy-100)] font-cairo leading-relaxed"
          >
            استكشف كافة التفاصيل الفنية، التقنيات الشاشات، أجنحة العروسين، التجهيزات الصوتية والضيافة الفندقية التي تجعل حفلكم بليلة العمر في قاعة الباخرة تجربة لا تُنسى.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {GRAND_FEATURE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold font-cairo transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] shadow-lg shadow-[var(--color-champagne-500)]/25 scale-105 font-black'
                    : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)] hover:text-white'
                }`}
              >
                {isActive && <Sparkles className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Features Grid with Motion Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((item, idx) => {
              const direction: 'right' | 'left' = idx % 2 === 0 ? 'right' : 'left';
              return (
                <GlassCard
                  key={item.id}
                  direction={direction}
                  distance={35}
                  delay={idx * 0.08}
                  variant="luxury"
                  hoverEffect="lift"
                  borderAccent
                  className="flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Header Overlay */}
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        loading="lazy"
                        decoding="async"
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/40 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[var(--color-navy-950)]/90 border border-[var(--color-champagne-500)] text-[var(--color-champagne-300)] text-xs font-bold backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                        <span>{item.badge}</span>
                      </div>

                      {/* Quick View Button */}
                      <button
                        onClick={() => setActiveFeatureModal(item)}
                        className="absolute top-4 left-4 p-2 rounded-full bg-[var(--color-navy-950)]/80 text-white border border-white/20 hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-colors cursor-pointer shadow-lg"
                        title="معاينة التفاصيل الكاملة"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      {/* Title Overlay at bottom of image */}
                      <div className="absolute bottom-3 right-4 left-4 z-10">
                        <h3 className="text-lg sm:text-xl font-bold font-tajawal text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[var(--color-navy-100)] font-cairo opacity-90 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Body Details */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-cairo leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Highlights Bullet List */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-[var(--color-champagne-500)] font-cairo tracking-wide uppercase block">
                          أبرز ما يميّز هذا العنصر:
                        </span>
                        <ul className="space-y-1.5">
                          {item.highlights.slice(0, 3).map((hl, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-navy-100)] font-cairo">
                              <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Specs Chips */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--color-champagne-500)]/15">
                        {item.specs.slice(0, 2).map((spec, sIdx) => (
                          <div key={sIdx} className="bg-[var(--color-navy-950)] p-2.5 rounded-xl border border-[var(--color-champagne-500)]/20 text-center">
                            <span className="text-[10px] text-[var(--color-text-muted)] font-cairo block mb-0.5">{spec.label}</span>
                            <span className="text-xs font-bold text-[var(--color-champagne-300)] font-tajawal">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Standard vs Albakhera Grand Comparison snippet */}
                      <div className="bg-[var(--color-navy-900)] p-3 rounded-2xl border border-[var(--color-champagne-500)]/20 text-xs font-cairo space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-red-400 font-bold flex items-center gap-1">
                            <X className="w-3 h-3" /> القاعات العادية:
                          </span>
                          <span className="text-[var(--color-text-muted)] truncate max-w-[180px]">{item.standardVsGrand.standard}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5">
                          <span className="text-[var(--color-success)] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[var(--color-success)]" /> الباخرة الملكية:
                          </span>
                          <span className="text-[var(--color-champagne-300)] font-bold truncate max-w-[180px]">{item.standardVsGrand.albakheraGrand}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-5 sm:px-6 pb-5 pt-2">
                    <button
                      onClick={() => setActiveFeatureModal(item)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] font-bold text-xs hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md group-hover:border-[var(--color-champagne-500)]"
                    >
                      <span>عرض التفاصيل والمواصفات الفنية الكاملة</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Section Comparison Toggle & Table */}
        <div className="mt-12 bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-900)] to-[var(--color-navy-900)] rounded-3xl border-2 border-[var(--color-champagne-500)]/40 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-right">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-champagne-500)] mb-1">
                <ArrowRightLeft className="w-4 h-4" />
                <span>جدول المقارنة الفنية والخدمية</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white">
                مقارنة بين القاعات التقليدية العادية <span className="gold-text">وتجهيزات قاعة الباخرة الكبرى</span>
              </h3>
            </div>

            <button
              onClick={() => setShowComparisonTable(!showComparisonTable)}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)] text-[var(--color-champagne-300)] font-bold text-xs hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all cursor-pointer shrink-0"
            >
              {showComparisonTable ? 'إخفاء جدول المقارنة' : 'عرض جدول المقارنة الشامل'}
            </button>
          </div>

          {showComparisonTable && (
            <>
            <p className="mb-2 text-center text-[11px] font-bold text-[var(--color-navy-100)] sm:hidden">
              اسحب الجدول يميناً أو يساراً لمشاهدة المقارنة كاملة
            </p>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-right text-xs sm:text-sm font-cairo border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-[var(--color-champagne-500)]/40 bg-[var(--color-navy-950)]">
                    <th className="p-4 text-[var(--color-champagne-500)] font-bold">العنصر / الخدمة</th>
                    <th className="p-4 text-red-300 font-bold bg-red-950/20">القاعات التقليدية العادية</th>
                    <th className="p-4 text-[var(--color-champagne-300)] font-bold bg-[var(--color-champagne-500)]/15">قاعة الباخرة الكبرى بجدة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="p-4 font-bold text-white">جناح العروسة</td>
                    <td className="p-4 text-[var(--color-text-muted)] bg-red-950/10">غرفة ضيقة بدون حمام أو بث حي</td>
                    <td className="p-4 text-[var(--color-success)] font-bold bg-[var(--color-champagne-500)]/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[var(--color-success)]" /> جناح ملكي 45م² + بث حي 4K + مصعد خاص
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">البوفيه المفتوح والضيافة</td>
                    <td className="p-4 text-[var(--color-text-muted)] bg-red-950/10">أطباق محدودة بدون تورتة أو عصير طبيعي</td>
                    <td className="p-4 text-[var(--color-success)] font-bold bg-[var(--color-champagne-500)]/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[var(--color-success)]" /> بوفيه فضي 10م + تورتة من 3 أدوار + 80 صحن حلا و30L عصير
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">شاشات العرض والإضاءة</td>
                    <td className="p-4 text-[var(--color-text-muted)] bg-red-950/10">إضاءة ثابتة عادية بدون شاشات LED</td>
                    <td className="p-4 text-[var(--color-success)] font-bold bg-[var(--color-champagne-500)]/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[var(--color-success)]" /> شاشة LED 4K عملاقة 8×4م + كشاف متابعة الممر
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">المؤثرات الضوئية والزفة</td>
                    <td className="p-4 text-[var(--color-text-muted)] bg-red-950/10">رسوم إضافية مرتفعة على البخار والليزر</td>
                    <td className="p-4 text-[var(--color-success)] font-bold bg-[var(--color-champagne-500)]/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[var(--color-success)]" /> مجانًا (بخار سحاب + ليزرات + كشاف العروسة + دي جي)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">قسم الرجال والحوش الخارجي</td>
                    <td className="p-4 text-[var(--color-text-muted)] bg-red-950/10">صالة فقط بدون جلسات خارجية أو قهوجي</td>
                    <td className="p-4 text-[var(--color-success)] font-bold bg-[var(--color-champagne-500)]/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[var(--color-success)]" /> 100 فرش تراثي للحوش + 10 مباشرين وقهوجي وحارس بوابة
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">المواقف والتكييف</td>
                    <td className="p-4 text-[var(--color-text-muted)] bg-red-950/10">مواقف ضيقة بالشوارع وتكييف متذبذب</td>
                    <td className="p-4 text-[var(--color-success)] font-bold bg-[var(--color-champagne-500)]/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[var(--color-success)]" /> مواقف +150 سيارة + تكييف مركزي 150+ طن ومولد أوتوماتيكي
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
            </>
          )}
        </div>

        {/* CTA Bottom Box */}
        <div className="mt-12 text-center bg-gradient-to-r from-[var(--color-champagne-500)]/20 via-[var(--color-navy-900)] to-[var(--color-champagne-500)]/20 p-8 rounded-3xl border border-[var(--color-champagne-500)]/50 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-black font-tajawal text-white mb-2">
            هل ترغب بمعاينة كافة هذه التجهيزات على أرض الواقع؟
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo mb-6">
            يسعدنا استقبالكم يومياً بقاعة الباخرة بجدة (الحرازات - بعد محطة المدينة بـ 500m) لمعاينة الصالات والأجنحة والتأكد من العرض بنفسك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-sm px-8 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>احجز موعد معاينة مجاني الآن</span>
              </button>
            )}
            <a
              href="https://wa.me/966500292974"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] text-black font-bold text-sm hover:bg-[#1ebd59] transition-all flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>استفسار وتنسيق عبر الواتساب</span>
            </a>
          </div>
        </div>

      </div>

      {/* Feature Tech Detail Modal */}
      <AnimatePresence>
        {activeFeatureModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActiveFeatureModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-navy-900)] border-2 border-[var(--color-champagne-500)] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveFeatureModal(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-[var(--color-navy-950)] text-white hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)] text-[var(--color-champagne-300)] text-xs font-bold">
                    {activeFeatureModal.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-tajawal text-white mb-1">
                    {activeFeatureModal.title}
                  </h3>
                  <p className="text-xs text-[var(--color-navy-100)] font-cairo">
                    {activeFeatureModal.subtitle}
                  </p>
                </div>

                <div className="h-52 rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/30 relative">
                  <img
                    src={activeFeatureModal.imageUrl}
                    loading="eager"
                    decoding="async"
                    alt={activeFeatureModal.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo leading-relaxed">
                  {activeFeatureModal.description}
                </p>

                {/* Specs List */}
                <div>
                  <h4 className="text-xs font-bold text-[var(--color-champagne-500)] font-cairo mb-2 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" />
                    <span>المواصفات الفنية المعتمدة:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeFeatureModal.specs.map((spec, i) => (
                      <div key={i} className="bg-[var(--color-navy-950)] p-3 rounded-xl border border-[var(--color-champagne-500)]/20 flex items-center justify-between text-xs">
                        <span className="text-[var(--color-text-muted)] font-cairo">{spec.label}:</span>
                        <span className="text-[var(--color-champagne-300)] font-bold font-tajawal">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights List */}
                <div>
                  <h4 className="text-xs font-bold text-[var(--color-champagne-500)] font-cairo mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
                    <span>التفاصيل والخدمات المشمولة:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {activeFeatureModal.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-navy-100)] font-cairo">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Comparison in Modal */}
                <div className="bg-[var(--color-navy-950)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-xs font-cairo space-y-2">
                  <div className="text-red-400 font-bold flex items-start gap-2">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] text-[var(--color-text-muted)]">في القاعات العادية:</span>
                      <span>{activeFeatureModal.standardVsGrand.standard}</span>
                    </div>
                  </div>
                  <div className="text-[var(--color-success)] font-bold flex items-start gap-2 pt-2 border-t border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] text-[var(--color-champagne-300)]">في قاعة الباخرة الملكية:</span>
                      <span>{activeFeatureModal.standardVsGrand.albakheraGrand}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setActiveFeatureModal(null)}
                    className="px-5 py-2.5 rounded-xl bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-white/20 hover:text-white text-xs font-bold cursor-pointer"
                  >
                    إغلاق النافذة
                  </button>
                  {onOpenBooking && (
                    <button
                      onClick={() => {
                        setActiveFeatureModal(null);
                        onOpenBooking();
                      }}
                      className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-xs px-6 py-2.5 rounded-xl shadow-lg cursor-pointer"
                    >
                      طلب حجز هذه المواصفات
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
