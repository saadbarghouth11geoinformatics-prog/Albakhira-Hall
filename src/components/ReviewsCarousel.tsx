import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  ChevronRight,
  ChevronLeft,
  Quote,
  UserCheck,
  Award,
  Sparkles,
  Maximize2,
  X,
  Play,
  Pause,
  CheckCircle2,
  Utensils,
  Camera,
  Layers,
  ShieldCheck,
  Info
} from 'lucide-react';

export interface ReviewCarouselSlide {
  id: string;
  reviewerName: string;
  eventType: string;
  eventDate: string;
  rating: number;
  reviewText: string;
  verifiedBooking: boolean;
  avatarUrl: string;
  proofBadge: string;
  proofImage: string;
  proofTitle: string;
  proofDescription: string;
  keyHighlights: string[];
}

const CAROUSEL_SLIDES: ReviewCarouselSlide[] = [
  {
    id: 'slide-1',
    reviewerName: 'عائلة الحارثي - جدة',
    eventType: 'حفل زفاف ملكي',
    eventDate: 'يناير 2026',
    rating: 5,
    reviewText:
      'ما شاء الله تبارك الله، العروض مطابقة للورقة تماماً دون أي زيادة أو تكاليف خفية! البوفيه الفضي الـ 10 متر كان راقي جداً ولذيذ وشامل لأصناف فندقية، وضيافة الحلا والمعجنات غطت 40 طاولة وزيادة. المباشرات والمشرفة كانوا في قمة اللباقة والنظافة والتنظيم. أنصح كل عريس وعروسة بالباخرة!',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 البوفيه الفضي المفتوح 10m وتورتة 3 دور',
    proofImage: '/04_Dining_Buffet/food_02.jpg',
    proofTitle: 'بوفيه النساء المفتوح 10 متر وتورتة العروسين',
    proofDescription: 'تجهيز السرفيس الفندقي وأطباق الحلويات والمعجنات الطازجة لـ 100 سيدة بالقاعة.',
    keyHighlights: ['بوفيه فضي 10 متر', 'تورتة زفاف 3 دور', '80 صحن حلا ومعجنات مجاناً'],
  },
  {
    id: 'slide-2',
    reviewerName: 'العروس شهد الغامدي',
    eventType: 'حفل زفاف',
    eventDate: 'يناير 2026',
    rating: 5,
    reviewText:
      'دخلة الزفة كانت خرافية! كشاف العروسة المباشر مع جهاز البخار المكثف والليزر المزدوج خلى القاعة كأنها لقطة من فيلم خيالي. المشرفة كانت واقفة معاي خطوة بخطوة وعاملات مسك الفستان ما فارقوني. شكراً قاعة الباخرة جعلتم ليلتي لا تُنسى!',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 كوشة العروسة وممر الزفة الملكي',
    proofImage: '/02_Women_Hall/women_05.jpg',
    proofTitle: 'الكوشة الفاخرة مع المؤثرات الضوئية والبخار',
    proofDescription: 'تصميم الكوشة مع ممر العروسة المزود بكشاف الزفة والمؤثرات الضوئية المجانية.',
    keyHighlights: ['كشاف العروسة المباشر', 'بخار مكثف وليزر', 'عاملات مسك الفستان'],
  },
  {
    id: 'slide-3',
    reviewerName: 'الشيخ أبو فهد الزهراني - الحرازات',
    eventType: 'مناسبة زواج وملكة',
    eventDate: 'فبراير 2026',
    rating: 5,
    reviewText:
      'قسم الرجال كان مجهز 100% كما وعدونا، 100 فرش بالحوش الخارجي مع المباشرين والقهوجي وما قصروا في القهوة والشاي والتمر والبخور الفاخر. بيض الله وجوهكم وجمل الله حالكم أمام ضيوفنا.',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 ضيافة قسم الرجال والجلسات الخارجية',
    proofImage: '/03_Men_Hall/men_01.jpg',
    proofTitle: 'جلسات الحوش الخارجي بـ 100 فرش تراثي',
    proofDescription: 'تجهيزات قسم الرجال والحوش الخارجي المجهز بالطاقم والقهوة العربية والبخور.',
    keyHighlights: ['100 فرش جلسات بالحوش', '10 مباشرين + قهوجي', 'قهوة عربي وبخور فاخر'],
  },
  {
    id: 'slide-4',
    reviewerName: 'عائلة المالكي - مكة وجدة',
    eventType: 'حفل ملكة وزفاف',
    eventDate: 'ديسمبر 2025',
    rating: 5,
    reviewText:
      'بصراحة العرض الشامل المعتمد مقابل هذا الكم الهائل من الخدمات يعتبر فرصة لا تتكرر بجدة. البوفيه 10 متر، تورتة 3 دور طازجة ولذيذة جداً، 30 لتر عصير فريش مانجو وجوافة، والدي جي صوتياته نقية وممتازة بدون أي تشويش.',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 تشكيلة المأكولات والمقبلات الشرقية',
    proofImage: '/04_Dining_Buffet/food_01.jpg',
    proofTitle: 'أطباق البوفيه الساخنة والعصائر الطازجة',
    proofDescription: 'تشكيلة فاخرة من السخانات والمقبلات الفندقية والحلويات المقدمة للضيوف.',
    keyHighlights: ['بوفيه مفتوح سخان متكامل', '30 لتر عصائر طبيعية', 'خدمة سرفيس فندقي'],
  },
  {
    id: 'slide-5',
    reviewerName: 'د. سارة العتيبي',
    eventType: 'حفل زفاف',
    eventDate: 'نوفمبر 2025',
    rating: 5,
    reviewText:
      'طاولات النساء كانت مرتبة ومنسقة بدقة، صحون الحلا والمعجنات (40 صحن) كانت كافية لكل الطاولات وطازجة. خدمة المباشرات كانت سريعة جداً وابتسامتهن ما فارقتهم طوال السهرة.',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 صالة النساء وتنسيق الطاولات المذهبة',
    proofImage: '/02_Women_Hall/women_03.jpg',
    proofTitle: 'صالة النساء الفخمة والإضاءات الفندقية',
    proofDescription: 'صالة النساء المجهزة بطاولات وكراسي مذهبة و40 صحن ضيافة حلا ومعجنات.',
    keyHighlights: ['40 طاولة مجهزة بالضيافة', '10 مباشرات + مشرفة', 'نظافة وتعقيم فندقي'],
  },
  {
    id: 'slide-6',
    reviewerName: 'أبو عبدالله المطيري',
    eventType: 'مناسبة زواج',
    eventDate: 'يناير 2026',
    rating: 5,
    reviewText:
      'الموقع في الحرازات سهل الوصول وبعيد عن زحمة السير، والمواقف واسعة ومظللة اتسعت لجميع سيارات الضيوف بدون أي اختناق. المباخر والفحم والبخور كان معطر الحوش الخارجي طوال الليل.',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 الميدان والاستقبال الخارجي بالقاعة',
    proofImage: '/05_Exterior_Outdoor_Yard/men_18.jpg',
    proofTitle: 'المدخل والمواقف الخارجية بقاعة الباخرة',
    proofDescription: 'ساحات واسعة تتسع لأكثر من 150 سيارة مع حراسة أمنية وتنظيم دخول مرن.',
    keyHighlights: ['مواقف واسعة تتسع +150 سيارة', 'حارس بوابة أمن', 'سهولة الوصول بالحرازات'],
  },
  {
    id: 'slide-7',
    reviewerName: 'عائلة الجهني - جدة',
    eventType: 'حفل ملكة وعقد قران',
    eventDate: 'فبراير 2026',
    rating: 5,
    reviewText:
      'جناح العروسة VIP كان واسع ومجهز بتكييف ممتاز ومرآة مكياج إضاءة هوليوودية. حفل الملكة مر بسلاسة تامة، وتفاعل المعازيم مع صالة النساء كان رائعاً.',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 جناح العروسة والتجهيزات الماسية',
    proofImage: '/02_Women_Hall/women_16.jpg',
    proofTitle: 'جناح العروسة VIP المجهز بالكامل',
    proofDescription: 'مساحة خاصة 45 متر مربع للعروسة مع مرآة مكياج مضاءة ومصعد خاص.',
    keyHighlights: ['جناح عروسة VIP متكامل', 'إضاءة مكياج احترافية', 'خصوصية ومصعد خاص'],
  },
  {
    id: 'slide-8',
    reviewerName: 'العروس ريم الحربي',
    eventType: 'حفل زفاف ملكي',
    eventDate: 'ديسمبر 2025',
    rating: 5,
    reviewText:
      'الكوشة الدائرية المذهبة مع إضاءات الشمعدانات والممر الملكي جعلت الصالة في غاية الفخامة والجمال. التصوير طلع خيالي وكل صديقاتي سألوني عن القاعة.',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 كوشة العروسة الدائرية المذهبة',
    proofImage: '/02_Women_Hall/women_05.jpg',
    proofTitle: 'الكوشة المذهبة والديكورات العصرية',
    proofDescription: 'تنسيق ورود هولندية مع إضاءة خافتة وكشاف زفة مباشر.',
    keyHighlights: ['كوشة مذهبة متطورة', 'ممر زفة مع إضاءات', 'شاشة خلفية LED 4K'],
  },
  {
    id: 'slide-9',
    reviewerName: 'الأستاذ بدر البقمي',
    eventType: 'حفل تخرج وتكريم',
    eventDate: 'يناير 2026',
    rating: 5,
    reviewText:
      'شاشة الـ 4K LED العملاقة على الكوشة كانت واضحة جداً وعرضت مقاطع حفل التخرج بجودة بصرية ممتازة. قسم الرجال يتسع لمئات الضيوف بكل أريحية.',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 شاشة العرض العملاقة 4K LED',
    proofImage: '/02_Women_Hall/women_03.jpg',
    proofTitle: 'شاشة LED سينمائية في صالة الاحتفالات',
    proofDescription: 'شاشة عريضة لعرض الفيديوهات والذكريات والزفات البصرية.',
    keyHighlights: ['شاشة LED سينمائية', 'أنظمة صوتية معزولة', 'تنسيق مسرح ومقاعد'],
  },
  {
    id: 'slide-10',
    reviewerName: 'المهندس سلطان الشريف',
    eventType: 'حفل زفاف',
    eventDate: 'يناير 2026',
    rating: 5,
    reviewText:
      'التعامل مع إدارة قاعة الباخرة كان أسهل وأوضح تعامل مر علي. أمانة ومصداقية وسرعة في تجهيز كل الملاحظات قبل وقت المناسبة بكتير.',
    verifiedBooking: true,
    avatarUrl: '',
    proofBadge: '📸 التنظيم والإدارة المباشرة بالحفل',
    proofImage: '/03_Men_Hall/men_03.jpg',
    proofTitle: 'طاقم الضيافة المباشرة والمشرفة النسائية',
    proofDescription: 'طاقم ضيافة مؤهل بخبرة عالية لتقديم أفضل خدمة في السهرة.',
    keyHighlights: ['إدارة احترافية منظمة', 'التزام بنسبة 100% بالبنود', 'طاقم نسائي ورجالي متخصص'],
  },
];

