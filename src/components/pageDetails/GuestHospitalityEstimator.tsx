import React, { useState } from 'react';
import { Users, Coffee, Sparkles, Utensils, CheckCircle2 } from 'lucide-react';

export const GuestHospitalityEstimator: React.FC = () => {
  const [womenCount, setWomenCount] = useState<number>(100);
  const [menCount, setMenCount] = useState<number>(100);

  // Calculations
  const juiceLiters = Math.ceil((womenCount + menCount) * 0.3); // 30L per 100 guests
  const sweetsPlates = Math.ceil((womenCount / 100) * 40); // 40 plates per 100 women
  const savoriesPlates = Math.ceil((womenCount / 100) * 40);
  const waitressesCount = Math.max(10, Math.ceil((womenCount / 100) * 10));
  const waitersCount = Math.max(10, Math.ceil((menCount / 100) * 10));
  const coffeePounds = ((womenCount + menCount) * 0.02).toFixed(1);

  return (
    <div className="py-10 bg-[var(--color-navy-950)] rounded-3xl border border-[var(--color-champagne-500)]/30 p-6 sm:p-8 my-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] text-xs font-bold border border-[var(--color-champagne-500)]/40 inline-flex items-center gap-1.5 mb-2">
          <Users className="w-4 h-4" /> حاسبة الكميات التفاعلية للضيافة
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-white">
          احسب كميات العصائر، الضيافة وطاقم الخدمة حسب عدد ضيوفكم
        </h3>
        <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1">
          حدد العدد المتوقع للحضور في صالة النساء وقسم الرجال لحساب التقدير المثالي لضمان خدمة وسرفيس فندقي بدون نقص.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Women Slider */}
        <div className="bg-[var(--color-navy-900)] p-5 rounded-2xl border border-[var(--color-champagne-500)]/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold font-tajawal">
            <span className="text-white">عدد المعازيم في صالة النساء:</span>
            <span className="text-[var(--color-champagne-300)] text-sm">{womenCount} سيدة</span>
          </div>
          <input
            type="range"
            min={50}
            max={300}
            step={10}
            value={womenCount}
            onChange={(e) => setWomenCount(Number(e.target.value))}
            className="w-full accent-[var(--color-champagne-500)] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--color-navy-100)]">
            <span>50 سيدة</span>
            <span>150 سيدة</span>
            <span>300 سيدة</span>
          </div>
        </div>

        {/* Men Slider */}
        <div className="bg-[var(--color-navy-900)] p-5 rounded-2xl border border-[var(--color-champagne-500)]/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold font-tajawal">
            <span className="text-white">عدد المعازيم في قسم الرجال:</span>
            <span className="text-[var(--color-champagne-300)] text-sm">{menCount} رجل</span>
          </div>
          <input
            type="range"
            min={50}
            max={300}
            step={10}
            value={menCount}
            onChange={(e) => setMenCount(Number(e.target.value))}
            className="w-full accent-[var(--color-champagne-500)] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--color-navy-100)]">
            <span>50 رجل</span>
            <span>150 رجل</span>
            <span>300 رجل</span>
          </div>
        </div>
      </div>

      {/* Calculated Output Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center space-y-1">
          <span className="text-xs text-[var(--color-navy-100)] block">كمية العصائر الفريش</span>
          <span className="text-xl font-black font-tajawal text-[var(--color-champagne-300)]">{juiceLiters} لتر</span>
          <span className="text-[10px] text-[var(--color-success)] block">مانجو - جوافة - كوكتيل</span>
        </div>

        <div className="bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center space-y-1">
          <span className="text-xs text-[var(--color-navy-100)] block">صحون ضيافة الطاولات</span>
          <span className="text-xl font-black font-tajawal text-[var(--color-champagne-300)]">{sweetsPlates} حلا + {savoriesPlates} معجنات</span>
          <span className="text-[10px] text-[var(--color-success)] block">موزعة على الطاولات</span>
        </div>

        <div className="bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center space-y-1">
          <span className="text-xs text-[var(--color-navy-100)] block">طاقم المباشرات والمباشرين</span>
          <span className="text-xl font-black font-tajawal text-[var(--color-champagne-300)]">{waitressesCount} نساء + {waitersCount} رجال</span>
          <span className="text-[10px] text-[var(--color-success)] block">شامل المشرفة والقهوجي</span>
        </div>

        <div className="bg-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center space-y-1">
          <span className="text-xs text-[var(--color-navy-100)] block">تقدير القهوة السعودية</span>
          <span className="text-xl font-black font-tajawal text-[var(--color-champagne-300)]">{coffeePounds} كيلو</span>
          <span className="text-[10px] text-[var(--color-success)] block">محمصة بالهيل والزعفران</span>
        </div>
      </div>
    </div>
  );
};
