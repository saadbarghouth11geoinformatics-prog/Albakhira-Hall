import React, { useState } from 'react';
import { Download, Share2, Printer, CheckCircle2, MessageCircle, FileText } from 'lucide-react';
import { HALL_SPECS } from '../../data/hallData';

interface WeddingBudgetExporterProps {
  packageName?: string;
}

export const WeddingBudgetExporter: React.FC<WeddingBudgetExporterProps> = ({
  packageName = 'العرض الشامل الملكي (نساء + رجال)'
}) => {
  const [copiedQuote, setCopiedQuote] = useState(false);

  const quoteSummaryText = `تسمية العرض المختار: ${packageName}
المواصفات: بوفيه مفتوح بطول 10 أمتار + تورتة من 3 أدوار + 80 صحن ضيافة + 30L عصائر طازجة + 20 فرد طاقم خدمة + قسم الرجال و100 فرش حوش.
قاعة الباخرة بجدة - الحرازات (بعد محطة المدينة بـ 500m)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(quoteSummaryText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 bg-[var(--color-navy-900)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[var(--color-champagne-500)]/20 pb-6">
        <div>
          <span className="text-xs font-bold text-[var(--color-champagne-500)] flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> ملخص مواصفات وتجهيزات العرض
          </span>
          <h3 className="text-xl font-bold font-tajawal text-white mt-1">
            مشاركة وتصدير كشف مواصفات عرض الزفاف
          </h3>
          <p className="text-xs text-[var(--color-navy-100)] mt-0.5 font-cairo">
            تستطيع طباعة الكشف أو مشاركته فورًا عبر الواتساب لتنسيق التفاصيل مع شريك العمر.
          </p>
        </div>

        <div className="bg-[var(--color-navy-950)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/40 text-center shrink-0">
          <span className="text-[11px] text-[var(--color-navy-100)] block">حالة العرض المعتمد:</span>
          <span className="text-xl font-black font-tajawal text-[var(--color-champagne-300)]">معتمد من الإدارة</span>
        </div>
      </div>

      <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-xl bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/40 text-xs font-bold hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all cursor-pointer flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة ملخص المواصفات والمعاينة</span>
        </button>

        <button
          onClick={handleCopy}
          className="px-5 py-3 rounded-xl bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 text-xs font-bold hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all cursor-pointer flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>{copiedQuote ? 'تم نسخ الكشف للحافظة!' : 'نسخ ملخص العرض لتطبيق آخر'}</span>
        </button>

        <a
          href={`https://wa.me/${HALL_SPECS.whatsappNumber}?text=${encodeURIComponent(`مرحباً قاعة الباخرة، أود تثبيت واستفسار عن هذا العرض:\n${quoteSummaryText}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-[#25D366] text-black font-bold text-xs hover:bg-[#1ebd59] transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>إرسال العرض للإدارة عبر الواتساب</span>
        </a>
      </div>
    </div>
  );
};
