import type { GalleryCategory, GalleryImage, GalleryMedia } from '../types';

export type GalleryCategoryId = 'women' | 'men' | 'buffet' | 'exterior' | 'facilities';

const IMAGE_WIDTH = 975;
const IMAGE_HEIGHT = 548;

const categoryCopy: Record<GalleryCategoryId, { title: string; description: string; alt: string; folder: string }> = {
  women: {
    title: 'قسم النساء',
    description: 'جميع صور صالة النساء في قاعة الباخرة ضمن قسم واحد.',
    alt: 'قاعة الباخرة للاحتفالات – قسم النساء',
    folder: '02_Women_Hall',
  },
  men: {
    title: 'قسم الرجال',
    description: 'جميع صور صالة ومجلس الرجال في قاعة الباخرة ضمن قسم واحد.',
    alt: 'قاعة الباخرة للاحتفالات – قسم الرجال',
    folder: '03_Men_Hall',
  },
  buffet: {
    title: 'صالة الطعام والبوفيه',
    description: 'الصور الحقيقية لصالة الطعام وتجهيزاتها في قاعة الباخرة.',
    alt: 'قاعة الباخرة – صالة الطعام والبوفيه',
    folder: '04_Dining_Buffet',
  },
  exterior: {
    title: 'الواجهات والساحة الخارجية',
    description: 'الواجهات والساحة الخارجية لقاعة الباخرة في جدة.',
    alt: 'الواجهة الخارجية لقاعة الباخرة في جدة',
    folder: '05_Exterior_Outdoor_Yard',
  },
  facilities: {
    title: 'المرافق',
    description: 'المرافق الخدمية الحقيقية داخل قاعة الباخرة للاحتفالات.',
    alt: 'مرافق قاعة الباخرة للاحتفالات',
    folder: '06_Facilities',
  },
};

const createCategoryImages = (categoryId: GalleryCategoryId, filenames: readonly string[]): GalleryImage[] => {
  const category = categoryCopy[categoryId];
  return filenames.map((filename, index) => ({
    id: `${categoryId}-${filename.replace(/\.[^.]+$/, '').replaceAll('_', '-')}`,
    src: `/${category.folder}/${filename}`,
    alt: `${category.alt} – زاوية ${index + 1}`,
    width: filename === 'women_hall_old_extra.jpg' ? 571 : IMAGE_WIDTH,
    height: filename === 'women_hall_old_extra.jpg' ? 382 : IMAGE_HEIGHT,
    categoryId,
    title: `${category.title} – صورة ${index + 1}`,
    description: category.description,
    featured: index < 3,
  }));
};

// Ordered visually: wide establishing views first, then alternate angles and details.
export const WOMEN_SECTION_IMAGES = createCategoryImages('women', [
  'women_03.jpg', 'women_01.jpg', 'women_02.jpg', 'women_05.jpg', 'women_11.jpg', 'women_19.jpg',
  'women_23.jpg', 'women_14.jpg', 'women_04.jpg', 'women_07.jpg', 'women_09.jpg', 'women_10.jpg',
  'women_20.jpg', 'women_13.jpg', 'women_17.jpg', 'women_08.jpg', 'women_06.jpg', 'women_15.jpg',
  'women_21.jpg', 'women_22.jpg', 'women_18.jpg', 'women_12.jpg', 'women_16.jpg', 'women_hall_old_extra.jpg',
] as const);

export const MEN_SECTION_IMAGES = createCategoryImages('men', [
  'men_01.jpg', 'men_03.jpg', 'men_09.jpg', 'men_02.jpg', 'men_08.jpg', 'men_07.jpg', 'men_10.jpg',
  'men_04.jpg', 'men_06.jpg', 'men_05.jpg', 'men_11.jpg', 'men_12.jpg', 'men_13.jpg',
] as const);

export const BUFFET_IMAGES = createCategoryImages('buffet', [
  'food_02.jpg', 'food_01.jpg', 'food_04.jpg', 'food_03.jpg', 'food_05.jpg', 'food_06.jpg',
] as const);

export const EXTERIOR_IMAGES = createCategoryImages('exterior', [
  'men_18.jpg', 'men_15.jpg', 'men_16.jpg', 'men_14.jpg', 'men_17.jpg',
] as const);

export const FACILITIES_IMAGES = createCategoryImages('facilities', ['food_07.jpg', 'food_08.jpg'] as const);

export const FEATURED_IMAGES: GalleryImage[] = [
  ['women_03.jpg', 'women', 'صالة النساء'],
  ['women_01.jpg', 'women', 'ممر صالة النساء'],
  ['men_01.jpg', 'men', 'قسم الرجال'],
  ['men_15.jpg', 'exterior', 'الواجهة الخارجية'],
  ['food_01.jpg', 'buffet', 'صالة الطعام'],
  ['extra_05.jpg', 'women', 'صالة النساء القديمة'],
].map(([filename, categoryId, title], index) => ({
  id: `featured-${filename.replace('.jpg', '').replaceAll('_', '-')}`,
  src: `/01_Featured_Website/${filename}`,
  alt: `صورة مميزة لقاعة الباخرة للاحتفالات – ${title}`,
  width: filename === 'extra_05.jpg' ? 571 : IMAGE_WIDTH,
  height: filename === 'extra_05.jpg' ? 382 : IMAGE_HEIGHT,
  categoryId,
  title,
  featured: true,
  description: 'صورة حقيقية مختارة من قاعة الباخرة للاحتفالات.',
  badge: index === 0 ? 'الصورة الرئيسية' : 'صورة مميزة',
}));

export const HERO_IMAGE = FEATURED_IMAGES[0];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'women', title: categoryCopy.women.title, description: categoryCopy.women.description, coverImage: WOMEN_SECTION_IMAGES[0].src, images: WOMEN_SECTION_IMAGES },
  { id: 'men', title: categoryCopy.men.title, description: categoryCopy.men.description, coverImage: MEN_SECTION_IMAGES[0].src, images: MEN_SECTION_IMAGES },
  { id: 'buffet', title: categoryCopy.buffet.title, description: categoryCopy.buffet.description, coverImage: BUFFET_IMAGES[0].src, images: BUFFET_IMAGES },
  { id: 'exterior', title: categoryCopy.exterior.title, description: categoryCopy.exterior.description, coverImage: EXTERIOR_IMAGES[0].src, images: EXTERIOR_IMAGES },
  { id: 'facilities', title: categoryCopy.facilities.title, description: categoryCopy.facilities.description, coverImage: FACILITIES_IMAGES[0].src, images: FACILITIES_IMAGES },
];

export const ALL_GALLERY_IMAGES: GalleryImage[] = GALLERY_CATEGORIES.flatMap((category) => category.images);
export const ALL_REGISTERED_HALL_IMAGES: GalleryImage[] = [...FEATURED_IMAGES, ...ALL_GALLERY_IMAGES];

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
  badge: image.badge,
  width: image.width,
  height: image.height,
}));

