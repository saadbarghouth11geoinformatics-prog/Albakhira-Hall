import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { PageTransition } from '../components/PageTransition';
import { PageVideoHeader } from '../components/PageVideoHeader';
import { SectionDivider } from '../components/SectionDivider';
import { InteractiveMap } from '../components/InteractiveMap';
import { DirectionsAndRoutesGuide } from '../components/pageDetails/DirectionsAndRoutesGuide';
import { ContactAndBookingSection } from '../components/ContactAndBookingSection';
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Navigation,
  Sparkles,
  Instagram,
  Compass,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitNotes, setVisitNotes] = useState('');
  const [submittedAppointment, setSubmittedAppointment] = useState(false);

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) return;
    setSubmittedAppointment(true);

    // Send WhatsApp notification with the appointment request
    const msg = `السلام عليكم ورحمة الله، أنا ${visitorName} (رقم الجوال: ${visitorPhone})، أرغب في حجز موعد معاينة ميدانية لقاعة الباخرة للاحتفالات بتاريخ: ${visitDate || 'أقرب وقت متاح'}. ملاحظات: ${visitNotes || 'لا توجد'}`;
    const url = `https://wa.me/${HALL_SPECS.supervisor.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleCalendarDateSelect = (dateStr: string) => {
    setVisitDate(dateStr);
  };

  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="تواصل واحجز | قاعة الباخرة للاحتفالات بجدة - الحرازات"
        description="بيانات التواصل الرسمية لقاعة الباخرة للاحتفالات بجدة (شارع الحرازات العام). مشرف القاعة: 0500292974، مشرفة قسم النساء: 0541370138، هاتف القاعة: 0122888452، وإنستغرام @albakhera.1."
        pageType="contact"
      />

      {/* Top Hero Banner with Autoplay Video Background */}
      <PageVideoHeader
        driveId="1RGv7Eabum6LSriNjP8uaj6BI3NQEB3UN"
        driveUrl="https://drive.google.com/file/d/1RGv7Eabum6LSriNjP8uaj6BI3NQEB3UN/view?usp=drive_link"
        localVideoSrc="/Videos/video_09.mp4"
        localPoster="/05_Exterior_Outdoor_Yard/men_18.jpg"
        badge="الموقع الجغرافي وبيانات الاتصال الرسمية"
        subtitle={HALL_SPECS.addressAr}
        title="تواصل واحجز مناسبتك بقاعة الباخرة"
        description="تواصل مباشر مع مشرف القاعة ومشرفة قسم النساء، احجز موعد معاينة ميدانية مجانية، واطلع على خريطة الوصول الدقيقة عبر خرائط جوجل وتطبيق Waze."
      />

      {/* 1. Official Contact Cards Section */}
      <ContactAndBookingSection onOpenBooking={onOpenBooking} />

      {/* 2. Direct Field Inspection Booking Form */}
      <section className="surface-light py-12 bg-[var(--color-ivory)] border-t border-[var(--color-champagne-500)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionDivider variant="crown" label="طلب تحديد موعد معاينة ميدانية مجانية" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Quick Summary Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[var(--color-warm-white)] p-6 sm:p-8 rounded-3xl border border-[var(--color-border)] shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-champagne-700)] to-[var(--color-champagne-500)] flex items-center justify-center text-[var(--color-navy-950)]">
                    <Clock className="w-5 h-5 font-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-tajawal text-[var(--color-navy-950)]">
                      ساعات الاستقبال والمعاينة
                    </h3>
                    <span className="text-xs text-[var(--color-text-secondary)]">طوال أيام الأسبوع</span>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="p-3.5 bg-[var(--color-ivory)] rounded-2xl border border-[var(--color-border)] flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[var(--color-champagne-600)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--color-navy-950)] block font-tajawal text-xs mb-0.5">أوقات الزيارة اليومية:</strong>
                      <span className="text-[var(--color-text-secondary)] text-xs leading-relaxed">{HALL_SPECS.workingHours}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[var(--color-ivory)] rounded-2xl border border-[var(--color-border)] flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--color-navy-950)] block font-tajawal text-xs mb-0.5">استقبال مباشر ومجاني:</strong>
                      <span className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                        يتم استقبالكم من قِبل إدارة القاعة لمشاهدة صالة النساء، الكوشات، وتجهيزات البوفيه الفضي وقسم الرجال.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[var(--color-ivory)] rounded-2xl border border-[var(--color-border)] flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[var(--color-champagne-600)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--color-navy-950)] block font-tajawal text-xs mb-0.5">العنوان المباشر:</strong>
                      <span className="text-[var(--color-text-secondary)] text-xs leading-relaxed">{HALL_SPECS.addressAr}</span>
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Supervisor Button */}
                <a
                  href={HALL_SPECS.supervisor.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all cursor-pointer text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>تأكيد الموعد فوراً عبر واتساب المشرف</span>
                </a>
              </div>
            </div>

            {/* Direct Booking Inspection Appointment Form */}
            <div className="lg:col-span-7">
              <div className="bg-[var(--color-warm-white)] p-6 sm:p-8 rounded-3xl border border-[var(--color-border)] shadow-xl">
                <div className="mb-6">
                  <span className="text-xs font-bold text-[var(--color-champagne-700)] tracking-wider uppercase">استمارة المعاينة الميدانية</span>
                  <h3 className="text-2xl font-black font-tajawal text-[var(--color-navy-950)] mt-1">
                    طلب موعد لمعاينة صالات وقاعات الباخرة
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    أدخل بياناتك وسيقوم مشرف الحجوزات بالتواصل معك لاستقبالك في القاعة في الوقت المحدد.
                  </p>
                </div>

                {submittedAppointment ? (
                  <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 p-8 rounded-2xl text-center text-[var(--color-navy-950)] space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-[var(--color-success)] mx-auto" />
                    <h4 className="font-bold text-xl text-[var(--color-navy-950)] font-tajawal">تم إرسال طلب موعد المعاينة بنجاح!</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-md mx-auto">
                      شكراً لك أستاذ <strong className="text-[var(--color-navy-950)]">{visitorName}</strong>. تم تسجيل طلب زيارتك بتاريخ <strong className="text-[var(--color-champagne-700)]">{visitDate || 'اليوم'}</strong> وسيتم التواصل معكم عبر الواتساب فوراً.
                    </p>
                    <button
                      onClick={() => setSubmittedAppointment(false)}
                      className="bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all cursor-pointer mt-4 shadow-sm"
                    >
                      تسجيل طلب موعد آخر
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[var(--color-navy-950)] mb-1.5 text-right">
                          الاسم الكريم: *
                        </label>
                        <input
                          type="text"
                          required
                          value={visitorName}
                          onChange={(e) => setVisitorName(e.target.value)}
                          placeholder="أدخل اسمك الكريم"
                          className="w-full bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-xl p-3 text-xs text-[var(--color-navy-950)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-champagne-500)] text-right"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[var(--color-navy-950)] mb-1.5 text-right">
                          رقم الجوال / الواتساب: *
                        </label>
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          value={visitorPhone}
                          onChange={(e) => setVisitorPhone(e.target.value)}
                          placeholder="05xxxxxxxx"
                          className="w-full bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-xl p-3 text-xs text-[var(--color-navy-950)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-champagne-500)] text-right"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--color-navy-950)] mb-1.5 text-right">
                        التاريخ المفضل للمعاينة الميدانية:
                      </label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-xl p-3 text-xs text-[var(--color-navy-950)] focus:outline-none focus:border-[var(--color-champagne-500)] text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[var(--color-navy-950)] mb-1.5 text-right">
                        نوع المناسبة أو أي تفاصيل خاصة:
                      </label>
                      <textarea
                        rows={3}
                        value={visitNotes}
                        onChange={(e) => setVisitNotes(e.target.value)}
                        placeholder="مثال: حفل زفاف كامل لعدد 200 ضيف، الاستفسار عن باقة العرض الشامل الملكي..."
                        className="w-full bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-xl p-3 text-xs text-[var(--color-navy-950)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-champagne-500)] text-right"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black py-4 rounded-xl shadow-xl hover:scale-102 transition-transform cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>إرسال طلب موعد المعاينة وتأكيد الحجز عبر واتساب</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Google Map Section */}
          <SectionDivider variant="diamond" label="خريطة القاعة والموقع المباشر على Google Maps و Waze" />
          <DirectionsAndRoutesGuide />
          <div className="mt-8">
            <InteractiveMap />
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
