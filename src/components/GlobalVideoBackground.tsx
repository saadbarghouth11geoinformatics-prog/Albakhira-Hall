import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, Pause, SkipForward, SkipBack, Film, Sparkles, Settings, Volume2, VolumeX } from 'lucide-react';
import { VIDEO_SHOWCASES } from '../data/hallData';
import { VideoShowcase } from '../types';

// Distinct clear Google Drive video background per route
const ROUTE_VIDEO_MAP: Record<string, number> = {
  '/': 16, // v17: Full hall coverage
  '/about': 0, // v1: Women hall tour & stage
  '/offers': 2, // v3: Zaffah & laser light effects
  '/calculator': 15, // v16: Day & night decor lighting
  '/gallery': 8, // v9: Royal Kosha & aisle
  '/menu': 1, // v2: 10m Silver Buffet & cake
  '/reviews': 4, // v5: Coffee & hospitality staff
  '/faq': 11, // v12: Supervision & security
  '/contact': 13, // v14: Entrances & parking
};

export const GlobalVideoBackground: React.FC = () => {
  const location = useLocation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(16);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.2); // Ultra-clear background visibility (20% darkness)
  const [isControlsExpanded, setIsControlsExpanded] = useState<boolean>(false);

  // Switch video background automatically whenever page route changes
  useEffect(() => {
    const matchedIndex = ROUTE_VIDEO_MAP[location.pathname];
    if (matchedIndex !== undefined) {
      setCurrentVideoIndex(matchedIndex);
    }
  }, [location.pathname]);

  const currentVideo: VideoShowcase = VIDEO_SHOWCASES[currentVideoIndex] || VIDEO_SHOWCASES[0];

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEO_SHOWCASES.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + VIDEO_SHOWCASES.length) % VIDEO_SHOWCASES.length);
  };

  return (
    <>
      {/* FIXED GLOBAL VIDEO & PHOTO BACKGROUND CONTAINER */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* High-Resolution Royal Hall Photo Background Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
          style={{
            backgroundImage: `url(${currentVideo.posterUrl || '/Videos/posters/hall-tour.jpg'})`,
          }}
        />

        {/* Live Video Layer */}
        {isPlaying ? (
          <video
            key={`${currentVideo.id}-${isMuted ? 'muted' : 'unmuted'}`}
            src={currentVideo.src}
            poster={currentVideo.posterUrl}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover scale-105 filter brightness-100 contrast-105 transition-all duration-700 opacity-80"
            aria-label={`خلفية فيديو حية - ${currentVideo.title}`}
          />
        ) : null}

        {/* Dynamic Dark Luxury Gradient Overlays - balanced for high video/image clarity and text contrast */}
        <div
          className="absolute inset-0 bg-[var(--color-navy-950)] transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-transparent to-[var(--color-navy-950)]/60 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-950)]/60 via-transparent to-[var(--color-navy-950)]/60 opacity-50" />
      </div>

      {/* FLOATING CONTROLLER WIDGET FOR GLOBAL VIDEO BACKGROUND */}
      <div className="global-video-controls hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2">
        {/* Expanded Controls Panel */}
        {isControlsExpanded && (
          <div className="bg-[var(--color-navy-950)]/95 border-2 border-[var(--color-champagne-500)]/60 rounded-2xl p-4 shadow-2xl backdrop-blur-xl w-72 sm:w-80 text-right animate-fadeIn border-t-4 border-t-[var(--color-champagne-500)]">
            <div className="flex items-center justify-between border-b border-[var(--color-champagne-500)]/20 pb-2 mb-3">
              <span className="text-xs font-bold text-[var(--color-champagne-500)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> تحكم خلفية الفيديو الحية
              </span>
              <span className="text-[10px] text-[var(--color-navy-100)] bg-[var(--color-champagne-500)]/20 px-2 py-0.5 rounded-full font-mono">
                فيديو {currentVideoIndex + 1} / {VIDEO_SHOWCASES.length}
              </span>
            </div>

            {/* Current Playing Video Title */}
            <div className="mb-3">
              <span className="text-[10px] text-[var(--color-text-muted)] font-bold block mb-0.5">خلفية الصفحة الحالية:</span>
              <p className="text-xs font-bold text-[var(--color-champagne-300)] font-tajawal line-clamp-2 leading-snug">
                {currentVideo.title}
              </p>
              <div className="flex items-center justify-between mt-1 text-[10px]">
                <span className="text-[var(--color-success)] bg-[var(--color-success)]/10 px-2 py-0.5 rounded border border-[var(--color-success)]/20 font-bold">
                  {currentVideo.category}
                </span>
                <span className="text-[var(--color-champagne-500)] flex items-center gap-1 font-bold">
                  فيديو محلي
                </span>
              </div>
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-center gap-2 mb-3 bg-[var(--color-navy-900)] p-2 rounded-xl border border-[var(--color-champagne-500)]/20">
              <button
                onClick={handlePrevVideo}
                className="p-1.5 rounded-lg bg-[var(--color-navy-950)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] text-[var(--color-navy-100)] transition-colors cursor-pointer"
                title="الفيديو السابق"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-lg gold-gradient text-[var(--color-navy-950)] font-black text-xs flex items-center gap-1 cursor-pointer shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'إيقاف المؤقت' : 'تشغيل'}</span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                  isMuted
                    ? 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)]'
                    : 'bg-[var(--color-success)]/20 text-[var(--color-success)] border-[var(--color-success)]/60'
                }`}
                title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[var(--color-navy-100)]" /> : <Volume2 className="w-4 h-4 text-[var(--color-success)]" />}
              </button>

              <button
                onClick={handleNextVideo}
                className="p-1.5 rounded-lg bg-[var(--color-navy-950)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] text-[var(--color-navy-100)] transition-colors cursor-pointer"
                title="الفيديو التالي"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Overlay Darkness Slider */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between items-center text-[10px] text-[var(--color-navy-100)]">
                <span>وضوح الفيديو بالخلفية:</span>
                <span className="font-mono text-[var(--color-champagne-500)]">{Math.round((1 - overlayOpacity) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.7"
                step="0.05"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                className="w-full accent-[var(--color-champagne-500)] cursor-pointer"
              />
            </div>

            {/* Quick Video Selector Dropdown */}
            <div>
              <label className="text-[10px] text-[var(--color-text-muted)] block mb-1">اختر فيديو خلفية مخصص:</label>
              <select
                value={currentVideoIndex}
                onChange={(e) => setCurrentVideoIndex(parseInt(e.target.value, 10))}
                className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] text-xs rounded-xl p-2 font-tajawal focus:outline-none focus:border-[var(--color-champagne-500)] cursor-pointer"
              >
                {VIDEO_SHOWCASES.map((v, i) => (
                  <option key={v.id} value={i}>
                    {i + 1}. {v.title} ({v.category})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Toggle Widget & Audio Buttons Bar */}
        <div className="flex items-center gap-2">
          {/* Subtle Quick Mute / Unmute Toggle Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2.5 rounded-full shadow-2xl backdrop-blur-xl border-2 transition-all cursor-pointer flex items-center justify-center ${
              isMuted
                ? 'bg-[var(--color-navy-950)]/90 text-[var(--color-navy-100)] border-[var(--color-champagne-500)]/50 hover:border-[var(--color-champagne-500)]'
                : 'bg-[var(--color-success)]/20 text-[var(--color-success)] border-[var(--color-success)] shadow-[0_0_15px_rgba(0,245,212,0.4)]'
            }`}
            title={isMuted ? 'تفعيل الصوت للمقطع' : 'كتم الصوت'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[var(--color-navy-100)]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[var(--color-success)] animate-pulse" />
            )}
          </button>

          {/* Main Floating Widget Pill Button */}
          <button
            onClick={() => setIsControlsExpanded(!isControlsExpanded)}
            className="bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-900)] text-[var(--color-champagne-300)] border-2 border-[var(--color-champagne-500)]/60 hover:border-[var(--color-champagne-500)] px-3.5 py-2 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-2 cursor-pointer group transition-all duration-300"
            title="تخصيص خلفية الفيديو الحية"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)] animate-ping" />
            <Film className="w-4 h-4 text-[var(--color-champagne-500)] group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold font-tajawal hidden sm:inline">
              خلفية فيديو شغال تلقائيًا
            </span>
            <Settings className="w-3.5 h-3.5 text-[var(--color-champagne-500)] opacity-80" />
          </button>
        </div>
      </div>
    </>
  );
};
