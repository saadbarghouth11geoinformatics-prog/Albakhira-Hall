import React from 'react';
import { Calendar, Sparkles, Award, ShieldCheck } from 'lucide-react';

export const BallroomEvolutionTimeline: React.FC = () => {
  const milestones = [
    {
      year: 'التأسيس والافتتاح',
      title: 'تدشين قاعة الباخرة للاحتفالات بجدة',
      desc: 'افتتاح القاعة كأحد المعالم البارزة في منطقة الحرازات بجدة، مع تصميم خارجي مستوحى من فخامة السفن العائمة ورؤية ضيافة كرم الضيافة الأصيلة.'
    },
    {
      year: 'تطوير صالة النساء والعروسة',
      title: 'إضافة جناح العروسة VIP وممر الـ 25 متر',
      desc: 'تجهيز جناح ملكي مستقر بمساحة 45م² للعروسة متضمناً مرآة الميكأب الهوليودية ومصعداً خاصاً، وتوسعة ممر العروسة الرخامي المرتفع.'
    },
    {
      year: 'التحديث الفني والتقني الشامل 2026',
      title: 'تركيب شاشة الـ 4K LED والأنظمة الصوتية والبوفيه الفضي',
      desc: 'إدخال شاشة تفاعلية بالكوشة، نظام تكييف مركزي مبرد، وبوفيه مفتوح طوله 10 أمتار مصمم من الاستيل الفضي الفندقي لحفظ حرارة الطعام.'
    }
  ];

  return (
    <div className="py-10 bg-[var(--color-navy-900)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <Calendar className="w-4 h-4" /> مسيرة التطور والتميّز الملاحي
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white">
          محطات في تاريخ قاعة الباخرة للاحتفالات بجدة
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          التزام مستمر بالتطوير والتحديث الفندقي لتقديم تجربة حفل زفاف تفوق التوقعات.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto relative before:absolute before:inset-0 before:right-6 sm:before:right-8 before:w-0.5 before:bg-[var(--color-champagne-500)]/30">
        {milestones.map((ms, idx) => (
          <div key={idx} className="relative pr-12 sm:pr-16 space-y-1">
            <span className="absolute right-3 sm:right-5 top-1 w-6 h-6 rounded-full gold-gradient text-[var(--color-navy-950)] font-bold text-xs flex items-center justify-center shadow-lg border-2 border-[var(--color-navy-950)]">
              {idx + 1}
            </span>
            <span className="text-xs bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] px-3 py-1 rounded-full font-bold border border-[var(--color-champagne-500)]/30 inline-block mb-1">
              {ms.year}
            </span>
            <h4 className="text-base font-bold font-tajawal text-white">{ms.title}</h4>
            <p className="text-xs text-[var(--color-navy-100)] font-cairo leading-relaxed bg-[var(--color-navy-950)] p-4 rounded-2xl border border-white/5">
              {ms.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
