import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Sparkles, Clock, Flame, Gift, CheckCircle2, ChevronRight } from 'lucide-react';

interface LuxuryCountdownTimerProps {
  onOpenBooking?: (packageId?: string, prefilledData?: any) => void;
  className?: string;
}

type CountdownMode = 'next-event' | 'limited-offer' | 'custom';

export const LuxuryCountdownTimer: React.FC<LuxuryCountdownTimerProps> = ({
  onOpenBooking,
  className = '',
}) => {
  const [activeMode, setActiveMode] = useState<CountdownMode>('limited-offer');

  // Dates for different modes
  const offerTargetDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000); // 3 days 14 hours from now
  const nextEventTargetDate = new Date('2026-09-01T20:00:00'); // Next Grand Wedding Showcase
  const [userDate, setUserDate] = useState<string>('2026-10-15');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let targetTime: number;

    if (activeMode === 'limited-offer') {
      targetTime = offerTargetDate.getTime();
    } else if (activeMode === 'next-event') {
      targetTime = nextEventTargetDate.getTime();
    } else {
      targetTime = new Date(userDate).getTime() || Date.now() + 30 * 24 * 60 * 60 * 1000;
    }

    const calculateTime = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [activeMode, userDate]);

  return (
    <div className={`relative bg-gradient-to-br from-[var(--color-navy-900)] via-[var(--color-navy-900)] to-[var(--color-navy-950)] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-[var(--color-champagne-500)]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] overflow-hidden ${className}`}>
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-success)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10 border-b border-[var(--color-champagne-500)]/20 pb-4">
        <div className="flex items-center gap-1.5 bg-[var(--color-navy-950)]/80 p-1 rounded-2xl border border-[var(--color-champagne-500)]/30 backdrop-blur-md overflow-x-auto max-w-full scrollbar-none">
          <button
            onClick={() => setActiveMode('limited-offer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-tajawal transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'limited-offer'
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-md'
                : 'text-[var(--color-navy-100)] hover:text-white'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${activeMode === 'limited-offer' ? 'text-[var(--color-navy-950)]' : 'text-[var(--color-error)]'}`} />
            <span>عرض العرسان المحدود</span>
          </button>

          <button
            onClick={() => setActiveMode('next-event')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-tajawal transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'next-event'
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-md'
                : 'text-[var(--color-navy-100)] hover:text-white'
            }`}
          >
            <Calendar className={`w-3.5 h-3.5 ${activeMode === 'next-event' ? 'text-[var(--color-navy-950)]' : 'text-[var(--color-champagne-500)]'}`} />
            <span>الحفل القادم بالقاعة</span>
          </button>

          <button
            onClick={() => setActiveMode('custom')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-tajawal transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'custom'
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-md'
                : 'text-[var(--color-navy-100)] hover:text-white'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${activeMode === 'custom' ? 'text-[var(--color-navy-950)]' : 'text-[var(--color-success)]'}`} />
            <span>تاريخ حفلكم</span>
          </button>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--color-champagne-300)] bg-[var(--color-champagne-500)]/15 px-3 py-1 rounded-full border border-[var(--color-champagne-500)]/40">
          <Sparkles className="w-3 h-3 text-[var(--color-champagne-500)] animate-spin" />
          <span>تحديث لايف تلقائي</span>
        </div>
      </div>

      {/* Dynamic Content Details Header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6 relative z-10"
        >
          {activeMode === 'limited-offer' && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[var(--color-error)]/20 text-[var(--color-error)] border border-[var(--color-error)]/40 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  ينتهي قريباً جداً
                </span>
                <h4 className="text-base sm:text-lg font-bold font-tajawal text-white">
                  خصم 20% على باقة الـ 100 سيدة + بوفيه الـ 10 متر
                </h4>
              </div>
              <p className="text-xs text-[var(--color-navy-100)] font-cairo">
                ساري للحجوزات المبكرة المتبقية هذا الشهر بشارع الحرازات الرئيسي.
              </p>
            </div>
          )}

          {activeMode === 'next-event' && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  فعالية خاصة
                </span>
                <h4 className="text-base sm:text-lg font-bold font-tajawal text-white">
                  معرض كوشة العروس والزفة الفاخرة القادم
                </h4>
              </div>
              <p className="text-xs text-[var(--color-navy-100)] font-cairo">
                انضم لاستعراض التنسيقات الملكية المباشرة بالحرازات مع خصومات الحضور.
              </p>
            </div>
          )}

          {activeMode === 'custom' && (
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <h4 className="text-base font-bold font-tajawal text-white">
                  احسب الأيام المتبقية لليلة العمر:
                </h4>
                <input
                  type="date"
                  value={userDate}
                  onChange={(e) => setUserDate(e.target.value)}
                  className="bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/50 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[var(--color-champagne-500)]"
                />
              </div>
              <p className="text-xs text-[var(--color-navy-100)] font-cairo">
                حدد موعد زفافكم المخطط لمعرفة الوقت المتبقي وتأكيد الحجز المسبق.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Luxury Digital Timer Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center my-6 relative z-10">
        {[
          { label: 'يوم', val: timeLeft.days },
          { label: 'ساعة', val: timeLeft.hours },
          { label: 'دقيقة', val: timeLeft.minutes },
          { label: 'ثانية', val: timeLeft.seconds },
        ].map((unit, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-navy-950)]/90 border-2 border-[var(--color-champagne-500)]/40 p-2.5 sm:p-4 rounded-2xl shadow-xl relative group hover:border-[var(--color-champagne-500)] transition-colors"
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-champagne-500)] to-transparent opacity-60" />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={unit.val}
                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="block text-2xl sm:text-4xl font-black font-tajawal gold-text tracking-wider"
              >
                {String(unit.val).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="text-[10px] sm:text-xs text-[var(--color-navy-100)] font-bold font-cairo block mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Action Footer Button */}
      <div className="mt-6 relative z-10">
        <button
          onClick={() =>
            onOpenBooking?.(
              activeMode === 'limited-offer' ? 'royal-yacht' : undefined,
              activeMode === 'custom' ? { eventDate: userDate } : undefined
            )
          }
          className="w-full gold-gradient text-[var(--color-navy-950)] font-black text-sm py-3.5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 group"
        >
          <Gift className="w-4 h-4 text-[var(--color-navy-950)] group-hover:rotate-12 transition-transform" />
          <span>
            {activeMode === 'limited-offer'
              ? 'احجز العرض وتأكد من التوفر الآن'
              : activeMode === 'next-event'
              ? 'احجز تذكرتك للمناسبة القادمة'
              : 'احجز قاعة الباخرة لتاريخ حفلكم'}
          </span>
          <ChevronRight className="w-4 h-4 text-[var(--color-navy-950)] rotate-180 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
