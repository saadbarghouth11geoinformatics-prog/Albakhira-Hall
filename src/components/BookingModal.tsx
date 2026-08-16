import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, MessageCircle, Phone, Send, Sparkles, User, Users, X } from 'lucide-react';
import { HALL_SPECS, PACKAGES } from '../data/hallData';
import type { EventCategory } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackageId?: string;
  prefilledData?: Partial<BookingFormData>;
}

interface BookingFormData {
  customerName: string;
  phone: string;
  eventDate: string;
  eventType: EventCategory;
  guestCount: number;
  notes: string;
}

const initialForm = (prefilled?: Partial<BookingFormData>): BookingFormData => ({
  customerName: prefilled?.customerName || '',
  phone: prefilled?.phone || '',
  eventDate: prefilled?.eventDate || '',
  eventType: prefilled?.eventType || 'wedding',
  guestCount: prefilled?.guestCount || 200,
  notes: prefilled?.notes || '',
});

const eventNames: Record<EventCategory, string> = {
  wedding: 'حفل زفاف',
  engagement: 'خطوبة أو مناسبة نسائية',
  birthday: 'مناسبة عائلية أو خاصة',
  graduation: 'حفل تخرج',
  corporate: 'فعالية أو مناسبة عمل',
};

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedPackageId, prefilledData }) => {
  const [formData, setFormData] = useState<BookingFormData>(() => initialForm(prefilledData));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm(prefilledData));
      setSubmitted(false);
    }
  }, [isOpen, prefilledData]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedPackage = PACKAGES.find((item) => item.id === preselectedPackageId);
  const targetNumber = formData.eventType === 'engagement' ? HALL_SPECS.womenSupervisor.whatsappNumber : HALL_SPECS.supervisor.whatsappNumber;

  const openWhatsApp = () => {
    const lines = [
      'السلام عليكم، أرغب في طلب حجز أو معاينة لقاعة الباخرة للاحتفالات بجدة.',
      `الاسم: ${formData.customerName}`,
      `رقم الجوال: ${formData.phone}`,
      `تاريخ المناسبة: ${formData.eventDate || 'غير محدد'}`,
      `نوع المناسبة: ${eventNames[formData.eventType]}`,
      `عدد الضيوف المتوقع: ${formData.guestCount}`,
      selectedPackage ? `العرض المختار: ${selectedPackage.name}` : '',
      formData.notes ? `ملاحظات: ${formData.notes}` : '',
    ].filter(Boolean);
    window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    openWhatsApp();
    setSubmitted(true);
  };

  const fieldClass = 'w-full min-h-12 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-base font-bold text-[var(--color-navy-950)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-champagne-600)] focus:ring-2 focus:ring-[var(--color-champagne-500)]/20';
  const labelClass = 'mb-1.5 block text-xs font-black text-[var(--color-navy-950)] font-tajawal';

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="relative my-0 max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-[var(--color-champagne-500)] bg-[var(--color-warm-white)] p-5 text-right shadow-2xl sm:my-6 sm:rounded-3xl sm:p-7">
        <button type="button" onClick={onClose} className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-navy-950)]" aria-label="إغلاق نافذة الحجز"><X className="h-5 w-5" /></button>

        {!submitted ? (
          <>
            <div className="mb-5 flex items-center gap-3 border-b border-[var(--color-border)] pb-4 pl-12">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)]"><Sparkles className="h-5 w-5" /></span>
              <div>
                <h2 id="booking-title" className="text-xl font-black text-[var(--color-navy-950)] font-tajawal">طلب حجز أو معاينة</h2>
                <p className="mt-1 text-xs font-semibold leading-5 text-[var(--color-text-secondary)]">أدخل البيانات الأساسية، ثم أرسل الطلب مباشرة إلى مسؤول الحجوزات عبر واتساب.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label><span className={labelClass}>الاسم <span className="text-red-600">*</span></span><span className="relative block"><User className="absolute right-3 top-4 h-4 w-4 text-[var(--color-champagne-700)]" /><input className={`${fieldClass} pr-10`} required autoComplete="name" value={formData.customerName} onChange={(event) => setFormData({ ...formData, customerName: event.target.value })} placeholder="اكتب اسمك" /></span></label>
                <label><span className={labelClass}>رقم الجوال <span className="text-red-600">*</span></span><span className="relative block"><Phone className="absolute right-3 top-4 h-4 w-4 text-[var(--color-champagne-700)]" /><input className={`${fieldClass} pr-10 text-left`} dir="ltr" inputMode="tel" autoComplete="tel" required pattern="[0-9+ ]{9,15}" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} placeholder="05xxxxxxxx" /></span></label>
                <label><span className={labelClass}>تاريخ المناسبة <span className="text-red-600">*</span></span><span className="relative block"><Calendar className="pointer-events-none absolute right-3 top-4 h-4 w-4 text-[var(--color-champagne-700)]" /><input className={`${fieldClass} pr-10`} type="date" required value={formData.eventDate} onChange={(event) => setFormData({ ...formData, eventDate: event.target.value })} /></span></label>
                <label><span className={labelClass}>عدد الضيوف المتوقع <span className="text-red-600">*</span></span><span className="relative block"><Users className="absolute right-3 top-4 h-4 w-4 text-[var(--color-champagne-700)]" /><input className={`${fieldClass} pr-10`} type="number" min="20" max="600" required value={formData.guestCount} onChange={(event) => setFormData({ ...formData, guestCount: Number(event.target.value) })} /></span></label>
              </div>

              <label><span className={labelClass}>نوع المناسبة</span><select className={fieldClass} value={formData.eventType} onChange={(event) => setFormData({ ...formData, eventType: event.target.value as EventCategory })}><option value="wedding">حفل زفاف</option><option value="engagement">خطوبة أو مناسبة نسائية</option><option value="birthday">مناسبة عائلية أو خاصة</option><option value="graduation">حفل تخرج</option><option value="corporate">فعالية أو مناسبة عمل</option></select></label>
              <label><span className={labelClass}>ملاحظات إضافية <span className="font-normal text-[var(--color-text-muted)]">(اختياري)</span></span><textarea className={fieldClass} rows={2} value={formData.notes} onChange={(event) => setFormData({ ...formData, notes: event.target.value })} placeholder="مثل وقت المعاينة المناسب أو أي طلب خاص" /></label>

              <button type="submit" className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-[#20bd5a]"><Send className="h-5 w-5" /> إرسال الطلب عبر واتساب</button>
              <p className="text-center text-[11px] font-semibold text-[var(--color-text-muted)]">لن تُرسل أي بيانات قبل الضغط على زر الإرسال.</p>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
            <h2 id="booking-title" className="mt-4 text-2xl font-black text-[var(--color-navy-950)] font-tajawal">تم تجهيز طلبك وفتح واتساب</h2>
            <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-7 text-[var(--color-text-secondary)]">راجع الرسالة في واتساب واضغط إرسال ليصل الطلب إلى مسؤول الحجوزات.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={openWhatsApp} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-black text-white"><MessageCircle className="h-5 w-5" /> فتح واتساب مرة أخرى</button><button type="button" onClick={onClose} className="btn-secondary min-h-12 rounded-xl px-6 py-3 text-sm font-black">العودة إلى الموقع</button></div>
          </div>
        )}
      </div>
    </div>
  );
};
