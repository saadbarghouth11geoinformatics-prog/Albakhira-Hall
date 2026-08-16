import React, { useState } from 'react';
import { ChefHat } from 'lucide-react';
import { MENU_ITEMS } from '../data/hallData';

export const MenuSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'كافة أصناف البوفيه والضيافة' },
    { id: 'buffet_main', label: 'بوفيه الـ 10 متر الفضي' },
    { id: 'appetizers', label: 'صحون الحلا والمعجنات' },
    { id: 'desserts', label: 'التورتة الـ 3 دور' },
    { id: 'beverages', label: 'العصائر والقهوة' },
  ];

  const filteredItems = selectedCat === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCat);

  return (
    <section id="menu" className="py-20 relative bg-[var(--color-navy-950)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/40 mb-3">
            <ChefHat className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> بوفيه مفتوح فضي 10 متر وضيافة فاخرة
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tajawal gold-text mb-4">
            قائمة البوفيه والضيافة المعتمدة
          </h2>
          <p className="text-[var(--color-navy-100)] text-sm sm:text-base font-cairo">
            جدة - الحرازات | بوفيه مفتوح فضي 10 متر، تورتة 3 دور، 40 صحن حلا و40 صحن معجنات مجاناً.
          </p>
        </div>

        {/* Menu Banner Card */}
        <div className="dark-overlay-card rounded-3xl p-6 md:p-10 border border-[var(--color-champagne-500)]/40 mb-12 relative overflow-hidden bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-900)] to-[var(--color-navy-900)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[var(--color-champagne-500)] bg-[var(--color-champagne-500)]/15 px-3 py-1 rounded-full border border-[var(--color-champagne-500)]/30">
                ضيافة شاملة ومكتملة
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-tajawal text-white">
                بوفيه طازج وخدمة تقديم فندقية راقية
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
                تعتمد القاعة أعلى معايير الجودة بالاتفاق المسبق والمكتوب، مع تقديم 30 لتر عصائر طازجة، طاقم المباشرات للزفاف والقهوجي للرجال.
              </p>
            </div>
            <div className="lg:col-span-5 relative h-56 rounded-2xl overflow-hidden border border-[var(--color-champagne-500)]/30">
              <img
                loading="lazy"
                decoding="async"
                src="/04_Dining_Buffet/food_02.jpg"
                alt="بوفيه قاعة الباخرة"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'gold-gradient text-[var(--color-navy-950)] shadow-md scale-105'
                  : 'dark-overlay-card text-white hover:text-[var(--color-champagne-300)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl transition-all border ${
                item.highlighted
                  ? 'dark-overlay-card border-[var(--color-champagne-500)] bg-[var(--color-navy-900)]/80'
                  : 'dark-overlay-card border-[var(--color-champagne-500)]/20 bg-[var(--color-navy-900)]/60'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h4 className="text-lg font-bold text-white font-tajawal">{item.nameAr}</h4>
                </div>
                {item.highlighted && (
                  <span className="bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] text-[10px] font-black px-2.5 py-0.5 rounded-full shrink-0">
                    مشمول بالكامل
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--color-navy-100)] leading-relaxed">{item.descriptionAr}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
