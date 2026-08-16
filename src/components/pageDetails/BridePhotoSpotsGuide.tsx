import React from 'react';
import { Camera, Sparkles, MapPin, Heart, CheckCircle2 } from 'lucide-react';

const PHOTO_SPOTS = [
  {
    spotNumber: 1,
    spotName: 'تحت الثريا الكريستالية العملاقة بالمدخل',
    recommendedTime: 'قبل بدء دخلة الضيوف (7:30 مساءً)',
    bestFor: 'لقطات فستان الزفاف الكامل والإطلالة الأولى',
    tip: 'استغلال انعكاس الإضاءة الكريستالية المضيئة لإنتاج تأثير البريق الساحر (Bokeh).'
  },
  {
    spotNumber: 2,
    spotName: 'منتصف الممر الرخامي الملكي (25 متر)',
    recommendedTime: 'أثناء بريف الزفة وكشاف Follow Spot',
    bestFor: 'فيديوهات الزفة السينمائية والرحلة لكوشة العروسة',
    tip: 'الالتقاط من زاوية منخفضة لإبراز طيات الفستان وسقف النجوم المضيء.'
  },
  {
    spotNumber: 3,
    spotName: 'أمام شاشة الـ 4K LED التفاعلية بالكوشة',
    recommendedTime: 'بعد استقرار العروسة على الكوشة',
    bestFor: 'الصور العائلية وصور التهنئة مع الصديقات',
    tip: 'ضبط خلفية الشاشة باللون الذهبي الخافت لتتناسق مع باقة الزهور الدائمة.'
  },
  {
    spotNumber: 4,
    spotName: 'جناح العروسة أمام مرآة الميكأب الهوليودية',
    recommendedTime: 'أثناء اللمسات الأخيرة وتجهيز الطرحة',
    bestFor: 'لقطات الكواليس (Behind The Scenes) وصور المكياج',
    tip: 'إضاءة المرآة المباشرة تمنح نقاوة استثنائية لتوثيق المكياج والشبكة.'
  }
];

export const BridePhotoSpotsGuide: React.FC = () => {
  return (
    <div className="py-10 bg-[var(--color-navy-950)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <Heart className="w-4 h-4 text-red-400" /> دليل العروسة والمصورة الفوتوغرافية
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white">
          أفضل 4 مواقع لالتقاط صور وفيديوهات زفاف سينمائية بالقاعة
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          دليل إرشادي مخصص للمصورين والعروسين لتوثيق أروع لحظات ليلة العمر بأعلى جودة بصرياً.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {PHOTO_SPOTS.map((spot) => (
          <div
            key={spot.spotNumber}
            className="bg-[var(--color-navy-900)] p-5 sm:p-6 rounded-2xl border border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)] transition-all space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] font-black text-sm flex items-center justify-center font-tajawal">
                #{spot.spotNumber}
              </span>
              <span className="text-[11px] bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] px-3 py-1 rounded-full border border-[var(--color-champagne-500)]/30 font-bold">
                {spot.recommendedTime}
              </span>
            </div>

            <h4 className="text-base font-bold font-tajawal text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-champagne-500)]" />
              <span>{spot.spotName}</span>
            </h4>

            <div className="space-y-1.5 text-xs text-[var(--color-navy-100)] font-cairo">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                <span><strong>أنسب نوع صور:</strong> {spot.bestFor}</span>
              </div>
              <div className="flex items-start gap-1.5 text-[var(--color-champagne-300)]">
                <Sparkles className="w-4 h-4 text-[var(--color-champagne-500)] shrink-0 mt-0.5" />
                <span><strong>نصيحة المصورة:</strong> {spot.tip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
