import React, { useRef, useState } from 'react';
import { CheckCircle2, Clock3, Film, Play, Sparkles, Volume2 } from 'lucide-react';

type LocalVideo = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  duration: string;
  size: string;
  category: string;
};

const LOCAL_VIDEOS: LocalVideo[] = [
  {
    id: 'hall-tour',
    title: 'جولة في الصالة والكوشة',
    description: 'لقطات واضحة للتجهيزات، الإضاءة، الممر والكوشة داخل قاعة الباخرة.',
    src: '/Videos/video_08.mp4',
    poster: '/Videos/posters/hall-tour.jpg',
    duration: '00:44',
    size: '5.1 MB',
    category: 'قسم النساء والكوشة',
  },
  {
    id: 'hospitality',
    title: 'تفاصيل الضيافة والتقديم',
    description: 'مقطع قصير يوضح أسلوب تقديم الضيافة وتجهيز فريق الخدمة.',
    src: '/Videos/video_12.mp4',
    poster: '/Videos/posters/hospitality.jpg',
    duration: '00:18',
    size: '2.6 MB',
    category: 'الضيافة والخدمة',
  },
  {
    id: 'table-decor',
    title: 'تنسيق الطاولات والقاعة',
    description: 'تفاصيل حقيقية من تنسيق الطاولات والزهور وتوزيع الصالة.',
    src: '/Videos/video_13.mp4',
    poster: '/Videos/posters/table-decor.jpg',
    duration: '00:29',
    size: '4.9 MB',
    category: 'البوفيه والطاولات',
  },
  {
    id: 'welcome-display',
    title: 'ركن الضيافة بلمسات أنيقة',
    description: 'عرض سريع لركن الضيافة وتفاصيل الزهور والتجهيز النهائي.',
    src: '/Videos/video_16.mp4',
    poster: '/Videos/posters/welcome-display.jpg',
    duration: '00:16',
    size: '2.3 MB',
    category: 'التجهيز والديكور',
  },
];

export const VideoSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = LOCAL_VIDEOS[activeIndex];

  const selectVideo = (index: number) => {
    setActiveIndex(index);
    window.setTimeout(() => {
      videoRef.current?.play().catch(() => undefined);
    }, 80);
  };

  return (
    <section id="videos" className="bg-[var(--color-ivory)] py-14 sm:py-20" aria-labelledby="videos-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-champagne-300)] bg-[var(--color-champagne-100)] px-4 py-2 text-xs font-bold text-[var(--color-navy-900)]">
            <Film className="h-4 w-4 text-[var(--color-champagne-700)]" />
            مقاطع حقيقية مختارة من القاعة
          </span>
          <h2 id="videos-title" className="font-tajawal text-3xl font-black text-[var(--color-navy-950)] sm:text-5xl">
            شاهد التفاصيل قبل زيارتك
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
            اخترنا المقاطع الأقصر والأوضح فقط لتشاهد القاعة والضيافة بسرعة، من دون تحميل فيديوهات طويلة أو مكررة.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
          <article className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-warm-white)] shadow-[var(--shadow-md)]">
            <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-[var(--color-navy-950)] sm:min-h-[650px]">
              <img
                src={activeVideo.poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl"
              />
              <div className="absolute inset-0 bg-[var(--color-navy-950)]/75" />
              <video
                key={activeVideo.id}
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                poster={activeVideo.poster}
                className="relative z-10 max-h-[72vh] min-h-[480px] w-auto max-w-full bg-black object-contain sm:min-h-[610px]"
                aria-label={activeVideo.title}
              >
                <source src={activeVideo.src} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>

              <span className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[var(--color-navy-950)]/80 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-sm">
                <Volume2 className="h-3.5 w-3.5 text-[var(--color-champagne-300)]" /> فيديو أصلي من القاعة
              </span>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <span className="mb-2 inline-flex rounded-full bg-[var(--color-champagne-100)] px-3 py-1 text-[11px] font-bold text-[var(--color-champagne-700)]">
                  {activeVideo.category}
                </span>
                <h3 className="font-tajawal text-xl font-black text-[var(--color-navy-950)] sm:text-2xl">{activeVideo.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">{activeVideo.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-xs font-bold text-[var(--color-text-muted)]">
                <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-soft-beige)] px-3 py-2">
                  <Clock3 className="h-4 w-4 text-[var(--color-champagne-700)]" /> {activeVideo.duration}
                </span>
                <span className="rounded-lg bg-[var(--color-soft-beige)] px-3 py-2">{activeVideo.size}</span>
              </div>
            </div>
          </article>

          <aside className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-warm-white)] p-3 shadow-[var(--shadow-sm)] sm:p-4" aria-label="قائمة مقاطع القاعة">
            <div className="mb-3 flex items-center justify-between px-2 py-2">
              <div>
                <h3 className="font-tajawal text-lg font-black text-[var(--color-navy-950)]">مقاطع مختارة</h3>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">4 فيديوهات قصيرة وخفيفة</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)]">
                <Sparkles className="h-5 w-5" />
              </span>
            </div>

            <div className="space-y-2">
              {LOCAL_VIDEOS.map((video, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => selectVideo(index)}
                    aria-pressed={isActive}
                    className={`group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-right transition-all ${
                      isActive
                        ? 'border-[var(--color-champagne-500)] bg-[var(--color-champagne-100)]'
                        : 'border-transparent bg-[var(--color-ivory)] hover:border-[var(--color-champagne-300)] hover:bg-[var(--color-warm-white)]'
                    }`}
                  >
                    <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[var(--color-soft-beige)]">
                      <img src={video.poster} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                      <span className="absolute inset-0 flex items-center justify-center bg-[var(--color-navy-950)]/20">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-warm-white)] text-[var(--color-navy-900)] shadow-sm transition-transform group-hover:scale-105">
                          {isActive ? <CheckCircle2 className="h-5 w-5" /> : <Play className="mr-0.5 h-4 w-4 fill-current" />}
                        </span>
                      </span>
                      <span className="absolute bottom-1 left-1 rounded-md bg-[var(--color-navy-950)]/80 px-1.5 py-0.5 text-[9px] font-bold text-white">{video.duration}</span>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-tajawal text-sm font-black text-[var(--color-navy-950)]">{video.title}</span>
                      <span className="mt-1.5 line-clamp-2 block text-[11px] leading-5 text-[var(--color-text-secondary)]">{video.description}</span>
                      <span className="mt-1.5 block text-[10px] font-bold text-[var(--color-champagne-700)]">{video.size}</span>
                      <span className="mt-1 block text-[10px] font-bold text-[var(--color-navy-700)]">{video.category}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
