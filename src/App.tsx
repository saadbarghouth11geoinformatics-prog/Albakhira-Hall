import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ScrollToTop } from './components/ScrollToTop';
import { MobileBottomBar } from './components/MobileBottomBar';
import { AudioGuideTour } from './components/AudioGuideTour';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollProgressTopButton } from './components/ScrollProgressTopButton';
import { PageTransition } from './components/PageTransition';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

// Standalone Pages with React.lazy for optimized bundle splitting
const HomePage = React.lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const WomensHallPage = React.lazy(() => import('./pages/WomensHallPage').then((m) => ({ default: m.WomensHallPage })));
const MensHallPage = React.lazy(() => import('./pages/MensHallPage').then((m) => ({ default: m.MensHallPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const OffersPage = React.lazy(() => import('./pages/OffersPage').then((m) => ({ default: m.OffersPage })));
const CalculatorPage = React.lazy(() => import('./pages/CalculatorPage').then((m) => ({ default: m.CalculatorPage })));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const MenuPage = React.lazy(() => import('./pages/MenuPage').then((m) => ({ default: m.MenuPage })));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const FaqPage = React.lazy(() => import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

import { PageLoadingSkeleton } from './components/PageLoadingSkeleton';

import { MessageCircle, Phone } from 'lucide-react';
import { HALL_SPECS } from './data/hallData';

// Route SEO Metadata Mapping for Dynamic OpenGraph & Meta Tags Injection
interface RouteMeta {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogType?: string;
}

const ROUTE_SEO_MAP: Record<string, RouteMeta> = {
  '/': {
    title: 'الرئيسية | قاعة الباخرة للاحتفالات بجدة - الحرازات',
    description: 'قاعة الباخرة للاحتفالات بجدة (الحرازات). بوفيه مفتوح 10 متر فضي، 3 دور تورتة، ضيافة 40 طاولة مجاناً، قسم رجال متكامل مع 100 فرش جلسات حوش، ومؤثرات زفة مجاناً.',
    keywords: 'قاعة الباخرة, قاعة الباخرة للاحتفالات, قاعات أفراح جدة, قاعات الحرازات, عروض قاعات جدة, حجز قاعة زفاف جدة, بوفيه مفتوح جدة',
    ogImage: '/01_Featured_Website/women_03.jpg',
  },
  '/womens-hall': {
    title: 'صالة النساء الملكية ومواصفات البوفيه والزفة | قاعة الباخرة بجدة',
    description: 'استكشف مواصفات صالة النساء الملكية بقاعة الباخرة بجدة: بوفيه مفتوح 10 متر فضي لـ 100 سيدة، تورتة 3 أدوار، ضيافة 40 طاولة مجاناً، 10 مباشرات ومشرفة، وعاملات فستان العروسة مع المؤثرات المجانية.',
    keywords: 'صالة النساء قاعة الباخرة, قاعة نساء جدة, بوفيه 10 متر, تورتة 3 ادوار, ضيافة حلا ومعجنات, كوشة العروسة, كشاف العروسة',
    ogImage: '/02_Women_Hall/women_03.jpg',
  },
  '/mens-hall': {
    title: 'قسم الرجال ومجالس الحوش التراثية (100 فرش) | قاعة الباخرة بجدة',
    description: 'استكشف مواصفات قسم الرجال بقاعة الباخرة بجدة: 10 مباشرين، قهوجي مختص، حارس بوابة النساء، تأمين 100 فرش جلسات حوش، قهوة وشاي، مباخر وأدوات نظافة متكاملة.',
    keywords: 'قسم الرجال قاعة الباخرة, مجلس رجال جدة, جلسات حوش 100 فرش, قهوجي افراح, قاعات الحرازات رجال',
    ogImage: '/03_Men_Hall/men_01.jpg',
  },
  '/about': {
    title: 'عن القاعة والمواصفات الملكية | قاعة الباخرة للاحتفالات بجدة',
    description: 'استكشف مواصفات قاعة الباخرة للاحتفالات بالحرازات بجدة. صالة نساء تتسع لـ 40 طاولة فخمة، جناح عروس VIP مستقل، قسم رجال فخم، وحوش خارجي واسع.',
    keywords: 'مواصفات قاعة الباخرة, صالة النساء قاعة الباخرة, جناح العروس VIP, قاعة افراح الحرازات, صور قاعة الباخرة',
    ogImage: '/02_Women_Hall/women_03.jpg',
  },
  '/offers': {
    title: 'عروض الحجز والباقات الملكية | قاعة الباخرة بجدة',
    description: 'استعرض عروض وباقات قاعة الباخرة للاحتفالات بجدة. عروض شاملة للبوفيه المفتوح 10 متر، تورتة الزفاف 3 أدوار، وضيافة الطاولات الفاخرة.',
    keywords: 'عروض قاعة الباخرة, باقات قاعة الباخرة, قاعات جدة, باقة الزفاف الملكية, حجز قاعة الباخرة',
    ogImage: '/04_Dining_Buffet/food_02.jpg',
  },
  '/calculator': {
    title: 'مخصص ومواصفات الحفل التفاعلي | قاعة الباخرة بجدة',
    description: 'خصص مواصفات وتجهيزات حفل زفافك في قاعة الباخرة بجدة بناءً على نوع المناسبة والخدمات المختارة مع إمكانية تصدير ملخص العرض.',
    keywords: 'مخصص الحفل, مواصفات قاعة الباخرة, حجز القاعة, تجهيزات الزفاف جدة, كشف مواصفات القاعة',
    ogImage: '/03_Men_Hall/men_01.jpg',
  },
  '/gallery': {
    title: 'معرض الصور والفيديوهات الحية | قاعة الباخرة بجدة',
    description: 'شاهد ألبوم الصور الحقيقية والمقاطع المرئية لقاعة الباخرة للاحتفالات بجدة. استعرض صالة النساء، الكوشة الملكية، البوفيه الفضي، وقسم الرجال بالحرازات.',
    keywords: 'معرض صور قاعة الباخرة, فيديو قاعة الباخرة, ديكورات قاعة الباخرة, كوشة العروسة, البوفيه الفضي',
    ogImage: '/01_Featured_Website/women_03.jpg',
  },
  '/menu': {
    title: 'قائمة البوفيه الفضي وتورتة الزفاف | قاعة الباخرة بجدة',
    description: 'اكتشف تفاصيل قائمة الطعام والبوفيه الفضي المفتوح 10 متر في قاعة الباخرة بجدة مع خيارات نكهات تورتة الزفاف الملكية 3 أدوار والعصائر الطازجة.',
    keywords: 'منيو قاعة الباخرة, بوفيه مفتوح 10 متر, تورتة الزفاف, عشاء افراح جدة, قائمة طعام الحفل',
    ogImage: '/04_Dining_Buffet/food_02.jpg',
  },
  '/reviews': {
    title: 'آراء وتقييمات العرسان والضيوف | قاعة الباخرة بجدة',
    description: 'اقرأ التقييمات الموثقة والانطباعات الحقيقية للعرسان وضيوف قاعة الباخرة بجدة حول جودة البوفيه 10 متر، الزفة، الضيافة، والالتزام ببنود العقد.',
    keywords: 'تقييمات قاعة الباخرة, آراء العرسان, تجارب حجز قاعة الباخرة, افضل قاعات الحرازات',
    ogImage: '/logo-official.jpg',
  },
  '/faq': {
    title: 'الأسئلة الشائعة وشروط العقد | قاعة الباخرة بجدة',
    description: 'إجابات على كافة استفسارات حجز قاعة الباخرة بجدة: سياسة العربون، مواعيد المعاينة، شروط الإلغاء، والتسهيلات المتاحة لضيوف الحفل.',
    keywords: 'الأسئلة الشائعة قاعة الباخرة, شروط حجز القاعة, سياسة العربون, موقع قاعة الباخرة, الاستفسارات',
    ogImage: '/02_Women_Hall/women_03.jpg',
  },
  '/contact': {
    title: 'تواصل معنا وحجز موعد المعاينة | قاعة الباخرة بجدة',
    description: 'تواصل مباشر مع مبيعات قاعة الباخرة للاحتفالات بجدة - الحرازات. احجز موعد معاينة ميدانية للقاعة أو استفسر عبر الواتساب والمكالمات الهاتفية.',
    keywords: 'تواصل مع قاعة الباخرة, رقم قاعة الباخرة, موقع قاعة الباخرة بالحرازات, واتساب قاعة الباخرة',
    ogImage: '/05_Exterior_Outdoor_Yard/men_18.jpg',
  },
};

// Dynamic Route SEO Injector using native useEffect
function RouteSEOManager() {
  const location = useLocation();
  const currentPath = location.pathname;
  const meta = ROUTE_SEO_MAP[currentPath] || ROUTE_SEO_MAP['/'];

  const siteName = 'قاعة الباخرة للاحتفالات بجدة - الحرازات';
  const fullTitle = meta.title.includes('قاعة الباخرة')
    ? meta.title
    : `${meta.title} | ${siteName}`;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://albakhera-hall.com';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullOgImage = meta.ogImage.startsWith('http') ? meta.ogImage : `${origin}${meta.ogImage}`;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', meta.description);
    setMeta('keywords', meta.keywords);
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('og:type', meta.ogType || 'website', true);
    setMeta('og:site_name', siteName, true);
    setMeta('og:locale', 'ar_SA', true);
    setMeta('og:url', currentUrl, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', meta.description, true);
    setMeta('og:image', fullOgImage, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:url', currentUrl);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', meta.description);
    setMeta('twitter:image', fullOgImage);

    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentUrl);
  }, [fullTitle, meta, currentUrl, fullOgImage]);

  return null;
}

interface AnimatedRoutesProps {
  handleOpenBooking: (packageId?: string, prefilled?: any) => void;
  preselectedPkg: string;
}

function AnimatedRoutes({ handleOpenBooking, preselectedPkg }: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <>
      <RouteSEOManager />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <React.Suspense fallback={<PageLoadingSkeleton />}>
            <Routes location={location}>
              <Route
                path="/"
                element={<HomePage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/womens-hall"
                element={<WomensHallPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/mens-hall"
                element={<MensHallPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/about"
                element={<AboutPage onOpenBooking={() => handleOpenBooking()} />}
              />
              <Route
                path="/offers"
                element={<OffersPage onOpenBooking={handleOpenBooking} />}
              />
              <Route
                path="/calculator"
                element={
                  <CalculatorPage
                    onOpenBookingWithData={(data) => handleOpenBooking(preselectedPkg, data)}
                  />
                }
              />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route
                path="/contact"
                element={<ContactPage onOpenBooking={() => handleOpenBooking()} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedPkg, setPreselectedPkg] = useState<string>('royal-yacht');
  const [bookingPrefilledData, setBookingPrefilledData] = useState<any>(null);

  const handleOpenBooking = (packageId?: string, prefilled?: any) => {
    if (packageId) {
      setPreselectedPkg(packageId);
    }
    if (prefilled) {
      setBookingPrefilledData(prefilled);
    }
    setIsBookingOpen(true);
  };

  return (
    <HashRouter>
      <ScrollProgressBar />
      <ScrollProgressTopButton />
      <ScrollToTop />
      <div className="site-shell theme-page min-h-screen bg-[var(--color-ivory)] text-[var(--color-text)] font-cairo flex flex-col justify-between relative z-10">
        {/* Sticky Top Navigation Header */}
        <Header onOpenBooking={handleOpenBooking} />

        {/* Dynamic Route Pages with Animated Transitions */}
        <main className="flex-grow pb-20 sm:pb-0">
          <AnimatedRoutes
            handleOpenBooking={handleOpenBooking}
            preselectedPkg={preselectedPkg}
          />
        </main>

        {/* Royal Footer */}
        <Footer onOpenBooking={() => handleOpenBooking()} />

        {/* Mobile Sticky Bottom Navigation Bar */}
        <MobileBottomBar onOpenBooking={handleOpenBooking} />

        {/* Interactive Voice Tour Audio Guide */}
        <AudioGuideTour />

        {/* Universal Booking & Inspection Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preselectedPackageId={preselectedPkg}
          prefilledData={bookingPrefilledData}
        />

        {/* Floating Official WhatsApp Button (Always Active across all pages) */}
        <FloatingWhatsAppButton />

        {/* Floating Call Button - Visible on Desktop */}
        <div className="hidden sm:flex fixed bottom-24 left-8 z-40">
          <a
            href={HALL_SPECS.supervisor.tel}
            className="w-13 h-13 rounded-full btn-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
            aria-label="اتصل بمشرف القاعة"
            title="اتصال مباشر بمشرف القاعة (0500292974)"
          >
            <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </HashRouter>
  );
}
