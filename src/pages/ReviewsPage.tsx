import React from 'react';
import { SEO } from '../components/SEO';
import { ReviewsSection } from '../components/ReviewsSection';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { HallRatingsAnalyticsChart } from '../components/HallRatingsAnalyticsChart';
import { InteractiveStarReviewForm } from '../components/InteractiveStarReviewForm';
import { PageTransition } from '../components/PageTransition';
import { PageVideoHeader } from '../components/PageVideoHeader';
import { SectionDivider } from '../components/SectionDivider';
import { VerifiedEventFilterableReviews } from '../components/pageDetails/VerifiedEventFilterableReviews';
import { ElectronicGuestbook } from '../components/ElectronicGuestbook';
import { Star } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="آراء وتقييمات العرسان الحقيقية | قاعة الباخرة بجدة"
        description="اقرأ تجارب وتقييمات العرسان والعائلات ممن احتفلوا بمناسباتهم في قاعة الباخرة للاحتفالات بجدة (الحرازات) مع لوحة الرسوم البيانية ونظام التقييم بالنجوم."
        pageType="reviews"
      />

      {/* Top Hero Banner with Autoplay Video Background */}
      <PageVideoHeader
        driveId="17WoRXW12aUbn3CcvdodS4wbE1FCyDA3u"
        driveUrl="https://drive.google.com/file/d/17WoRXW12aUbn3CcvdodS4wbE1FCyDA3u/view?usp=drive_link"
        localVideoSrc="/new-media/new-tour-hall.mp4"
        localPoster="/new-media/poster-hall.jpg"
        badge="تجارب عملائنا الحقيقية"
        subtitle="جدة - الحرازات - بعد محطة المدينة بـ 500 متر"
        title="قصص وآراء من أقاموا ليلتهم في قاعة الباخرة بجدة"
        description="اقرأ واستعرض تجارب وتقييمات العرسان والعائلات الحقيقية ممن احتفلوا بمناسباتهم بقاعة الباخرة للاحتفالات بجدة."
      >
        {/* Overall Rating Metrics Box */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 max-w-2xl mx-auto bg-[var(--color-navy-950)]/85 backdrop-blur-md p-6 rounded-2xl border border-[var(--color-champagne-500)]/40 shadow-xl">
          <div className="text-center">
            <div className="text-4xl font-black font-tajawal text-[var(--color-champagne-300)]">4.9</div>
            <div className="flex items-center justify-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[var(--color-champagne-500)] fill-[var(--color-champagne-500)]" />
              ))}
            </div>
            <span className="text-[11px] text-[var(--color-navy-100)]">متوسط تقييم الضيوف</span>
          </div>
          <div className="h-10 w-px bg-[var(--color-champagne-500)]/30 hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-black font-tajawal text-white">+510</div>
            <span className="text-[11px] text-[var(--color-navy-100)]">حفل ومناسبة ناجحة بجدة</span>
          </div>
          <div className="h-10 w-px bg-[var(--color-champagne-500)]/30 hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-black font-tajawal text-[var(--color-success)]">100%</div>
            <span className="text-[11px] text-[var(--color-navy-100)]">التزام بالمواعيد والخدمة</span>
          </div>
        </div>
      </PageVideoHeader>

      <SectionDivider variant="crown" label="الرسم البياني ومعدل الرضا الشامل" />

      {/* Visual Charts Component (Recharts Interactive Bar & Radar Charts) */}
      <div className="px-4 sm:px-6 lg:px-8">
        <HallRatingsAnalyticsChart />
      </div>

      <SectionDivider variant="sparkle" label="قيّم تجربتك في قاعة الباخرة بالنجوم" />

      {/* Interactive Star Rating Form for New Users */}
      <div className="px-4 sm:px-6 lg:px-8">
        <InteractiveStarReviewForm />
      </div>

      <SectionDivider variant="crown" label="تجارب العرسان الموثقة بالصور" />

      {/* Interactive Reviews & Proof Photos Carousel */}
      <ReviewsCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VerifiedEventFilterableReviews />
      </div>

      {/* Main Reviews Grid Component with Category Filtering & Search */}
      <ReviewsSection />

      <SectionDivider variant="crown" label="سجل الزوار والتبريكات الرقمي والصوتي" />
      <ElectronicGuestbook />
    </PageTransition>
  );
};
