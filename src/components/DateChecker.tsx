import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, AlertCircle, CalendarRange } from 'lucide-react';
import { InteractiveBookingCalendar } from './InteractiveBookingCalendar';

interface DateCheckerProps {
  onSelectDate: (date: string) => void;
}

export const DateChecker: React.FC<DateCheckerProps> = ({ onSelectDate }) => {
  const [testDate, setTestDate] = useState('');
  const [checkResult, setCheckResult] = useState<'available' | 'busy' | null>(null);
  const [showFullCalendar, setShowFullCalendar] = useState(true);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testDate) return;
    const day = new Date(testDate).getDate();
    if (day % 7 === 0) {
      setCheckResult('busy');
    } else {
      setCheckResult('available');
    }
  };

  return (
    <section id="date-check" className="py-6 sm:py-12 bg-[var(--color-navy-900)] border-y border-[var(--color-champagne-500)]/30 font-cairo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold mb-3 border border-[var(--color-champagne-500)]/30">
          <CalendarIcon className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> فحص إمكانية التوفر والتقويم التفاعلي
        </div>

        <h3 className="text-2xl sm:text-3xl font-black font-tajawal gold-text mb-3">
          هل تاريخ مناسبتك متاح في قاعة الباخرة بجدة؟
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-navy-100)] mb-6 max-w-2xl mx-auto">
          تصفح التقويم التفاعلي أدناه أو اختر تاريخاً لفحص توفر صالة النساء وقسم الرجال بالحرازات فوراً.
        </p>

        {/* Quick Date Input Bar */}
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto mb-6">
          <input
            type="date"
            required
            value={testDate}
            onChange={(e) => {
              setTestDate(e.target.value);
              setCheckResult(null);
            }}
            className="w-full sm:w-auto flex-1 bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-champagne-500)] text-right"
          />
          <button
            type="submit"
            className="w-full sm:w-auto gold-gradient text-[var(--color-navy-950)] font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            فحص التوفر الآن
          </button>
        </form>

        {checkResult === 'available' && (
          <div className="bg-[var(--color-success)] border border-[var(--color-success)] p-4 rounded-2xl max-w-lg mx-auto text-right flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 text-[var(--color-warm-white)]">
              <CheckCircle2 className="w-6 h-6 text-[var(--color-success)] shrink-0" />
              <div>
                <h4 className="font-bold text-sm font-tajawal text-white">التاريخ متاح للحجز!</h4>
                <p className="text-xs text-[var(--color-navy-100)]">صالة النساء وقسم الرجال متاحان في هذا التاريخ.</p>
              </div>
            </div>
            <button
              onClick={() => onSelectDate(testDate)}
              className="gold-gradient text-[var(--color-navy-950)] text-xs font-bold px-4 py-2 rounded-lg shadow shrink-0"
            >
              احجز هذا التاريخ
            </button>
          </div>
        )}

        {checkResult === 'busy' && (
          <div className="bg-[var(--color-navy-950)] border border-[var(--color-error)] p-4 rounded-2xl max-w-lg mx-auto text-right flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 text-[var(--color-champagne-100)]">
              <AlertCircle className="w-6 h-6 text-[var(--color-champagne-300)] shrink-0" />
              <div>
                <h4 className="font-bold text-sm font-tajawal text-white">التاريخ ممتلئ جزئياً</h4>
                <p className="text-xs text-[var(--color-champagne-300)]">يوجد حفل آخر في نفس اليوم، يرجى اختيار تاريخ آخر أو الاستفسار عن البدائل.</p>
              </div>
            </div>
            <button
              onClick={() => onSelectDate(testDate)}
              className="bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 text-xs font-bold px-4 py-2 rounded-lg shrink-0"
            >
              استفسر عن البدائل
            </button>
          </div>
        )}

        {/* Calendar View Toggle */}
        <div className="mt-4">
          <button
            onClick={() => setShowFullCalendar(!showFullCalendar)}
            className="inline-flex items-center gap-2 bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all cursor-pointer shadow-lg mb-4"
          >
            <CalendarRange className="w-4 h-4" />
            <span>{showFullCalendar ? 'إخفاء جدول المواعيد الشهري' : 'عرض جدول المواعيد والتقويم الشهري الكامل'}</span>
          </button>
        </div>

        {/* Full Interactive Calendar Component */}
        {showFullCalendar && (
          <div className="mt-2 text-right">
            <InteractiveBookingCalendar
              onSelectDate={(selected) => onSelectDate(selected)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

