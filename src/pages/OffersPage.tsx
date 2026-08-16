import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { OffersSection } from '../components/OffersSection';
import { PageTransition } from '../components/PageTransition';
import { PageVideoHeader } from '../components/PageVideoHeader';
import { SectionDivider } from '../components/SectionDivider';
import { InteractivePackageMatrix } from '../components/pageDetails/InteractivePackageMatrix';
import { SeasonalDealChecker } from '../components/pageDetails/SeasonalDealChecker';
import { ContactAndBookingSection } from '../components/ContactAndBookingSection';
import { OfficialOffersDocumentCard } from '../components/OfficialOffersDocumentCard';
import { Link, useNavigate } from 'react-router-dom';
import { Gift, CheckCircle2, ShieldCheck, Tag, Calendar, Award, Sparkles, ChevronDown, Clock, Lock, Star, Heart, Users, ArrowLeft } from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

interface OffersPageProps {
  onOpenBooking: (packageId?: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const handleSelectPackageForCalc = (packageId: string) => {
    navigate(`/calculator?package=${packageId}`);
  };

  const discountCategories = [
    {
      title: 'خصم حماة الوطن ومنسوبي التعليم',
      badge: 'خصم إضافي 5%',
      detail: 'تقديراً لمنسوبي أبطال الحد الجنوبي، العسكريين، والمعلمين والمعلمات، نقدم خصماً إضافياً 5% أو إضافة كوشة VIP مجاناً عند استبراز البطاقة المهنية.',
    },
    {
      title: 'باقة الحجز المبكر 3 أشهر مسبقاً',
      badge: 'تورتة 4 أدوار VIP',
      detail: 'عند تثبيت عربون الحجز قبل التاريخ بـ 90 يوماً على الأقل، يتم ترقية تورتة العروسين تلقائياً من 3 أدوار إلى تورتة VIP ملكية 4 أدوار مجاناً.',
    },
    {
      title: 'خصم إعادة الحجز والضيوف السابقين',
      badge: 'هدية ضيافة إضافية',
      detail: 'لكل عائلة أو ضيف سبق له حضور أو إقامة حفل بقاعة الباخرة، تمنح باقة ضيافة إضافية خاصة مع صحنين حلا ملكي فاخرين.',
    },
  ];

  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="عروض وباقات الزفاف 2026 | قاعة الباخرة للاحتفالات بجدة"
        description="استكشف ورقة العروض المعتمدة لقاعة الباخرة للاحتفالات بجدة (الحرازات). بوفيه مفتوح 10 متر فضي، 3 دور تورتة، ضيافة 40 طاولة مجاناً، وقسم رجال متكامل."
        pageType="offers"
      />

      {/* Top Hero Banner with Autoplay Video Background */}
      <PageVideoHeader
        driveId="15-LwCv8tRIhMym20zDNDFgdPx3uJ_Hb9"
        driveUrl="https://drive.google.com/file/d/15-LwCv8tRIhMym20zDNDFgdPx3uJ_Hb9/view?usp=drive_link"
        localVideoSrc="/Videos/video_15.mp4"
        localPoster="/01_Featured_Website/women_03.jpg"
        badge="ورقة العروض المعتمدة 2026 (تغطية حية حقيقية)"
        subtitle="جدة - الحرازات - بعد محطة المدينة بـ 500 متر"
        title="عروض قاعة الباخرة للاحتفالات 2026"
        description="استعرض خدمات الباقات الشاملة: بوفيه مفتوح 10 متر، تورتة 3 دور، كشاف العروسة، أجهزة الليزرات، وقسم الرجال المتكامل."
      >
        {/* Quick Stats Grid Overlay */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--color-navy-950)]/85 backdrop-blur-md p-4 rounded-2xl border border-[var(--color-champagne-500)]/40 text-center shadow-xl"
          >
            <span className="text-xl sm:text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">بوفيه 10 متر</span>
            <span className="text-[11px] text-[var(--color-navy-100)] block mt-1">القائمة الفضية المكتملة</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--color-navy-950)]/85 backdrop-blur-md p-4 rounded-2xl border border-[var(--color-champagne-500)]/40 text-center shadow-xl"
          >
            <span className="text-xl sm:text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">تورتة (3 دور)</span>
            <span className="text-[11px] text-[var(--color-navy-100)] block mt-1">تورتة زفاف ملكية مجاناً</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--color-navy-950)]/85 backdrop-blur-md p-4 rounded-2xl border border-[var(--color-champagne-500)]/40 text-center shadow-xl"
          >
            <span className="text-xl sm:text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">40 طاولة ضيافة</span>
            <span className="text-[11px] text-[var(--color-navy-100)] block mt-1">40 صحن حلا + 40 معجنات</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--color-navy-950)]/85 backdrop-blur-md p-4 rounded-2xl border border-[var(--color-champagne-500)]/40 text-center shadow-xl"
          >
            <span className="text-xl sm:text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">100 فرش للحوش</span>
            <span className="text-[11px] text-[var(--color-navy-100)] block mt-1">مع القهوجي و10 مباشرين</span>
          </motion.div>
        </div>
      </PageVideoHeader>

      {/* Hall Sections Quick Navigation Cards */}
      <section className="py-8 bg-[var(--color-ivory)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/womens-hall"
              className="p-6 rounded-3xl bg-[var(--color-warm-white)] border-2 border-rose-200/60 hover:border-rose-400 hover:shadow-xl transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 fill-rose-600/20" />
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200 inline-block mb-1">
                    صفحة مستقلة مخصصة
                  </span>
                  <h3 className="text-lg font-black font-tajawal text-[var(--color-navy-950)] group-hover:text-rose-600 transition-colors">
                    قسم وصالة النساء الملكية
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-cairo mt-0.5">
                    بوفيه 10 متر، تورتة 3 دور، 40 طاولة ضيافة مجاناً، وعاملات مسك الفستان.
                  </p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-rose-600 group-hover:-translate-x-1.5 transition-transform shrink-0" />
            </Link>

            <Link
              to="/mens-hall"
              className="p-6 rounded-3xl bg-[var(--color-warm-white)] border-2 border-amber-200/60 hover:border-amber-400 hover:shadow-xl transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200 inline-block mb-1">
                    صفحة مستقلة مخصصة
                  </span>
                  <h3 className="text-lg font-black font-tajawal text-[var(--color-navy-950)] group-hover:text-amber-800 transition-colors">
                    قسم الرجال والحوش (100 فرش)
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-cairo mt-0.5">
                    10 مباشرين، قهوجي مختص، حارس بوابة النساء، قهوة وشاي، ومباخر فاخرة.
                  </p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-amber-800 group-hover:-translate-x-1.5 transition-transform shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Official Offer Document Replica */}
      <section className="py-8 bg-[var(--color-ivory)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfficialOffersDocumentCard onOpenBooking={onOpenBooking} />
        </div>
      </section>

      <SectionDivider variant="crown" label="عروض وباقات الحفل المعتمدة" />

      {/* Main Offers Grid */}
      <OffersSection
        onOpenBooking={(pkgId) => onOpenBooking(pkgId)}
        onSelectPackageForCalc={handleSelectPackageForCalc}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractivePackageMatrix />
        <SeasonalDealChecker />
      </div>

      <SectionDivider variant="diamond" label="الميزات الاستثنائية والخصومات الفئوية" />

      {/* Special Category Discounts Accordion */}
      <section className="surface-light py-14 bg-[var(--color-soft-beige)] border-y border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] text-xs font-black border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-3">
              <Gift className="w-4 h-4 text-[var(--color-champagne-600)]" /> الخصومات والمميزات الخاصة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-tajawal text-[var(--color-navy-950)] mb-2">
              خصومات وتسهيلات إضافية لحفلات الزفاف 2026
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium">
              نحرص في قاعة الباخرة بجدة على دعم عرساننا بأفضل الميزات التنافسية المتاحة.
            </p>
          </div>

          <div className="space-y-4">
            {discountCategories.map((item, index) => {
              const isOpen = activeAccordion === index;
              return (
                <div
                  key={index}
                  className="bg-[var(--color-warm-white)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : index)}
                    className="w-full p-5 text-right font-tajawal font-black text-sm sm:text-base flex items-center justify-between text-[var(--color-navy-950)] hover:text-[var(--color-champagne-700)] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[var(--color-champagne-600)]" />
                      <span>{item.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] px-3 py-1 rounded-full border border-[var(--color-champagne-500)]/30">
                        {item.badge}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-[var(--color-champagne-700)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-[var(--color-text)] font-cairo leading-relaxed border-t border-[var(--color-border)] bg-[var(--color-ivory)]/50">
                      {item.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider variant="crown" label="جدول مقارنة تفصيلي للخدمات" />

      {/* Detailed Comparison Table */}
      <section className="surface-light py-16 bg-[var(--color-ivory)] border-b border-[var(--color-champagne-500)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] text-xs font-bold border border-[var(--color-champagne-500)]/30 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-[var(--color-champagne-600)]" /> جدول المقارنة الشامل
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-tajawal text-[var(--color-navy-950)] mb-3">
              مقارنة العروض المعتمدة لقاعة الباخرة
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              جدول توضيحي لخدمات العرض الشامل وصالة النساء وقسم الرجال
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] shadow-xl bg-[var(--color-warm-white)]">
            <table className="w-full text-right border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[var(--color-navy-950)] border-b border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] font-tajawal text-sm">
                  <th className="p-4 text-right">عنصر الخدمة / التجهيز</th>
                  <th className="p-4 text-center">عرض صالة النساء الفضية</th>
                  <th className="p-4 text-center">عرض قسم الرجال والحوش</th>
                  <th className="p-4 text-center bg-[var(--color-champagne-500)]/25 text-white font-bold">العرض الشامل الملكي (رجال + نساء)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-xs sm:text-sm">
                <tr>
                  <td className="p-4 font-bold text-[var(--color-navy-950)]">نطاق التغطية والمساحة</td>
                  <td className="p-4 text-center text-[var(--color-champagne-700)] font-bold">صالة النساء الملكية</td>
                  <td className="p-4 text-center text-[var(--color-champagne-700)] font-bold">قسم الرجال + الحوش الخارجي</td>
                  <td className="p-4 text-center text-[var(--color-success)] font-bold bg-[var(--color-champagne-500)]/10">القاعة كاملة (القسمين معاً)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-navy-950)]">البوفيه المفتوح والتورتة</td>
                  <td className="p-4 text-center text-[var(--color-text-secondary)]">بوفيه 10 متر + تورتة 3 دور</td>
                  <td className="p-4 text-center text-[var(--color-text-secondary)]">قهوة وشاي وطبخ الاتفاق</td>
                  <td className="p-4 text-center text-[var(--color-champagne-700)] font-bold bg-[var(--color-champagne-500)]/10">بوفيه 10 متر + تورتة 3 دور + قهوة وشاي</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-navy-950)]">ضيافة الحلا والمعجنات والأنواع</td>
                  <td className="p-4 text-center text-[var(--color-text-secondary)]">40 صحن حلا + 40 معجنات</td>
                  <td className="p-4 text-center text-[var(--color-text-secondary)]">قهوة وشاي طوال الحفل</td>
                  <td className="p-4 text-center text-[var(--color-champagne-700)] font-bold bg-[var(--color-champagne-500)]/10">80 صحن ضيافة طاولات + عصائر 30L</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-navy-950)]">طاقم الضيافة المباشرين</td>
                  <td className="p-4 text-center text-[var(--color-text-secondary)]">10 مباشرات + المشرفة</td>
                  <td className="p-4 text-center text-[var(--color-text-secondary)]">10 مباشرين + القهوجي + حارس البوابة</td>
                  <td className="p-4 text-center text-[var(--color-champagne-700)] font-bold bg-[var(--color-champagne-500)]/10">طاقم نسائي ورجالي مكتمل 20 فرد</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-navy-950)]">عاملات فستان العروسة والمؤثرات مجاناً</td>
                  <td className="p-4 text-center text-[var(--color-success)] font-semibold">متاح مجاناً</td>
                  <td className="p-4 text-center text-[var(--color-text-muted)]">قسم الرجال</td>
                  <td className="p-4 text-center text-[var(--color-success)] font-bold bg-[var(--color-champagne-500)]/10">متاح مجاناً للعروسين</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--color-navy-950)]">تجهيز الجلسات الخارجية للحوش</td>
                  <td className="p-4 text-center text-[var(--color-text-muted)]">صالة النساء الداخلية</td>
                  <td className="p-4 text-center text-[var(--color-text-secondary)]">100 فرش جلسات حوش</td>
                  <td className="p-4 text-center text-[var(--color-champagne-700)] font-bold bg-[var(--color-champagne-500)]/10">100 فرش جلسات حوش مع القهوة والشاي</td>
                </tr>
                <tr>
                  <td className="p-4"></td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleSelectPackageForCalc('womens-silver-offer')}
                      className="bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 text-xs px-3.5 py-2 rounded-lg hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] font-bold transition-all cursor-pointer shadow-sm"
                    >
                      تخصيص العرض
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleSelectPackageForCalc('mens-section-offer')}
                      className="bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 text-xs px-3.5 py-2 rounded-lg hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] font-bold transition-all cursor-pointer shadow-sm"
                    >
                      تخصيص العرض
                    </button>
                  </td>
                  <td className="p-4 text-center bg-[var(--color-champagne-500)]/10">
                    <button
                      onClick={() => onOpenBooking('midweek-deal')}
                      className="gold-gradient text-[var(--color-navy-950)] font-black text-xs px-4 py-2.5 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      حجز العرض الشامل الملكي
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Free Bonuses Section */}
      <section className="surface-light py-16 bg-[var(--color-soft-beige)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[var(--color-navy-950)] via-[var(--color-navy-900)] to-[var(--color-navy-950)] p-8 rounded-3xl border-2 border-[var(--color-champagne-500)]/50 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
              <div className="space-y-3 text-right">
                <h3 className="text-2xl font-black font-tajawal text-white gold-text">
                  المميزات والمؤثرات المجانية المشمولة بالعرض
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--color-navy-100)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" /> تشغيل دي جي احترافي مجاناً قبل وصول المطربة
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" /> تشغيل المؤثرات مجاناً (زفة العروسة - زفة العصير - الليزرات - البخار - كشاف العروسة)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" /> عاملات متفرغات لمسك فستان العروسة أثناء الزفة
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenBooking('midweek-deal')}
                className="gold-gradient text-[var(--color-navy-950)] font-black px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform cursor-pointer shrink-0 text-sm"
              >
                تواصل وتأكيد الحجز فوراً
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Official Hall Contacts, Social & Location */}
      <ContactAndBookingSection />
    </PageTransition>
  );
};
