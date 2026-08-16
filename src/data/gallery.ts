import type { GalleryCategory, GalleryImage, GalleryMedia } from '../types';

export type GalleryCategoryId = 'women' | 'men' | 'buffet' | 'exterior' | 'facilities';

const cleanImages: Array<GalleryImage & { categoryId: GalleryCategoryId }> = [
  {
    id: 'clean-hall-stage',
    src: '/Videos/posters/hall-tour.jpg',
    alt: 'الكوشة وتجهيز صالة النساء في قاعة الباخرة',
    width: 720,
    height: 1280,
    categoryId: 'women',
    title: 'الكوشة وصالة النساء',
    description: 'لقطة أصلية نظيفة من فيديو حقيقي داخل القاعة.',
    featured: true,
  },
  {
    id: 'clean-table-decor',
    src: '/Videos/posters/table-decor.jpg',
    alt: 'تنسيق طاولات الضيافة داخل قاعة الباخرة',
    width: 720,
    height: 1280,
    categoryId: 'buffet',
    title: 'تنسيق الطاولات والضيافة',
    description: 'لقطة حقيقية لتجهيز الطاولات قبل استقبال الضيوف.',
    featured: true,
  },
  {
    id: 'clean-hospitality',
    src: '/Videos/posters/hospitality.jpg',
    alt: 'خدمة القهوة والضيافة في قاعة الباخرة',
    width: 720,
    height: 1280,
    categoryId: 'men',
    title: 'القهوة وخدمة الضيوف',
    description: 'لقطة حقيقية من خدمة الضيافة داخل القاعة.',
    featured: true,
  },
  {
    id: 'clean-welcome-details',
    src: '/Videos/posters/welcome-display.jpg',
    alt: 'تفاصيل التزيين والاستقبال في قاعة الباخرة',
    width: 720,
    height: 1280,
    categoryId: 'exterior',
    title: 'تفاصيل الاستقبال والتزيين',
    description: 'تفاصيل حقيقية من تجهيزات إحدى المناسبات.',
    featured: true,
  },
];

export const WOMEN_SECTION_IMAGES = cleanImages.filter((image) => image.categoryId === 'women');
export const MEN_SECTION_IMAGES = cleanImages.filter((image) => image.categoryId === 'men');
export const BUFFET_IMAGES = cleanImages.filter((image) => image.categoryId === 'buffet');
export const EXTERIOR_IMAGES = cleanImages.filter((image) => image.categoryId === 'exterior');
export const FACILITIES_IMAGES: GalleryImage[] = [];
export const FEATURED_IMAGES = cleanImages;
export const HERO_IMAGE = cleanImages[0];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'women', title: 'صالة النساء والكوشة', description: 'لقطة أصلية من داخل صالة النساء.', coverImage: WOMEN_SECTION_IMAGES[0].src, images: WOMEN_SECTION_IMAGES },
  { id: 'buffet', title: 'الطاولات والبوفيه', description: 'تنسيق الطاولات وتجهيز الضيافة.', coverImage: BUFFET_IMAGES[0].src, images: BUFFET_IMAGES },
  { id: 'men', title: 'الضيافة والاستقبال', description: 'خدمة القهوة واستقبال الضيوف.', coverImage: MEN_SECTION_IMAGES[0].src, images: MEN_SECTION_IMAGES },
  { id: 'exterior', title: 'تفاصيل وتجهيزات القاعة', description: 'لمسات متنوعة من تجهيز المناسبات.', coverImage: EXTERIOR_IMAGES[0].src, images: EXTERIOR_IMAGES },
];

export const ALL_GALLERY_IMAGES = GALLERY_CATEGORIES.flatMap((category) => category.images);
export const ALL_REGISTERED_HALL_IMAGES = ALL_GALLERY_IMAGES;

const legacyCategoryByGalleryCategory: Record<GalleryCategoryId, GalleryMedia['category']> = {
  women: 'wedding',
  men: 'deck',
  buffet: 'buffet',
  exterior: 'decor',
  facilities: 'interior',
};

export const GALLERY_ITEMS: GalleryMedia[] = ALL_GALLERY_IMAGES.map((image) => ({
  id: image.id,
  title: image.title || image.alt,
  category: legacyCategoryByGalleryCategory[image.categoryId as GalleryCategoryId],
  imageUrl: image.src,
  thumbnailUrl: image.thumbnail || image.src,
  description: image.description || '',
  width: image.width,
  height: image.height,
}));
