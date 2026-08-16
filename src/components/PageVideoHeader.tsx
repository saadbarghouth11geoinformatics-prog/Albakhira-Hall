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
  const videoSrc = localVideoSrc || '/Videos/video_16.mp4';
  const posterSrc = localPoster || '/Videos/posters/welcome-display.jpg';

  return (
    <section className="page-video-header relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-ivory)] overflow-hidden border-b border-[var(--color-border)]">
      {/* AUTOPLAYING VIDEO BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[var(--color-navy-950)]">
        <img
          src={posterSrc}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-center brightness-90 contrast-110"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = '/hero.jpg';
          }}
        />
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-90 contrast-110"
          aria-label={title}
        />

        {/* Subtle top/bottom framing (no foggy white veil) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy-950)]/40 via-transparent to-[var(--color-ivory)]/90 pointer-events-none" />
      </div>

      {/* TOP CONTROLS & BADGE BAR */}
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-start mb-8">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--color-success)] animate-ping" />
          <span className="text-xs font-bold text-[var(--color-navy-900)] bg-[var(--color-warm-white)] px-3.5 py-1.5 rounded-full border border-[var(--color-champagne-500)] flex items-center gap-1.5 shadow-[var(--shadow-sm)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> {badge}
          </span>
        </div>

      </div>

      {/* HERO MAIN HEADER CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {subtitle && (
          <p className="text-xs sm:text-sm font-bold text-[var(--color-champagne-700)] uppercase tracking-widest mb-2 font-cairo">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-tajawal text-[var(--color-navy-950)] mb-4 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-lg text-[var(--color-text-secondary)] font-cairo max-w-3xl mx-auto leading-relaxed mb-6">
            {description}
          </p>
        )}

        {/* Optional Custom Page Children (e.g., stats or action buttons) */}
        {children && <div className="mt-6">{children}</div>}
      </div>

    </section>
  );
};
