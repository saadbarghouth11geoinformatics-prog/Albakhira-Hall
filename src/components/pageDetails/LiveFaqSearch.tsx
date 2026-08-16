import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, Type, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'كم يبلغ مقدار العربون المبدئي لتثبيت تاريخ الحجز؟',
    answer: 'يتم تثبيت تاريخ الحفل بدفع عربون مبدئي بنسبة 30% من قيمة الباقة المختارة، مع تحرير وتوثيق العقد الرسمي متضمناً كافة الشروط والخدمات المشمولة.',
    category: 'الحجز والعروض'
  },
  {
    id: '2',
    question: 'هل يتاح تعديل تاريخ الحفل مجانًا؟',
    answer: 'نعم، يحق للعميل طلب تعديل أو ترحيل تاريخ الحفل مجانًا قبل موعد المناسبة بـ 15 يومًا على الأقل، بشرط توفر التاريخ الجديد المفضل في الجدول الملاحي للقاعة.',
    category: 'السياسات والتأجيل'
  },
  {
    id: '3',
    question: 'ما هي السياسة المتبعة بخصوص المشروبات والدي جي وتصوير النساء؟',
    answer: 'توفر القاعة مشرفة أمن ومفتشة جوالات لقسم النساء لضمان الخصوصية التامة، ويمنع دخول الجوالات ذات الكاميرات المفتوحة أثناء الزفة. كما توفر القاعة دي جي متكامل أو إمكانية التنسيق مع دي جي خارجي.',
    category: 'الخصوصية والتنظيم'
  },
  {
    id: '4',
    question: 'ما هي سعة القاعة لقسمي النساء والرجال والحوش الخارجي؟',
    answer: 'تسع صالة النساء حتى 200 سيدة مع بوفيه مفتوح 10 أمتار، وقسم الرجال يستوعب حتى 200 رجل، بالإضافة إلى الحوش الخارجي المجهز بـ 100 فرش للجلسات الشعبية التراثية.',
    category: 'المساحة والسعة'
  },
  {
    id: '5',
    question: 'ما هي مواعيد المعاينة والاستقبال الميداني؟',
    answer: 'تستقبل إدارة القاعة المراجعات والمعاينات الميدانية يومياً من الساعة 4:30 مساءً وحتى 11:30 مساءً. يفضل حجز موعد مسبق لضمان استقبال موظف المبيعات وتنسيق جولة شاملة.',
    category: 'المعاينة والزيارة'
  }
];

export const LiveFaqSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [fontScale, setFontScale] = useState<number>(100);

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.includes(searchTerm) ||
      item.answer.includes(searchTerm) ||
      item.category.includes(searchTerm)
  );

  return (
    <div className="py-8 bg-[var(--color-navy-900)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <HelpCircle className="w-4 h-4" /> محرك البحث الفوري في الأسئلة والشروط
        </span>
        <h3 className="text-xl sm:text-2xl font-black font-tajawal text-white">
          بحث سريع وتصفح فوري في كافة إجابات وسياسات القاعة
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          اكتب أي كلمة مفتاحية (مثل: عربون، بوفيه، تصوير، تأجيل، مواعيد) للوصول المباشر للإجابة.
        </p>
      </div>

      {/* Font Size Adjuster Control Bar */}
      <div className="max-w-xl mx-auto mb-6 bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-[var(--color-champagne-500)] shrink-0" />
          <span className="text-[var(--color-champagne-300)] font-bold text-[11px] sm:text-xs">حجم النص: {fontScale}%</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFontScale(85)}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              fontScale === 85 ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)]' : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-white/10'
            }`}
          >
            صغير
          </button>
          <button
            onClick={() => setFontScale(100)}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              fontScale === 100 ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)]' : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-white/10'
            }`}
          >
            عادي
          </button>
          <button
            onClick={() => setFontScale(115)}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
              fontScale === 115 ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)]' : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-white/10'
            }`}
          >
            كبير
          </button>

          <div className="h-3.5 w-px bg-white/20 mx-0.5" />

          <button
            onClick={() => setFontScale((s) => Math.max(85, s - 15))}
            className="w-7 h-7 rounded-lg bg-[var(--color-navy-900)] border border-white/10 text-white flex items-center justify-center font-bold hover:border-[var(--color-champagne-500)] cursor-pointer"
            title="تصغير"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setFontScale((s) => Math.min(145, s + 15))}
            className="w-7 h-7 rounded-lg bg-[var(--color-navy-900)] border border-white/10 text-white flex items-center justify-center font-bold hover:border-[var(--color-champagne-500)] cursor-pointer"
            title="تكبير"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setFontScale(100)}
            className="p-1.5 rounded-lg bg-[var(--color-navy-900)] border border-white/10 text-[var(--color-champagne-500)] hover:text-white cursor-pointer"
            title="إعادة ضبط"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث هنا عن موضوع أو سؤال معين..."
          className="w-full bg-[var(--color-navy-950)] border-2 border-[var(--color-champagne-500)]/40 rounded-2xl py-3.5 pl-4 pr-11 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo shadow-inner"
        />
        <Search className="w-5 h-5 text-[var(--color-champagne-500)] absolute right-4 top-4" />
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-xs text-[var(--color-navy-100)]">
            لم يتم العثور على أسئلة تطابق "<strong>{searchTerm}</strong>". تواصل معنا عبر الواتساب للإجابة المباشرة.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[var(--color-navy-950)] rounded-2xl border border-[var(--color-champagne-500)]/25 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : faq.id)}
                  className="w-full p-4 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--color-navy-900)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] px-2.5 py-1 rounded-md font-bold shrink-0">
                      {faq.category}
                    </span>
                    <h4
                      className="font-bold font-tajawal text-white transition-all"
                      style={{ fontSize: `${(14 * (fontScale / 100)).toFixed(1)}px` }}
                    >
                      {faq.question}
                    </h4>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[var(--color-champagne-500)] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[var(--color-navy-100)] shrink-0" />}
                </button>
                {isOpen && (
                  <div
                    className="p-4 pt-2 text-[var(--color-navy-100)] font-cairo leading-relaxed border-t border-white/5 bg-[var(--color-navy-900)]/50 transition-all"
                    style={{ fontSize: `${(13 * (fontScale / 100)).toFixed(1)}px` }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
