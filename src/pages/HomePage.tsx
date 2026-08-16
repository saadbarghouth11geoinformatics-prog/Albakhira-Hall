import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { DateChecker } from '../components/DateChecker';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { PageTransition } from '../components/PageTransition';
import { SectionDivider } from '../components/SectionDivider';
import { LuxuryCountdownTimer } from '../components/LuxuryCountdownTimer';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '../components/ScrollReveal';
import { NileWavesBackground } from '../components/NileWavesBackground';
import { GlassCard } from '../components/GlassCard';
import { ContactAndBookingSection } from '../components/ContactAndBookingSection';
import { Link, useNavigate } from 'react-router-dom';
import { OfficialOffersDocumentCard } from '../components/OfficialOffersDocumentCard';
import {
  Sparkles,
  Calculator,
  Utensils,
  ArrowLeft,
  Heart,
  Users,
  Award,
  Phone,
  Compass,
  Tag,
  Camera,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  ChevronLeft,
  Calendar
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

const CinematicScrollExperience = React.lazy(() =>
  import('../components/CinematicScrollExperience').then((module) => ({ default: module.CinematicScrollExperience })),
);

interface HomePageProps {
  onOpenBooking: (packageId?: string, prefilled?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buffet' | 'men' | 'effects' | 'hospitality'>('buffet');

  const handleDateSelected = (date: string) => {
    onOpenBooking(undefined, { eventDate: date });
  };

  return (
    <PageTransition className="space-y-0 bg-[var(--color-ivory)] text-[var(--color-text)] font-cairo">
      <SEO
        title="الرئيسية | قاعة الباخرة للاحتفالات بجدة (الحرازات)"
        description="قاعة الباخرة للاحتفالات بجدة (الحرازات - بعد محطة المدينة بـ 500 متر). عروض الاحتفالات الشاملة مع بوفيه مفتوح 10 متر، تورتة 3 دور، وقسم رجال 100 فرش."
        pageType="home"
      />

      {/* 1. Live Info Bar */}
      <div className="bg-gradient-to-r from-[var(--color-navy-950)] via-[var(--color-navy-900)] to-[var(--color-navy-950)] border-b border-[var(--color-champagne-500)]/30 py-2.5 px-4 text-xs font-cairo">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[var(--color-navy-100)]">
          <div className="flex items-center gap-4 text-xs font-bold text-[var(--color-champagne-300)]">
            <span className="flex items-center gap-1.5 text-[#25D366]">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              الموقع: جدة - الحرازات - بعد محطة المدينة بـ 500 متر
            </span>
          </div>

          <div className="flex items-center gap-4 text-[var(--color-champagne-500)] font-bold text-xs">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#25D366]" /> جوال المبيعات والحجز: <span dir="ltr">0500292974</span>
            </span>
            <button
              onClick={() => onOpenBooking()}
              className="text-[var(--color-navy-950)] bg-[var(--color-champagne-500)] hover:bg-[var(--color-champagne-300)] font-bold px-3 py-1 rounded text-[11px] transition-colors cursor-pointer"
            >
              احجز موعد معاينة
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Section */}
      <Hero
        onOpenBooking={() => onOpenBooking()}
        onOpenVideoModal={() => navigate('/gallery')}
      />

      <React.Suspense fallback={<div className="min-h-40 bg-[var(--color-navy-950)]" aria-hidden="true" />}>
        <CinematicScrollExperience />
      </React.Suspense>

      {/* 3. Instant Date Availability Checker */}
      <ScrollReveal direction="up" distance={18} delay={0.02}>
        <SectionDivider variant="crown" label="فحص توفر التاريخ والمناسبة" />
      </ScrollReveal>
      <DateChecker onSelectDate={handleDateSelected} />

      <ScrollReveal direction="fade" delay={0.15}>
        <SectionDivider variant="diamond" />
      </ScrollReveal>

      {/* 4. Interactive Countdown & Quick Access Hub with Scroll Reveal Stagger */}
      <section className="py-6 sm:py-12 bg-[var(--color-ivory)] relative overflow-hidden">
        {/* Nile Wave Background Ambient Effect */}
        <NileWavesBackground position="bottom" height="h-44 sm:h-56" opacity={0.65} />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
            {/* Luxury Interactive Countdown Clock Card with Slide Up and Floating Ship Sway */}
            <ScrollReveal direction="right" distance={40} className="lg:col-span-5 floating-ship-subtle">
              <LuxuryCountdownTimer
                onOpenBooking={(pkg, prefilled) => onOpenBooking(pkg, prefilled)}
              />
            </ScrollReveal>

            {/* Quick Interactive Tool Links with Motion Glass Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <GlassCard
                  direction="left"
                  distance={30}
                  delay={0.1}
                  variant="luxury"
                  hoverEffect="lift"
                  borderAccent
                  className="h-full"
                >
                  <Link
                    to="/womens-hall"
                    className="p-4 sm:p-5 flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                        <Heart className="w-5 h-5 fill-rose-600/20" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200 mb-1 inline-block">
                        قسم النساء الملكي
                      </span>
                      <h3 className="text-base font-bold font-tajawal text-[var(--color-navy-950)] mb-1 group-hover:text-[var(--color-champagne-700)] transition-colors">
                        صالة النساء ومواصفات الزفة
                      </h3>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-cairo">
                        بوفيه 10 متر فضي، تورتة 3 دور، 40 طاولة ضيافة مجاناً، وعاملات مسك الفستان.
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-xs text-[var(--color-champagne-700)] font-bold">
                      <span>استكشف صالة النساء</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </GlassCard>

                <GlassCard
                  direction="up"
                  distance={30}
                  delay={0.15}
                  variant="luxury"
                  hoverEffect="lift"
                  borderAccent
                  className="h-full"
                >
                  <Link
                    to="/mens-hall"
                    className="p-4 sm:p-5 flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200 mb-1 inline-block">
                        قسم الرجال والحوش
                      </span>
                      <h3 className="text-base font-bold font-tajawal text-[var(--color-navy-950)] mb-1 group-hover:text-[var(--color-champagne-700)] transition-colors">
                        مجلس الرجال و 100 فرش حوش
                      </h3>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-cairo">
                        10 مباشرين، قهوجي مختص، حارس بوابة النساء، قهوة وشاي، وأدوات نظافة متكاملة.
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-xs text-[var(--color-champagne-700)] font-bold">
                      <span>استكشف قسم الرجال</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </GlassCard>

                <GlassCard
                  direction="up"
                  distance={35}
                  delay={0.2}
                  variant="luxury"
                  hoverEffect="lift"
                  borderAccent
                  className="h-full"
                >
                  <Link
                    to="/menu"
                    className="p-4 sm:p-5 flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] border border-[var(--color-champagne-500)]/30 mb-1 inline-block">
                        بوفيه 10 متر مفتوح
                      </span>
                      <h3 className="text-base font-bold font-tajawal text-[var(--color-navy-950)] mb-1 group-hover:text-[var(--color-champagne-700)] transition-colors">
                        البوفيه الفضي وتورتة 3 دور
                      </h3>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-cairo">
                        قائمة الـ 100 سيدة، 30 لتر عصائر فريش، وصحون حلا ومعجنات الطاولات.
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-xs text-[var(--color-champagne-700)] font-bold">
                      <span>استعرض المنيو</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </GlassCard>

                <GlassCard
                  direction="right"
                  distance={30}
                  delay={0.25}
                  variant="luxury"
                  hoverEffect="lift"
                  borderAccent
                  className="h-full"
                >
                  <Link
                    to="/gallery"
                    className="p-4 sm:p-5 flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] border border-[var(--color-champagne-500)]/30 mb-1 inline-block">
                        تغطيات وصور وفيديو
                      </span>
                      <h3 className="text-base font-bold font-tajawal text-[var(--color-navy-950)] mb-1 group-hover:text-[var(--color-champagne-700)] transition-colors">
                        معرض الصور الحية HD
                      </h3>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-cairo">
                        لقطات حقيقية لصالة النساء، الكوشة، البوفيه، ومجالس الحوش الخارجي.
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-xs text-[var(--color-champagne-700)] font-bold">
                      <span>تصفح المعرض</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Offer Document Replica Section */}
      <section className="py-12 bg-[var(--color-ivory)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfficialOffersDocumentCard onOpenBooking={onOpenBooking} />
        </div>
      </section>

      {/* 5. Interactive Key Pillars with Scroll Reveal */}
      <section className="surface-light py-12 sm:py-16 bg-[var(--color-ivory)] border-y border-[var(--color-champagne-500)]/20 relative overflow-hidden">
        {/* Nile Wave Background Ambient Effect */}
        <NileWavesBackground position="top" height="h-36 sm:h-48" opacity={0.5} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] text-xs font-black border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[var(--color-champagne-600)]" /> خدمات العرض الشامل المعتمد
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-tajawal text-[var(--color-navy-950)]">
                ركائز حفل العمر في قاعة الباخرة
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium">
                نظرة سريعة على التجهيزات والخدمات المشمولة في العرض الشامل المعتمد لقاعة الباخرة
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Tabs Control */}
          <ScrollReveal direction="zoom" delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <button
                onClick={() => setActiveTab('buffet')}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'buffet'
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                    : 'bg-[var(--color-warm-white)] text-[var(--color-text)] hover:text-[var(--color-navy-950)] border border-[var(--color-border)] shadow-xs'
                }`}
              >
                <Utensils className="w-4 h-4 text-[var(--color-champagne-600)]" /> بوفيه مفتوح 10 متر + 3 دور تورتة
              </button>
              <button
                onClick={() => setActiveTab('men')}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'men'
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                    : 'bg-[var(--color-warm-white)] text-[var(--color-text)] hover:text-[var(--color-navy-950)] border border-[var(--color-border)] shadow-xs'
                }`}
              >
                <Users className="w-4 h-4 text-[var(--color-champagne-600)]" /> قسم الرجال + 100 فرش حوش
              </button>
              <button
                onClick={() => setActiveTab('effects')}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'effects'
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                    : 'bg-[var(--color-warm-white)] text-[var(--color-text)] hover:text-[var(--color-navy-950)] border border-[var(--color-border)] shadow-xs'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[var(--color-champagne-600)]" /> التأثيرات الضوئية مجاناً
              </button>
              <button
                onClick={() => setActiveTab('hospitality')}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'hospitality'
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                    : 'bg-[var(--color-warm-white)] text-[var(--color-text)] hover:text-[var(--color-navy-950)] border border-[var(--color-border)] shadow-xs'
                }`}
              >
                <Heart className="w-4 h-4 text-[var(--color-champagne-600)]" /> الضيافة وطاقم الخدمة
              </button>
            </div>
          </ScrollReveal>

          {/* Tab Content Box with Motion */}
          <ScrollReveal direction="up" distance={35} delay={0.2}>
            <div data-theme="dark" className="bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-900)] p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-[var(--color-champagne-500)]/40 shadow-2xl">
              {activeTab === 'buffet' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-4">
                    <span className="text-xs text-[#25D366] font-bold">بوفيه فندقي فاخر ومكتمل</span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-tajawal text-white">
                      بوفيه مفتوح فضي 10 متر وتورتة 3 دور
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                      يشمل العرض بوفيه مفتوح فضي ممتد لـ 10 متر مع تورتة زفاف فخمة 3 دور، و30 لتر عصائر طازجة مجهزة بكل عناية.
                    </p>
                    <ul className="space-y-2 text-xs text-[var(--color-champagne-300)]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> بوفيه مفتوح فضي ممتد لـ 10 متر بجميع ملحقاته
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> تورتة زفاف ملكية مكونة من 3 دور
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> 30 لتر عصائر طازجة لمختلف الذواقين
                      </li>
                    </ul>
                    <div className="pt-2">
                      <Link
                        to="/menu"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-champagne-500)] hover:text-[var(--color-champagne-300)] transition-colors"
                      >
                        <span>استعرض قائمة الطعام والبوفيه الكاملة</span>
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl group">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/01_Featured_Website/food_01.jpg"
                      alt="بوفيه مفتوح"
                      className="w-full h-60 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'men' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-4">
                    <span className="text-xs text-[var(--color-champagne-500)] font-bold">قسم رجال متكامل ومستقل</span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-tajawal text-white">
                      قسم الرجال وضيافة الحوش 100 فرش
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                      تأمين 100 فرش جلسات حوش خارجية تراثية لضيوف الرجال مع طاقم مكون من 10 مباشرين والقهوجي المختص.
                    </p>
                    <ul className="space-y-2 text-xs text-[var(--color-champagne-300)]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> 10 مباشرين احترافيين لخدمة كافة الضيوف
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> القهوجي لتوفير القهوة والشاي (أحمر وأخضر)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> تأمين الفحم والمباخر الفاخرة وأدوات النظافة
                      </li>
                    </ul>
                    <div className="pt-2">
                      <Link
                        to="/about"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-champagne-500)] hover:text-[var(--color-champagne-300)] transition-colors"
                      >
                        <span>المزيد عن مرافق وتجهيزات القاعة</span>
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl group">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/01_Featured_Website/men_01.jpg"
                      alt="قسم الرجال"
                      className="w-full h-60 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'effects' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-4">
                    <span className="text-xs text-[#25D366] font-bold">تأثيرات ضوئية مبهجة ومجانية</span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-tajawal text-white">
                      تشغيل بخار، ليزر، وزفة العروسة مجاناً
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                      يشمل العرض تشغيل جميع الأجهزة والمؤثرات الضوئية مجاناً مع توفير كشاف العروسة وعاملات مسك الفستان.
                    </p>
                    <ul className="space-y-2 text-xs text-[var(--color-champagne-300)]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> جهاز البخار وجهاز الليزر المزدوج
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> كشاف العروسة المباشر مع تشغيل زفة العروسة
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> تشغيل الدي جي مجاناً قبل وصول المطربة
                      </li>
                    </ul>
                    <div className="pt-2">
                      <Link
                        to="/gallery"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-champagne-500)] hover:text-[var(--color-champagne-300)] transition-colors"
                      >
                        <span>شاهد لقطات الزفة والمؤثرات في المعرض</span>
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl group">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/01_Featured_Website/women_01.jpg"
                      alt="التأثيرات والزفة"
                      className="w-full h-60 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'hospitality' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-4">
                    <span className="text-xs text-[var(--color-champagne-500)] font-bold">ضيافة الطاولات والخدمة المباشرة</span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-tajawal text-white">
                      40 صحن حلا و40 صحن معجنات مجاناً
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                      تأمين 40 صحن حلا و40 صحن معجنات موزعة على 40 طاولة للنساء مجاناً، مع طاقم 10 مباشرات ومشرفة صالة وحارس بوابة.
                    </p>
                    <ul className="space-y-2 text-xs text-[var(--color-champagne-300)]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> 40 صحن حلا + 40 صحن معجنات مجاناً
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> 10 مباشرات + مشرفة الصالة المعتمدة
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-champagne-500)]" /> حارس بوابة النساء لضمان الأمان والخصوصية
                      </li>
                    </ul>
                    <div className="pt-2">
                      <Link
                        to="/offers"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-champagne-500)] hover:text-[var(--color-champagne-300)] transition-colors"
                      >
                        <span>تصفح كافة تفاصيل العرض الشامل</span>
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/40 shadow-xl group">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/01_Featured_Website/extra_05.jpg"
                      alt="صالة النساء"
                      className="w-full h-60 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Guest Reviews Carousel Showcase with Scroll Reveal */}
      <ScrollReveal direction="up" distance={30} delay={0.1}>
        <ReviewsCarousel />
      </ScrollReveal>

      {/* 7. Dedicated Pages Exploration Hub with Staggered Scroll Reveal */}
      <section className="py-16 bg-[var(--color-soft-beige)] border-t border-[var(--color-border)] relative overflow-hidden">
        {/* Nile Wave Background Ambient Effect */}
        <NileWavesBackground position="bottom" height="h-40 sm:h-52" opacity={0.6} />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-12">
              <span className="text-[var(--color-champagne-700)] text-xs font-bold font-tajawal uppercase tracking-widest bg-[var(--color-champagne-500)]/15 px-3.5 py-1.5 rounded-full border border-[var(--color-champagne-500)]/30 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-600)]" /> استكشف قاعة الباخرة حسب القسم
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-navy-950)] font-tajawal mt-3">
                بوابات الانتقال إلى الصفحات المخصصة
              </h3>
              <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm max-w-2xl mx-auto font-cairo mt-2">
                تصفح كل قسم بشكل مفصل ومباشر للاطلاع على الصور والباقات والتفاصيل الدقيقة
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <GlassCard
              direction="right"
              distance={35}
              delay={0.05}
              variant="luxury"
              hoverEffect="lift"
              borderAccent
              className="h-full"
            >
              <Link
                to="/womens-hall"
                className="p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Heart className="w-6 h-6 fill-rose-600/20" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 mb-2 inline-block">
                    صفحة مستقلة مخصصة
                  </span>
                  <h4 className="font-bold text-[var(--color-navy-950)] text-base font-tajawal group-hover:text-rose-600 transition-colors">
                    قسم وصالة النساء الملكية
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs font-cairo mt-2 leading-relaxed">
                    مواصفات بوفيه 10 متر فضي، تورتة 3 أدوار، ضيافة 40 طاولة مجاناً، وعاملات مسك الفستان والزفة.
                  </p>
                </div>
                <span className="text-rose-600 text-xs font-bold font-cairo flex items-center gap-1 mt-5 group-hover:-translate-x-1 transition-transform">
                  استكشف تفاصيل صالة النساء <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            </GlassCard>

            <GlassCard
              direction="up"
              distance={35}
              delay={0.1}
              variant="luxury"
              hoverEffect="lift"
              borderAccent
              className="h-full"
            >
              <Link
                to="/mens-hall"
                className="p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 mb-2 inline-block">
                    صفحة مستقلة مخصصة
                  </span>
                  <h4 className="font-bold text-[var(--color-navy-950)] text-base font-tajawal group-hover:text-amber-700 transition-colors">
                    قسم الرجال والحوش (100 فرش)
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs font-cairo mt-2 leading-relaxed">
                    10 مباشرين، قهوجي مختص، حارس بوابة النساء، تأمين 100 فرش جلسات حوش، وأدوات النظافة.
                  </p>
                </div>
                <span className="text-amber-700 text-xs font-bold font-cairo flex items-center gap-1 mt-5 group-hover:-translate-x-1 transition-transform">
                  استكشف تفاصيل قسم الرجال <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            </GlassCard>

            <GlassCard
              direction="left"
              distance={35}
              delay={0.15}
              variant="luxury"
              hoverEffect="lift"
              borderAccent
              className="h-full"
            >
              <Link
                to="/offers"
                className="p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center text-[var(--color-champagne-700)] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Tag className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] border border-[var(--color-champagne-500)]/30 mb-2 inline-block">
                    ورقة العروض المعتمدة
                  </span>
                  <h4 className="font-bold text-[var(--color-navy-950)] text-base font-tajawal group-hover:text-[var(--color-champagne-700)] transition-colors">
                    عروض وباقات الاحتفالات 2026
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs font-cairo mt-2 leading-relaxed">
                    باقة العرض الشامل الملكي، مزايا منسوبي التعليم وحماة الوطن، ومصفوفة المقارنة.
                  </p>
                </div>
                <span className="text-[var(--color-champagne-700)] text-xs font-bold font-cairo flex items-center gap-1 mt-5 group-hover:-translate-x-1 transition-transform">
                  استعرض ورقة العروض <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            </GlassCard>

            <GlassCard
              direction="right"
              distance={35}
              delay={0.2}
              variant="luxury"
              hoverEffect="lift"
              borderAccent
              className="h-full"
            >
              <Link
                to="/menu"
                className="p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center text-[var(--color-champagne-700)] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] border border-[var(--color-champagne-500)]/30 mb-2 inline-block">
                    الضيافة والولائم
                  </span>
                  <h4 className="font-bold text-[var(--color-navy-950)] text-base font-tajawal group-hover:text-[var(--color-champagne-700)] transition-colors">
                    قائمة الطعام والبوفيه الفضي
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs font-cairo mt-2 leading-relaxed">
                    أصناف بوفيه الـ 10 متر، تورتة الـ 3 دور، 30 لتر عصائر فريش، وصحون الحلا والمعجنات للطاولات.
                  </p>
                </div>
                <span className="text-[var(--color-champagne-700)] text-xs font-bold font-cairo flex items-center gap-1 mt-5 group-hover:-translate-x-1 transition-transform">
                  استعرض المنيو بالتفصيل <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            </GlassCard>

            <GlassCard
              direction="up"
              distance={35}
              delay={0.25}
              variant="luxury"
              hoverEffect="lift"
              borderAccent
              className="h-full"
            >
              <Link
                to="/gallery"
                className="p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center text-[var(--color-champagne-700)] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] border border-[var(--color-champagne-500)]/30 mb-2 inline-block">
                    لقطات عالية الدقة
                  </span>
                  <h4 className="font-bold text-[var(--color-navy-950)] text-base font-tajawal group-hover:text-[var(--color-champagne-700)] transition-colors">
                    معرض الصور والفيديوهات HD
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs font-cairo mt-2 leading-relaxed">
                    تغطية مصورة فائقة الدقة لجناح العروس VIP، الكوشة، صالة النساء، وتغطيات الإنستجرام والفيديوهات.
                  </p>
                </div>
                <span className="text-[var(--color-champagne-700)] text-xs font-bold font-cairo flex items-center gap-1 mt-5 group-hover:-translate-x-1 transition-transform">
                  افتح معرض الصور والفيديو <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            </GlassCard>

            <GlassCard
              direction="left"
              distance={35}
              delay={0.3}
              variant="luxury"
              hoverEffect="lift"
              borderAccent
              className="h-full"
            >
              <Link
                to="/about"
                className="p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center text-[var(--color-champagne-700)] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] border border-[var(--color-champagne-500)]/30 mb-2 inline-block">
                    الموقع والمرافق
                  </span>
                  <h4 className="font-bold text-[var(--color-navy-950)] text-base font-tajawal group-hover:text-[var(--color-champagne-700)] transition-colors">
                    عن القاعة والمواصفات
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs font-cairo mt-2 leading-relaxed">
                    مواصفات صالة النساء، الكوشة، الجلسات الخارجية، الجدول الزمني لليلة الحفل، والجولة الافتراضية.
                  </p>
                </div>
                <span className="text-[var(--color-champagne-700)] text-xs font-bold font-cairo flex items-center gap-1 mt-5 group-hover:-translate-x-1 transition-transform">
                  تفاصيل القاعة والمرافق <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            </GlassCard>

            <GlassCard
              direction="up"
              distance={35}
              delay={0.3}
              variant="luxury"
              hoverEffect="lift"
              borderAccent
              className="h-full"
            >
              <Link
                to="/reviews"
                className="p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center text-[var(--color-champagne-700)] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[var(--color-navy-950)] text-base font-tajawal group-hover:text-[var(--color-champagne-700)] transition-colors">
                    آراء الضيوف وسجل الزوار
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs font-cairo mt-2 leading-relaxed">
                    أكثر من 16 تقييم موثق من العائلات والعرسان، مع إمكانية تسجيل إهداء صوتي وكتابي في سجل الزوار.
                  </p>
                </div>
                <span className="text-[var(--color-champagne-700)] text-xs font-bold font-cairo flex items-center gap-1 mt-5 group-hover:-translate-x-1 transition-transform">
                  شاهد التقييمات وسجل الزوار <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            </GlassCard>

            <GlassCard
              direction="left"
              distance={35}
              delay={0.36}
              variant="luxury"
              hoverEffect="lift"
              borderAccent
              className="h-full"
            >
              <Link
                to="/faq"
                className="p-6 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-champagne-500)]/15 flex items-center justify-center text-[var(--color-champagne-700)] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[var(--color-navy-950)] text-base font-tajawal group-hover:text-[var(--color-champagne-700)] transition-colors">
                    الأسئلة الشائعة وشروط الحجز
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs font-cairo mt-2 leading-relaxed">
                    إجابات واضحة عن سياسة العربون، مواعيد الدخول، السعة الإجمالية، ومواقف السيارات بالحرازات.
                  </p>
                </div>
                <span className="text-[var(--color-champagne-700)] text-xs font-bold font-cairo flex items-center gap-1 mt-5 group-hover:-translate-x-1 transition-transform">
                  اقرأ إجابات الأسئلة الشائعة <ChevronLeft className="w-4 h-4" />
                </span>
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 8. Dedicated Contact & Booking Section (Supervisor, Women Coordinator, Maps/Waze, Instagram) */}
      <ContactAndBookingSection onOpenBooking={onOpenBooking} />

      {/* 9. Call to Action Banner with Zoom Reveal */}
      <ScrollReveal direction="zoom" distance={25} delay={0.1}>
        <section className="py-16 bg-[var(--color-ivory)] border-t border-[var(--color-border)] relative overflow-hidden">
          {/* Nile Wave Background Layer */}
          <NileWavesBackground position="full" opacity={0.7} height="h-full" />

          <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-100)] border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-700)] text-xs font-black">
              <Sparkles className="w-4 h-4 text-[var(--color-champagne-600)]" /> هل ترغب في معاينة القاعة على الواقع؟
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-tajawal text-[var(--color-navy-950)]">
              احجز موعد معاينتك المجانية اليوم لقاعة الباخرة بجدة
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto font-cairo leading-relaxed font-medium">
              جدة - الحرازات - بعد محطة المدينة بـ 500 متر | تواصل مع المبيعات لمعاينة القاعة ومناقشة تفاصيل حفلكم.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-sm px-8 py-4 rounded-xl shadow-xl transition-transform hover:scale-105 cursor-pointer"
              >
                احجز تاريخ حفلك الآن
              </button>
              <Link
                to="/contact"
                className="bg-[var(--color-warm-white)] text-[var(--color-navy-950)] border border-[var(--color-border)] hover:bg-[var(--color-soft-beige)] font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-sm"
              >
                موقع القاعة وأرقام التواصل
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </PageTransition>
  );
};
