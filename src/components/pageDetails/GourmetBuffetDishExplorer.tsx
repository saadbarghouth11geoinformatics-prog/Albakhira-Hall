import React, { useState } from 'react';
import { Utensils, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface DishItem {
  id: string;
  name: string;
  category: 'main' | 'starters' | 'sweets' | 'drinks';
  categoryLabel: string;
  cookingStyle: string;
  description: string;
  tags: string[];
}

const BUFFET_DISHES: DishItem[] = [
  {
    id: 'd1',
    name: 'مشويات مشكلة طازجة (كباب - أوصال - كفتة)',
    category: 'main',
    categoryLabel: 'الأطباق الرئيسية والمشويات',
    cookingStyle: 'مشوية على الفحم مباشرة بقسم المطبخ المعتمد',
    description: 'لحوم طازجة متبلة بخلطة القاعة الملكية الخاصة تقدم على سخانات الاستيل الفضية الدافئة.',
    tags: ['لحوم طازجة يومياً', 'سخانات تحفظ الحرارة']
  },
  {
    id: 'd2',
    name: 'أرز بشاور بالزعفران والمكسرات الذهبية',
    category: 'main',
    categoryLabel: 'الأطباق الرئيسية والمشويات',
    cookingStyle: 'طهي شرقي فاخر بماء الورد والزعفران الخالص',
    description: 'أرز بشاور هندي درجة أولى مزين بالكاجو والصنوبر والزبيب المقلي بالسمن البلدي.',
    tags: ['أرز بشاور ممتاز', 'سمن بلدي وزعفران']
  },
  {
    id: 'd3',
    name: 'تشكيلة السلطات والمقبلات الشامية (تبولة - حمص - متبل)',
    category: 'starters',
    categoryLabel: 'المقبلات والسلطات',
    cookingStyle: 'تحضير طازج قبل الحفل بساعتين فقط',
    description: 'مقبلات باردة مصنوعة من زيت الزيتون الخالص والرمان والليمون الطبيعي بدون أي حافظات.',
    tags: ['صحي وطازج', 'زيت زيتون بكر']
  },
  {
    id: 'd4',
    name: 'سمبوسك بالجبنة واللحمة الكبة الشامية',
    category: 'starters',
    categoryLabel: 'المقبلات والسلطات',
    cookingStyle: 'قلي خفيف مقرمش وقلايات حديثة',
    description: '40 صحن معجنات طازجة وموالح موشحة بالسمسم وحبة البركة تقدم على طاولات النساء.',
    tags: ['40 صحن مجانًا', 'موالح طازجة']
  },
  {
    id: 'd5',
    name: 'تورتة العروسين الملكية 3 أدوار مغطاة بعجينة السكر',
    category: 'sweets',
    categoryLabel: 'الحلويات والتورتة',
    cookingStyle: 'إعداد مخابز فندقية معتمدة بجدة',
    description: 'تورتة زفاف 3 طبقات بنكهات اختيارية (فانيلا - شوكولاتة - فستق) مجانًا بالعرض الشامل.',
    tags: ['تورتة من 3 أدوار مجانًا', 'تصميم ذهبي ملكي']
  },
  {
    id: 'd6',
    name: 'شلال وعصائر طازجة 30 لتر (مانجو - جوافة - كوكتيل)',
    category: 'drinks',
    categoryLabel: 'بار العصائر والمشروبات',
    cookingStyle: 'عصر طبيعي طازج بدون ألوان صناعية',
    description: 'بار عصائر طازجة طازجة موشحة بشرائح الفاكهة مع القهوة العربية والقهوجي المباشر.',
    tags: ['30L عصائر طازجة', 'ضيافة مباشرة']
  }
];

export const GourmetBuffetDishExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? BUFFET_DISHES
    : BUFFET_DISHES.filter((dish) => dish.category === activeCategory);

  return (
    <div className="py-10 bg-[var(--color-navy-900)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <Utensils className="w-4 h-4" /> مستكشف أصناف البوفيه الفضي بطول 10 أمتار
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white">
          استكشف المكونات وطريقة الطهي لأطباق البوفيه المفتوح
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          جميع الأطباق يتم إعدادها تحت إشراف طهاة فندقيين بمكونات طازجة 100% وبدون مواد حافظة.
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
        {[
          { id: 'all', label: 'جميع الأصناف' },
          { id: 'main', label: 'الأطباق الرئيسية والمشويات' },
          { id: 'starters', label: 'المقبلات والسلطات' },
          { id: 'sweets', label: 'الحلويات والتورتة' },
          { id: 'drinks', label: 'بار العصائر والضيافة' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'gold-gradient text-[var(--color-navy-950)] shadow-lg scale-105 font-black'
                : 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((dish) => (
          <div
            key={dish.id}
            className="bg-[var(--color-navy-950)] p-5 rounded-2xl border border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)] transition-all space-y-3 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold font-tajawal text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--color-champagne-500)]" />
                <span>{dish.name}</span>
              </h4>
              <span className="text-[10px] bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] px-2.5 py-1 rounded-full border border-[var(--color-champagne-500)]/30 font-bold">
                {dish.categoryLabel}
              </span>
            </div>

            <p className="text-xs text-[var(--color-navy-100)] font-cairo leading-relaxed">{dish.description}</p>

            <div className="bg-[var(--color-navy-900)] p-3 rounded-xl border border-[var(--color-champagne-500)]/15 text-[11px] text-[var(--color-champagne-500)] font-cairo">
              <strong>أسلوب الطهي:</strong> {dish.cookingStyle}
            </div>

            <div className="flex items-center gap-2 flex-wrap pt-1">
              {dish.tags.map((tag, tIdx) => (
                <span key={tIdx} className="text-[10px] bg-[var(--color-success)]/10 text-[var(--color-success)] px-2.5 py-1 rounded-md border border-[var(--color-success)]/20 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
