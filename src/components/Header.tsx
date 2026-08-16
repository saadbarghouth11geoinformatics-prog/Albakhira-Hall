import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Phone,
  Calendar,
  Sparkles,
  Menu,
  X,
  ChevronLeft,
  Calculator,
  HelpCircle,
  MessageSquare,
  MapPin,
  Info,
  Home,
  Utensils,
  Camera,
  Instagram,
  Heart,
  Users
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

interface HeaderProps {
  onOpenBooking: (packageId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu after navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // All links for desktop and mobile navigation
  const allMobileLinks = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/womens-hall', label: 'قسم النساء', icon: Heart, badge: 'ملكي' },
    { path: '/mens-hall', label: 'قسم الرجال', icon: Users, badge: 'حوش 100 فرش' },
    { path: '/offers', label: 'العروض', icon: Sparkles },
    { path: '/calculator', label: 'جهز حفلك', icon: Calculator },
    { path: '/menu', label: 'البوفيه', icon: Utensils },
    { path: '/gallery', label: 'المعرض', icon: Camera },
    { path: '/about', label: 'عن القاعة', icon: Info },
    { path: '/reviews', label: 'التقييمات', icon: MessageSquare },
    { path: '/faq', label: 'الأسئلة', icon: HelpCircle },
    { path: '/contact', label: 'الموقع', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" dir="rtl">
      {/* Top Announcement Bar - Warm Ivory & Champagne Accent */}
      <div className={`brand-info-bar hidden bg-[var(--color-ivory)] border-b border-[var(--color-border)] text-[var(--color-text)] py-1.5 px-4 ${isScrolled ? '' : 'xl:block'}`}>
        <div className="max-w-[1440px] mx-auto font-tajawal text-[11px] sm:text-xs">
          {/* Mobile Single Line Layout */}
          <div className="flex xl:hidden items-center justify-between w-full">
            <span className="inline-flex items-center gap-1.5 bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] px-2.5 py-0.5 rounded-full font-bold border border-[var(--color-champagne-500)]/40 text-[11px]">
              <Sparkles className="w-3 h-3 text-[var(--color-champagne-600)]" /> قاعة الباخرة للاحتفالات
            </span>
            <a
              href={HALL_SPECS.supervisor.tel}
              className="flex items-center gap-1 text-[var(--color-text)] hover:text-[var(--color-champagne-600)] font-bold text-[11px] transition-colors"
            >
              <Phone className="w-3 h-3 text-[var(--color-champagne-600)]" />
              <span dir="ltr">{HALL_SPECS.supervisor.phone}</span>
            </a>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:flex items-center justify-between w-full">
            <div className="flex flex-wrap items-center justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] px-3 py-0.5 rounded-full text-[11px] font-bold border border-[var(--color-champagne-500)]/40 shadow-xs">
                <Sparkles className="w-3 h-3 text-[var(--color-champagne-600)]" /> قاعة الباخرة للاحتفالات بجدة
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">{HALL_SPECS.addressShortAr}</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-cairo">
              <a
                href={HALL_SPECS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[var(--color-champagne-700)] hover:text-[var(--color-champagne-600)] font-bold transition-colors bg-[var(--color-champagne-100)] px-2.5 py-0.5 rounded-md border border-[var(--color-champagne-500)]/40"
                title="إنستغرام قاعة الباخرة @albakhera.1"
              >
                <Instagram className="w-3.5 h-3.5 text-[var(--color-champagne-600)]" />
                <span className="text-[11px]">{HALL_SPECS.instagramAccount}</span>
              </a>
              <span className="text-[var(--color-border)]">|</span>
              <a
                href={HALL_SPECS.supervisor.tel}
                className="flex items-center gap-1.5 text-[var(--color-text)] hover:text-[var(--color-champagne-600)] transition-colors font-bold"
                title="مشرف القاعة والحجوزات"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--color-champagne-600)]" />
                <span>مشرف القاعة: <span dir="ltr">{HALL_SPECS.supervisor.phone}</span></span>
              </a>
              <span className="text-[var(--color-border)]">|</span>
              <a
                href={HALL_SPECS.womenSupervisor.tel}
                className="flex items-center gap-1.5 text-[var(--color-text)] hover:text-[var(--color-champagne-600)] transition-colors font-bold hidden md:flex"
                title="مشرفة قسم النساء"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--color-champagne-600)]" />
                <span>قسم النساء: <span dir="ltr">{HALL_SPECS.womenSupervisor.phone}</span></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <div
        className={`relative transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--color-warm-white)]/95 backdrop-blur-xl shadow-[var(--shadow-sm)] border-b border-[var(--color-border)] py-2'
            : 'bg-[var(--color-ivory)]/95 backdrop-blur-lg border-b border-[var(--color-border)] py-2'
        }`}
      >
        <div className="max-w-[1440px] min-h-[56px] xl:min-h-[64px] mx-auto px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 xl:gap-6">
          {/* Official hall logo */}
          <Link to="/" className="flex shrink-0 items-center" aria-label="العودة إلى الصفحة الرئيسية">
            {!imageError ? (
              <img
                src="/logo-official.png"
                decoding="async"
                alt="شعار قاعة الباخرة للاحتفالات"
                onError={() => setImageError(true)}
                className="h-10 w-[124px] object-contain sm:h-12 sm:w-[158px] xl:h-14 xl:w-[184px]"
              />
            ) : (
              <span className="font-tajawal text-lg font-black text-[var(--color-navy-900)]">قاعة الباخرة</span>
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex flex-1 min-w-0 items-center justify-center gap-1 2xl:gap-2" aria-label="التنقل الرئيسي">
            {allMobileLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative px-2.5 2xl:px-3 py-2 rounded-lg text-[13px] 2xl:text-sm font-bold transition-all duration-200 flex items-center gap-1 whitespace-nowrap border border-transparent ${
                    isActive
                      ? 'text-[var(--color-navy-950)] font-black after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-[var(--color-champagne-500)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-navy-950)] hover:bg-[var(--color-soft-beige)]/70'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* CTA Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="btn-primary min-h-11 font-black text-xs xl:text-sm px-3.5 xl:px-5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 xl:gap-2 group cursor-pointer whitespace-nowrap shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[var(--color-champagne-300)]" />
              <span className="hidden xl:inline">احجز تاريخك الآن</span>
              <span className="xl:hidden font-bold">احجز</span>
              <ChevronLeft className="w-4 h-4 hidden xl:inline group-hover:-translate-x-1 transition-transform shrink-0 text-[var(--color-champagne-300)]" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-11 h-11 rounded-xl text-[var(--color-text)] bg-[var(--color-warm-white)] border border-[var(--color-border)] hover:bg-[var(--color-soft-beige)] transition-colors cursor-pointer shrink-0 flex items-center justify-center shadow-xs"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full xl:hidden bg-[var(--color-warm-white)] border-t border-b border-[var(--color-border)] px-3 sm:px-5 pt-3 pb-5 shadow-[var(--shadow-md)] transition-all"
          >
            <div className="mx-auto max-w-2xl max-h-[calc(100vh-9rem)] overflow-y-auto">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="font-tajawal text-sm font-black text-[var(--color-navy-950)]">تصفح الموقع</span>
                <span className="text-[11px] text-[var(--color-text-muted)]">اختر القسم المطلوب</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {allMobileLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `min-h-[58px] px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border ${
                          isActive
                            ? 'bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] border-[var(--color-champagne-500)] shadow-xs'
                            : 'bg-[var(--color-ivory)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-soft-beige)] hover:text-[var(--color-navy-950)]'
                        }`
                      }
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-warm-white)] text-[var(--color-champagne-700)] border border-[var(--color-champagne-300)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-tajawal leading-tight">{link.label}</span>
                    </NavLink>
                  );
                })}
              </div>
              <div className="pt-3 mt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full btn-primary font-black py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm cursor-pointer shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-[var(--color-champagne-300)]" />
                  <span>طلب حجز ومعاينة القاعة الآن</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
