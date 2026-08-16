import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, X, Sparkles, Send } from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

export const FloatingWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className="hidden sm:flex fixed bottom-8 left-8 z-40 flex-col items-start gap-2">
      {/* Quick Menu Popup if clicked or toggled */}
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--color-navy-950)]/95 backdrop-blur-xl p-4 rounded-3xl border-2 border-[var(--color-champagne-500)] shadow-[0_15px_40px_rgba(0,0,0,0.8)] text-right w-72 mb-2 font-cairo"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-champagne-500)]/30 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="font-tajawal font-bold text-xs text-white">تواصل واتساب المباشر</h4>
                  <span className="text-[10px] text-[var(--color-success)] block font-medium">متواجدون للرد السريع</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpenMenu(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[var(--color-navy-100)] mb-3 leading-relaxed">
              اختر القسم المطلوب للتواصل الفوري عبر الواتساب:
            </p>

            <div className="space-y-2">
              {/* Main Supervisor */}
              <a
                href={HALL_SPECS.supervisor.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[var(--color-navy-900)] hover:bg-[#25D366] hover:text-white p-2.5 rounded-xl border border-[var(--color-champagne-500)]/30 flex items-center justify-between text-xs transition-all group cursor-pointer text-[var(--color-champagne-300)]"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                  <div className="text-right">
                    <strong className="block text-[11px] text-white group-hover:text-white font-tajawal">
                      {HALL_SPECS.supervisor.title}
                    </strong>
                    <span className="text-[10px] opacity-80" dir="ltr">{HALL_SPECS.supervisor.phone}</span>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-[-2px] transition-transform" />
              </a>

              {/* Women Supervisor */}
              <a
                href={HALL_SPECS.womenSupervisor.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[var(--color-navy-950)] hover:bg-[var(--color-champagne-600)] hover:text-white p-2.5 rounded-xl border border-[var(--color-champagne-600)]/40 flex items-center justify-between text-xs transition-all group cursor-pointer text-[var(--color-champagne-300)]"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[var(--color-champagne-600)] group-hover:text-white" />
                  <div className="text-right">
                    <strong className="block text-[11px] text-white group-hover:text-white font-tajawal">
                      {HALL_SPECS.womenSupervisor.title}
                    </strong>
                    <span className="text-[10px] opacity-80" dir="ltr">{HALL_SPECS.womenSupervisor.phone}</span>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-[-2px] transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <div className="relative group">
        <a
          href={HALL_SPECS.supervisor.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/40 group z-10"
          aria-label="تواصل عبر الواتساب - قاعة الباخرة"
          title="تواصل معنا عبر واتساب (0500292974)"
        >
          {/* Animated Pulse Outer Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current group-hover:scale-110 transition-transform" />
        </a>

        {/* Small toggle button to open multi-contact selector on desktop */}
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="hidden sm:flex absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)] text-[var(--color-champagne-500)] items-center justify-center text-[10px] shadow-lg cursor-pointer hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-colors z-20"
          title="خيارات التواصل"
        >
          {isOpenMenu ? '✕' : '+'}
        </button>

        {/* Desktop Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpenMenu && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-xl bg-[var(--color-navy-950)]/95 border border-[var(--color-champagne-500)]/50 text-xs font-bold text-[var(--color-champagne-300)] font-tajawal whitespace-nowrap shadow-xl pointer-events-none backdrop-blur-md"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                <span>واتساب الحجوزات: 0500292974</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
