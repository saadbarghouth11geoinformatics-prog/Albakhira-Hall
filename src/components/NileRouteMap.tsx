import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Ship,
  MapPin,
  Compass,
  Crown,
  Sparkles,
  Utensils,
  Car,
  Users,
  Navigation,
  Info,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

export interface RouteMarker {
  id: string;
  nameAr: string;
  category: 'focal' | 'hall' | 'catering' | 'deck' | 'parking';
  x: number; // percentage
  y: number; // percentage
  distance: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  imageUrl: string;
  icon: React.ReactNode;
}

const ROUTE_MARKERS: RouteMarker[] = [
  {
    id: 'al-bakhera-main',
    nameAr: 'قاعة الباخرة للاحتفالات',
    category: 'focal',
    x: 50,
    y: 45,
    distance: 'الموقع الرئيسي (0m)',
    shortDesc: 'المقر الملكي الرئيسي لقاعة الباخرة ومسرح الفعاليات بجدة والحرازات',
    fullDesc: 'قلب المناسبة والوجهة الرئيسية المتكاملة التي تجمع بين صالة النساء الملكية، قسم الرجال، والبوفيه الفضي الشامل مع خدمات الضيافة المباشرة.',
    highlights: ['صالة نساء سعة 400 شخص', 'مسرح زفة مع كشاف عروسة وبخار', 'عرض شامل ومتكامل'],
    imageUrl: '/01_Featured_Website/women_03.jpg',
    icon: <Crown className="w-5 h-5 text-[var(--color-navy-950)]" />,
  },
  {
    id: 'dock-gate',
    nameAr: 'بوابة استقبال الضيوف والمدخل الملكي',
    category: 'focal',
    x: 32,
    y: 38,
    distance: '20 متر من القاعة',
    shortDesc: 'مدخل فاخر وممر استقبال مزين بالإضاءات الذهبية وحراس الأمن',
    fullDesc: 'استقبال ضيوف العرسان بمشرفين وأمن متواجدين بصفة مستمرة مع ممر واسع لمنع الاكتظاظ وتوفير أعلى مستويات الأمان والخصوصية.',
    highlights: ['حراسة أمنية خاصة بالنساء', 'ممر دخول واسع للعروسة والضيوف', 'تنسيق مدخل بالورود والإضاءة'],
    imageUrl: '/02_Women_Hall/women_03.jpg',
    icon: <Ship className="w-4 h-4 text-[var(--color-champagne-500)]" />,
  },
  {
    id: 'women-hall',
    nameAr: 'صالة النساء وكوشة الزفة الملكية',
    category: 'hall',
    x: 58,
    y: 35,
    distance: 'داخل القاعة الرئيسية',
    shortDesc: '40 طاولة ضيافة مجهزة بكشاف العروسة، البخار، ومؤثرات الليزر',
    fullDesc: 'صالة مكيفة ومصممة بأعلى معايير الفخامة تتسع لـ 40 طاولة مع طاقم 10 مباشرات ومشرفة صالة متفرغة لمساندة العروسة طوال السهرة.',
    highlights: ['تأمين 40 صحن حلا و40 معجنات', 'عاملات متفرغات لمسك فستان العروس', 'دي جي احترافي ومستلزمات نطق الزفة'],
    imageUrl: '/02_Women_Hall/women_16.jpg',
    icon: <Sparkles className="w-4 h-4 text-[var(--color-champagne-500)]" />,
  },
  {
    id: 'silver-buffet',
    nameAr: 'رصيف البوفيه الفضي المفتوح 10م',
    category: 'catering',
    x: 68,
    y: 52,
    distance: 'جناح الضيافة بداخل صالة النساء',
    shortDesc: 'بوفيه فضي ممتد 10 أمتار مع تورتة 3 دور و30 لتر عصائر فريش',
    fullDesc: 'مجهزة بمعدات تقديم فندقية ساخنة، وتشكيلة مأكولات شرقية وغربية طازجة، مع تورتة زفاف فخمة من 3 أدوار وعصائر مانجو وجوافة طازجة.',
    highlights: ['أصناف فندقية ساخنة وطازجة', '30 لتر عصائر فريش متنوعة', 'تورتة زفاف ملكية 3 دور'],
    imageUrl: '/04_Dining_Buffet/food_02.jpg',
    icon: <Utensils className="w-4 h-4 text-[var(--color-champagne-500)]" />,
  },
  {
    id: 'outdoor-courtyard',
    nameAr: 'قسم الرجال وجلسات الحوش 100 فرش',
    category: 'deck',
    x: 38,
    y: 62,
    distance: 'قسم الرجال الخارجي',
    shortDesc: 'حوش خارجي مجهز بـ 100 فرش جلسات شعبية وتراثية مع القهوجي',
    fullDesc: 'جلسات خارجية مفتوحة ومطلة تتسع لمئات الضيوف، مع تأمين 10 مباشرين احترافيين والقهوجي المختص لتقديم القهوة السعودية والشاي والمباخر.',
    highlights: ['100 فرش جلسات خارجية', '10 مباشرين للرجال + القهوجي', 'تأمين الفحم والمباخر الفاخرة'],
    imageUrl: '/03_Men_Hall/men_01.jpg',
    icon: <Users className="w-4 h-4 text-[var(--color-champagne-500)]" />,
  },
  {
    id: 'parking-valet',
    nameAr: 'مواقف السيارات المظللة والمستقلة',
    category: 'parking',
    x: 20,
    y: 72,
    distance: '50 متر من البوابة',
    shortDesc: 'ساحة مواقف تتسع لأكثر من 250 سيارة مع إنارة وسهولة مناورة',
    fullDesc: 'مواقف مخصصة لسيارات المعازيم والضيوف قريبة جداً من البوابات الرئيسية لمنع التزاحم وضمان انسيابية الحركة المرورية.',
    highlights: ['سعة 250+ سيارة', 'إنارات ليلية كاملة', 'مسار دخول وخروج سلس'],
    imageUrl: '/05_Exterior_Outdoor_Yard/men_18.jpg',
    icon: <Car className="w-4 h-4 text-[var(--color-champagne-500)]" />,
  },
  {
    id: 'station-access',
    nameAr: 'طريق الوصول - بعد محطة المدينة بـ 500م',
    category: 'parking',
    x: 80,
    y: 25,
    distance: 'طريق الحرازات الرئيسي',
    shortDesc: 'نقطة الاستدلال الرئيسية وسهولة الوصول من جميع أنحاء جدة',
    fullDesc: 'موقع استراتيجي وسهل الوصول في الحرازات بعيداً عن اختناقات وسط المدينة مع لوحات إرشادية واضحة تقودك مباشرة للقاعة.',
    highlights: ['بعد محطة المدينة بـ 500م فقط', 'طريق مسفلت وواسع', 'مباشرة على الخريطة GPS'],
    imageUrl: '/logo-official.png',
    icon: <Navigation className="w-4 h-4 text-[var(--color-champagne-500)]" />,
  },
];