export const ReviewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  return (
    <section className="py-12 sm:py-16 relative bg-[var(--color-navy-950)] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[var(--color-champagne-500)]/10 via-[var(--color-navy-700)]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/40 mb-3 shadow-lg backdrop-blur-md">
            <Camera className="w-4 h-4 text-[var(--color-champagne-500)]" />
            <span>معرض التقييمات التفاعلي الموثق بالصور</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-tajawal text-white mb-3">
            تجارب العرسان مقرونة <span className="gold-text">بصور حية من الحفل</span>
          </h2>
          <p className="text-[var(--color-navy-100)] text-xs sm:text-sm font-cairo">
            استعرض التقييم وشاهد صورة البوفيه، الكوشة، أو الجلسات التي أثنى عليها العريس أو العروسة بنفس الحفل الموثق.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="dark-overlay-card rounded-3xl border-2 border-[var(--color-champagne-500)]/40 bg-gradient-to-b from-[var(--color-navy-900)] via-[var(--color-navy-950)] to-[var(--color-navy-900)] shadow-2xl p-4 sm:p-8 relative overflow-hidden">
          
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-champagne-500)]/20 text-xs font-cairo">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span className="text-[var(--color-champagne-300)] font-bold">
                تقييم موثق ({currentIndex + 1} من {CAROUSEL_SLIDES.length})
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Autoplay Pause/Play Toggle */}
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-[var(--color-navy-100)] hover:text-white transition-colors cursor-pointer text-[11px]"
                title={isAutoplay ? 'إيقاف التشغيل التلقائي' : 'تشغيل التلقائي'}
              >
                {isAutoplay ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                    <span className="hidden sm:inline">إيقاف مؤقت</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    <span className="hidden sm:inline">تشغيل آلي</span>
                  </>
                )}
              </button>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-white hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all flex items-center justify-center cursor-pointer shadow-md"
                  aria-label="السابق"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-white hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all flex items-center justify-center cursor-pointer shadow-md"
                  aria-label="التالي"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Slide Main Content (Grid 2 Cols) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Right Side: Customer Review & Rating Text */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Reviewer Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--color-champagne-700)] via-[var(--color-champagne-500)] to-[var(--color-champagne-300)] p-0.5 shadow-xl shrink-0">
                      <div className="w-full h-full rounded-full bg-[var(--color-navy-950)] flex items-center justify-center font-black font-tajawal text-[var(--color-champagne-300)] text-base border border-[var(--color-champagne-500)]/40 shadow-inner">
                        {currentSlide.reviewerName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-tajawal flex items-center gap-2">
                        <span>{currentSlide.reviewerName}</span>
                      </h3>
                      <span className="text-xs text-[var(--color-text-muted)] font-cairo">
                        {currentSlide.eventType} • {currentSlide.eventDate}
                      </span>
                    </div>
                  </div>

                  {currentSlide.verifiedBooking && (
                    <span className="px-3 py-1 rounded-full bg-[var(--color-success)]/15 border border-[var(--color-success)]/40 text-[var(--color-success)] text-[11px] font-bold flex items-center gap-1 shrink-0">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>عقد حجز موثق</span>
                    </span>
                  )}
                </div>

                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[var(--color-champagne-500)]">
                    {[...Array(currentSlide.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-[var(--color-champagne-300)] mr-2">5.0 / 5.0</span>
                  </div>
                  <Quote className="w-8 h-8 text-[var(--color-champagne-500)]/20" />
                </div>

                {/* Review Quote Body */}
                <div className="relative bg-[var(--color-navy-950)]/90 p-5 rounded-2xl border border-[var(--color-champagne-500)]/30 shadow-inner">
                  <p className="text-sm sm:text-base text-[var(--color-navy-100)] leading-relaxed font-cairo">
                    "{currentSlide.reviewText}"
                  </p>
                </div>

                {/* Key Highlight Badges mentioned in Review */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[var(--color-champagne-500)] font-cairo flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>أبرز النقاط المذكورة في التقييم:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentSlide.keyHighlights.map((hl, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] text-xs font-bold flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" />
                        <span>{hl}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Left Side: Proof Photo & Details */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--color-champagne-500)] bg-[var(--color-navy-950)] shadow-2xl group">
                  
                  {/* Photo Proof Badge */}
                  <div className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full bg-[var(--color-navy-950)]/90 border border-[var(--color-champagne-500)] text-[var(--color-champagne-300)] text-xs font-bold backdrop-blur-md shadow-xl flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                    <span>{currentSlide.proofBadge}</span>
                  </div>

                  {/* Zoom Fullscreen Button */}
                  <button
                    onClick={() => setFullscreenImage(currentSlide.proofImage)}
                    className="absolute top-3 left-3 z-10 p-2 rounded-full bg-[var(--color-navy-950)]/80 text-white border border-white/20 hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-colors cursor-pointer shadow-lg"
                    title="تكبير الصورة"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Main Proof Image */}
                  <div className="h-64 sm:h-80 overflow-hidden relative">
                    <img
                      src={currentSlide.proofImage}
                      loading="lazy"
                      decoding="async"
                      alt={currentSlide.proofTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Photo Title & Caption below image */}
                  <div className="p-4 bg-[var(--color-navy-900)] border-t border-[var(--color-champagne-500)]/30">
                    <h4 className="text-sm font-bold text-white font-tajawal mb-1">
                      {currentSlide.proofTitle}
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)] font-cairo">
                      {currentSlide.proofDescription}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Thumbnail Navigation Row */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2">
            {CAROUSEL_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-[var(--color-champagne-500)] scale-110 shadow-lg shadow-[var(--color-champagne-500)]/30 ring-2 ring-[var(--color-champagne-500)]/50'
                      : 'border-white/20 opacity-50 hover:opacity-100 hover:border-[var(--color-champagne-500)]/50'
                  }`}
                >
                  <img
                    src={slide.proofImage}
                    loading="lazy"
                    decoding="async"
                    alt={slide.reviewerName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[var(--color-champagne-500)]/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-champagne-500)] fill-[var(--color-navy-950)]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 left-6 text-white bg-black/50 p-2 rounded-full hover:bg-[var(--color-champagne-500)] hover:text-black transition-colors cursor-pointer z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullscreenImage}
                loading="eager"
                decoding="async"
                alt="الصورة الموثقة من الحفل"
                className="max-h-[80vh] w-auto mx-auto rounded-2xl border-2 border-[var(--color-champagne-500)] shadow-2xl object-contain"
                referrerPolicy="no-referrer"
              />
              <p className="text-sm text-[var(--color-champagne-300)] font-cairo mt-3">
                صورة موثقة من إحدى مناسبات قاعة الباخرة للاحتفالات بجدة (الحرازات)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
