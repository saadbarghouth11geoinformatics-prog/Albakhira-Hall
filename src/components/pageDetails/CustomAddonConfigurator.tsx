import React, { useState } from 'react';
import { Sliders, Plus, Check, Sparkles } from 'lucide-react';

interface AddonOption {
  id: string;
  name: string;
  desc: string;
}

const ADDON_OPTIONS: AddonOption[] = [
  { id: 'fountain', name: 'نافورة الشوكولاتة البلجيكية مع الفواكه والحلويات', desc: 'ركن تفاعلي بالشوكولاتة البلجيكية الذائبة وأعواد الفاكهة طوال الحفل' },
  { id: 'cake4', name: 'ترقية تورتة الزفاف إلى 4 أدوار VIP ملكية', desc: 'إضافة دور رابع لتورتة الزفاف مع تزيين إضافي بأوراق الذهب القابلة للأكل' },
  { id: 'coffee_bar', name: 'بار القهوة المختصة والاسبريسو والموهيتو', desc: 'باريستا مخصص لتقديم القهوة المختصة والمشروبات الباردة والدافئة' },
  { id: 'photographer', name: 'توفير مصورة ومونتاج فيديو سينمائي مجاني', desc: 'تنسيق مع مصورة احترافية معتمدة مع ألبوم صور فاخر ومونتاج فيديو الزفة' }
];

export const CustomAddonConfigurator: React.FC = () => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-8 bg-[var(--color-navy-950)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <Sliders className="w-4 h-4" /> مخصص الإضافات والخدمات الملكية
        </span>
        <h3 className="text-xl sm:text-2xl font-black font-tajawal text-white">
          أضف خدمات اختيارية مخصصة لحفلتك
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          حدد أي ميزة إضافية ترغب بإدراجها في عقد حفلكم لتجهيزها مسبقاً.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {ADDON_OPTIONS.map((addon) => {
          const isChecked = selectedAddons.includes(addon.id);
          return (
            <div
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                isChecked
                  ? 'bg-[var(--color-navy-900)] border-[var(--color-champagne-500)] shadow-lg'
                  : 'bg-[var(--color-navy-900)]/60 border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)]/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${isChecked ? 'gold-gradient text-[var(--color-navy-950)]' : 'bg-[var(--color-navy-950)] border border-white/20'}`}>
                {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold font-tajawal">
                  <span className="text-white">{addon.name}</span>
                  <span className="text-[var(--color-champagne-300)]">خدمة مخصصة</span>
                </div>
                <p className="text-[11px] text-[var(--color-navy-100)] font-cairo leading-relaxed">{addon.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center text-xs font-cairo text-[var(--color-navy-100)]">
        عدد الخدمات الإضافية المحددة: <span className="font-bold font-tajawal text-[var(--color-champagne-300)] text-sm">{selectedAddons.length} خدمات</span>
      </div>
    </div>
  );
};
