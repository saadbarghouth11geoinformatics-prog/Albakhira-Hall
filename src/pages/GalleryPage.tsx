import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { GallerySection } from '../components/GallerySection';
import { VideoSection } from '../components/VideoSection';
import { PageVideoHeader } from '../components/PageVideoHeader';
import { VirtualTour } from '../components/VirtualTour';
import { PageTransition } from '../components/PageTransition';
import { ContactAndBookingSection } from '../components/ContactAndBookingSection';
import { Camera, Video, Eye } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'tour'>('photos');

  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="معرض الصور والفيديوهات والجولة الافتراضية | قاعة الباخرة بجدة"
        description="استعرض ألبوم صور وفيديوهات زفاف حقيقية من قاعة الباخرة للاحتفالات بجدة (الحرازات)، وديكورات الكوشة، وجولة افتراضية تفاعلية 360 درجة."
        pageType="gallery"
      />

      {/* Top Hero Banner with Autoplay Video Background */}
      <PageVideoHeader
        driveId="1Ps_28GHBdCgUKIub85KQnEPSNk85cwT5"
        driveUrl="https://drive.google.com/file/d/1Ps_28GHBdCgUKIub85KQnEPSNk85cwT5/view?usp=drive_link"
        localVideoSrc="/new-media/new-tour-hall.mp4"
        localPoster="/new-media/poster-hall.jpg"
        badge="معرض الصور والفيديوهات"
        subtitle="جدة - الحرازات - بعد محطة المدينة بـ 500 متر"
        title="معرض الصور والفيديوهات والجولة الافتراضية 360°"
        description="استعرض ألبوم صور وفيديوهات زفاف حقيقية من قاعة الباخرة للاحتفالات: كوشة العروسة، ممر الزفة، والبوفيه المفتوح بطول 10 أمتار."
      >
        {/* Quick Navigation Tabs inside Hero Header */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105'
                : 'bg-[var(--color-navy-950)]/80 text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/40 hover:border-[var(--color-champagne-500)] backdrop-blur-md'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>ألبوم صور القاعة</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105'
                : 'bg-[var(--color-navy-950)]/80 text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/40 hover:border-[var(--color-champagne-500)] backdrop-blur-md'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>الفيديوهات والعروض الحية</span>
          </button>
          <button
            onClick={() => setActiveTab('tour')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'tour'
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105'
                : 'bg-[var(--color-navy-950)]/80 text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/40 hover:border-[var(--color-champagne-500)] backdrop-blur-md'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>الجولة الافتراضية 360°</span>
          </button>
        </div>
      </PageVideoHeader>

      {/* Main Content Render */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === 'photos' && (
          <div>
            <GallerySection />
            <div className="pb-12"><VideoSection /></div>
          </div>
        )}
        {activeTab === 'videos' && <VideoSection />}
        {activeTab === 'tour' && <VirtualTour />}
      </motion.div>

      {/* Official Hall Contacts, Social & Location */}
      <ContactAndBookingSection />
    </PageTransition>
  );
};
