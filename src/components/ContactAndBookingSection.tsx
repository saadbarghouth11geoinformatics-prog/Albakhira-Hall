import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Instagram,
  Navigation,
  Sparkles,
  Crown,
  Clock,
  Compass,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Heart,
  Send,
  UserCheck
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';
import { GlassCard } from './GlassCard';

interface ContactAndBookingSectionProps {
  onOpenBooking?: (packageId?: string) => void;
  className?: string;
}

export const ContactAndBookingSection: React.FC<ContactAndBookingSectionProps> = ({
  onOpenBooking,
  className = '',
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section
      id="contact-booking"
      data-theme="dark"
      className={`py-16 sm:py-24 relative bg-[var(--color-navy-950)] text-white font-cairo overflow-hidden ${className}`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-radial from-[var(--color-champagne-500)]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-radial from-[var(--color-success)]/8 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Decorative Gold Border Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-champagne-500)]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/50 text-[var(--color-champagne-300)] text-xs font-bold font-tajawal mb-4 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-champagne-500)] animate-pulse" />
            <span>خدمة العملاء والحجوزات الرسمية</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-tajawal gold-text mb-4"
          >
            تواصل واحجز مناسبتك
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-white/80 leading-relaxed"
          >
            فريق قاعة الباخرة للاحتفالات بجدة في خدمتكم للرد الفوري على الاستفسارات، حجز مواعيد المعاينة، وتأكيد باقات وعروض الأفراح والمناسبات.
          </motion.p>
        </div>

        {/* 4 Main Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Supervisor & General Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full"
          >
            <div className="h-full bg-gradient-to-b from-[var(--color-navy-900)] to-[var(--color-navy-950)] p-6 rounded-3xl border-2 border-[var(--color-champagne-500)]/40 shadow-xl hover:border-[var(--color-champagne-500)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-champagne-500)]/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-champagne-700)] to-[var(--color-champagne-500)] flex items-center justify-center text-[var(--color-navy-950)] shadow-md font-bold">
                    <Crown className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40">
                    حجوزات عامة
                  </span>
                </div>

                <h3 className="text-lg font-bold font-tajawal text-white group-hover:text-[var(--color-champagne-300)] transition-colors mb-1">
                  {HALL_SPECS.supervisor.title}
                </h3>
                <p className="text-xs text-white/75 mb-4 leading-relaxed">
                  استفسارات الباقات الشاملة، تفاصيل العروض، ومواعيد القاعة
                </p>

                <div className="bg-[var(--color-warm-white)] p-3.5 rounded-2xl border border-[var(--color-champagne-500)]/40 mb-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--color-champagne-500)]" />
                    <span dir="ltr" className="text-base font-black font-mono text-[var(--color-navy-950)] tracking-wide">
                      {HALL_SPECS.supervisor.phone}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(HALL_SPECS.supervisor.phone, 'supervisor-phone')}
                    className="text-xs text-[var(--color-navy-700)] hover:text-[var(--color-navy-950)] p-1 rounded-lg hover:bg-[var(--color-soft-beige)] transition-colors cursor-pointer"
                    title="نسخ رقم الهاتف"
                  >
                    {copiedText === 'supervisor-phone' ? (
                      <Check className="w-4 h-4 text-[var(--color-success)]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={HALL_SPECS.supervisor.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>محادثة واتساب مباشرة</span>
                </a>

                <a
                  href={HALL_SPECS.supervisor.tel}
                  className="w-full bg-[var(--color-navy-900)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/50 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال هاتفي مباشر</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Women's Section Coordinator */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <div className="h-full bg-gradient-to-b from-[var(--color-navy-900)] to-[var(--color-navy-950)] p-6 rounded-3xl border-2 border-[var(--color-champagne-600)]/40 shadow-xl hover:border-[var(--color-champagne-600)] hover:shadow-[0_10px_30px_rgba(225,48,108,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-champagne-600)]/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-champagne-600)] to-[var(--color-champagne-600)] flex items-center justify-center text-white shadow-md font-bold">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-champagne-600)]/20 text-[var(--color-champagne-300)] border border-[var(--color-champagne-600)]/40">
                    قسم النساء
                  </span>
                </div>

                <h3 className="text-lg font-bold font-tajawal text-white group-hover:text-[var(--color-champagne-300)] transition-colors mb-1">
                  {HALL_SPECS.womenSupervisor.title}
                </h3>
                <p className="text-xs text-white/75 mb-4 leading-relaxed">
                  تجهيزات صالة النساء، الكوشات، البوفيه، والضيافة
                </p>

                <div className="bg-[var(--color-warm-white)] p-3.5 rounded-2xl border border-[var(--color-champagne-600)]/40 mb-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--color-champagne-600)]" />
                    <span dir="ltr" className="text-base font-black font-mono text-[var(--color-navy-950)] tracking-wide">
                      {HALL_SPECS.womenSupervisor.phone}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(HALL_SPECS.womenSupervisor.phone, 'women-phone')}
                    className="text-xs text-[var(--color-navy-700)] hover:text-[var(--color-navy-950)] p-1 rounded-lg hover:bg-[var(--color-soft-beige)] transition-colors cursor-pointer"
                    title="نسخ رقم الهاتف"
                  >
                    {copiedText === 'women-phone' ? (
                      <Check className="w-4 h-4 text-[var(--color-success)]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={HALL_SPECS.womenSupervisor.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>واتساب مشرفة قسم النساء</span>
                </a>

                <a
                  href={HALL_SPECS.womenSupervisor.tel}
                  className="w-full bg-[var(--color-navy-900)] hover:bg-[var(--color-champagne-600)] hover:text-white text-[var(--color-champagne-300)] border border-[var(--color-champagne-600)]/50 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال بمشرفة النساء</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Location, Google Maps & Waze */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-full"
          >
            <div className="h-full bg-gradient-to-b from-[var(--color-navy-950)] to-[var(--color-navy-950)] p-6 rounded-3xl border-2 border-[var(--color-success)]/30 shadow-xl hover:border-[var(--color-success)] hover:shadow-[0_10px_30px_rgba(0,245,212,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-success)]/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-navy-700)] to-[var(--color-success)] flex items-center justify-center text-[var(--color-navy-950)] shadow-md font-bold">
                    <MapPin className="w-6 h-6 fill-[var(--color-navy-950)]" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/40">
                    الموقع الجغرافي
                  </span>
                </div>

                <h3 className="text-lg font-bold font-tajawal text-white group-hover:text-[var(--color-success)] transition-colors mb-1">
                  موقع القاعة بجدة
                </h3>
                <p className="text-xs text-white/75 mb-2 leading-relaxed">
                  {HALL_SPECS.addressAr}
                </p>

                <div className="bg-[var(--color-warm-white)] p-2.5 rounded-2xl border border-[var(--color-success)]/30 mb-4 flex items-center justify-between text-[11px] shadow-sm">
                  <span className="text-[var(--color-navy-900)] font-mono font-bold">
                    رمز الموقع: <span className="text-[var(--color-success)]">{HALL_SPECS.locationCode}</span>
                  </span>
                  <button
                    onClick={() => handleCopy(HALL_SPECS.locationCode, 'loc-code')}
                    className="text-[var(--color-navy-700)] hover:text-[var(--color-navy-950)] p-1 rounded-lg transition-colors cursor-pointer"
                    title="نسخ رمز الموقع"
                  >
                    {copiedText === 'loc-code' ? (
                      <Check className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Navigation Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={HALL_SPECS.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[var(--color-navy-700)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] text-white font-bold py-2.5 px-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer text-xs"
                >
                  <Navigation className="w-3.5 h-3.5 fill-current" />
                  <span>توجيه Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                <a
                  href={HALL_SPECS.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[var(--color-navy-700)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] text-white font-bold py-2.5 px-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer text-xs"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>توجيه تطبيق Waze</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Official Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-full"
          >
            <div className="h-full bg-gradient-to-b from-[var(--color-navy-950)] to-[var(--color-navy-950)] p-6 rounded-3xl border-2 border-[var(--color-champagne-600)]/40 shadow-xl hover:border-[var(--color-champagne-600)] hover:shadow-[0_10px_30px_rgba(225,48,108,0.25)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-champagne-600)]/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-error)] via-[var(--color-champagne-600)] to-[var(--color-champagne-600)] flex items-center justify-center text-white shadow-md font-bold">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-champagne-600)]/20 text-[var(--color-champagne-300)] border border-[var(--color-champagne-600)]/40">
                    الحساب الرسمي
                  </span>
                </div>

                <h3 className="text-lg font-bold font-tajawal text-white group-hover:text-[var(--color-champagne-300)] transition-colors mb-1">
                  إنستغرام قاعة الباخرة
                </h3>
                <p className="text-xs text-white/75 mb-3 leading-relaxed">
                  تغطيات مصورة، كوشات حديثة، فيديوهات حية من حفلات القاعة
                </p>

                <div className="bg-[var(--color-warm-white)] p-3.5 rounded-2xl border border-[var(--color-champagne-600)]/40 mb-5 text-center shadow-sm">
                  <span dir="ltr" className="text-base font-black font-tajawal text-[var(--color-navy-950)] tracking-wide block">
                    {HALL_SPECS.instagramAccount}
                  </span>
                  <span className="text-[10px] text-[var(--color-navy-700)] block mt-0.5">
                    تابع أحدث كوشات وديكورات الموسم
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={HALL_SPECS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[var(--color-champagne-600)] via-[var(--color-error)] to-[var(--color-champagne-600)] text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer text-xs"
                >
                  <Instagram className="w-4 h-4" />
                  <span>زيارة حساب Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Secondary Information Strip: Landline & Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-900)] p-6 sm:p-8 rounded-3xl border border-[var(--color-champagne-500)]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 flex items-center justify-center text-[var(--color-champagne-500)] shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white font-tajawal text-base">
                  {HALL_SPECS.landline.title}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] font-bold">
                  اتصال أرضي
                </span>
              </div>
              <p className="text-xs text-white/75">
                للاتصال والاستعلام المكتبي المباشر خلال أوقات الدوام: <span dir="ltr" className="font-mono font-bold text-[var(--color-champagne-100)] text-sm mr-2">{HALL_SPECS.landline.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <a
              href={HALL_SPECS.landline.tel}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>اتصل بالهاتف الأرضي ({HALL_SPECS.landline.phone})</span>
            </a>

            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking()}
                className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-xs px-6 py-2.5 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>حجز موعد معاينة ميدانية</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
