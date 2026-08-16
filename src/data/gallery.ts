import type { GalleryCategory, GalleryImage, GalleryMedia } from '../types';

export type GalleryCategoryId = 'women' | 'men' | 'buffet' | 'exterior' | 'facilities';
type CleanImage = GalleryImage & { categoryId: GalleryCategoryId };

const frame = (video: string, number: number, categoryId: GalleryCategoryId, title: string, description: string, featured = false): CleanImage => ({
  id: `${video}-frame-${number}`,
  src: `/07_Clean_Video_Frames/${video}_frame_${number}.jpg`,
  alt: `${title} في قاعة الباخرة للاحتفالات بجدة`,
  width: video === 'video_09' ? 576 : 464,
  height: video === 'video_09' ? 1024 : 832,
  categoryId,
  title,
  description,
  featured,
});

const cleanImages: CleanImage[] = [
  frame('video_09', 1, 'women', 'مسرح وكوشة صالة النساء', 'لقطة أصلية توضح المسرح والكوشة وتجهيزات الصالة.', true),
  frame('video_09', 2, 'women', 'إطلالة واسعة على صالة النساء', 'زاوية شاملة توضح توزيع الطاولات ومساحة الصالة.', true),
  frame('video_09', 3, 'women', 'ممر الزفة والطاولات', 'لقطة حقيقية لممر الزفة وتنسيق الطاولات المحيطة.'),
  frame('video_01', 1, 'women', 'ركن الترحيب بالمناسبة', 'تفاصيل ركن الترحيب وتنسيق الورد عند استقبال الضيوف.'),
  frame('video_01', 2, 'women', 'جلسات الاستقبال', 'جانب من جلسات الاستقبال الهادئة داخل القاعة.'),
  frame('video_01', 3, 'women', 'الكوشة وممر العروس', 'منظور مختلف للكوشة وممر العروس داخل صالة النساء.'),
  frame('video_04', 1, 'men', 'جلسات مجلس الرجال', 'لقطة حقيقية من جلسات قسم الرجال وتجهيزاته.'),
  frame('video_04', 2, 'men', 'مجلس استقبال الضيوف', 'زاوية إضافية توضح ترتيب الجلسات ومساحة الحركة.'),
  frame('video_04', 3, 'men', 'تفاصيل قسم الرجال', 'منظور واسع لقسم الرجال ومناطق الجلوس.', true),
  frame('video_12', 1, 'buffet', 'تقديم الضيافة', 'لقطة من تجهيز وتقديم الضيافة للضيوف.'),
  frame('video_12', 2, 'buffet', 'خدمة الحلويات والمشروبات', 'فريق الضيافة أثناء تجهيز الحلويات والمشروبات.', true),
  frame('video_12', 3, 'buffet', 'برج الحلويات', 'تفاصيل مرتبة من ركن الحلويات داخل القاعة.'),
  frame('video_13', 1, 'buffet', 'تجهيز طاولة الحلوى', 'جانب من تنسيق طاولة الحلوى قبل استقبال الضيوف.'),
  frame('video_13', 2, 'buffet', 'بوفيه الحلويات', 'عرض متنوع ومرتب للحلويات والضيافة.', true),
  frame('video_13', 3, 'buffet', 'تفاصيل طاولات الضيافة', 'لقطة قريبة لتنسيق طاولات الضيافة.'),
  frame('video_14', 1, 'buffet', 'ركن الحلوى', 'زاوية مختلفة من ركن الحلوى والتقديم.'),
  frame('video_14', 2, 'buffet', 'تنسيق أصناف الضيافة', 'تفاصيل تجهيز أصناف الضيافة بشكل مرتب.'),
  frame('video_15', 1, 'exterior', 'طاولة توزيعات المناسبة', 'تنسيق حقيقي لطاولة التوزيعات والهدايا.', true),
  frame('video_15', 2, 'exterior', 'تفاصيل الديكور والتوزيعات', 'لقطة قريبة للتفاصيل والزينة المستخدمة بالمناسبة.'),
  frame('video_15', 3, 'exterior', 'تجهيز ركن المناسبة', 'زاوية أخرى من تجهيز ركن التوزيعات.'),
  frame('video_16', 2, 'exterior', 'ركن العطور والترحيب', 'ركن مرتب للعطور وتفاصيل استقبال الضيوف.'),
  frame('video_05', 1, 'facilities', 'مدخل القاعة', 'لقطة أصلية توضح المدخل ومسار الوصول.', true),
  frame('video_05', 2, 'facilities', 'الممر الداخلي', 'جانب من الممرات والمداخل الداخلية للقاعة.'),
  frame('video_05', 3, 'facilities', 'غرفة الجلوس والخدمات', 'مساحة داخلية مخصصة للراحة والخدمات.'),
  frame('video_06', 1, 'facilities', 'ممر المرافق', 'لقطة من ممر المرافق المؤدي إلى الغرف الداخلية.'),
  frame('video_06', 3, 'facilities', 'مدخل غرفة العروسة', 'مدخل غرفة العروسة داخل القاعة.', true),
];

export const WOMEN_SECTION_IMAGES = cleanImages.filter((image) => image.categoryId === 'women');
export const MEN_SECTION_IMAGES = cleanImages.filter((image) => image.categoryId === 'men');
export const BUFFET_IMAGES = cleanImages.filter((image) => image.categoryId === 'buffet');
export const EXTERIOR_IMAGES = cleanImages.filter((image) => image.categoryId === 'exterior');
export const FACILITIES_IMAGES = cleanImages.filter((image) => image.categoryId === 'facilities');
export const FEATURED_IMAGES = cleanImages.filter((image) => image.featured);
export const HERO_IMAGE = WOMEN_SECTION_IMAGES[1];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'women', title: 'صالة النساء والكوشة', description: 'زوايا متنوعة من الصالة والكوشة وممر الزفة.', coverImage: WOMEN_SECTION_IMAGES[1].src, images: WOMEN_SECTION_IMAGES },
  { id: 'men', title: 'مجلس الرجال والجلسات', description: 'جلسات قسم الرجال ومناطق استقبال الضيوف.', coverImage: MEN_SECTION_IMAGES[2].src, images: MEN_SECTION_IMAGES },
  { id: 'buffet', title: 'الضيافة والحلويات', description: 'تجهيزات الضيافة والحلويات وطرق التقديم.', coverImage: BUFFET_IMAGES[4].src, images: BUFFET_IMAGES },
  { id: 'exterior', title: 'التجهيزات والديكور', description: 'تفاصيل التوزيعات والديكور وأركان الترحيب.', coverImage: EXTERIOR_IMAGES[0].src, images: EXTERIOR_IMAGES },
  { id: 'facilities', title: 'المداخل والمرافق', description: 'مداخل القاعة وممراتها والمرافق الداخلية.', coverImage: FACILITIES_IMAGES[0].src, images: FACILITIES_IMAGES },
];

export const ALL_GALLERY_IMAGES = GALLERY_CATEGORIES.flatMap((category) => category.images);
export const ALL_REGISTERED_HALL_IMAGES = ALL_GALLERY_IMAGES;

const legacyCategoryByGalleryCategory: Record<GalleryCategoryId, GalleryMedia['category']> = {
  women: 'wedding', men: 'deck', buffet: 'buffet', exterior: 'decor', facilities: 'interior',
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
