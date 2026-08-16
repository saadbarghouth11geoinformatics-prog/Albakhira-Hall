import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, MapPin, RotateCw } from 'lucide-react';

export const VirtualTour: React.FC = () => {
  const [activeZone, setActiveZone] = useState<'hall' | 'men' | 'buffet'>('hall');

  const zones = {
    hall: {
      title: 'صالة النساء الفاخرة',
      desc: 'ديكورات ملكية وكوشة مودرن مع تكييف كامل وتنسيق الكافيه والمداخل.',
      image: '/02_Women_Hall/women_03.jpg',
      hotspots: [
        { id: 'h1', title: 'الكوشة وتنسيق المسرح', x: '50%', y: '40%', info: 'مصممة بالورود والتأثيرات الضوئية المباشرة' },
        { id: 'h2', title: 'طاولات ضيافة النساء (40 طاولة)', x: '25%', y: '65%', info: 'مجهزة بـ 40 صحن حلا و40 صحن معجنات مجاناً' },
      ],
    },
    men: {
      title: 'قسم الرجال وجلسات الحوش',
      desc: 'قسم رجال متكامل مع 100 فرش حوش خارجي تراثي وخدمة القهوجي والمباشرين.',
      image: '/03_Men_Hall/men_01.jpg',
      hotspots: [
        { id: 'd1', title: 'الجلسات التراثية الخارجية', x: '45%', y: '50%', info: '100 فرش تراثي مريح للضيوف' },
        { id: 'd2', title: 'موقع القهوجي والضيافة', x: '80%', y: '55%', info: 'تقديم القهوة والشاي الدائم طوال الحفل' },
      ],
    },
    buffet: {
      title: 'منطقة البوفيه المفتوح 10 متر',
      desc: 'بوفيه فضي ممتد لـ 10 متر مع تورتة زفاف ملكية 3 دور.',
      image: '/04_Dining_Buffet/food_02.jpg',
      hotspots: [
        { id: 'b1', title: 'البوفيه الفضي 10 أمتار', x: '60%', y: '50%', info: 'خدمة تقديم فندقية راقية ومأكولات طازجة' },
      ],
    },
  };

  const currentZoneData = zones[activeZone];

  return (
    <section className="py-20 relative bg-[var(--color-navy-950)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/40 mb-3">
            <Compass className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> الجولة الافتراضية 360°
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tajawal gold-text mb-4">
            استكشف قاعة الباخرة بجدة افتراضياً
          </h2>
          <p className="text-[var(--color-navy-100)] text-sm sm:text-base font-cairo">
            تنقل بين صالة النساء، قسم الرجال والحوش الخارجي، ومنطقة البوفيه الـ 10 متر.
          </p>
        </motion.div>

        {/* Zone Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {(Object.keys(zones) as Array<keyof typeof zones>).map((zoneKey) => (
            <button
              key={zoneKey}
              onClick={() => setActiveZone(zoneKey)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeZone === zoneKey
                  ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105'
                  : 'dark-overlay-card text-white hover:text-[var(--color-champagne-300)]'
              }`}
            >
              {zones[zoneKey].title}
            </button>
          ))}
        </motion.div>

        {/* Interactive Viewer Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="dark-overlay-card p-4 md:p-6 rounded-3xl relative overflow-hidden bg-black/80 shadow-2xl"
        >
          <div className="relative h-[400px] sm:h-[500px] w-full rounded-2xl overflow-hidden group">
          <img
            loading="lazy"
            decoding="async"
              src={currentZoneData.image}
              alt={currentZoneData.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Interactive Hotspots */}
            {currentZoneData.hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{ top: spot.y, left: spot.x }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group/spot z-20"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] flex items-center justify-center font-bold text-xs shadow-2xl animate-bounce cursor-pointer border-2 border-white">
                  <MapPin className="w-4 h-4" />
                </div>

                {/* Hotspot Tooltip */}
                <div className="absolute bottom-10 right-1/2 translate-x-1/2 bg-[var(--color-navy-900)]/95 border border-[var(--color-champagne-500)] p-3 rounded-xl shadow-2xl min-w-[180px] text-right opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none">
                  <div className="font-bold text-xs gold-text font-tajawal mb-1">{spot.title}</div>
                  <div className="text-[10px] text-[var(--color-navy-100)]">{spot.info}</div>
                </div>
              </div>
            ))}

            {/* Top Badge */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--color-champagne-500)]/40 text-xs font-bold text-[var(--color-champagne-300)] flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-[var(--color-champagne-500)] animate-spin" />
              <span>معاينة تفاعلية بجدة</span>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-[var(--color-navy-950)]/90 backdrop-blur-md p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-right">
              <h4 className="font-bold text-lg text-white font-tajawal mb-1">{currentZoneData.title}</h4>
              <p className="text-xs text-[var(--color-navy-100)]">{currentZoneData.desc}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
