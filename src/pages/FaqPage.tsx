import React from 'react';
import { SEO } from '../components/SEO';
import { FaqSection } from '../components/FaqSection';
import { PageTransition } from '../components/PageTransition';
import { PageVideoHeader } from '../components/PageVideoHeader';
import { SectionDivider } from '../components/SectionDivider';
import { LiveFaqSearch } from '../components/pageDetails/LiveFaqSearch';
import { HelpCircle, ShieldAlert, FileText, CheckCircle2, MessageCircle } from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

export const FaqPage: React.FC = () => {
  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="الأسئلة الشائعة وسياسات الحجز | قاعة الباخرة العائمة"
        description="إجابات كافة الأسئلة الشائعة حول حجز قاعة الباخرة العائمة، الشروط والأحكام، سداد العربون، وسياسة التعديل أو الإلغاء."
        pageType="faq"
      />

      {/* Top Hero Banner with Autoplay Video Background */}
      <PageVideoHeader
        driveId="1K9HfoSZyo_X8eF9TzFX_Enlg2EHs8Gew"
        driveUrl="https://drive.google.com/file/d/1K9HfoSZyo_X8eF9TzFX_Enlg2EHs8Gew/view?usp=drive_link"
        localVideoSrc="/Videos/video_16.mp4"
        localPoster="/Videos/posters/welcome-display.jpg"
        badge="الخصوصية والإشراف النسائي"
        subtitle="جدة - الحرازات - بعد محطة المدينة بـ 500 متر"
        title="الأسئلة الشائعة وشروط وسياسات الحجز"
        description="إجابات كافة الأسئلة الشائعة حول تفاصيل العربون، الشروط والأحكام، سياسات التعديل والإلغاء، ومعايير الخصوصية والأمان."
      />

      {/* Main FAQ Component */}
      <SectionDivider variant="crown" label="مركز الإجابات والدعم الفني" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveFaqSearch />
      </div>
      <FaqSection />

      <SectionDivider variant="diamond" label="ملخص السياسات والتعليمات الرسمية" />

      {/* Policy Terms Summary Card */}
      <section className="surface-light py-12 bg-[var(--color-soft-beige)] border-t border-[var(--color-champagne-500)]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-navy-950)] p-8 rounded-3xl border border-[var(--color-champagne-500)]/30 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[var(--color-champagne-500)]/20 pb-4">
              <FileText className="w-6 h-6 text-[var(--color-champagne-500)]" />
              <h3 className="text-xl font-bold font-tajawal gold-text">
                ملخص بنود عقد وسياسة الحجز الرسمية
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--color-navy-100)]">
              <div className="space-y-2 bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/20">
                <strong className="text-white font-tajawal text-sm block">1. تثبيت الحجز والعربون</strong>
                <p className="leading-relaxed">
                  يتم تثبيت تاريخ الحفل بدفع عربون مبدئي (30% من قيمة الباقة) مع استلام العقد الموثق رسمياً برقم الحجز ورقم الطاولة والخدمات المطلوبة.
                </p>
              </div>

              <div className="space-y-2 bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/20">
                <strong className="text-white font-tajawal text-sm block">2. سداد باقي المستحقات</strong>
                <p className="leading-relaxed">
                  يتم سداد المبلغ المتبقي على دفعتين، على أن تسدد الدفعة النهائية قبل موعد الحفل بـ 3 أيام عمل لضمان تجهيز المشتريات والبوفيه.
                </p>
              </div>

              <div className="space-y-2 bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/20">
                <strong className="text-white font-tajawal text-sm block">3. تغيير التاريخ أو التعديل</strong>
                <p className="leading-relaxed">
                  يمكن تغيير موعد الحفل مجانًا حتى قبل الموعد بـ 15 يومًا في حال وجود تاريخ آخر متاح بجدول الحجوزات، دون تطبيق أي رسوم إضافية.
                </p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <a
                href={`https://wa.me/${HALL_SPECS.whatsappNumber}?text=${encodeURIComponent('مرحباً قاعة الباخرة، أود الاستفسار عن شروط وسياسة الحجز المكتوبة.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تحدث مع موظف خدمة العملاء عبر الواتساب مباشرة</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
