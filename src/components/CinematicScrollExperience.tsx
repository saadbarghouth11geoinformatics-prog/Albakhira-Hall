import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import {
  Sparkles,
  Utensils,
  Users,
  Building,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface StorySceneProps {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  revealImage?: string;
  badge?: string;
  accent?: 'women' | 'men' | 'buffet' | 'exterior';
}

const StoryScene: React.FC<StorySceneProps> = ({
  eyebrow,
  title,
  text,
  image,
  revealImage,
  badge,
  accent,
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Trigger smooth scroll animation when the scene enters the viewport
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Scale: subtle cinematic zoom as user scrolls into the scene
  const scale = useTransform(smoothProgress, [0.1, 0.8], [1, 1.08]);
  
  // Reveal: smooth crossfade transition to the illuminated / dressed reveal image (starts midway when scene is nicely centered)
  const revealOpacity = useTransform(smoothProgress, [0.3, 0.65], [0, 1]);
  
  // Text float up & fade in
  const contentY = useTransform(smoothProgress, [0.1, 0.45], [40, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
  
  // Subtle ambient glow
  const glow = useTransform(smoothProgress, [0.25, 0.7], [0.15, 0.65]);

  return (
    <section
      ref={sceneRef}
      data-theme="dark"
      className="cinematic-story relative min-h-[85vh] sm:min-h-[92vh] md:min-h-[105vh] bg-[var(--color-navy-950)] text-white overflow-hidden flex items-end py-12 sm:py-20 border-b border-[var(--color-champagne-500)]/20"
      aria-label={title}
      dir="rtl"
    >
      {/* Background Visual Layer with Scroll Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base Image */}
        <motion.img
          style={reduced ? undefined : { scale }}
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (accent === 'women') {
              target.src = '/01_Featured_Website/women_03.jpg';
            } else if (accent === 'men') {
              target.src = '/01_Featured_Website/men_01.jpg';
            } else if (accent === 'buffet') {
              target.src = '/01_Featured_Website/food_01.jpg';
            } else {
              target.src = '/05_Exterior_Outdoor_Yard/men_18.jpg';
            }
          }}
        />

        {/* Reveal Image (Transitions smoothly on scroll on ALL screen sizes) */}
        {revealImage && (
          <motion.img
            style={reduced ? undefined : { opacity: revealOpacity, scale }}
            src={revealImage}
            alt={`${title} - الإضاءة والتجهيز`}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (accent === 'women') {
                target.src = '/02_Women_Hall/women_03.jpg';
              } else if (accent === 'men') {
                target.src = '/03_Men_Hall/men_01.jpg';
              } else if (accent === 'buffet') {
                target.src = '/04_Dining_Buffet/food_02.jpg';
              } else {
                target.src = '/05_Exterior_Outdoor_Yard/men_18.jpg';
              }
            }}
          />
        )}

        {/* Ambient Lighting & High Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/65 to-[var(--color-navy-950)]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-950)]/80 via-transparent to-transparent hidden md:block" />
        
        <motion.div
          style={reduced ? undefined : { opacity: glow }}
          className={`absolute inset-0 ${
            accent === 'exterior'
              ? 'bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18),transparent_65%)]'
              : 'bg-[radial-gradient(circle_at_50%_60%,rgba(243,229,171,0.15),transparent_55%)]'
          }`}
        />
      </div>

      {/* Foreground Content Card with High Contrast */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
          className="max-w-3xl"
        >
          <div className="inline-block p-6 sm:p-8 md:p-10 rounded-3xl bg-[var(--color-navy-950)]/80 backdrop-blur-xl border border-[var(--color-champagne-500)]/35 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            
            {/* Top Eyebrow & Badges */}
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-300)]" />
                {eyebrow}
              </span>
              {badge && (
                <span className="text-xs text-[var(--color-champagne-300)]/80 font-medium">
                  {badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-tajawal text-white leading-tight">
              {title}
            </h2>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-base md:text-lg text-[#e4eaf0] leading-relaxed">
              {text}
            </p>

            {/* Bottom Accent Indicator */}
            <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-[var(--color-champagne-500)]/20">
              <div className="flex items-center gap-2 text-xs text-[var(--color-champagne-300)] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" />
                <span>تجهيزات ملكية متكاملة</span>
              </div>
              <div className="h-1 w-24 rounded-full bg-gradient-to-l from-[var(--color-champagne-500)] to-transparent" />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface StoryCardProps {
  title: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
}

const StoryCard: React.FC<StoryCardProps> = ({ title, subtitle, image, icon }) => {
  return (
    <article
      data-theme="dark"
      className="relative shrink-0 w-[82vw] sm:w-[55vw] md:w-[380px] h-[260px] sm:h-[300px] rounded-3xl overflow-hidden border border-[var(--color-champagne-500)]/35 shadow-2xl snap-center group cursor-pointer bg-[var(--color-navy-900)]"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (title.includes('نساء')) target.src = '/01_Featured_Website/women_03.jpg';
          else if (title.includes('رجال')) target.src = '/01_Featured_Website/men_01.jpg';
          else if (title.includes('طعام') || title.includes('بوفيه')) target.src = '/01_Featured_Website/food_01.jpg';
          else target.src = '/05_Exterior_Outdoor_Yard/men_18.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl gold-gradient text-[var(--color-navy-950)] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold font-tajawal text-white group-hover:text-[var(--color-champagne-300)] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[var(--color-champagne-300)] mt-0.5 font-medium">
            {subtitle}
          </p>
        </div>
      </div>
    </article>
  );
};

export const CinematicScrollExperience: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth * 0.75;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-[var(--color-navy-950)]" dir="rtl">
      
      {/* 1. SCENE 1: WOMEN HALL */}
      <StoryScene
        eyebrow="المشهد الأول • صالة النساء"
        title="كل تفصيلة تُجهّز لتصنع ليلة استثنائية"
        text="تظهر الصالة الفخمة بأرقى التجهيزات، من ممر العروس الملكي والكوشة إلى الطاولات المنسقة والإضاءات الليزرية الساحرة."
        image="/02_Women_Hall/women_10.jpg"
        revealImage="/02_Women_Hall/women_03.jpg"
        badge="كوشة وممر ملكي فندقي"
        accent="women"
      />

      {/* 2. SCENE 2: MEN HALL */}
      <StoryScene
        eyebrow="المشهد الثاني • قسم الرجال"
        title="مساحة رحبة تليق بحفاوة الاستقبال"
        text="مجلس فسيح ومهيب مجهز بأفخم الكنب والمفارش، مع طاقم متخصص لتقديم القهوة والشاي والضيافة العربية طوال الحفل."
        image="/03_Men_Hall/men_11.jpg"
        revealImage="/03_Men_Hall/men_01.jpg"
        badge="مجلس 100 فرش + حوش خارجي"
        accent="men"
      />

      {/* 3. SCENE 3: BUFFET & DINING */}
      <StoryScene
        eyebrow="المشهد الثالث • صالة الطعام والبوفيه"
        title="تجربة ضيافة متكاملة تكتمل بها الفرحة"
        text="صالة طعام منظمة وبوفيه مفتوح 10 متر وتورتة 3 أدوار تعكس كرم الضيافة بأعلى معايير الجودة."
        image="/04_Dining_Buffet/food_01.jpg"
        revealImage="/04_Dining_Buffet/food_02.jpg"
        badge="بوفيه 10 متر شامل الطاقم"
        accent="buffet"
      />

      {/* 4. SCENE 4: EXTERIOR & ILLUMINATION */}
      <StoryScene
        eyebrow="المشهد الرابع • الواجهة والساحة الخارجية"
        title="حين تضيء القاعة تبدأ أجمل الحكايات"
        text="يتحول المشهد تدريجيًا إلى أجواء ليلية أكثر عمقًا، وتبرز إضاءة الواجهة والساحة بالتتابع."
        image="/05_Exterior_Outdoor_Yard/men_17.jpg"
        revealImage="/05_Exterior_Outdoor_Yard/men_18.jpg"
        badge="إضاءات ليلية ساحرة"
        accent="exterior"
      />

      {/* 5. Quick Horizontal Panorama Showcase */}
      <section
        data-theme="dark"
        className="py-12 sm:py-16 bg-[var(--color-navy-950)] text-white border-t border-[var(--color-champagne-500)]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[var(--color-champagne-500)] text-xs font-bold">
                تصفح سريع لجميع المرافق
              </span>
              <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white mt-1">
                محطات القاعة المتكاملة
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollGallery('right')}
                aria-label="السابق في المعرض"
                className="w-10 h-10 rounded-xl bg-[var(--color-navy-900)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] text-white border border-[var(--color-champagne-500)]/30 flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollGallery('left')}
                aria-label="التالي في المعرض"
                className="w-10 h-10 rounded-xl bg-[var(--color-navy-900)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] text-white border border-[var(--color-champagne-500)]/30 flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={galleryRef}
            className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar touch-pan-x"
          >
            <StoryCard
              title="صالة النساء الداخلية"
              subtitle="كوشة وتنسيق ملكي فاخر"
              image="/02_Women_Hall/women_03.jpg"
              icon={<Sparkles className="w-5 h-5" />}
            />
            <StoryCard
              title="مجلس قسم الرجال"
              subtitle="أصالة وكرم الضيافة العربية"
              image="/03_Men_Hall/men_01.jpg"
              icon={<Users className="w-5 h-5" />}
            />
            <StoryCard
              title="صالة الطعام والبوفيه"
              subtitle="بوفيه 10 متر وتورتة 3 دور"
              image="/04_Dining_Buffet/food_02.jpg"
              icon={<Utensils className="w-5 h-5" />}
            />
            <StoryCard
              title="الواجهة والساحة الخارجية"
              subtitle="إضاءات وجلسات حوش فسيحة"
              image="/01_Featured_Website/men_15.jpg"
              icon={<Building className="w-5 h-5" />}
            />
            <StoryCard
              title="المرافق والخدمات"
              subtitle="أعلى معايير الراحة والتنظيم"
              image="/06_Facilities/food_07.jpg"
              icon={<CheckCircle2 className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

    </div>
  );
};
