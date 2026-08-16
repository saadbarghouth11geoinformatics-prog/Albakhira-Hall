import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  Instagram,
  QrCode,
  FileText,
  Share2,
  Printer,
  Check,
  Calendar,
  UtensilsCrossed,
  Cake,
  Users,
  Coffee,
  HeartHandshake,
  Flame,
  Music,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { HALL_SPECS } from '../data/hallData';

interface OfficialOffersDocumentCardProps {
  onOpenBooking: (packageId?: string) => void;
}

export const OfficialOffersDocumentCard: React.FC<OfficialOffersDocumentCardProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men'>('all');
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    const text = `عروض قاعة الباخرة للاحتفالات بجدة - الحرازات
----------------------------------------
الخدمات المقدمة في قسم الرجال:
• عدد (10) مباشرين في قسم الرجال مع القهوجي وحارس بوابة النساء.
• توفر القاعة (القهوة) - (الشاي أحمر - أخضر).
• تأمين عدد (100) فرش للحوش مع الجلسات.
• توفر القاعة جميع أدوات النظافة للرجال (صابون على المغاسل - وأعواد أسنان - وكالونيا).
• توفر القاعة مناديل في استقبال العريس - وفحم مع المباخر.

الخدمات المقدمة في قسم النساء:
• توفر القاعة (10 متر بوفيه مفتوح من القائمة الفضية لعدد 100 سيدة).
• توفر القاعة تورتة (3 دور) مع البوفيه.
• تأمين القاعة (40) صحن ضيافة حلا وعدد (40) صحن ضيافة معجنات على (40) طاولة مجاناً.
• تأمين القاعة الفحم والمباخر.
• عاملات مسك فستان العروسة أثناء الزفة.
• عدد (10) مباشرات مع المشرفة.
• تأمين القاعة عدد (30) لتر عصيرات: مانجو - جوافه - كوكتيل.
• تشغيل دي جي قبل وصول المطربة مجاناً.
• تشغيل زفة العروسة - زفة العصير - ليزرات - البخار - كشاف العروسة مجاناً - مرة واحدة.
• توفر القاعة جميع أدوات النظافة ومناديل على جميع الطاولات.

ملاحظات على العميل يتم الاتفاق عليها مع القاعة مسبقاً:
• يتم حجز الكوشة والمداخل والكافي وتنسيق صالة النساء عن طريق القاعة (حسب الاتفاق) مع العميل ويمنع من خارج القاعة.
• يتم حجز البوفيه والحلويات والطبخ عن طريق القاعة حسب الاتفاق.
• على المستأجر مفتشة الجوالات ولوازم الأكل (السُفر - الصحون البلاستيكية - التمر - المياه - المشروبات).

جدة - الحرازات - بعد محطة المدينة بـ 500 متر
جوال: 0500292974 - 0534049130
إنستغرام: @Albakhera.1`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 font-cairo" dir="rtl">
      {/* Control Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] text-xs font-bold border border-[var(--color-champagne-500)]/30">
            <FileText className="w-3.5 h-3.5" />
            <span>ورقة المواصفات الرسمية المعتمدة</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black font-tajawal text-[var(--color-navy-950)] mt-1">
            تفاصيل وثيقة عروض قاعة الباخرة للاحتفالات
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="px-3.5 py-2 rounded-xl bg-[var(--color-warm-white)] hover:bg-[var(--color-soft-beige)] text-[var(--color-text)] border border-[var(--color-border)] text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[var(--color-champagne-700)]" />}
            <span>{copied ? 'تم نسخ الوثيقة' : 'نسخ النص'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-[var(--color-warm-white)] hover:bg-[var(--color-soft-beige)] text-[var(--color-text)] border border-[var(--color-border)] text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer hidden sm:flex"
          >
            <Printer className="w-3.5 h-3.5 text-[var(--color-champagne-700)]" />
            <span>طباعة الوثيقة</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border)] mb-6 shadow-xs max-w-md">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
            activeTab === 'all'
              ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-navy-950)]'
          }`}
        >
          الوثيقة الشاملة
        </button>
        <button
          onClick={() => setActiveTab('women')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
            activeTab === 'women'
              ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-navy-950)]'
          }`}
        >
          قسم النساء
        </button>
        <button
          onClick={() => setActiveTab('men')}
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
            activeTab === 'men'
              ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] shadow-xs'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-navy-950)]'
          }`}
        >
          قسم الرجال
        </button>
      </div>

      {/* The Styled Official Document Card (Exact Replica in Premium Theme) */}
      <div className="bg-white rounded-3xl border-2 border-[var(--color-champagne-500)]/40 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle watermark background logo */}
        <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none w-96 h-96">
          <img src="/logo-official.jpg" alt="watermark" className="w-full h-full object-contain" />
        </div>

        {/* Document Header with Golden Badge and Official Logo */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[var(--color-champagne-500)]/30 pb-6 mb-8 text-center sm:text-right">
          <div className="flex items-center gap-4">
            <img
              src="/logo-official.jpg"
              alt="شعار قاعة الباخرة للاحتفالات"
              className="h-16 sm:h-20 w-auto object-contain"
            />
            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black mb-1">
                عــــروض
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-tajawal text-[var(--color-navy-950)]">
                قاعة الباخرة للاحتفالات
              </h2>
              <p className="text-xs text-[var(--color-text-muted)] font-tajawal">جدة - الحرازات</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/womens-hall"
              className="px-3 py-1.5 rounded-xl bg-[var(--color-champagne-100)] hover:bg-[var(--color-champagne-200)] text-[var(--color-champagne-700)] text-xs font-bold flex items-center gap-1 border border-[var(--color-champagne-500)]/40 transition-colors"
            >
              <span>صفحة صالة النساء</span>
              <ArrowLeft className="w-3 h-3" />
            </Link>
            <Link
              to="/mens-hall"
              className="px-3 py-1.5 rounded-xl bg-[var(--color-navy-950)] hover:bg-[var(--color-navy-900)] text-white text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <span>صفحة قسم الرجال</span>
              <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Men's Services Block */}
        {(activeTab === 'all' || activeTab === 'men') && (
          <div className="mb-8">
            <div className="inline-block bg-amber-400/90 text-[var(--color-navy-950)] font-black text-sm sm:text-base px-5 py-1.5 rounded-xl mb-4 shadow-sm">
              الخدمات المقدمة في قسم الرجال:
            </div>
            <ul className="space-y-3 pr-2">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  عدد <strong className="text-amber-700">(10)</strong> مباشرين في قسم الرجال مع القهوجي وحارس بوابة النساء.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  توفر القاعة <strong className="text-amber-700">(القهوة)</strong> - <strong className="text-amber-700">(الشاي أحمر - أخضر)</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  تأمين عدد <strong className="text-amber-700">(100)</strong> فرش للحوش مع الجلسات التراثية المريحة.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  توفر القاعة جميع أدوات النظافة للرجال <strong className="text-amber-700">(صابون على المغاسل - وأعواد أسنان - وكالونيا)</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  توفر القاعة مناديل في استقبال العريس - وفحم مع المباخر الفاخرة.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Women's Services Block */}
        {(activeTab === 'all' || activeTab === 'women') && (
          <div className="mb-8">
            <div className="inline-block bg-amber-400/90 text-[var(--color-navy-950)] font-black text-sm sm:text-base px-5 py-1.5 rounded-xl mb-4 shadow-sm">
              الخدمات المقدمة في قسم النساء:
            </div>
            <ul className="space-y-3 pr-2">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  توفر القاعة <strong className="text-amber-700">(10 متر بوفيه مفتوح من القائمة الفضية لعدد 100 سيدة)</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  توفر القاعة <strong className="text-amber-700">تورتة (3 دور)</strong> مع البوفيه.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  تأمين القاعة <strong className="text-amber-700">(40) صحن ضيافة حلا</strong> وعدد <strong className="text-amber-700">(40) صحن ضيافة معجنات</strong> على <strong className="text-amber-700">(40) طاولة مجاناً</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  تأمين القاعة الفحم والمباخر الفاخرة.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  عاملات مسك فستان العروسة أثناء الزفة.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  عدد <strong className="text-amber-700">(10)</strong> مباشرات مع المشرفة العامة.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  تأمين القاعة عدد <strong className="text-amber-700">(30) لتر عصيرات: مانجو - جوافه - كوكتيل</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  تشغيل دي جي قبل وصول المطربة <strong className="text-amber-700">مجاناً</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  تشغيل زفة العروسة - زفة العصير - ليزرات - البخار - كشاف العروسة <strong className="text-amber-700">مجاناً - مرة واحدة</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 font-black text-lg leading-none mt-0.5">❖</span>
                <span className="text-xs sm:text-sm text-[var(--color-navy-950)] font-bold">
                  توفر القاعة جميع أدوات النظافة ومناديل على جميع الطاولات.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Client Notes & Agreement */}
        <div className="mb-8 p-5 rounded-2xl bg-[var(--color-ivory)] border border-[var(--color-border)]">
          <div className="inline-block bg-amber-400/90 text-[var(--color-navy-950)] font-black text-xs sm:text-sm px-4 py-1 rounded-lg mb-3 shadow-xs">
            ملاحظات على العميل يتم الاتفاق عليها مع القاعة مسبقاً:
          </div>
          <ul className="space-y-2.5 pr-2">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-black text-base leading-none mt-0.5">❖</span>
              <span className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-bold">
                يتم حجز الكوشة والمداخل والكافي وتنسيق صالة النساء عن طريق القاعة (حسب الاتفاق) مع العميل ويمنع من خارج القاعة.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-black text-base leading-none mt-0.5">❖</span>
              <span className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-bold">
                يتم حجز البوفيه والحلويات والطبخ عن طريق القاعة حسب الاتفاق.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-black text-base leading-none mt-0.5">❖</span>
              <span className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-bold">
                على المستأجر مفتشة الجوالات ولوازم الأكل (السُفر - الصحون البلاستيكية - التمر - المياه - المشروبات).
              </span>
            </li>
          </ul>
        </div>

        {/* Document Footer Banner (Exact Details from Paper) */}
        <div className="bg-amber-400 rounded-2xl p-4 sm:p-5 text-center text-[var(--color-navy-950)] font-bold shadow-md">
          <div className="text-sm sm:text-base font-black font-tajawal mb-1">
            جدة - الحرازات - بعد محطة المدينة بـ 500 متر
          </div>
          <div className="text-xs sm:text-sm font-black flex flex-wrap items-center justify-center gap-4">
            <a href="tel:0500292974" className="hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>جوال: <span dir="ltr">0500292974</span></span>
            </a>
            <span>-</span>
            <a href="tel:0534049130" className="hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span><span dir="ltr">0534049130</span></span>
            </a>
            <span>-</span>
            <a
              href="https://instagram.com/Albakhera.1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@Albakhera.1</span>
            </a>
          </div>
        </div>

        {/* Action Bar at Bottom of Document */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>وثيقة معتمدة ومطابقة لعقد حجز قاعة الباخرة للاحتفالات</span>
          </div>

          <button
            onClick={() => onOpenBooking('albakhera-grand-offer')}
            className="btn-primary font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[var(--color-champagne-300)]" />
            <span>طلب حجز وتثبيت التاريخ الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
