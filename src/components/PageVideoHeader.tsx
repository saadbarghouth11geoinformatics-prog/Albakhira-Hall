import React from 'react';
import { Sparkles } from 'lucide-react';

interface PageVideoHeaderProps {
  driveId: string;
  driveUrl: string;
  badge: string;
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  localVideoSrc?: string;
  localPoster?: string;
}

export const PageVideoHeader: React.FC<PageVideoHeaderProps> = ({
  badge,
  title,
  subtitle,
  description,
  children,
  localVideoSrc,
  localPoster,
}) => {
  const videoSrc = localVideoSrc || '/new-media/new-tour-hall.mp4';
  const posterSrc = localPoster || '/new-media/poster-hall.jpg';

  return (
    <section className="page-video-header relative flex min-h-[360px] w-full flex-col items-center justify-center overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-navy-950)] px-4 py-16 sm:min-h-[430px] sm:px-6 sm:py-16 lg:min-h-[calc(100svh-124px)] lg:px-8 lg:py-20">
      {/* Compact, section-specific autoplay video. */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[var(--color-navy-950)]">
        <img
          src={posterSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-center brightness-90 contrast-110"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/new-media/new-hall-12.webp';
          }}
        />
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-90 contrast-110"
          aria-label={title}
        />
        <div className="absolute inset-0 bg-[var(--color-navy-950)]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-950)]/55 via-transparent to-[var(--color-navy-950)]/70 pointer-events-none" />
      </div>

      {/* TOP CONTROLS & BADGE BAR */}
      <div className="absolute top-5 right-4 left-4 z-20 mx-auto flex max-w-7xl items-center justify-start sm:right-6 sm:left-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--color-success)] animate-ping" />
          <span className="text-xs font-bold text-[var(--color-navy-900)] bg-[var(--color-warm-white)] px-3.5 py-1.5 rounded-full border border-[var(--color-champagne-500)] flex items-center gap-1.5 shadow-[var(--shadow-sm)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> {badge}
          </span>
        </div>

      </div>

      {/* HERO MAIN HEADER CONTENT */}
      <div className="page-video-header__content relative z-10 w-full max-w-4xl mx-auto rounded-3xl px-5 py-7 text-center sm:px-8 sm:py-9">
        {subtitle && (
          <p className="text-xs sm:text-sm font-bold text-[var(--color-champagne-300)] mb-2 font-cairo text-shadow-subtle">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-tajawal text-white mb-4 leading-tight text-shadow-strong">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-white/90 font-cairo max-w-3xl mx-auto leading-relaxed mb-6 text-shadow-subtle">
            {description}
          </p>
        )}

        {/* Optional Custom Page Children (e.g., stats or action buttons) */}
        {children && <div className="mt-6">{children}</div>}
      </div>

    </section>
  );
};
