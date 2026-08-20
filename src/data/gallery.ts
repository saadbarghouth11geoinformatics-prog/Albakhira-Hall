import type { GalleryCategory, GalleryImage, GalleryMedia } from '../types';

export type GalleryCategoryId = 'women' | 'men' | 'buffet' | 'exterior' | 'facilities';
type HallImage = GalleryImage & { categoryId: GalleryCategoryId };

const frame = (video: string, number: number, categoryId: GalleryCategoryId, title: string, description: string, featured = false): HallImage => ({
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

const newHallImage = (
  number: number,
  categoryId: GalleryCategoryId,
  title: string,
  description: string,
  featured = false,
): HallImage => ({
  id: `new-hall-${String(number).padStart(2, '0')}`,
  src: `/new-media/new-hall-${String(number).padStart(2, '0')}.webp`,
  alt: `${title} في قاعة الباخرة للاحتفالات بجدة`,
  width: 1440,
  height: 2560,
  categoryId,
  title,
  description,
  featured,
});

const hallImages: HallImage[] = [
  newHallImage(12, 'women', 'إطلالة بانورامية على صالة النساء', 'منظر واسع يوضح توزيع الطاولات والجلسات والديكور.', true),
  newHallImage(6, 'women', 'الصالة من الطابق العلوي', 'زاوية مرتفعة تظهر رحابة الصالة وتناسق تجهيزاتها.', true),
  newHallImage(10, 'women', 'ممر العروس وإضاءة السقف', 'تفاصيل الممر والثريات والتجهيزات المضيئة.', true),
  newHallImage(8, 'women', 'الكوشة والدرج الرئيسي', 'مشهد للكوشة والدرج المحاط بتنسيقات الورد.', true),
  newHallImage(1, 'women', 'جلسات الاستقبال تحت الثريات', 'جلسات مريحة وطاولات أنيقة وإضاءة كريستالية.'),
  newHallImage(2, 'women', 'تفاصيل الجلسات والطاولات', 'تنسيق متناسق للجلسات وديكور الطاولات.'),
  newHallImage(3, 'women', 'الطاولات وممر الحركة', 'زاوية توضح سهولة الحركة بين الطاولات.'),
  newHallImage(4, 'women', 'الثريات والديكور الداخلي', 'تفاصيل إضاءة السقف والديكور الفاخر.'),
  newHallImage(5, 'women', 'إطلالة على الدرج والكوشة', 'تكوين واسع يجمع الدرج والكوشة والجلسات.'),
  newHallImage(7, 'women', 'ممر الصالة الرئيسي', 'منظور ممتد للممر نحو منصة العروس.'),
  newHallImage(9, 'women', 'تجهيزات إحدى المناسبات', 'توزيع الطاولات والورد في تجهيز حديث.'),
  newHallImage(11, 'women', 'تفاصيل السقف الكريستالي', 'إضاءة مميزة تضيف أجواء احتفالية للصالة.'),
  newHallImage(13, 'exterior', 'واجهة قاعة الباخرة', 'واجهة القاعة واللوحة التعريفية عند الوصول.', true),

  frame('video_01', 1, 'women', 'الكوشة والثريا الرئيسية', 'تصميم أنيق يجمع بين الإضاءة الدافئة وتنسيقات الورد.', true),
  frame('video_01', 2, 'women', 'تفاصيل ديكور الكوشة', 'تنسيق الورد والخلفيات المضيئة حول منصة العروس.'),
  frame('video_01', 3, 'women', 'مدخل صالة النساء', 'منظر المدخل والدرج مع ركن الترحيب بالمناسبة.'),
  frame('video_01', 4, 'women', 'جلسة العروس', 'جلسة مريحة محاطة بتنسيقات الورد داخل الصالة.'),
  frame('video_09', 1, 'women', 'إطلالة الصالة والجلسات', 'زاوية واسعة توضح الطاولات والجلسات ومساحة الصالة.', true),
  frame('video_09', 2, 'women', 'تفاصيل طاولات الاستقبال', 'تنسيق الطاولات والورد وأدوات الضيافة.'),
  frame('video_09', 3, 'women', 'مسرح العروس', 'المسرح والكوشة في مواجهة ممر الزفة.'),
  frame('video_09', 4, 'women', 'ركن الترحيب', 'تنسيق مميز عند مدخل الصالة لاستقبال الضيوف.'),
  frame('video_09', 5, 'women', 'الممر الرئيسي للصالة', 'منظور ممتد للممر والطاولات وصولًا إلى المسرح.'),
  frame('video_13', 4, 'women', 'جلسة محاطة بالورد', 'ركن جلوس هادئ بتنسيق الورد الأحمر والأبيض.'),

  frame('video_04', 1, 'men', 'مجلس الرجال الداخلي', 'جلسات رحبة موزعة لتوفير الراحة وسهولة الحركة.'),
  frame('video_04', 2, 'men', 'صفوف استقبال الضيوف', 'ترتيب منظم للجلسات والطاولات الجانبية.'),
  frame('video_04', 3, 'men', 'إطلالة واسعة على المجلس', 'زاوية شاملة توضح مساحة قسم الرجال.', true),
  frame('video_04', 4, 'men', 'تفاصيل الكراسي والطاولات', 'تنسيق متناسق للجلسات مع الطاولات الجانبية.'),
  frame('video_04', 5, 'men', 'المجلس من زاوية مرتفعة', 'منظور مختلف يوضح توزيع الجلسات داخل القسم.'),

  frame('video_12', 1, 'buffet', 'تقديم العصائر', 'صوانٍ مرتبة لتقديم العصائر والمشروبات للضيوف.'),
  frame('video_12', 2, 'buffet', 'تقديم قوالب الحلوى', 'تشكيلة من الحلويات جاهزة للتقديم.', true),
  frame('video_12', 3, 'buffet', 'خدمة القهوة والشاي', 'تجهيز فناجين القهوة والشاي ضمن خدمة الضيافة.'),
  frame('video_12', 4, 'buffet', 'تشكيلة الحلويات', 'أصناف متنوعة تقدم للضيوف أثناء المناسبة.'),
  frame('video_13', 1, 'buffet', 'طاولة الحلوى الرئيسية', 'تنسيق متكامل للحلويات والورد والخلفيات المضيئة.'),
  frame('video_13', 2, 'buffet', 'تفاصيل ركن الحلوى', 'عرض قريب لتفاصيل الأصناف وطريقة التقديم.'),
  frame('video_14', 1, 'buffet', 'تجهيز بوفيه الحلويات', 'ركن مرتب للحلوى مع لمسات الورد والإضاءة.'),
  frame('video_14', 4, 'buffet', 'طاولة المشروبات', 'تجهيز المياه وأدوات تقديم القهوة على الطاولات.'),

  frame('video_15', 2, 'exterior', 'توزيعات المناسبات', 'تجهيز الهدايا والتوزيعات ضمن ديكور المناسبة.', true),
  frame('video_15', 4, 'exterior', 'ركن الهدايا', 'عرض مرتب للتوزيعات وسط تنسيقات الورد.'),
  frame('video_15', 5, 'exterior', 'طاولة الترحيب والضيافة', 'لمسات بسيطة وأنيقة لاستقبال الضيوف.'),

  frame('video_05', 1, 'facilities', 'ممر الدخول', 'ممر واسع ومنظم يسهّل الوصول إلى القاعة.', true),
  frame('video_05', 3, 'facilities', 'غرفة الجلوس', 'مساحة داخلية هادئة للجلوس والراحة.'),
  frame('video_06', 1, 'facilities', 'مدخل المرافق الداخلية', 'مدخل واضح ضمن المرافق الملحقة بالقاعة.'),
  frame('video_06', 5, 'facilities', 'غرفة العروسة', 'مدخل غرفة العروسة داخل القاعة.'),
];

export const WOMEN_SECTION_IMAGES = hallImages.filter((image) => image.categoryId === 'women');
export const MEN_SECTION_IMAGES = hallImages.filter((image) => image.categoryId === 'men');
export const BUFFET_IMAGES = hallImages.filter((image) => image.categoryId === 'buffet');
export const EXTERIOR_IMAGES = hallImages.filter((image) => image.categoryId === 'exterior');
export const FACILITIES_IMAGES = hallImages.filter((image) => image.categoryId === 'facilities');
export const FEATURED_IMAGES = hallImages.filter((image) => image.featured);
export const HERO_IMAGE = WOMEN_SECTION_IMAGES[0];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'women', title: 'صالة النساء والكوشة', description: 'الصالة والكوشة وممر الزفة من زوايا متعددة.', coverImage: WOMEN_SECTION_IMAGES[0].src, images: WOMEN_SECTION_IMAGES },
  { id: 'men', title: 'مجلس الرجال والجلسات', description: 'مجلس الرجال ومناطق استقبال الضيوف.', coverImage: MEN_SECTION_IMAGES[2].src, images: MEN_SECTION_IMAGES },
  { id: 'buffet', title: 'الضيافة والحلويات', description: 'الحلويات والمشروبات وتجهيزات التقديم.', coverImage: BUFFET_IMAGES[4].src, images: BUFFET_IMAGES },
  { id: 'exterior', title: 'التجهيزات والديكور', description: 'تفاصيل الهدايا والتوزيعات وأركان الترحيب.', coverImage: EXTERIOR_IMAGES[0].src, images: EXTERIOR_IMAGES },
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
