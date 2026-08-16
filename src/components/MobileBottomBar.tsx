import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Calendar, Calculator, MapPin, Sparkles } from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

interface MobileBottomBarProps {
  onOpenBooking: (packageId?: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();

  return (
    <nav aria-label="اختصارات الموبايل" className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-warm-white)]/95 backdrop-blur-xl border-t border-[var(--color-border)] px-1.5 pt-1.5 pb-safe shadow-[var(--shadow-sm)]">
      <div className="grid grid-cols-5 gap-1 text-center max-w-md mx-auto">
        {/* 1. Quick Booking Button */}
        <button
          onClick={() => onOpenBooking()}
          className="flex min-h-[52px] flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[var(--color-champagne-100)] border border-[var(--color-champagne-500)] text-[var(--color-navy-950)] font-bold cursor-pointer active:scale-95 transition-all"
        >
          <Calendar className="w-5 h-5 text-[var(--color-navy-950)] mb-0.5" />
          <span className="text-[10px] font-tajawal font-black tracking-tight leading-tight">
            احجز الآن
          </span>
        </button>

        {/* 2. Direct Call */}
        <a
          href={HALL_SPECS.supervisor.tel}
          className="flex min-h-[52px] flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[var(--color-navy-900)] hover:bg-[var(--color-champagne-100)] transition-colors cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-[var(--color-champagne-100)] border border-[var(--color-champagne-500)] flex items-center justify-center text-[var(--color-champagne-700)] mb-0.5">
            <Phone className="w-3 h-3" />
          </div>
          <span className="text-[10px] font-tajawal font-bold text-[var(--color-navy-900)]">اتصال</span>
        </a>

        {/* 3. WhatsApp Chat */}
        <a
          href={HALL_SPECS.supervisor.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[52px] flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[#25D366] hover:bg-[#25D366]/10 transition-colors cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white mb-0.5 shadow-sm">
            <MessageCircle className="w-3 h-3 fill-current" />
          </div>
          <span className="text-[10px] font-tajawal font-bold text-[#25D366]">واتساب</span>
        </a>

        {/* 4. Pricing Calculator */}
        <NavLink
          to="/calculator"
          className={({ isActive }) =>
            `flex min-h-[52px] flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors ${
              isActive
                ? 'bg-[var(--color-champagne-100)] text-[var(--color-navy-950)] border border-[var(--color-champagne-500)]'
                : 'text-[var(--color-navy-900)] hover:bg-[var(--color-soft-beige)]'
            }`
          }
        >
          <Calculator className="w-5 h-5 text-[var(--color-champagne-500)] mb-0.5" />
          <span className="text-[10px] font-tajawal font-bold text-[var(--color-navy-900)]">جهز حفلك</span>
        </NavLink>

        {/* 5. Location / Map */}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex min-h-[52px] flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors ${
              isActive
                ? 'bg-[var(--color-champagne-100)] text-[var(--color-navy-950)] border border-[var(--color-champagne-500)]'
                : 'text-[var(--color-navy-900)] hover:bg-[var(--color-soft-beige)]'
            }`
          }
        >
          <MapPin className="w-5 h-5 text-[var(--color-champagne-500)] mb-0.5" />
          <span className="text-[10px] font-tajawal font-bold text-[var(--color-navy-900)]">الموقع</span>
        </NavLink>
      </div>
    </nav>
  );
};
