import React from 'react';
import { SEO } from '../components/SEO';
import { OfferCalculator } from '../components/OfferCalculator';
import { PageTransition } from '../components/PageTransition';
import { PageVideoHeader } from '../components/PageVideoHeader';
import { WeddingBudgetExporter } from '../components/pageDetails/WeddingBudgetExporter';
import { CustomAddonConfigurator } from '../components/pageDetails/CustomAddonConfigurator';
import { useSearchParams } from 'react-router-dom';
import { Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

interface CalculatorPageProps {
  onOpenBookingWithData: (data: any) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onOpenBookingWithData }) => {
  const [searchParams] = useSearchParams();
  const packageFromUrl = searchParams.get('package') || 'albakhera-grand-offer';

  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="حاسبة عروض قاعة الباخرة للاحتفالات بجدة"
        description="حساب تكلفة العروض المعتمدة لقاعة الباخرة للاحتفالات بجدة (الحرازات). بوفيه مفتوح 10 متر فضي، 3 دور تورتة، ضيافة 40 طاولة وقسم رجال متكامل."
        pageType="calculator"
      />

      {/* Top Hero Banner with Autoplay Video Background */}
      <PageVideoHeader
        driveId="1XNcI2FahQcrlm651TnBLW7DHtK-WuYU5"
        driveUrl="https://drive.google.com/file/d/1XNcI2FahQcrlm651TnBLW7DHtK-WuYU5/view?usp=drive_link"
        localVideoSrc="/Videos/video_14.mp4"
        localPoster="/Videos/posters/welcome-display.jpg"
        badge="احسب تفاصيل باقتك بسهولة"
        subtitle="جدة - الحرازات - بعد محطة المدينة بـ 500 متر"
        title="حاسبة عروض قاعة الباخرة للاحتفالات"
        description="اختر العرض وعدد الضيوف وسياسات الاتفاق للحصول على الحسبة الدقيقة الفورية الشاملة لكافة الخدمات والبوفيه."
      />

      {/* Calculator Main Section */}
      <OfferCalculator
        initialPackageId={packageFromUrl}
        onOpenBookingWithData={onOpenBookingWithData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomAddonConfigurator />
        <WeddingBudgetExporter />
      </div>

      {/* Notes & Policies Section */}
      <section className="surface-light py-12 bg-[var(--color-soft-beige)] border-t border-[var(--color-champagne-500)]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-navy-950)] p-8 rounded-3xl border border-[var(--color-champagne-500)]/30 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[var(--color-champagne-500)]/20 pb-4">
              <Sparkles className="w-6 h-6 text-[var(--color-champagne-500)]" />
              <h3 className="text-xl font-bold font-tajawal gold-text">
                شروط وسياسات الاتفاق المعتمدة في ورقة القاعة
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[var(--color-navy-100)]">
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> الكوشة والتنسيقات من القاعة حصراً
                </h4>
                <p className="leading-relaxed">
                  حجز وتنسيق صالة النساء والكوشة والمداخل والكافيه حصراً عن طريق القاعة ويمنع إدخالها من الخارج.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> البوفيه والحلويات والطبخ
                </h4>
                <p className="leading-relaxed">
                  حجز البوفيه والحلويات والطبخ عن طريق القاعة بالاتفاق المكتوب والمسبق لضمان الجودة والطازجية.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> التزام مفتشة الجوالات
                </h4>
                <p className="leading-relaxed">
                  يلتزم المستأجر بتوفير مفتشة جوالات لقسم النساء لضمان الخصوصية والراحة التامة للمعازيم.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> التزام لوازم الأكل والسفر
                </h4>
                <p className="leading-relaxed">
                  يلتزم المستأجر بتوفير لوازم الأكل (السفر - الصحون البلاستيكية - التمر - المياه - المشروبات).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
