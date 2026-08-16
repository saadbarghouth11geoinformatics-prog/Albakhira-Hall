import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Maximize2 } from 'lucide-react';
import { ImageLightboxModal } from '../ImageLightboxModal';

interface AnglePhoto {
  id: string;
  title: string;
  angleTag: 'kosha' | 'buffet' | 'catwalk' | 'men' | 'suite' | 'entrance';
  angleLabel: string;
  imageUrl: string;
  description: string;
  cameraSetting: string;
}

const ANGLES_DATA: AnglePhoto[] = [
  {
    id: 'k1',
    title: 'مسرح وكوشة صالة النساء',
    angleTag: 'kosha',
    angleLabel: 'الكوشة والمسرح',
    imageUrl: '/07_Clean_Video_Frames/video_09_frame_1.jpg',
    description: 'لقطة أصلية من داخل الصالة توضح المسرح والكوشة وتجهيزات المناسبة.',
    cameraSetting: 'لقطة أصلية من فيديو القاعة'
  },
  {
    id: 'b1',
    title: 'تجهيز بوفيه الحلويات والضيافة',
    angleTag: 'buffet',
    angleLabel: 'البوفيه المفتوح',
    imageUrl: '/07_Clean_Video_Frames/video_13_frame_2.jpg',
    description: 'عرض حقيقي ومرتب لأصناف الحلويات والضيافة في إحدى المناسبات.',
    cameraSetting: 'لقطة أصلية من تجهيزات الضيافة'
  },
  {
    id: 'c1',
    title: 'صالة النساء وممر الزفة',
    angleTag: 'catwalk',
    angleLabel: 'الممر الرخامي',
    imageUrl: '/07_Clean_Video_Frames/video_09_frame_3.jpg',
    description: 'منظور واسع لممر الزفة والطاولات وتوزيع الجلسات داخل الصالة.',
    cameraSetting: 'زاوية واسعة من صالة النساء'
  },
  {
    id: 'm1',
    title: 'مجلس الرجال وجلسات الاستقبال',
    angleTag: 'men',
    angleLabel: 'قسم الرجال',
    imageUrl: '/07_Clean_Video_Frames/video_04_frame_3.jpg',
    description: 'لقطة أصلية توضح ترتيب الجلسات ومساحة استقبال الضيوف في قسم الرجال.',
    cameraSetting: 'زاوية واسعة من مجلس الرجال'
  },
  {
    id: 's1',
    title: 'مدخل غرفة العروسة',
    angleTag: 'suite',
    angleLabel: 'غرفة العروسة',
    imageUrl: '/07_Clean_Video_Frames/video_06_frame_3.jpg',
    description: 'لقطة واضحة لمدخل غرفة العروسة ضمن المرافق الداخلية للقاعة.',
    cameraSetting: 'لقطة أصلية من مرافق القاعة'
  },
  {
    id: 'e1',
    title: 'مدخل القاعة ومسار الوصول',
    angleTag: 'entrance',
    angleLabel: 'مدخل القاعة',
    imageUrl: '/07_Clean_Video_Frames/video_05_frame_1.jpg',
    description: 'لقطة أصلية توضح مدخل القاعة والممر المؤدي إلى المرافق الداخلية.',
    cameraSetting: 'زاوية حقيقية من المدخل'
  }
];

export const AnglePhotoExplorer: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === 'all'
    ? ANGLES_DATA
    : ANGLES_DATA.filter((item) => item.angleTag === activeFilter);

  return (
    <div className="py-10 bg-[var(--color-navy-900)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <Camera className="w-4 h-4" /> مستكشف الزوايا واللقطات المصورة
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white">
          تصفح زوايا قاعة الباخرة حسب القسم والزاوية
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          لقطات أصلية مستخرجة من فيديوهات القاعة، ويمكنك فتح أي صورة وتكبيرها لمشاهدة التفاصيل.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
        {[
          { id: 'all', label: 'جميع الزوايا' },
          { id: 'kosha', label: 'الكوشة والمسرح' },
          { id: 'buffet', label: 'البوفيه المفتوح' },
          { id: 'catwalk', label: 'الممر الملكي' },
          { id: 'men', label: 'قسم الرجال' },
          { id: 'suite', label: 'غرفة العروسة' },
          { id: 'entrance', label: 'مدخل القاعة' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveFilter(tab.id);
              setLightboxIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === tab.id
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                : 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((photo, index) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--color-navy-950)] rounded-2xl border border-[var(--color-champagne-500)]/25 overflow-hidden shadow-xl hover:border-[var(--color-champagne-500)] transition-all group flex flex-col justify-between"
          >
            <div>
              <div
                onClick={() => setLightboxIndex(index)}
                className="relative h-48 overflow-hidden cursor-pointer"
              >
              <img
                loading="lazy"
                decoding="async"
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-transparent to-transparent" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(index);
                  }}
                  className="absolute bottom-3 left-3 p-2 rounded-full bg-[var(--color-navy-950)]/80 text-[var(--color-champagne-500)] border border-[var(--color-champagne-500)]/40 hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all cursor-pointer shadow-md"
                  title="تكبير الصورة وفحص التفاصيل"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[var(--color-navy-950)]/90 text-[var(--color-champagne-300)] text-[10px] font-bold border border-[var(--color-champagne-500)]/40">
                  {photo.angleLabel}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-bold font-tajawal text-white">{photo.title}</h4>
                <p className="text-xs text-[var(--color-navy-100)] font-cairo leading-relaxed">{photo.description}</p>
              </div>
            </div>
            <div className="p-4 pt-0 text-[11px] text-[var(--color-champagne-500)] font-cairo border-t border-white/5 mt-2 flex items-center justify-between">
              <span>{photo.cameraSetting}</span>
              <button
                onClick={() => setLightboxIndex(index)}
                className="text-white hover:text-[var(--color-champagne-500)] cursor-pointer text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Maximize2 className="w-3 h-3" />
                <span>تكبير وتفاصيل</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Featured High-Resolution Lightbox Modal with Zoom & Pan */}
      <ImageLightboxModal
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        items={filtered}
        initialIndex={lightboxIndex ?? 0}
      />
    </div>
  );
};
