import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Camera, ChevronLeft, Heart, MapPin, MessageSquare, Sparkles, Users } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { DateChecker } from '../components/DateChecker';
import { LiveNileWeather } from '../components/LiveNileWeather';
import { PageTransition } from '../components/PageTransition';
import { HALL_SPECS } from '../data/hallData';

interface HomePageProps {
  onOpenBooking: (packageId?: string, prefilled?: Record<string, unknown>) => void;
}

const homeLinks = [
  { to: '/womens-hall', title: 'صالة النساء والكوشة', text: 'شاهد تجهيزات الصالة وممر الزفة والخدمات المخصصة للسيدات.', icon: Heart },
  { to: '/mens-hall', title: 'قسم الرجال والضيافة', text: 'تعرّف إلى المجلس وتجهيزات الاستقبال والحوش الخارجي.', icon: Users },
  { to: '/offers', title: 'العروض والخدمات', text: 'اطلع على تفاصيل العرض الشامل والخدمات المرفقة بوضوح.', icon: Sparkles },
  { to: '/gallery', title: 'الصور والفيديوهات', text: 'استعرض لقطات حقيقية ومتنوعة من داخل القاعة وتجهيزاتها.', icon: Camera },
] as const;

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const handleDateSelected = (date: string) => onOpenBooking(undefined, { eventDate: date });

  return (
    <PageTransition className="bg-[var(--color-ivory)] text-[var(--color-text)] font-cairo">
      <SEO title="الرئيسية | قاعة الباخرة للاحتفالات بجدة" description="قاعة الباخرة للاحتفالات في حي الحرازات بجدة. شاهد الصالات والعروض والصور الحقيقية، وافحص التاريخ واطلب الحجز أو المعاينة بسهولة." pageType="home" ogImage="/Videos/posters/hall-tour.jpg" />

      <Hero onOpenBooking={() => onOpenBooking()} onOpenVideoModal={() => navigate('/gallery')} />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-warm-white)] py-10 sm:py-14" aria-labelledby="home-sections-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-7 max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-champagne-300)] bg-[var(--color-champagne-100)] px-3 py-1 text-xs font-bold text-[var(--color-champagne-700)]"><Sparkles className="h-3.5 w-3.5" /> كل ما تحتاجه في مكان واحد</span>
            <h2 id="home-sections-title" className="mt-3 text-2xl font-black text-[var(--color-navy-950)] font-tajawal sm:text-4xl">ابدأ من القسم الذي تبحث عنه</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-[var(--color-text-secondary)]">روابط مباشرة ومختصرة للصور والتفاصيل والعروض، بدون تكرار أو صفحات طويلة.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {homeLinks.map(({ to, title, text, icon: Icon }) => (
              <Link key={to} to={to} className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-ivory)] p-5 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-[var(--color-champagne-500)] hover:shadow-[var(--shadow-md)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)]"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-lg font-black text-[var(--color-navy-950)] font-tajawal">{title}</h3>
                <p className="mt-2 min-h-12 text-xs font-semibold leading-6 text-[var(--color-text-secondary)]">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-[var(--color-champagne-700)]">فتح القسم <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-ivory)] py-10 sm:py-14" aria-labelledby="availability-title">
        <div className="mx-auto max-w-5xl px-3 sm:px-6">
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-champagne-300)] bg-[var(--color-champagne-100)] px-3 py-1 text-xs font-bold text-[var(--color-champagne-700)]"><Calendar className="h-3.5 w-3.5" /> فحص سريع قبل التواصل</span>
            <h2 id="availability-title" className="mt-3 text-2xl font-black text-[var(--color-navy-950)] font-tajawal sm:text-4xl">هل تاريخ مناسبتك متاح؟</h2>
            <p className="mt-2 text-sm font-semibold text-[var(--color-text-secondary)]">اختر التاريخ، ثم أكمل بيانات الحجز المختصرة في خطوة واحدة.</p>
          </div>
          <DateChecker onSelectDate={handleDateSelected} />
        </div>
      </section>

      <section className="bg-[var(--color-navy-950)] py-10 text-white sm:py-14" aria-labelledby="location-title" data-theme="dark">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 md:grid-cols-[1fr_auto] sm:px-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-champagne-300)]"><MapPin className="h-4 w-4" /> موقع القاعة</span>
            <h2 id="location-title" className="mt-2 text-2xl font-black font-tajawal sm:text-3xl">الوصول إلى قاعة الباخرة بسهولة</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-7 text-[var(--color-navy-100)]">{HALL_SPECS.addressShortAr}. افتح الموقع مباشرة في خرائط Google للحصول على الاتجاهات من موقعك الحالي.</p>
          </div>
          <a href={HALL_SPECS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-on-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-black"><MapPin className="h-5 w-5" /> افتح الموقع في خرائط Google</a>
        </div>
      </section>

      <section className="bg-[var(--color-soft-beige)] py-10 sm:py-12" aria-label="الطقس والتقييمات">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-5 px-4 lg:grid-cols-[1fr_auto] sm:px-6">
          <LiveNileWeather />
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-warm-white)] p-5 text-center lg:w-72">
            <MessageSquare className="mx-auto h-7 w-7 text-[var(--color-champagne-600)]" />
            <h2 className="mt-2 text-lg font-black text-[var(--color-navy-950)] font-tajawal">تجارب عملائنا</h2>
            <p className="mt-1 text-xs font-semibold leading-6 text-[var(--color-text-secondary)]">اطلع على التقييمات وتجارب المناسبات السابقة في صفحة مستقلة.</p>
            <Link to="/reviews" className="btn-secondary mt-4 inline-flex min-h-11 items-center gap-1 rounded-xl px-5 py-2.5 text-xs font-black">شاهد التقييمات <ChevronLeft className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-warm-white)] py-10 text-center sm:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-black text-[var(--color-navy-950)] font-tajawal sm:text-4xl">جاهز لحجز مناسبتك أو موعد المعاينة؟</h2>
          <p className="mt-3 text-sm font-semibold text-[var(--color-text-secondary)]">أرسل الاسم والجوال والتاريخ وعدد الضيوف، وسيُجهّز طلبك لإرساله إلى مسؤول الحجوزات عبر واتساب.</p>
          <button onClick={() => onOpenBooking()} className="btn-primary mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl px-8 py-3 text-sm font-black"><Calendar className="h-5 w-5" /> ابدأ طلب الحجز</button>
        </div>
      </section>
    </PageTransition>
  );
};