export const NileRouteMap: React.FC = () => {
  const [selectedMarker, setSelectedMarker] = useState<RouteMarker>(ROUTE_MARKERS[0]);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredMarkers = ROUTE_MARKERS.filter((m) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'focal') return m.category === 'focal';
    if (activeCategory === 'hall') return m.category === 'hall';
    if (activeCategory === 'catering') return m.category === 'catering';
    if (activeCategory === 'deck') return m.category === 'deck';
    if (activeCategory === 'parking') return m.category === 'parking';
    return true;
  });

  return (
    <div className="bg-gradient-to-b from-[var(--color-navy-900)] via-[var(--color-navy-950)] to-[var(--color-navy-900)] p-6 sm:p-8 rounded-3xl border-2 border-[var(--color-champagne-500)]/40 shadow-2xl my-10 max-w-6xl mx-auto relative overflow-hidden font-cairo">
      {/* Background Decorative Ripples */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--color-success)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[var(--color-champagne-500)]/30 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/30 mb-2">
            <Ship className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> خريطة مسار ومحيط قاعة الباخرة التفاعلية
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-tajawal gold-text">
            خريطة الوصول إلى قاعة الباخرة
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-navy-100)] mt-1">
            مرر الماوس أو انقر على النقاط الاستكشافية لمعاينة محيط القاعة، المداخل، البوفيه الفضي، وقسم الرجال.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-[var(--color-navy-950)]/80 p-2 rounded-2xl border border-[var(--color-champagne-500)]/30 shrink-0">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'focal', label: 'الباخرة (الرئيسي)' },
            { id: 'hall', label: 'صالة النساء والزفة' },
            { id: 'catering', label: 'البوفيه الفضي' },
            { id: 'deck', label: 'قسم الرجال' },
            { id: 'parking', label: 'المواقف والوصول' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'gold-gradient text-[var(--color-navy-950)] shadow-md scale-105'
                  : 'bg-transparent text-[var(--color-navy-100)] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map & Details Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SVG Interactive Nile River Route Canvas (8 Cols) */}
        <div className="lg:col-span-7 bg-[var(--color-navy-950)] rounded-2xl border-2 border-[var(--color-champagne-500)]/40 shadow-inner p-4 sm:p-6 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden group">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-navy-800)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-navy-800)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

          {/* Compass & Waterway Watermark Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-[var(--color-navy-950)]/90 border border-[var(--color-champagne-500)]/30 px-3 py-1.5 rounded-xl text-[11px] font-bold text-[var(--color-champagne-300)] z-10 shadow-lg backdrop-blur-md">
            <Compass className="w-4 h-4 text-[var(--color-champagne-500)] animate-spin-slow" />
            <span>محيط القاعة والمجرى المائي التفاعلي</span>
          </div>

          {/* Focal Point Badge */}
          <div className="absolute bottom-4 left-4 bg-[var(--color-navy-950)]/90 border border-[#25D366]/40 px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#25D366] z-10 shadow-lg flex items-center gap-1.5 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
            <span>موقع قاعة الباخرة</span>
          </div>

          {/* SVG Map Container */}
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full max-h-[420px] drop-shadow-[0_0_20px_rgba(212,175,55,0.15)] relative z-0"
          >
            <defs>
              {/* Gradient for River Waterway Path */}
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-navy-700)" stopOpacity="0.8" />
                <stop offset="40%" stopColor="var(--color-navy-700)" stopOpacity="0.9" />
                <stop offset="50%" stopColor="var(--color-champagne-500)" stopOpacity="0.95" />
                <stop offset="60%" stopColor="var(--color-navy-700)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--color-navy-700)" stopOpacity="0.8" />
              </linearGradient>

              {/* Glowing Filter */}
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Landmass Outlines */}
            <path
              d="M 50,80 Q 200,40 380,90 T 750,70"
              fill="none"
              stroke="var(--color-navy-800)"
              strokeWidth="40"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M 20,420 Q 250,450 500,400 T 780,440"
              fill="none"
              stroke="var(--color-navy-800)"
              strokeWidth="45"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Main Scenic Flowing River / Nile Path */}
            <motion.path
              d="M 720,80 C 600,120 580,210 500,225 C 420,240 340,180 250,260 C 180,320 120,380 50,420"
              fill="none"
              stroke="url(#riverGradient)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#goldGlow)"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Flowing Dash Route Line Effect */}
            <motion.path
              d="M 720,80 C 600,120 580,210 500,225 C 420,240 340,180 250,260 C 180,320 120,380 50,420"
              fill="none"
              stroke="var(--color-champagne-100)"
              strokeWidth="3"
              strokeDasharray="10 12"
              strokeLinecap="round"
              animate={{ strokeDashoffset: [-100, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Access Road Connecting Path */}
            <path
              d="M 640,125 L 400,225 L 160,360"
              fill="none"
              stroke="var(--color-champagne-500)"
              strokeWidth="2"
              strokeDasharray="4 6"
              opacity="0.5"
            />
          </svg>

          {/* HTML Overlay Markers positioned precisely on percentage coordinates */}
          {filteredMarkers.map((marker) => {
            const isSelected = selectedMarker.id === marker.id;
            const isHovered = hoveredMarkerId === marker.id;
            const isFocal = marker.category === 'focal';

            return (
              <div
                key={marker.id}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => setSelectedMarker(marker)}
                onMouseEnter={() => setHoveredMarkerId(marker.id)}
                onMouseLeave={() => setHoveredMarkerId(null)}
              >
                {/* Focal Point Radar Sonar Pulsing Rings for Al Bakhera */}
                {isFocal && (
                  <>
                    <motion.div
                      className="absolute -inset-6 rounded-full bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)]"
                      animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute -inset-3 rounded-full bg-[var(--color-champagne-100)]/30 border border-[var(--color-champagne-100)]"
                      animate={{ scale: [1, 1.6], opacity: [0.9, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                    />
                  </>
                )}

                {/* Marker Button */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-2.5 rounded-full border-2 transition-all shadow-2xl flex items-center justify-center ${
                    isSelected
                      ? 'bg-gradient-to-tr from-[var(--color-champagne-700)] via-[var(--color-champagne-500)] to-[var(--color-champagne-100)] border-white text-[var(--color-navy-950)] shadow-[0_0_25px_var(--color-champagne-500)] scale-110'
                      : isFocal
                      ? 'bg-[var(--color-champagne-500)] border-white text-[var(--color-navy-950)] shadow-[0_0_20px_var(--color-champagne-500)]'
                      : 'bg-[var(--color-navy-950)] border-[var(--color-champagne-500)] text-[var(--color-champagne-500)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)]'
                  }`}
                >
                  {marker.icon}

                  {/* Pulsing Dot Badge */}
                  {isFocal && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--color-success)] border-2 border-[var(--color-navy-950)]" />
                  )}
                </motion.div>

                {/* Label Tooltip Badge on Hover / Active */}
                <AnimatePresence>
                  {(isHovered || isSelected || isFocal) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: -4, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-3 py-1 rounded-xl text-[10px] font-bold font-tajawal shadow-xl border pointer-events-none z-30 ${
                        isFocal
                          ? 'bg-gradient-to-r from-[var(--color-champagne-700)] to-[var(--color-champagne-500)] text-[var(--color-navy-950)] border-white'
                          : 'bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] border-[var(--color-champagne-500)]/50'
                      }`}
                    >
                      <span>{marker.nameAr}</span>
                      {isFocal && <span className="block text-[8px] text-[var(--color-navy-950)] font-black">بؤرة الارتكاز</span>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Selected Landmark Details Card (5 Cols) */}
        <div className="lg:col-span-5 bg-[var(--color-navy-950)] rounded-2xl border-2 border-[var(--color-champagne-500)]/40 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-champagne-500)]/10 rounded-full blur-2xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMarker.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Image Preview Thumbnail */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/30 shadow-lg">
                <img
                  loading="lazy"
                  decoding="async"
                  src={selectedMarker.imageUrl}
                  alt={selectedMarker.nameAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 right-3 text-right">
                  <span className="bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] text-[10px] font-black px-2.5 py-0.5 rounded-full font-cairo inline-block mb-1">
                    {selectedMarker.distance}
                  </span>
                  <h4 className="text-base font-black text-white font-tajawal">{selectedMarker.nameAr}</h4>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <p className="text-xs text-[var(--color-champagne-300)] font-bold font-cairo mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[var(--color-champagne-500)]" /> {selectedMarker.shortDesc}
                </p>
                <p className="text-xs text-[var(--color-navy-100)] font-cairo leading-relaxed">
                  {selectedMarker.fullDesc}
                </p>
              </div>

              {/* Highlights List */}
              <div className="bg-[var(--color-navy-900)] p-3.5 rounded-xl border border-[var(--color-champagne-500)]/20 space-y-2">
                <h5 className="text-[11px] font-bold text-[var(--color-champagne-500)] font-cairo flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> أبرز المميزات والتجهيزات المشمولة:
                </h5>
                <ul className="space-y-1.5 text-xs text-[var(--color-navy-100)] font-cairo">
                  {selectedMarker.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Footer Button */}
          <div className="pt-4 border-t border-[var(--color-champagne-500)]/20 flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-text-muted)] font-cairo flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[var(--color-success)]" /> حراسة وأمان موثوق
            </span>
            <a
              href={HALL_SPECS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-xs px-4 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 fill-[var(--color-navy-950)]" />
              <span>فتح الملاحة GPS</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
