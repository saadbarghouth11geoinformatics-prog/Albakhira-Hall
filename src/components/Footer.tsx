import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  Heart,
  ChevronLeft,
  Instagram,
  MessageCircle,
  Navigation,
  Compass,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer id="contact" className="bg-[var(--color-navy-950)] border-t-2 border-[var(--color-champagne-500)]/30 text-[var(--color-navy-100)] pt-16 pb-8 relative overflow-hidden font-cairo">
      <div className="absolute top-0 inset-x-0 h-px bg-[var(--color-champagne-500)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--color-champagne-500)]/20">
          {/* Brand Info & Identity Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex flex-col items-start gap-3">
              <div className="rounded-xl bg-[var(--color-ivory)] p-2">
                <img
                  src="/logo-official.jpg"
                  loading="lazy"
                  decoding="async"
                  alt="شعار قاعة الباخرة للاحتفالات"
                  referrerPolicy="no-referrer"
                  className="h-20 w-52 object-contain"
                />
              </div>
              <div>
                <span className="font-tajawal font-black text-2xl gold-text block leading-tight">
                  {HALL_SPECS.nameAr}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-sans tracking-wide">
                  {HALL_SPECS.nameEn}
                </span>
              </div>
            </Link>

            <p className="text-xs text-[var(--color-navy-100)] leading-relaxed">
              <strong className="text-white block mb-1">{HALL_SPECS.addressShortAr}</strong>
              {HALL_SPECS.addressAr} (رمز الموقع: {HALL_SPECS.locationCode})
            </p>

            {/* Social & Maps Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={HALL_SPECS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[var(--color-navy-900)] border border-[var(--color-champagne-600)]/40 text-[var(--color-champagne-300)] hover:bg-[var(--color-champagne-600)] hover:text-white flex items-center gap-1.5 transition-all text-xs font-bold shadow-md"
                aria-label="إنستغرام قاعة الباخرة"
                title="إنستجرام قاعة الباخرة @albakhera.1"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram: {HALL_SPECS.instagramAccount}</span>
              </a>

              <a
                href={HALL_SPECS.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[var(--color-navy-900)] border border-[var(--color-navy-700)]/40 text-[var(--color-navy-100)] hover:bg-[var(--color-navy-700)] hover:text-white flex items-center gap-1.5 transition-all text-xs font-bold shadow-md"
                aria-label="موقع القاعة على خرائط جوجل"
                title="خرائط جوجل Google Maps"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>

              <a
                href={HALL_SPECS.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[var(--color-navy-900)] border border-[var(--color-navy-700)]/40 text-[var(--color-navy-100)] hover:bg-[var(--color-navy-700)] hover:text-[var(--color-navy-950)] flex items-center gap-1.5 transition-all text-xs font-bold shadow-md"
                aria-label="موقع القاعة على تطبيق Waze"
                title="تطبيق Waze الملاحي"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Waze</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-base font-bold font-tajawal text-white gold-text border-b border-[var(--color-champagne-500)]/20 pb-2">
              الصفحات والروابط السريعة
            </h4>
            <ul className="space-y-2 text-xs font-cairo">
              <li>
                <Link to="/" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/womens-hall" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5 text-[var(--color-champagne-300)] font-bold">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> قسم النساء الملكي (المواصفات)
                </Link>
              </li>
              <li>
                <Link to="/mens-hall" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5 text-[var(--color-champagne-300)] font-bold">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> قسم الرجال والحوش (المواصفات)
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> عروض وباقات الاحتفالات
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> مخصص ومواصفات الحفل
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> معرض الصور والفيديوهات
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> قائمة البوفيه المفتوح والضيافة
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> عن القاعة والمواصفات
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--color-champagne-300)] transition-colors flex items-center gap-1.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> تواصل واحجز مناسبتك
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Direct Action Column */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-base font-bold font-tajawal text-white gold-text border-b border-[var(--color-champagne-500)]/20 pb-2 flex items-center justify-between">
              <span>أرقام التواصل والحجوزات الرسمية</span>
              <span className="text-[10px] text-[var(--color-success)] font-normal">خدمة سريعة</span>
            </h4>

            {/* Supervisor Contact Box */}
            <div className="bg-[var(--color-navy-900)] p-3 rounded-2xl border border-[var(--color-champagne-500)]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-white block font-tajawal text-sm">{HALL_SPECS.supervisor.title}:</strong>
                <a href={HALL_SPECS.supervisor.tel} className="text-[var(--color-champagne-300)] font-black font-mono text-sm hover:underline" dir="ltr">
                  {HALL_SPECS.supervisor.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={HALL_SPECS.supervisor.tel}
                  className="px-3 py-1.5 rounded-lg bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Phone className="w-3 h-3" /> اتصال
                </a>
                <a
                  href={HALL_SPECS.supervisor.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3 fill-current" /> واتساب
                </a>
              </div>
            </div>

            {/* Women Supervisor Contact Box */}
            <div className="bg-[var(--color-navy-900)] p-3 rounded-2xl border border-[var(--color-champagne-600)]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-white block font-tajawal text-sm">{HALL_SPECS.womenSupervisor.title}:</strong>
                <a href={HALL_SPECS.womenSupervisor.tel} className="text-[var(--color-champagne-300)] font-black font-mono text-sm hover:underline" dir="ltr">
                  {HALL_SPECS.womenSupervisor.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={HALL_SPECS.womenSupervisor.tel}
                  className="px-3 py-1.5 rounded-lg bg-[var(--color-navy-900)] border border-[var(--color-champagne-600)]/40 text-[var(--color-champagne-300)] hover:bg-[var(--color-champagne-600)] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Phone className="w-3 h-3" /> اتصال
                </a>
                <a
                  href={HALL_SPECS.womenSupervisor.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3 fill-current" /> واتساب
                </a>
              </div>
            </div>

            {/* Landline & Working hours Strip */}
            <div className="bg-[var(--color-navy-950)] p-2.5 rounded-xl border border-[var(--color-champagne-500)]/20 flex items-center justify-between text-xs text-[var(--color-navy-100)]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                <span>{HALL_SPECS.landline.title}:</span>
                <a href={HALL_SPECS.landline.tel} className="text-[var(--color-champagne-300)] font-mono font-bold hover:underline" dir="ltr">
                  {HALL_SPECS.landline.phone}
                </a>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)]">
                <Clock className="w-3 h-3 text-[var(--color-champagne-500)]" />
                <span>يومياً 4م - 2ص</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full btn-on-dark font-bold py-3 rounded-xl transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>طلب تحديد موعد المعاينة مجاناً</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-muted)] gap-4 font-cairo">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} <strong className="text-[var(--color-champagne-300)]">{HALL_SPECS.nameAr} ({HALL_SPECS.nameEn})</strong>.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>{HALL_SPECS.addressShortAr} | صُنع بشغف وأناقة ليومكم المميز</span>
            <Heart className="w-3.5 h-3.5 text-[var(--color-champagne-500)] fill-[var(--color-champagne-500)]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
