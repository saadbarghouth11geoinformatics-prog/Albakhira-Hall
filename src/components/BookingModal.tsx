import React, { useState } from 'react';
import { Calendar, Phone, User, Users, Send, CheckCircle2, X, Sparkles } from 'lucide-react';
import { PACKAGES, HALL_SPECS } from '../data/hallData';
import { EventCategory } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackageId?: string;
  prefilledData?: any;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedPackageId,
  prefilledData,
}) => {
  const [formData, setFormData] = useState({
    customerName: prefilledData?.customerName || '',
    phone: prefilledData?.phone || '',
    eventDate: prefilledData?.eventDate || '',
    eventType: (prefilledData?.eventType || 'wedding') as EventCategory,
    guestCount: prefilledData?.guestCount || 200,
    selectedPackageId: preselectedPackageId || 'albakhera-grand-offer',
    notes: prefilledData?.notes || '',
    preferredTimeSlot: 'evening',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const selectedPkg = PACKAGES.find((p) => p.id === formData.selectedPackageId) || PACKAGES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsAppDirect = () => {
    const isWomenSectionOnly = formData.eventType === 'engagement';
    const targetNumber = isWomenSectionOnly
      ? HALL_SPECS.womenSupervisor.whatsappNumber
      : HALL_SPECS.supervisor.whatsappNumber;

    const text = `السلام عليكم، أرغب في الاستفسار والحجز لقاعة الباخرة للاحتفالات بجدة%0A- الاسم: ${formData.customerName}%0A- رقم الهاتف: ${formData.phone}%0A- تاريخ المناسبة: ${formData.eventDate || 'لم يحدد بعد'}%0A- نوع الحفل: ${formData.eventType}%0A- العرض المختار: ${selectedPkg.name}%0A- عدد الضيوف: ${formData.guestCount} ضيف%0A- ملاحظات: ${formData.notes || 'لا يوجد'}`;

    window.open(`https://wa.me/${targetNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="booking-theme bg-[var(--color-warm-white)] border border-[var(--color-champagne-500)] rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-right shadow-[var(--shadow-md)] relative my-8 text-[var(--color-text)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 w-9 h-9 rounded-full bg-[var(--color-navy-950)] text-[var(--color-champagne-500)] border border-[var(--color-champagne-500)]/40 flex items-center justify-center font-bold hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-champagne-500)]/30 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-champagne-700)] to-[var(--color-champagne-500)] flex items-center justify-center text-[var(--color-navy-950)] font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-tajawal gold-text">
                  حجز عروض قاعة الباخرة للاحتفالات
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  جدة - الحرازات - بعد محطة المدينة بـ 500 متر | أرسل بياناتك وسيتواصل معك موظف الحجوزات فوراً.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5 font-tajawal">
                    الاسم بالكامل <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك الكريم"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-champagne-500)] pr-10"
                    />
                    <User className="w-4 h-4 text-[var(--color-champagne-500)] absolute top-3.5 right-3" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5 font-tajawal">
                    رقم الجوال / الواتساب <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-champagne-500)] pr-10 text-left"
                      dir="ltr"
                    />
                    <Phone className="w-4 h-4 text-[var(--color-champagne-500)] absolute top-3.5 right-3" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5 font-tajawal">
                    تاريخ المناسبة
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-champagne-500)] pr-10 text-right"
                    />
                    <Calendar className="w-4 h-4 text-[var(--color-champagne-500)] absolute top-3.5 right-3" />
                  </div>
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5 font-tajawal">
                    نوع الحفل
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventCategory })}
                    className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-champagne-500)]"
                  >
                    <option value="wedding">حفل زفاف ملكي كامل</option>
                    <option value="engagement">حفل صالة النساء فقط</option>
                    <option value="birthday">حفل قسم الرجال والضيافة الخارجية</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Selected Package */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5 font-tajawal">
                    العرض المختار
                  </label>
                  <select
                    value={formData.selectedPackageId}
                    onChange={(e) => setFormData({ ...formData, selectedPackageId: e.target.value })}
                    className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-champagne-500)]"
                  >
                    {PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} ({pkg.badge || 'العرض المعتمد'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5 font-tajawal">
                    عدد الضيوف المتوقع
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="50"
                      max="500"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-champagne-500)] pr-10"
                    />
                    <Users className="w-4 h-4 text-[var(--color-champagne-500)] absolute top-3.5 right-3" />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-white mb-1.5 font-tajawal">
                  ملاحظات إضافية
                </label>
                <textarea
                  rows={2}
                  placeholder="أي طلبات خاصة بالبوفيه أو التنسيق أو المعاينة الميدانية"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-champagne-500)]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-bold py-3.5 rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>تأكيد طلب الحجز والمعاينة</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsAppDirect}
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال عبر الواتساب مباشرة</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmation Card */
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-champagne-500)]/20 flex items-center justify-center text-[var(--color-champagne-500)] border-2 border-[var(--color-champagne-500)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black gold-text font-tajawal">
              تم تسجيل طلبكم بنجاح!
            </h3>
            <p className="text-sm text-[var(--color-navy-100)] max-w-md mx-auto">
              شكراً لاختياركم <strong className="text-[var(--color-champagne-300)]">قاعة الباخرة للاحتفالات</strong> بجدة (الحرازات). سيتواصل معكم مسؤولو الحجوزات فوراً.
            </p>

            <div className="bg-[var(--color-navy-950)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-xs text-[var(--color-text-muted)] max-w-md mx-auto space-y-2">
              <div className="flex items-center justify-between">
                <span>مشرف القاعة والحجوزات العامة:</span>
                <span className="text-[var(--color-champagne-500)] font-bold font-mono" dir="ltr">{HALL_SPECS.supervisor.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>مشرفة قسم النساء:</span>
                <span className="text-[var(--color-champagne-300)] font-bold font-mono" dir="ltr">{HALL_SPECS.womenSupervisor.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>هاتف القاعة الأرضي:</span>
                <span className="text-[var(--color-champagne-300)] font-bold font-mono" dir="ltr">{HALL_SPECS.landline.phone}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="gold-gradient text-[var(--color-navy-950)] font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                العودة للموقع الرئيسي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
