import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Eye, Images, Minus, Plus, Sparkles } from 'lucide-react';
import { ALL_GALLERY_IMAGES, GALLERY_CATEGORIES } from '../data/gallery';
import type { GalleryImage } from '../types';
import { ImageLightboxModal } from './ImageLightboxModal';

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  onOpen: (trigger: HTMLButtonElement) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ image, index, onOpen }) => {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(image.thumbnail || image.src);

  return (
    <motion.button
      layout
      initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, delay: reduced ? 0 : Math.min(index * 0.035, 0.2), ease: [0.22, 1, 0.36, 1] }}
      type="button"
      onClick={(event) => onOpen(event.currentTarget)}
      aria-label={`فتح الصورة: ${image.alt}`}
      className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-warm-white)] text-right shadow-[var(--shadow-sm)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-champagne-300)] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--color-soft-beige)]">
        {!loaded && !failed && <span className="absolute inset-0 animate-pulse bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-900)]" aria-hidden="true" />}
        {!failed ? (
          <img
            src={currentSrc}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => {
              if (currentSrc !== image.src) {
                setCurrentSrc(image.src);
              } else if (!currentSrc.includes('/Videos/posters/')) {
                setCurrentSrc('/Videos/posters/hall-tour.jpg');
              } else {
                setFailed(true);
              }
            }}
            style={{ objectPosition: image.objectPosition || 'center' }}
            className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out motion-safe:group-hover:scale-[1.03] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--color-navy-100)] bg-[var(--color-navy-950)]" role="status">
            <Images className="h-7 w-7 text-[var(--color-champagne-500)]" />
            <span className="text-xs">{image.title}</span>
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-navy-950)]/90 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-3 left-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-[var(--color-navy-950)]/80 px-3 text-xs font-bold text-white backdrop-blur-sm">
          <Eye className="h-4 w-4 text-[var(--color-champagne-500)]" /> عرض الصورة
        </span>
      </span>
      <span className="flex min-h-16 items-center justify-between gap-3 px-4 py-3">
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-[var(--color-navy-950)] font-tajawal">{image.title}</span>
          <span className="mt-1 block truncate text-[11px] text-[var(--color-text-muted)]">{image.alt}</span>
        </span>
        <Images className="h-4 w-4 shrink-0 text-[var(--color-champagne-500)]" />
      </span>
    </motion.button>
  );
};

