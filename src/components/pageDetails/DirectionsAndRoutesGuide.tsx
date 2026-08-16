import React, { useState } from 'react';
import { Navigation, MapPin, Clock, ExternalLink } from 'lucide-react';
import { HALL_SPECS } from '../../data/hallData';

export const DirectionsAndRoutesGuide: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<'north' | 'center' | 'makkah'>('north');

  const ROUTES = {
    north: {
      title: 'من شمال جدة (طريق الحرمين - المطار - أبحر)',
      time: 'حوالي 25 - 30 دقيقة',
      steps: [
        'سلك طريق الحرمين باتجاه الجنوب نحو حي الحرازات.',
        'الخروج عند مخرج الحرازات والاتجاه شرقاً.',
        'الاستمرار مستقيماً بعد محطة المدينة بـ 500 متر تماماً.',
        'ستجد قاعة الباخرة للاحتفالات على اليمين مع لوحة مضيئة ومواقف واسعة.'
      ]
    },
    center: {
      title: 'من وسط وشرق جدة (طريق الملك عبد الله - السليمانية)',
      time: 'حوالي 15 - 20 دقيقة',
      steps: [
        'الاتجاه شرقاً عبر طريق الملك عبد الله أو طريق التلفزيون.',
        'الاندماج مع طريق الحرمين متجهاً جنوباً.',
        'سلك كبري الحرازات ثم السير باتجاه شارع الحرازات العام.',
        'الوصول للقاعة بعد محطة المدينة بـ 500 متر.'
      ]
    },
    makkah: {
      title: 'من مكة المكرمة (طريق مكة - جدة السريع)',
      time: 'حوالي 40 - 45 دقيقة',
      steps: [
        'سلك طريق مكة - جدة السريع باتجاه مدخل جدة.',
        'الانعطاف يميناً مع طريق الحرمين شمالاً نحو الحرازات.',
        'سلك مدخل الحرازات والدخول للشارع الرئيسي.',
        'القاعة تقع بعد محطة المدينة بـ 500 متر.'
      ]
    }
  };

  const curr = ROUTES[activeRoute];

  return (
    <div className="py-8 bg-[var(--color-navy-950)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <Navigation className="w-4 h-4" /> دليل الاتجاهات وخريطة الوصول
        </span>
        <h3 className="text-xl sm:text-2xl font-black font-tajawal text-white">
          أسهل مسارات الوصول للقاعة حسب موقع انطلاقكم
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          حدد من أين ستتحرك للاستدلال بأسرع طريق واجتناب الازداحامات المرورية.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
        {[
          { id: 'north', label: 'شمال جدة' },
          { id: 'center', label: 'وسط وشرق جدة' },
          { id: 'makkah', label: 'من مكة المكرمة' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveRoute(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRoute === tab.id
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Route Content */}
      <div className="bg-[var(--color-navy-900)] p-6 rounded-2xl border border-[var(--color-champagne-500)]/30 space-y-4 max-w-3xl mx-auto shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--color-champagne-500)]/20 pb-3">
          <h4 className="text-sm font-bold font-tajawal text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--color-champagne-500)]" />
            <span>{curr.title}</span>
          </h4>
          <span className="text-xs bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {curr.time}
          </span>
        </div>

        <ol className="space-y-2 text-xs text-[var(--color-navy-100)] font-cairo list-decimal list-inside leading-relaxed">
          {curr.steps.map((step, idx) => (
            <li key={idx} className="bg-[var(--color-navy-950)] p-3 rounded-xl border border-white/5">
              {step}
            </li>
          ))}
        </ol>

        <div className="pt-2 text-center">
          <a
            href={HALL_SPECS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gold-gradient text-[var(--color-navy-950)] font-bold text-xs px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>فتح التوجيه المباشر في خرائط Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
