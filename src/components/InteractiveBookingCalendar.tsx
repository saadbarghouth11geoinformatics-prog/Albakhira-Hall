import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  MessageCircle,
  CalendarCheck,
  Crown,
  Info,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

export type DateStatus = 'available' | 'booked' | 'pending' | 'special_weekend';

export interface CalendarDayInfo {
  dateStr: string; // YYYY-MM-DD
  dayNum: number;
  isCurrentMonth: boolean;
  status: DateStatus;
  hijriDay: string;
  isWeekend: boolean;
  priceEstimate?: number;
  badge?: string;
  note?: string;
}

interface InteractiveBookingCalendarProps {
  onSelectDate: (dateStr: string) => void;
  onOpenBookingModal?: (dateStr: string) => void;
}

// Arabic Month Names
const MONTH_NAMES_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const HIJRI_MONTH_MAP: Record<number, string> = {
  0: 'رجب - شعبان 1448 هـ',
  1: 'شعبان - رمضان 1448 هـ',
  2: 'رمضان - شوال 1448 هـ',
  3: 'شوال - ذو القعدة 1448 هـ',
  4: 'ذو القعدة - ذو الحجة 1448 هـ',
  5: 'ذو الحجة 1448 - محرم 1449 هـ',
  6: 'محرم - صفر 1448 هـ',
  7: 'صفر - ربيع الأول 1448 هـ',
  8: 'ربيع الأول - ربيع الثاني 1448 هـ',
  9: 'ربيع الثاني - جمادى الأولى 1448 هـ',
  10: 'جمادى الأولى - جمادى الآخرة 1448 هـ',
  11: 'جمادى الآخرة - رجب 1448 هـ'
};

