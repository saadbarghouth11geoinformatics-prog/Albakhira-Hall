import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const SatisfactionMetricsRadar: React.FC = () => {
  const metrics = [
    { label: 'نظافة الصالات والدورات والجناح الملكي', score: 99 },
    { label: 'جودة وطازجية البوفيه المفتوح والضيافة', score: 98 },
    { label: 'تعامل المشرفة وطاقم المباشرات والمباشرين', score: 100 },
    { label: 'قوة التكييف المركزي والانشراح الحراري', score: 97 },
    { label: 'نقاوة الصوتيات ووضوح شاشة الـ 4K LED', score: 99 },
  ];

  return (
    <div className="py-10 bg-[var(--color-navy-950)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <Award className="w-4 h-4" /> مؤشرات الرضا الفندقي الموثقة
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white">
          نسب الرضا المعتمدة حسب استبيانات ضيوف القاعة
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          نتائج التقييم المباشر المأخوذة من عرساننا بعد انتهاء الحفلات لضمان أعلى مستويات الفخامة والالتزام.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/20 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold font-tajawal">
              <span className="text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
                <span>{m.label}</span>
              </span>
              <span className="text-[var(--color-champagne-300)]">{m.score}%</span>
            </div>
            <div className="w-full h-2.5 bg-[var(--color-navy-950)] rounded-full overflow-hidden border border-[var(--color-champagne-500)]/20">
              <div
                className="h-full gold-gradient rounded-full transition-all duration-1000"
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
