import React from 'react';
import { Clock3, Film, Sparkles } from 'lucide-react';

type LocalVideo = {
  id: string;
  title: string;
  src: string;
  poster: string;
  duration: string;
  category: string;
};

const LOCAL_VIDEOS: LocalVideo[] = [
  {
    id: 'women-decor',
    title: 'الكوشة ومدخل صالة النساء',
    src: '/Videos/video_01.mp4',
    poster: '/07_Clean_Video_Frames/video_01_frame_1.jpg',
    duration: '00:44',
    category: 'صالة النساء',
  },
  {
    id: 'men-majlis',
    title: 'جولة داخل مجلس الرجال',
    src: '/Videos/video_04.mp4',
    poster: '/07_Clean_Video_Frames/video_04_frame_3.jpg',
    duration: '01:15',
    category: 'قسم الرجال',
  },
  {
    id: 'entrance',
    title: 'ممر الدخول والمرافق',
    src: '/Videos/video_05.mp4',
    poster: '/07_Clean_Video_Frames/video_05_frame_1.jpg',
    duration: '00:29',
    category: 'المداخل',
  },
  {
    id: 'bride-room',
    title: 'المرافق وغرفة العروسة',
    src: '/Videos/video_06.mp4',
    poster: '/07_Clean_Video_Frames/video_06_frame_5.jpg',
    duration: '01:23',
    category: 'المرافق',
  },
  {
    id: 'women-hall',
    title: 'جولة واسعة داخل الصالة',
    src: '/Videos/video_09.mp4',
    poster: '/07_Clean_Video_Frames/video_09_frame_1.jpg',
    duration: '01:03',
    category: 'صالة النساء',
  },
  {
    id: 'hospitality',
    title: 'تقديم الضيافة للضيوف',
    src: '/Videos/video_12.mp4',
    poster: '/07_Clean_Video_Frames/video_12_frame_2.jpg',
    duration: '00:18',
    category: 'الضيافة',
  },
  {
    id: 'dessert-table',
    title: 'تجهيز طاولة الحلويات',
    src: '/Videos/video_13.mp4',
    poster: '/07_Clean_Video_Frames/video_13_frame_1.jpg',
    duration: '00:29',
    category: 'الحلويات',
  },
  {
    id: 'buffet',
    title: 'تفاصيل بوفيه الحلويات',
    src: '/Videos/video_14.mp4',
    poster: '/07_Clean_Video_Frames/video_14_frame_1.jpg',
    duration: '00:18',
    category: 'البوفيه',
  },
  {
    id: 'gifts',
    title: 'تجهيز الهدايا والتوزيعات',
    src: '/Videos/video_15.mp4',
    poster: '/07_Clean_Video_Frames/video_15_frame_4.jpg',
    duration: '00:34',
    category: 'التجهيزات',
  },
  {
    id: 'welcome-corner',
    title: 'ركن الترحيب والعطور',
    src: '/Videos/video_16.mp4',
    poster: '/Videos/posters/welcome-display.jpg',
    duration: '00:16',
    category: 'الاستقبال',
  },
];

const pauseOtherVideos = (event: React.SyntheticEvent<HTMLVideoElement>) => {
  document.querySelectorAll<HTMLVideoElement>('#videos video').forEach((candidate) => {
    if (candidate !== event.currentTarget) candidate.pause();
  });
};

export const VideoSection: React.FC = () => (
  <section id="videos" className="bg-[var(--color-ivory)] py-12 sm:py-16" aria-labelledby="videos-title">
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
      <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-champagne-300)] bg-[var(--color-champagne-100)] px-4 py-2 text-xs font-bold text-[var(--color-navy-900)]">
          <Film className="h-4 w-4 text-[var(--color-champagne-700)]" />
          فيديوهات من أجواء القاعة
        </span>
        <h2 id="videos-title" className="font-tajawal text-3xl font-black text-[var(--color-navy-950)] sm:text-5xl">
          شاهد القاعة من كل زاوية
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
          عشرة مقاطع متنوعة للصالات والجلسات والضيافة والتجهيزات.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" aria-label="فيديوهات قاعة الباخرة">
        {LOCAL_VIDEOS.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-warm-white)] shadow-[var(--shadow-sm)]">
            <div className="relative aspect-[9/14] overflow-hidden bg-[var(--color-navy-950)]">
              <video
                controls
                playsInline
                preload="none"
                poster={video.poster}
                onPlay={pauseOtherVideos}
                className="h-full w-full object-contain"
                aria-label={video.title}
              >
                <source src={video.src} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
              <span className="pointer-events-none absolute right-2 top-2 rounded-full border border-white/20 bg-[var(--color-navy-950)]/80 px-2.5 py-1 text-[9px] font-bold text-white backdrop-blur-sm">
                {video.category}
              </span>
            </div>
            <div className="flex min-h-20 items-start justify-between gap-2 p-3">
              <h3 className="font-tajawal text-xs font-black leading-5 text-[var(--color-navy-950)] sm:text-sm">{video.title}</h3>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-[var(--color-soft-beige)] px-2 py-1 text-[9px] font-bold text-[var(--color-text-muted)]">
                <Clock3 className="h-3 w-3 text-[var(--color-champagne-700)]" /> {video.duration}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a href="https://wa.me/966500292974" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex min-h-12 items-center gap-2 rounded-xl px-7 py-3 text-sm font-black">
          <Sparkles className="h-4 w-4" /> تنسيق موعد زيارة القاعة
        </a>
      </div>
    </div>
  </section>
);