const WEEKDAYS_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export const InteractiveBookingCalendar: React.FC<InteractiveBookingCalendarProps> = ({
  onSelectDate,
  onOpenBookingModal
}) => {
  // Base date set to August 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // 0-indexed: 7 = August
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-20');
  const [filter, setFilter] = useState<'all' | 'available' | 'weekend'>('all');

  // Month Navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Helper to compute status deterministically for mock data
  const getDayStatus = (year: number, month: number, day: number, dayOfWeek: number): CalendarDayInfo => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

    const isWeekend = dayOfWeek === 4 || dayOfWeek === 5; // Thursday / Friday in Saudi Arabia
    
    // Deterministic mock logic based on day number
    let status: DateStatus = 'available';
    let badge: string | undefined = undefined;
    let note = 'متاح للحجز الشامل';

    if (day % 7 === 0 || (dayOfWeek === 4 && day % 3 === 0)) {
      status = 'booked';
      note = 'محجوز مؤكداً (حفل زفاف)';
    } else if (day % 9 === 0) {
      status = 'pending';
      note = 'حجز قيد التأكيد (مهلة 24 ساعة)';
      badge = 'مهلة حجز';
    } else if (isWeekend) {
      status = 'special_weekend';
      badge = 'ليلة ممتازة';
      note = 'متاح - عطلة نهاية الأسبوع';
    } else {
      status = 'available';
      badge = 'متاح للحجز';
      note = 'متاح - أيام وسط الأسبوع';
    }

    // Hijri day approximation
    const hijriDayNum = ((day + 12) % 30) + 1;

    return {
      dateStr,
      dayNum: day,
      isCurrentMonth: true,
      status,
      hijriDay: `${hijriDayNum} هـ`,
      isWeekend,
      badge,
      note
    };
  };

  // Build calendar matrix
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 1 = Mon...
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysList: CalendarDayInfo[] = [];

  // Padding previous month empty cells
  for (let i = 0; i < firstDayOfMonth; i++) {
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const prevDayNum = prevMonthDays - firstDayOfMonth + i + 1;
    daysList.push({
      dateStr: `prev-${prevDayNum}`,
      dayNum: prevDayNum,
      isCurrentMonth: false,
      status: 'booked',
      hijriDay: '',
      isWeekend: false,
      note: 'خارج الشهر الحالي'
    });
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(currentYear, currentMonth, d);
    const dayOfWeek = dateObj.getDay();
    daysList.push(getDayStatus(currentYear, currentMonth, d, dayOfWeek));
  }

  // Active Selected Day Obj
  const selectedDayObj = daysList.find((d) => d.dateStr === selectedDate) || daysList.find((d) => d.isCurrentMonth && d.status === 'available') || daysList[firstDayOfMonth];

  // Filtered Days Logic
  const isDayVisible = (day: CalendarDayInfo) => {
    if (!day.isCurrentMonth) return true;
    if (filter === 'available') return day.status === 'available' || day.status === 'special_weekend';
    if (filter === 'weekend') return day.isWeekend;
    return true;
  };

  return (
    <section id="booking-calendar" className="surface-light py-8 sm:py-14 bg-[var(--color-ivory)] relative overflow-hidden font-cairo border-y border-[var(--color-border)]">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[var(--color-success)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex flex-wrap justify-center items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] text-xs font-bold border border-[var(--color-champagne-500)]/40 shadow-sm">
            <CalendarIcon className="w-4 h-4 text-[var(--color-champagne-500)]" />
            <span>جدول المواعيد والحجوزات المتاحة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-tajawal text-[var(--color-navy-950)] leading-snug">
            تقويم مواعيد وحجوزات قاعة الباخرة بجدة
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            استعرض المواعيد المتاحة والمحجوزة مسبقاً لصالة النساء وقسم الرجال بالحرازات، واختَر تاريخ مناسبتك للاستفسار والحجز الفوري.
          </p>
        </div>

        {/* Legend & Filter Controls */}
        <div className="bg-[var(--color-navy-950)]/90 backdrop-blur-xl border border-[var(--color-champagne-500)]/30 rounded-2xl p-4 mb-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          {/* Calendar Status Legend */}
          <div className="flex items-center gap-4 flex-wrap text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366] inline-block" />
              <span className="text-[var(--color-navy-100)]">متاح للحجز</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--color-error)] shadow-[0_0_8px_var(--color-error)] inline-block" />
              <span className="text-[var(--color-navy-100)]">محجوز مؤكداً</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--color-warning)] shadow-[0_0_8px_var(--color-warning)] inline-block" />
              <span className="text-[var(--color-navy-100)]">حجز قيد التأكيد</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--color-champagne-600)] shadow-[0_0_8px_var(--color-champagne-600)] inline-block" />
              <span className="text-[var(--color-navy-100)]">عرض نهاية الأسبوع</span>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[var(--color-navy-100)] font-bold ml-1 hidden sm:flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> الفرز:
            </span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'gold-gradient text-[var(--color-navy-950)] font-black'
                  : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-white/10 hover:border-[var(--color-champagne-500)]/40'
              }`}
            >
              جميع الأيام
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'available'
                  ? 'gold-gradient text-[var(--color-navy-950)] font-black'
                  : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-white/10 hover:border-[var(--color-champagne-500)]/40'
              }`}
            >
              المتاحة فقط 🟢
            </button>
            <button
              onClick={() => setFilter('weekend')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'weekend'
                  ? 'gold-gradient text-[var(--color-navy-950)] font-black'
                  : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-white/10 hover:border-[var(--color-champagne-500)]/40'
              }`}
            >
              ليالي نهاية الأسبوع 💜
            </button>
          </div>
        </div>

        {/* Main Calendar Body Grid */}
        <div className="bg-[var(--color-navy-950)]/95 border-2 border-[var(--color-champagne-500)]/40 rounded-3xl p-4 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          {/* Month Header Navigation */}
          <div className="flex items-center justify-between pb-5 border-b border-[var(--color-champagne-500)]/25 mb-6">
            <button
              onClick={handlePrevMonth}
              className="px-3.5 py-2 rounded-2xl bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] hover:text-white hover:border-[var(--color-champagne-500)] transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-[var(--color-champagne-500)]" />
              <span>الشهر السابق</span>
            </button>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-black font-tajawal gold-text">
                {MONTH_NAMES_AR[currentMonth]} {currentYear} م
              </h3>
              <p className="text-xs text-[var(--color-navy-100)] font-bold mt-0.5">
                تأريخ هجري تقريبي: {HIJRI_MONTH_MAP[currentMonth]}
              </p>
            </div>

            <button
              onClick={handleNextMonth}
              className="px-3.5 py-2 rounded-2xl bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] hover:text-white hover:border-[var(--color-champagne-500)] transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
            >
              <span>الشهر التالي</span>
              <ChevronLeft className="w-4 h-4 text-[var(--color-champagne-500)]" />
            </button>
          </div>

          {/* Weekday Titles Bar */}
          <div className="grid grid-cols-7 gap-1.5 text-center mb-3 text-xs font-black font-tajawal text-[var(--color-champagne-300)] bg-[var(--color-navy-900)] p-2.5 rounded-2xl border border-[var(--color-champagne-500)]/20">
            {WEEKDAYS_AR.map((dayName, idx) => (
              <div key={idx} className={idx === 4 || idx === 5 ? 'text-[var(--color-champagne-500)]' : ''}>
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar Month Days Matrix Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
            {daysList.map((day, idx) => {
              if (!day.isCurrentMonth) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="min-h-[70px] sm:min-h-[85px] rounded-2xl bg-[var(--color-navy-950)]/30 border border-white/5 opacity-20 p-1 flex items-center justify-center text-xs text-slate-600 pointer-events-none"
                  >
                    <span>{day.dayNum}</span>
                  </div>
                );
              }

              const isSelected = selectedDate === day.dateStr;
              const isVisible = isDayVisible(day);

              return (
                <motion.div
                  key={day.dateStr}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setSelectedDate(day.dateStr);
                    onSelectDate(day.dateStr);
                  }}
                  className={`min-h-[75px] sm:min-h-[92px] rounded-2xl p-1.5 sm:p-2 border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    !isVisible ? 'opacity-30 grayscale' : ''
                  } ${
                    isSelected
                      ? 'ring-2 ring-[var(--color-champagne-500)] border-[var(--color-champagne-100)] bg-gradient-to-b from-[var(--color-navy-800)] to-[var(--color-navy-900)] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                      : day.status === 'booked'
                      ? 'bg-[var(--color-navy-950)] border-[var(--color-error)]/30 text-slate-400'
                      : day.status === 'pending'
                      ? 'bg-[var(--color-navy-950)] border-[var(--color-warning)]/30'
                      : day.status === 'special_weekend'
                      ? 'bg-[var(--color-navy-950)] border-[var(--color-champagne-600)]/40 hover:border-[var(--color-champagne-600)]'
                      : 'bg-[var(--color-navy-900)] border-[#25D366]/30 hover:border-[#25D366]'
                  }`}
                >
                  {/* Status Indicator Corner Dot */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs sm:text-sm font-tajawal text-white">
                      {day.dayNum}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        day.status === 'available'
                          ? 'bg-[#25D366] shadow-[0_0_6px_#25D366]'
                          : day.status === 'special_weekend'
                          ? 'bg-[var(--color-champagne-600)] shadow-[0_0_6px_var(--color-champagne-600)]'
                          : day.status === 'pending'
                          ? 'bg-[var(--color-warning)]'
                          : 'bg-[var(--color-error)]'
                      }`}
                    />
                  </div>

                  {/* Day Status Label & Hijri Info */}
                  <div className="my-0.5 text-right">
                    {day.status === 'booked' ? (
                      <span className="text-[10px] text-[var(--color-error)] font-bold block leading-tight">
                        محجوز
                      </span>
                    ) : day.status === 'pending' ? (
                      <span className="text-[10px] text-[var(--color-warning)] font-bold block leading-tight">
                        تحت التأكيد
                      </span>
                    ) : day.status === 'special_weekend' ? (
                      <span className="text-[10px] text-[var(--color-champagne-300)] font-black block leading-tight">
                        خميس / جمعة
                      </span>
                    ) : (
                      <span className="text-[10px] text-[var(--color-success)] font-bold block leading-tight">
                        متاح
                      </span>
                    )}

                    <span className="text-[9px] text-slate-400 block hidden sm:block">
                      {day.hijriDay}
                    </span>
                  </div>

                  {/* Price Tag or Badge if available */}
                  {day.badge && (
                    <div className="mt-auto">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold block text-center truncate ${
                          day.status === 'special_weekend'
                            ? 'bg-[var(--color-champagne-600)]/20 text-[var(--color-champagne-100)] border border-[var(--color-champagne-600)]/30'
                            : 'bg-[#25D366]/15 text-[var(--color-success)] border border-[#25D366]/30'
                        }`}
                      >
                        {day.badge}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Selected Date Details Panel & Instant Actions */}
          <AnimatePresence mode="wait">
            {selectedDayObj && (
              <motion.div
                key={selectedDayObj.dateStr}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="mt-6 pt-6 border-t border-[var(--color-champagne-500)]/30 bg-[var(--color-navy-900)] rounded-2xl p-4 sm:p-6 border border-[var(--color-champagne-500)]/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Left Info Column */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-lg sm:text-xl font-black font-tajawal gold-text">
                        تاريخ المناسبة المحدد: {selectedDayObj.dateStr}
                      </span>
                      <span className="text-xs bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] font-bold px-3 py-1 rounded-full">
                        {selectedDayObj.hijriDay}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold text-[var(--color-navy-100)]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> الحالة:
                      </span>
                      {selectedDayObj.status === 'booked' ? (
                        <span className="text-[var(--color-error)] bg-[var(--color-error)]/15 px-2.5 py-0.5 rounded-full border border-[var(--color-error)]/30 inline-flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> محجوز مؤكداً (حفل زفاف)
                        </span>
                      ) : selectedDayObj.status === 'pending' ? (
                        <span className="text-[var(--color-warning)] bg-[var(--color-warning)]/15 px-2.5 py-0.5 rounded-full border border-[var(--color-warning)]/30 inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> حجز قيد التأكيد (مهلة 24 ساعة)
                        </span>
                      ) : (
                        <span className="text-[#25D366] bg-[#25D366]/15 px-2.5 py-0.5 rounded-full border border-[#25D366]/30 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> متاح للحجز المباشر (صالة النساء + قسم الرجال)
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300">
                      {selectedDayObj.note} - يشمل العرض المعتمد: بوفيه مفتوح 10 متر، تورتة 3 دور، 40 طاولة ضيافة، وحوش خارجي بـ 100 فرش.
                    </p>
                  </div>

                  {/* Right Action Buttons Column */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    {selectedDayObj.status !== 'booked' ? (
                      <>
                        <button
                          onClick={() => {
                            if (onOpenBookingModal) {
                              onOpenBookingModal(selectedDayObj.dateStr);
                            } else {
                              onSelectDate(selectedDayObj.dateStr);
                            }
                          }}
                          className="w-full sm:w-auto gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2 cursor-pointer border border-[var(--color-champagne-100)]/60"
                        >
                          <CalendarCheck className="w-4 h-4 text-[var(--color-navy-950)]" />
                          <span>احجز هذا التاريخ مباشرة</span>
                        </button>

                        <a
                          href={`https://wa.me/${HALL_SPECS.whatsappNumber}?text=${encodeURIComponent(
                            `السلام عليكم ورحمة الله، أود الاستفسار والحجز بقاعة الباخرة بجدة لتاريخ: ${selectedDayObj.dateStr} (${selectedDayObj.hijriDay})`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto bg-[#25D366] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 text-white" />
                          <span>استفسار واتساب فوراً</span>
                        </a>
                      </>
                    ) : (
                      <a
                        href={`https://wa.me/${HALL_SPECS.whatsappNumber}?text=${encodeURIComponent(
                          `السلام عليكم، أود الاستفسار عن الأيام القريبة المتاحة حول تاريخ: ${selectedDayObj.dateStr}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/50 text-[var(--color-champagne-300)] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Info className="w-4 h-4" />
                        <span>استفسر عن البدائل القريبة</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
