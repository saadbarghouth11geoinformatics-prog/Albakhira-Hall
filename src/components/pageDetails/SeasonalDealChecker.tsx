import React, { useState } from 'react';
import { Calendar, Sparkles, Award, Gift, CheckCircle2 } from 'lucide-react';

export const SeasonalDealChecker: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<'summer' | 'winter' | 'eid' | 'earlybird'>('summer');

  const SEASONS = {
    summer: {
      title: 'عروض الموسم الصيفي وموسم الأفراح 2026',
      badge: 'مزايا الموسم + شلال عصائر',
      details: 'يشمل إضافة شلال عصائر الفواكه الطبيعية 30 لتر مجاناً مع ترقية خدمات الضيافة عند تثبيت الحجز.',
      bonusList: ['شلال عصائر فواكه 30L مجاناً', 'تعديل تاريخ الحفل مجاناً', 'توفير كشاف العروسة والليزرات']
    },
    winter: {
      title: 'عروض الشتاء والأجواء الرائعة بالحرازات',
      badge: 'جلسات الحوش الخارجي مجاناً',
      details: 'تجهيز الحوش الخارجي بـ 100 فرش جلسات شعبية مع مباخر العود والشاي التخادر والقهوة السعودية مجاناً.',
      bonusList: ['100 فرش جلسات حوش مجاناً', 'شبة نار ومباخر عود أزرق', 'تأمين حارس بوابة النساء']
    },
    eid: {
      title: 'عروض الأعياد والمناسبات العائلية والكبيرة',
      badge: 'تورتة VIP 4 أدوار مجاناً',
      details: 'خصم خاص لحجوزات الأعياد مع ترقية تورتة العروسين إلى 4 أدوار VIP ومباشرين إضافيين لقسم الرجال.',
      bonusList: ['ترقية التورتة لـ 4 أدوار VIP', '80 صحن حلا ومعجنات', 'مباشرات إضافيات للصالة']
    },
    earlybird: {
      title: 'باقة الحجز المبكر (تأكيد الحجز قبل 90 يوماً)',
      badge: 'خصم 10% + ترقية مجانية',
      details: 'عند تأكيد عربون القاعة قبل موعد الحفل بـ 3 أشهر على الأقل تحصل على خصم 10% من الفاتورة الإجمالية.',
      bonusList: ['خصم 10% من إجمالي الفاتورة', 'تثبيت وحجز الموعد المفضل', 'أولوية اختيار الكوشة والدي جي']
    }
  };

  const current = SEASONS[selectedSeason];

  return (
    <div className="py-10 bg-[var(--color-warm-white)] rounded-3xl border border-[var(--color-border)] p-6 sm:p-8 my-8 shadow-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] text-xs font-bold border border-[var(--color-champagne-500)]/30 inline-flex items-center gap-1.5 mb-2">
          <Calendar className="w-4 h-4 text-[var(--color-champagne-600)]" /> مستكشف العروض الموسمية الحصرية
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-[var(--color-navy-950)]">
          اكتشف المزايا والهدية المجانية حسب موسم حفلكم
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] font-cairo mt-1">
          اضغط على الموسم المحدد لمناسبتكم لمعرفة المزايا والهدايا الإضافية المشمولة تلقائياً مع العقد.
        </p>
      </div>

      {/* Season Buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
        {[
          { id: 'summer', label: 'الموسم الصيفي' },
          { id: 'winter', label: 'موسم الشتاء' },
          { id: 'eid', label: 'موسم الأعياد' },
          { id: 'earlybird', label: 'الحجز المبكر (90 يوماً)' }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSelectedSeason(btn.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSeason === btn.id
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-md scale-105 font-black'
                : 'bg-[var(--color-ivory)] text-[var(--color-navy-950)] border border-[var(--color-border)] hover:border-[var(--color-champagne-500)]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Selected Season Card */}
      <div className="bg-[var(--color-ivory)] p-6 rounded-2xl border border-[var(--color-champagne-500)]/40 space-y-4 max-w-3xl mx-auto shadow-md">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
          <h4 className="text-lg font-bold font-tajawal text-[var(--color-navy-950)] flex items-center gap-2">
            <Gift className="w-5 h-5 text-[var(--color-champagne-600)]" />
            <span>{current.title}</span>
          </h4>
          <span className="text-xs bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] px-3 py-1 rounded-full font-bold border border-[var(--color-champagne-500)]/30">
            {current.badge}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-cairo leading-relaxed">{current.details}</p>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-[var(--color-champagne-700)] block">الهدايا والمزايا المضافة مجاناً:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {current.bonusList.map((bonus, i) => (
              <div key={i} className="bg-[var(--color-warm-white)] p-3 rounded-xl border border-[var(--color-success)]/40 text-[11px] text-[var(--color-success)] font-bold flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{bonus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
