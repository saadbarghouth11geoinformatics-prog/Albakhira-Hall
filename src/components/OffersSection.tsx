import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, Star, Users, ArrowRight, ShieldCheck, Tag, Sparkle, Share2 } from 'lucide-react';
import { PACKAGES } from '../data/hallData';
import { EventCategory } from '../types';
import { SharePackageModal, PackageShareData } from './SharePackageModal';
import { GlassCard } from './GlassCard';
import { ScrollCountUp } from './ScrollCountUp';
import { ScrollParallaxDecor } from './ScrollParallaxDecor';

interface OffersSectionProps {
  onOpenBooking: (packageId?: string) => void;
  onSelectPackageForCalc?: (packageId: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  onOpenBooking,
  onSelectPackageForCalc,
}) => {
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');
  const [shareModalPackage, setShareModalPackage] = useState<PackageShareData | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleOpenShare = (pkg: typeof PACKAGES[0]) => {
    setShareModalPackage({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      description: pkg.description,
      badge: pkg.badge
    });
    setIsShareModalOpen(true);
  };

  const categories: { id: EventCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'جميع عروض القاعة الرسمية' },
    { id: 'wedding', label: 'العرض الشامل (رجال + نساء)' },
  ];

  const filteredPackages = activeCategory === 'all'
    ? PACKAGES
    : PACKAGES.filter((p) => p.category === activeCategory);

  return (
    <section id="offers" className="py-8 sm:py-20 relative bg-[var(--color-navy-950)]/60 backdrop-blur-md overflow-hidden">
      {/* Subtle Scroll Parallax Ambient Decor */}
      <ScrollParallaxDecor speed={0.2} variant="gold-sparkles" />

      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-champagne-500)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-[11px] sm:text-xs font-bold border border-[var(--color-champagne-500)]/40 mb-2">
            <Tag className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> الورقة الرسمية لعروض قاعة الباخرة للاحتفالات
          </div>
          <h2 className="text-2xl sm:text-5xl font-black font-tajawal gold-text mb-2 sm:mb-4">
            عروض قاعة الباخرة للاحتفالات
          </h2>
          <p className="text-[var(--color-navy-100)] text-xs sm:text-base font-cairo">
            جدة - الحرازات - بعد محطة المدينة بـ 500 متر | العروض المعتمدة لقسمي الرجال والنساء
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg shadow-[var(--color-champagne-500)]/20 scale-105'
                  : 'dark-overlay-card text-white hover:text-[var(--color-champagne-300)] hover:border-[var(--color-champagne-500)]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Package Cards Grid with Motion Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 items-stretch">
          {filteredPackages.map((pkg, index) => {
            const directions: ('right' | 'up' | 'left')[] = ['right', 'up', 'left'];
            const direction = directions[index % directions.length];
            return (
              <GlassCard
                key={pkg.id}
                direction={direction}
                distance={35}
                delay={index * 0.12}
                variant={pkg.popular ? 'gold' : 'luxury'}
                hoverEffect="lift"
                borderAccent={pkg.popular}
                glow={pkg.popular}
                className="flex flex-col justify-between"
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-[var(--color-champagne-500)] via-[var(--color-champagne-300)] to-[var(--color-champagne-500)] text-[var(--color-navy-950)] text-center font-black text-[11px] sm:text-xs py-1 shadow-md flex items-center justify-center gap-1 z-10">
                    <Star className="w-3 h-3 fill-[var(--color-navy-950)]" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  {/* Card Header & Image */}
                  <div className="relative h-36 sm:h-48 overflow-hidden">
                    <img
                      src={pkg.imageUrl}
                      loading="lazy"
                      decoding="async"
                      alt={pkg.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)] via-black/40 to-transparent" />
                    <div className="absolute bottom-2.5 right-3 left-3 flex items-end justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-black font-tajawal text-white">{pkg.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Package Specs & Scope Box */}
                  <div className="p-3.5 sm:p-6 border-b border-[var(--color-border)] bg-[var(--color-soft-beige)]/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm sm:text-base font-black text-[var(--color-navy-950)] font-tajawal flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[var(--color-champagne-600)]" />
                        {pkg.name}
                      </span>
                      <span className="text-[10px] sm:text-xs text-[var(--color-champagne-700)] bg-[var(--color-champagne-100)] px-2.5 py-1 rounded-full border border-[var(--color-champagne-500)]/40 font-black">
                        العرض المعتمد الرسمي
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-cairo leading-relaxed mb-3">
                      {pkg.description}
                    </p>

                    {/* Capacity Info Badges */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 bg-[var(--color-warm-white)] p-1.5 sm:p-2 rounded-lg text-[var(--color-navy-950)] border border-[var(--color-border)] font-bold">
                        <Users className="w-3.5 h-3.5 text-[var(--color-champagne-600)]" />
                        <span className="text-[11px] sm:text-xs">يتسع لـ {pkg.guestCapacity} ضيف</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[var(--color-warm-white)] p-1.5 sm:p-2 rounded-lg text-[var(--color-navy-950)] border border-[var(--color-border)] font-bold">
                        <Sparkle className="w-3.5 h-3.5 text-[var(--color-champagne-600)]" />
                        <span className="text-[11px] sm:text-xs">{pkg.sailingDuration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="p-3.5 sm:p-6 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="font-black text-[var(--color-champagne-700)] text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[var(--color-champagne-600)]" />
                      <span>المكونات المشمولة في الورقة الرسمية:</span>
                    </div>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            feat.highlight
                              ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-xs'
                              : 'bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] border border-[var(--color-border)]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span
                          className={`leading-normal text-xs sm:text-sm ${
                            feat.highlight
                              ? 'font-black text-[var(--color-navy-950)]'
                              : 'font-medium text-[var(--color-text)]'
                          }`}
                        >
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-3.5 sm:p-6 pt-0 space-y-2 mt-2 sm:mt-4">
                  <button
                    onClick={() => onOpenBooking(pkg.id)}
                    className="w-full gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black py-2.5 sm:py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
                  >
                    <span>احجز هذا العرض المعتمد</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    {onSelectPackageForCalc && (
                      <button
                        onClick={() => onSelectPackageForCalc(pkg.id)}
                        className="w-full bg-[var(--color-warm-white)] hover:bg-[var(--color-soft-beige)] text-[var(--color-navy-950)] text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-xl border border-[var(--color-border)] transition-colors cursor-pointer text-center"
                      >
                        تخصيص العرض
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenShare(pkg)}
                      className="w-full bg-[var(--color-warm-white)] hover:bg-[var(--color-soft-beige)] text-[var(--color-champagne-700)] hover:text-[var(--color-navy-950)] text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 rounded-xl border border-[var(--color-border)] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[var(--color-champagne-600)]" />
                      <span>مشاركة الباقة</span>
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Guarantee Banner with Slide-in GlassCard */}
        <GlassCard
          direction="up"
          distance={30}
          delay={0.2}
          variant="luxury"
          borderAccent
          className="mt-8 sm:mt-16 p-4 sm:p-8 text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-900)]"
        >
          <div className="flex items-center gap-3 sm:gap-4 text-right">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[var(--color-champagne-500)]/20 flex items-center justify-center text-[var(--color-champagne-500)] shrink-0 border border-[var(--color-champagne-500)]/40">
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h4 className="text-base sm:text-xl font-bold font-tajawal text-white mb-0.5 sm:mb-1">
                تأكيد حجز العروض المكتوبة والمباشرة
              </h4>
              <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
                يتم الاتفاق المسبق والمكتوب على كافة التفاصيل والكوشة والتنسيق والطبخ حصراً مع إدارة القاعة.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="w-full md:w-auto shrink-0 gold-gradient text-[var(--color-navy-950)] font-bold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            تواصل واحجز موعد معاينة
          </button>
        </GlassCard>
      </div>

      {/* Share Package Modal */}
      <SharePackageModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        packageData={shareModalPackage}
      />
    </section>
  );
};
