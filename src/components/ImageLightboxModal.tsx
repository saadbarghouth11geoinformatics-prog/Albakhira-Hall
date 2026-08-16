import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  Minimize,
  Download,
  Info,
  Sparkles,
  Layers,
  Share2,
  Check,
  Eye,
  ImageOff,
} from 'lucide-react';
import { GalleryMedia } from '../types';

export interface LightboxItem {
  id?: string;
  imageUrl: string;
  title: string;
  description?: string;
  badge?: string;
  category?: string;
  cameraSetting?: string;
}

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: (GalleryMedia | LightboxItem | { id?: string; src?: string; thumbnail?: string; title?: string; alt?: string; description?: string; badge?: string })[];
  initialIndex?: number;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  items,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const normalizedItems = useMemo<LightboxItem[]>(() => {
    return items
      .map((item, index) => {
        const media = item as GalleryMedia & LightboxItem & { src?: string; thumbnail?: string; alt?: string; thumbnailUrl?: string };
        const imageUrl = media.imageUrl || media.src || media.thumbnailUrl || media.thumbnail || '';
        return {
          id: media.id || `lightbox-${index}`,
          imageUrl,
          title: media.title || media.alt || `صورة ${index + 1}`,
          description: media.description,
          badge: media.badge,
          category: media.category,
          cameraSetting: media.cameraSetting,
        };
      })
      .filter((item) => item.imageUrl);
  }, [items]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Sync initialIndex whenever it changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const nextIndex = normalizedItems.length > 0 ? Math.min(Math.max(initialIndex, 0), normalizedItems.length - 1) : 0;
      setCurrentIndex(nextIndex);
      resetZoomAndPan();
    }
  }, [isOpen, initialIndex, normalizedItems.length]);

  const safeCurrentIndex = normalizedItems.length > 0 ? Math.min(Math.max(currentIndex, 0), normalizedItems.length - 1) : 0;
  const currentItem = normalizedItems[safeCurrentIndex];

  useEffect(() => {
    setImageFailed(false);
  }, [safeCurrentIndex, currentItem?.imageUrl]);

  const resetZoomAndPan = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleNext = useCallback(() => {
    if (normalizedItems.length <= 1) return;
    setCurrentIndex((prev) => {
      const safePrev = Math.min(Math.max(prev, 0), normalizedItems.length - 1);
      return (safePrev + 1) % normalizedItems.length;
    });
    resetZoomAndPan();
  }, [normalizedItems.length]);

  const handlePrev = useCallback(() => {
    if (normalizedItems.length <= 1) return;
    setCurrentIndex((prev) => {
      const safePrev = Math.min(Math.max(prev, 0), normalizedItems.length - 1);
      return (safePrev - 1 + normalizedItems.length) % normalizedItems.length;
    });
    resetZoomAndPan();
  }, [normalizedItems.length]);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPanPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleToggleZoom = () => {
    if (zoomScale > 1) {
      resetZoomAndPan();
    } else {
      setZoomScale(2);
    }
  };

  // Keyboard navigation & Shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomScale > 1) {
          resetZoomAndPan();
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        handlePrev(); // In RTL, ArrowRight moves to previous / rightward
      } else if (e.key === 'ArrowLeft') {
        handleNext(); // In RTL, ArrowLeft moves to next / leftward
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0') {
        resetZoomAndPan();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'i') {
        setShowInfo((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, zoomScale, handleNext, handlePrev, onClose]);

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev + 0.25, 3.5));
    } else {
      setZoomScale((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPanPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Pan dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomScale > 1) {
      e.preventDefault();
      const maxX = (zoomScale - 1) * 350;
      const maxY = (zoomScale - 1) * 250;
      const newX = Math.min(Math.max(e.clientX - dragStart.x, -maxX), maxX);
      const newY = Math.min(Math.max(e.clientY - dragStart.y, -maxY), maxY);
      setPanPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    if (zoomScale === 1) touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (zoomScale !== 1 || touchStartXRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const distance = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(distance) < 48) return;
    if (distance > 0) handlePrev();
    else handleNext();
  };

  // Share / Copy Link
  const handleShare = async () => {
    if (!currentItem) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  if (!isOpen || !currentItem) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        data-theme="dark"
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="عارض صور قاعة الباخرة"
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] bg-[var(--color-navy-950)]/95 backdrop-blur-2xl flex flex-col justify-between select-none overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Top Control Bar */}
        <div className="relative z-30 flex items-center justify-between p-3 sm:p-5 bg-gradient-to-b from-[var(--color-navy-950)]/90 to-transparent">
          {/* Left / Info Pill & Counter */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[var(--color-champagne-500)]/15 border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] font-tajawal text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
              <span>
                {safeCurrentIndex + 1} / {normalizedItems.length}
              </span>
            </span>

            {currentItem.badge && (
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-navy-800)]/80 border border-[var(--color-champagne-500)]/30 text-white text-xs font-bold">
                <Layers className="w-3 h-3 text-[var(--color-champagne-500)]" />
                {currentItem.badge}
              </span>
            )}

            {/* Current Zoom Level Pill */}
            {zoomScale > 1 && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-pulse">
                تكبير {Math.round(zoomScale * 100)}%
              </span>
            )}
          </div>

          {/* Center Action Controls (Zoom, Reset, Fullscreen, Info Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[var(--color-navy-900)]/80 p-1 sm:p-1.5 rounded-2xl border border-[var(--color-champagne-500)]/30 backdrop-blur-md shadow-xl">
            <button
              onClick={handleZoomIn}
              disabled={zoomScale >= 3.5}
              className="p-2 sm:p-2.5 rounded-xl text-white hover:text-[var(--color-champagne-500)] hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="تكبير الصورة (+)"
            >
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleZoomOut}
              disabled={zoomScale <= 1}
              className="p-2 sm:p-2.5 rounded-xl text-white hover:text-[var(--color-champagne-500)] hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="تصغير الصورة (-)"
            >
              <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {zoomScale > 1 && (
              <button
                onClick={resetZoomAndPan}
                className="p-2 sm:p-2.5 rounded-xl text-[var(--color-champagne-300)] bg-[var(--color-champagne-500)]/20 hover:bg-[var(--color-champagne-500)]/30 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                title="إعادة ضبط التكبير (0)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1x</span>
              </button>
            )}

            <div className="w-px h-5 bg-white/15 my-auto" />

            <button
              onClick={() => setShowInfo((prev) => !prev)}
              className={`p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer ${
                showInfo ? 'text-[var(--color-champagne-500)] bg-[var(--color-champagne-500)]/15' : 'text-white/80 hover:text-white'
              }`}
              title="إظهار/إخفاء تفاصيل الصورة (I)"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 sm:p-2.5 rounded-xl text-white/80 hover:text-[var(--color-champagne-500)] hover:bg-white/5 transition-all cursor-pointer"
              title="شاشة كاملة (F)"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            <button
              onClick={handleShare}
              className="p-2 sm:p-2.5 rounded-xl text-white/80 hover:text-[var(--color-champagne-500)] hover:bg-white/5 transition-all cursor-pointer"
              title="مشاركة الصورة"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Right / Close Button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="إغلاق عارض الصور"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-lg hover:scale-105"
            title="إغلاق المعاينة (Esc)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Main Stage: Navigation Arrows & Zoomable/Pannable Image */}
        <div
          ref={imageContainerRef}
          className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden touch-pan-y"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Button Previous (Right side in Arabic RTL) */}
          {normalizedItems.length > 1 && (
            <button
              onClick={handlePrev}
              aria-label="الصورة السابقة"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[var(--color-navy-950)]/80 hover:bg-[var(--color-champagne-500)] text-white hover:text-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 backdrop-blur-xl flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 group"
              title="الصورة السابقة (سهم يمين)"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Navigation Button Next (Left side in Arabic RTL) */}
          {normalizedItems.length > 1 && (
            <button
              onClick={handleNext}
              aria-label="الصورة التالية"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[var(--color-navy-950)]/80 hover:bg-[var(--color-champagne-500)] text-white hover:text-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 backdrop-blur-xl flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 group"
              title="الصورة التالية (سهم يسار)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
            </button>
          )}

          {/* Zoomable & Pannable Active Image Container */}
          <div
            className={`relative max-w-5xl max-h-[72vh] flex items-center justify-center transition-all ${
              zoomScale > 1
                ? isDragging
                  ? 'cursor-grabbing'
                  : 'cursor-grab'
                : 'cursor-zoom-in'
            }`}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleToggleZoom}
          >
            <motion.div
              key={safeCurrentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: `scale(${zoomScale}) translate(${panPosition.x / zoomScale}px, ${
                  panPosition.y / zoomScale
                }px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-2 border-[var(--color-champagne-500)]/50"
            >
              {imageFailed ? (
                <div className="flex min-h-[45vh] w-[min(92vw,880px)] flex-col items-center justify-center gap-3 rounded-xl bg-white/5 px-6 text-center text-white">
                  <ImageOff className="h-10 w-10 text-[var(--color-champagne-500)]" />
                  <span className="font-tajawal text-sm font-bold">تعذر تحميل الصورة</span>
                </div>
              ) : (
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.title}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onLoad={() => setImageFailed(false)}
                  onError={() => setImageFailed(true)}
                  className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-[92vw] object-contain rounded-xl select-none"
                />
              )}

              {/* Decorative Subtle Gold Shimmer Border on Zoom */}
              {zoomScale > 1 && (
                <div className="absolute inset-0 border border-[var(--color-champagne-500)]/70 pointer-events-none rounded-xl" />
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Drawer: Info Details & Thumbnails Strip */}
        <div className="relative z-30 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/95 to-transparent pt-3 pb-4 sm:pb-6 px-3 sm:px-6">
          {/* Detailed Image Information Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto mb-3 bg-[var(--color-navy-900)]/85 border border-[var(--color-champagne-500)]/35 p-3.5 sm:p-4 rounded-2xl backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-right"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white font-tajawal gold-text">
                      {currentItem.title}
                    </h3>
                    {currentItem.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] text-[10px] font-bold">
                        {currentItem.badge}
                      </span>
                    )}
                  </div>

                  {currentItem.description && (
                    <p className="text-xs text-[var(--color-navy-100)] font-cairo leading-relaxed">
                      {currentItem.description}
                    </p>
                  )}

                  {'cameraSetting' in currentItem && currentItem.cameraSetting && (
                    <p className="text-[11px] text-[var(--color-champagne-500)] font-cairo flex items-center gap-1.5 pt-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{currentItem.cameraSetting}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={handleToggleZoom}
                    className="px-3 py-1.5 rounded-xl bg-[var(--color-champagne-500)]/20 hover:bg-[var(--color-champagne-500)] text-[var(--color-champagne-300)] hover:text-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-xs font-bold font-tajawal transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{zoomScale > 1 ? 'إلغاء التكبير' : 'تكبير التفاصيل'}</span>
                  </button>

                  <a
                    href={currentItem.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    download={`${currentItem.title}.jpg`}
                    className="p-2 rounded-xl bg-[var(--color-navy-900)] hover:bg-[var(--color-champagne-500)] text-white hover:text-[var(--color-navy-950)] border border-white/20 transition-all cursor-pointer shadow-md"
                    title="فتح الصورة الأصلية كاملة"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Thumbnails Filmstrip */}
          {normalizedItems.length > 1 && (
            <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1 px-2 no-scrollbar">
              {normalizedItems.map((item, idx) => {
                const isActive = idx === safeCurrentIndex;
                return (
                  <button
                    key={item.id || idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      resetZoomAndPan();
                    }}
                    className={`relative shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[var(--color-champagne-500)] shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-105 opacity-100 ring-2 ring-[var(--color-champagne-500)]/30'
                        : 'border-white/20 opacity-50 hover:opacity-90 hover:border-[var(--color-champagne-500)]/50'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[var(--color-champagne-500)]/10 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Interactive Usage Helper Tip */}
          <div className="text-center mt-2">
            <span className="text-[10px] text-[var(--color-text-muted)] font-cairo hidden sm:inline-block">
              نصيحة: انقر نقراً مزدوجاً أو استخدم عجلة الماوس / الأزرار بالأعلى للتكبير حتى 3.5x والتمرير لفحص تفاصيل الديكور والإضاءة
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