export const GallerySection: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [compact, setCompact] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const currentCategoryImages = useMemo(() => {
    if (selectedCategoryId === 'all') return ALL_GALLERY_IMAGES;
    return GALLERY_CATEGORIES.find((category) => category.id === selectedCategoryId)?.images || [];
  }, [selectedCategoryId]);

  const visibleImages = useMemo(() => {
    if (expanded) return currentCategoryImages;
    if (selectedCategoryId === 'all') {
      const perCategory = compact ? 1 : 2;
      return GALLERY_CATEGORIES.flatMap((category) => category.images.slice(0, perCategory));
    }
    return currentCategoryImages.slice(0, compact ? 5 : 8);
  }, [compact, currentCategoryImages, expanded, selectedCategoryId]);

  const lightboxItems = useMemo(() => currentCategoryImages.map((image) => ({
    id: image.id,
    imageUrl: image.src,
    title: image.title || image.alt,
    description: image.description,
  })), [currentCategoryImages]);

  const changeCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setExpanded(false);
    setLightboxImageIndex(null);
  };

  const closeLightbox = () => {
    setLightboxImageIndex(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  return (
    <section id="gallery" className="relative overflow-hidden bg-[var(--color-ivory)] py-14 text-[var(--color-text)] sm:py-20" aria-labelledby="gallery-title">
      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-champagne-300)] bg-[var(--color-champagne-100)] px-4 py-1.5 text-xs font-bold text-[var(--color-champagne-700)]">
            <Sparkles className="h-4 w-4 text-[var(--color-champagne-500)]" /> الصور الحقيقية لقاعة الباخرة
          </span>
          <h2 id="gallery-title" className="text-3xl font-black text-[var(--color-navy-950)] sm:text-5xl font-tajawal">معرض <span className="text-[var(--color-champagne-700)]">قاعة الباخرة للاحتفالات</span></h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-[var(--color-navy-700)] sm:text-base">لقطات أصلية نظيفة من فيديوهات القاعة، مختارة لتعرض تفاصيل متنوعة دون صور متكررة أو علامات مائية.</p>
        </header>

        <div className="mb-9 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-5" aria-label="بطاقات أقسام القاعة">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              data-theme="dark"
              key={`cover-${category.id}`}
              type="button"
              onClick={() => changeCategory(category.id)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-champagne-500)]/25 text-right shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne-300)]"
              aria-label={`عرض صور ${category.title}`}
            >
              <img src={category.coverImage} alt={`غلاف ${category.title} في قاعة الباخرة`} width={975} height={548} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]" />
              <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,19,33,0.98)_0%,rgba(7,19,33,0.72)_42%,rgba(7,19,33,0.08)_78%)]" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-[#071321]/90 px-4 py-3 backdrop-blur-md">
                <span className="block text-sm font-black text-white font-tajawal [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">{category.title}</span>
                <span className="mt-1 block text-xs font-bold text-[#f0cf83]">{category.images.length} صورة</span>
              </span>
            </button>
          ))}
        </div>

        <div role="tablist" aria-label="تصنيفات صور القاعة" className="mb-9 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center no-scrollbar">
          <button type="button" role="tab" aria-selected={selectedCategoryId === 'all'} onClick={() => changeCategory('all')} className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne-300)] ${selectedCategoryId === 'all' ? 'border-[var(--color-navy-900)] bg-[var(--color-navy-900)] text-white' : 'border-[var(--color-border)] bg-[var(--color-warm-white)] text-[var(--color-navy-900)]'}`}>الكل <span className="mr-1 opacity-70">({ALL_GALLERY_IMAGES.length})</span></button>
          {GALLERY_CATEGORIES.map((category) => (
            <button key={category.id} type="button" role="tab" aria-selected={selectedCategoryId === category.id} onClick={() => changeCategory(category.id)} className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne-300)] ${selectedCategoryId === category.id ? 'border-[var(--color-navy-900)] bg-[var(--color-navy-900)] text-white' : 'border-[var(--color-border)] bg-[var(--color-warm-white)] text-[var(--color-navy-900)]'}`}>{category.title} <span className="mr-1 opacity-70">({category.images.length})</span></button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleImages.map((image, index) => (
              <GalleryCard key={image.id} image={image} index={index} onOpen={(trigger) => {
                lastTriggerRef.current = trigger;
                const nextIndex = currentCategoryImages.findIndex((candidate) => candidate.id === image.id);
                setLightboxImageIndex(nextIndex >= 0 ? nextIndex : 0);
              }} />
            ))}
          </AnimatePresence>
        </motion.div>

        {currentCategoryImages.length > (selectedCategoryId === 'all' ? (compact ? 5 : 10) : (compact ? 5 : 8)) && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="btn-secondary inline-flex min-h-12 items-center gap-2 rounded-xl px-7 py-3 text-sm font-bold transition-colors">
              {expanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {expanded ? 'عرض أقل' : `عرض جميع الصور (${currentCategoryImages.length})`}
            </button>
          </div>
        )}

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-soft-beige)] p-5 text-center md:flex-row md:text-right">
          <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-navy-950)]"><Check className="h-5 w-5 text-[var(--color-champagne-500)]" /> جميع الصور المعروضة لقطات أصلية نظيفة من فيديوهات قاعة الباخرة.</p>
          <a href="https://wa.me/966500292974" target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 rounded-xl px-6 py-3 text-xs font-black">تنسيق موعد زيارة ومعاينة</a>
        </div>
      </div>

      {lightboxImageIndex !== null && lightboxImageIndex >= 0 && (
        <ImageLightboxModal isOpen onClose={closeLightbox} items={lightboxItems} initialIndex={lightboxImageIndex} />
      )}
    </section>
  );
};
