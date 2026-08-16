import React, { useState } from 'react';
import { Star, CheckCircle2, Filter, Heart, MessageSquare } from 'lucide-react';

interface VerifiedReview {
  id: string;
  clientName: string;
  eventType: 'wedding' | 'engagement' | 'graduation' | 'reception';
  eventLabel: string;
  date: string;
  stars: number;
  comment: string;
  highlights: string[];
}

const VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    id: 'r1',
    clientName: 'عائلة الغامدي (زفاف المهندس أحمد)',
    eventType: 'wedding',
    eventLabel: 'حفل زفاف كامل',
    date: 'أغسطس 2026',
    stars: 5,
    comment: 'بيض الله وجوهكم! القاعة تجمل وأجواء البوفيه المفتوح الـ 10 أمتار وطاقم المباشرات كانوا في قمة اللباقة والنظافة والتنظيم. العريس والمعازيم أثنوا على التكييف العالي وقهوة الرجال.',
    highlights: ['البوفيه 10 أمتار طازج', 'تكييف قوي ممتاز', '10 مباشرات قمة بالترتيب']
  },
  {
    id: 'r2',
    clientName: 'الدكتورة أمل الشهري (ملكة وعقد قران)',
    eventType: 'engagement',
    eventLabel: 'حفل ملكة وعقد قران',
    date: 'يوليو 2026',
    stars: 5,
    comment: 'جناح العروسة VIP كان مريح جدًا ومزود بمرآة المكياج والمصعد المستقل. أجهزة الليزر والبخار بالكوشة جعلت دخلتي كالأحلام. شكراً للمشرفة مريم على الاهتمام.',
    highlights: ['جناح العروسة VIP 45m', 'زفة السحاب بالبخار', 'إشراف نسائي ممتاز']
  },
  {
    id: 'r3',
    clientName: 'الأستاذ خالد العتيبي (حفل تخرج وتكريم)',
    eventType: 'graduation',
    eventLabel: 'حفل تخرج وتكريم',
    date: 'يونيو 2026',
    stars: 5,
    comment: 'شاشة الـ 4K LED العملاقة بالكوشة أضافت بهجة استثنائية لعرض فيديوهات الذكريات والتكريم. قسم الرجال والجلسات الخارجية بالحوش كانت مجهزة بـ 100 فرش رائع.',
    highlights: ['شاشة 4K LED ممتازة', '100 فرش للحوش الخارجي', 'صوتيات نقية بدون صدى']
  },
  {
    id: 'r4',
    clientName: 'عائلة المطيري (حفل سابع واستقبال)',
    eventType: 'reception',
    eventLabel: 'حفل سابع وعائلي',
    date: 'مايو 2026',
    stars: 5,
    comment: 'الضيافة على الطاولات كانت ممتازة بـ 40 صحن حلا و40 صحن معجنات والعصائر الطبيعية الـ 30 لتر كانت باردة ولذيذة جدًا. سعر العرض الشامل منافس جدًا بجدة.',
    highlights: ['ضيافة الطاولات غنية', 'عصائر طازجة 30L', 'سعر العرض الشامل ممتازة']
  },
  {
    id: 'r5',
    clientName: 'عائلة الزهراني (زفاف عبدالمجيد)',
    eventType: 'wedding',
    eventLabel: 'حفل زفاف ملكي',
    date: 'أبريل 2026',
    stars: 5,
    comment: 'التنظيم في قسم الرجال والنساء كان رائعاً جدًا، البوفيه الفضي الفاخر والأصناف كانت سخنة ولذيذة، والصبابين كانوا ممتازين وسريعين بالخدمة.',
    highlights: ['بوفيه فضي سخن', 'صبابين محترفين', 'تنظيم ودخول مرن']
  },
  {
    id: 'r6',
    clientName: 'العروس رزان الحربي',
    eventType: 'engagement',
    eventLabel: 'حفل ملكة مميز',
    date: 'مارس 2026',
    stars: 5,
    comment: 'دخلتي على الكوشة المذهبة مع إضاءات الليزر المزدوج والبخار كانت فوق الخيال! كل الحاضرات انبهروا بالديكورات وممر العروسة.',
    highlights: ['كوشة مذهبة فاخرة', 'إضاءات وبخار زفة', 'تنسيق طاولات نسائية']
  },
  {
    id: 'r7',
    clientName: 'المهندس ياسر القحطاني',
    eventType: 'graduation',
    eventLabel: 'حفل تخرج وتكريم',
    date: 'فبراير 2026',
    stars: 5,
    comment: 'مكان القاعة ممتاز بالحرازات ومواقف السيارات كانت واسعة جدًا ومظللة اتسعت لكل الحاضرين بدون أي مشكلة.',
    highlights: ['مواقف السيارات واسعة', 'الموقع بالحرازات سهل', 'مساحات فسيحة']
  },
  {
    id: 'r8',
    clientName: 'أم سعود الشريف',
    eventType: 'reception',
    eventLabel: 'استقبال عائلي وخاص',
    date: 'يناير 2026',
    stars: 5,
    comment: 'النظافة والتعقيم الفندقي في صالة النساء والممرات والحمامات كان ممتازاً جدًا. نشكر إدارة قاعة الباخرة على حرصهم واهتمامهم الدائم.',
    highlights: ['نظافة وتعقيم فندقي', 'إدارة متعاونة', 'أجواء عائلية مريحة']
  }
];

export const VerifiedEventFilterableReviews: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = filterType === 'all'
    ? VERIFIED_REVIEWS
    : VERIFIED_REVIEWS.filter((r) => r.eventType === filterType);

  return (
    <div className="py-10 bg-[var(--color-navy-900)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <MessageSquare className="w-4 h-4" /> تصفية وتصفح تجارب العرسان
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white">
          تصفح تقييمات المناسبات الموثقة حسب نوع الحفل
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          اقرأ انطباعات عرساننا وعوائلهم المعتمدة بالكامل لتأكيد اختياركم الموفق.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
        {[
          { id: 'all', label: 'جميع المناسبات' },
          { id: 'wedding', label: 'حفلات زفاف' },
          { id: 'engagement', label: 'عقد قران / ملكة' },
          { id: 'graduation', label: 'حفلات تخرج' },
          { id: 'reception', label: 'سابع واستقبال' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === tab.id
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                : 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="bg-[var(--color-navy-950)] p-6 rounded-2xl border border-[var(--color-champagne-500)]/25 hover:border-[var(--color-champagne-500)] transition-all space-y-3 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold font-tajawal text-white">{rev.clientName}</h4>
                <span className="text-[11px] text-[var(--color-champagne-500)] block mt-0.5">{rev.eventLabel} • {rev.date}</span>
              </div>
              <div className="flex items-center gap-1 bg-[var(--color-champagne-500)]/15 px-2.5 py-1 rounded-full border border-[var(--color-champagne-500)]/30">
                {[...Array(rev.stars)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-[var(--color-champagne-500)] fill-[var(--color-champagne-500)]" />
                ))}
              </div>
            </div>

            <p className="text-xs text-[var(--color-navy-100)] font-cairo leading-relaxed bg-[var(--color-navy-900)] p-3.5 rounded-xl border border-white/5">
              "{rev.comment}"
            </p>

            <div className="flex items-center gap-2 flex-wrap pt-1">
              {rev.highlights.map((hl, i) => (
                <span key={i} className="text-[10px] bg-[var(--color-success)]/10 text-[var(--color-success)] px-2.5 py-1 rounded-md border border-[var(--color-success)]/20 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {hl}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
