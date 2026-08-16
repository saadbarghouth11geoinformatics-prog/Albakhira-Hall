import React from 'react';
import { Star, ShieldCheck, Award, ThumbsUp } from 'lucide-react';

interface RatingDistributionItem {
  stars: string;
  count: number;
  percentage: number;
  color: string;
}

const distributionData: RatingDistributionItem[] = [
  { stars: '5 نجوم', count: 485, percentage: 95, color: 'var(--color-champagne-500)' },
  { stars: '4 نجوم', count: 22, percentage: 4, color: 'var(--color-champagne-300)' },
  { stars: '3 نجوم', count: 3, percentage: 1, color: 'var(--color-text-muted)' },
  { stars: 'نجمتان', count: 0, percentage: 0, color: 'var(--color-text-secondary)' },
  { stars: 'نجمة واحدة', count: 0, percentage: 0, color: 'var(--color-text-secondary)' },
];

export const RatingDistribution: React.FC = () => {
  const totalReviews = 510;
  const fiveStarPercent = 95;

  return (
    <div className="bg-gradient-to-b from-[var(--color-navy-900)] via-[var(--color-navy-950)] to-[var(--color-navy-900)] p-6 sm:p-8 rounded-3xl border-2 border-[var(--color-champagne-500)]/40 shadow-2xl my-10 max-w-5xl mx-auto relative overflow-hidden">
      {/* Golden Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-champagne-100)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[var(--color-champagne-500)]/25 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/30 mb-2">
              <Award className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> إحصائيات تقييم الضيوف والعرسان
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-tajawal gold-text">
              توزيع التقييمات ومعدل الرضا الشامل
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo mt-1">
              تحليل مباشر وموثق لأكثر من {totalReviews} حفل زفاف ومناسبة أقيمت في قاعة الباخرة بجدة.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[var(--color-navy-950)]/90 p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 shadow-lg shrink-0 text-center">
            <div>
              <span className="text-3xl sm:text-4xl font-black font-tajawal text-[var(--color-champagne-100)]">4.9</span>
              <span className="text-xs text-[var(--color-text-muted)] block">من 5.0</span>
            </div>
            <div className="h-10 w-px bg-[var(--color-champagne-500)]/30" />
            <div className="text-right">
              <div className="flex items-center gap-1 text-[var(--color-champagne-500)] mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--color-champagne-500)]" />
                ))}
              </div>
              <span className="text-xs text-[#25D366] font-bold font-cairo flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {fiveStarPercent}% تقييم ممتاز (5 نجوم)
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout: Chart + Key Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Clean & Robust Rating Distribution Bars */}
          <div className="lg:col-span-8 bg-[var(--color-navy-950)]/80 p-5 sm:p-7 rounded-2xl border border-[var(--color-champagne-500)]/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-champagne-500)]/20 mb-2">
              <h4 className="text-xs sm:text-sm font-bold text-[var(--color-champagne-300)] font-tajawal flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-[var(--color-champagne-500)]" />
                <span>معدل تكرار التقييمات حسب النجوم:</span>
              </h4>
              <span className="text-[11px] text-[var(--color-navy-100)] font-mono font-bold bg-[var(--color-champagne-500)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-champagne-500)]/20">
                إجمالي {totalReviews} تقييم
              </span>
            </div>

            <div className="space-y-3.5 pt-1">
              {distributionData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-4 text-xs font-cairo group">
                  {/* Rating Label */}
                  <div className="w-20 sm:w-24 shrink-0 flex items-center gap-1.5 font-bold text-[var(--color-champagne-300)]">
                    <Star className={`w-3.5 h-3.5 ${item.count > 0 ? 'fill-[var(--color-champagne-500)] text-[var(--color-champagne-500)]' : 'text-slate-600'}`} />
                    <span>{item.stars}</span>
                  </div>

                  {/* Progress Track */}
                  <div className="flex-1 bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/20 h-4 sm:h-5 rounded-full overflow-hidden p-0.5 relative shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        idx === 0
                          ? 'gold-gradient shadow-[0_0_12px_rgba(212,175,55,0.5)]'
                          : idx === 1
                          ? 'bg-gradient-to-r from-[var(--color-champagne-700)] to-[var(--color-champagne-300)]'
                          : 'bg-slate-500'
                      }`}
                      style={{
                        width: `${item.percentage}%`,
                        minWidth: item.count > 0 ? '8px' : '0px'
                      }}
                    />
                  </div>

                  {/* Count & Percentage Display */}
                  <div className="w-28 sm:w-36 text-left shrink-0 font-mono font-bold text-xs flex items-center justify-end gap-1">
                    <span className={item.count > 0 ? 'text-[var(--color-champagne-100)]' : 'text-slate-500'}>
                      {item.count} حفل
                    </span>
                    <span className="text-[11px] text-[var(--color-champagne-500)]">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Trust Metrics */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[var(--color-navy-950)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)]/40 flex items-center justify-center text-[var(--color-champagne-500)]">
                  <Star className="w-5 h-5 fill-[var(--color-champagne-500)]" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white font-tajawal">95% تقييم 5 نجوم</h5>
                  <p className="text-[11px] text-[var(--color-navy-100)] font-cairo">
                    أغلبية ساحقة من العرسان أبدوا رضاءهم الكامل عن تنميق البوفيه والنظافة والتنظيم.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-navy-950)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white font-tajawal">مطابقة 100% للعرض</h5>
                  <p className="text-[11px] text-[var(--color-navy-100)] font-cairo">
                    جميع العروض والبنود المكتوبة في العرض الشامل تُنفذ على أرض الواقع بدقة بدون رسوم خفية.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-navy-950)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-success)]/20 border border-[var(--color-success)]/40 flex items-center justify-center text-[var(--color-success)]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white font-tajawal">الخيارات الفندقية العالية</h5>
                  <p className="text-[11px] text-[var(--color-navy-100)] font-cairo">
                    البوفيه الفضي 10م وتورتة الـ 3 دور والقهوة المباشرة تنال أعلى التقييمات باستمرار.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
