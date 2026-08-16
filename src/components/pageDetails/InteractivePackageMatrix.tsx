import React, { useState } from 'react';
import { ArrowRightLeft, CheckCircle2, X, Sparkles, Award, Share2 } from 'lucide-react';
import { SharePackageModal, PackageShareData } from '../SharePackageModal';
import { PACKAGES } from '../../data/hallData';

export const InteractivePackageMatrix: React.FC = () => {
  const [pkg1, setPkg1] = useState<string>('womens-silver-offer');
  const [pkg2, setPkg2] = useState<string>('midweek-deal');
  const [sharePackage, setSharePackage] = useState<PackageShareData | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const packagesData: Record<string, {
    id: string;
    name: string;
    badge: string;
    hallType: string;
    buffet: string;
    hospitality: string;
    staff: string;
    effects: string;
  }> = {
    'womens-silver-offer': {
      id: 'womens-silver-offer',
      name: 'عرض صالة النساء الفضية',
      badge: 'العرض النسائي المعتمد',
      hallType: 'صالة النساء فقط',
      buffet: 'بوفيه مفتوح 10 متر فضي + تورتة 3 دور',
      hospitality: '40 صحن حلا + 40 صحن معجنات',
      staff: '10 مباشرات + المشرفة',
      effects: 'دي جي + زفة العروسة والليزر والبخار'
    },
    'mens-section-offer': {
      id: 'mens-section-offer',
      name: 'عرض قسم الرجال والحوش',
      badge: 'عرض الرجال والمناسبات',
      hallType: 'قسم الرجال والحوش الخارجي',
      buffet: 'قهوة وشاي وتجهيز الطبخ بالاتفاق',
      hospitality: 'قهوة سعودية وشاي تخادر طوال الحفل',
      staff: '10 مباشرين + القهوجي وحارس البوابة',
      effects: '100 فرش جلسات حوش شعبية'
    },
    'midweek-deal': {
      id: 'midweek-deal',
      name: 'العرض الشامل الملكي (نساء + رجال)',
      badge: 'الباقة الشاملة الكبرى',
      hallType: 'الصالتين (نساء + رجال) والحوش',
      buffet: 'بوفيه 10 متر + تورتة 3 دور + ضيافة الرجال',
      hospitality: '80 صحن ضيافة طاولات + 30L عصائر فريش',
      staff: 'طاقم نسائي ورجالي مكتمل (20 فرد)',
      effects: 'شامل كافة المؤثرات والجلسات مجاناً'
    }
  };

  const p1 = packagesData[pkg1];
  const p2 = packagesData[pkg2];

  const handleShare = (p: typeof p1) => {
    setSharePackage({
      id: p.id,
      name: p.name,
      description: `${p.hallType} - ${p.buffet} - ${p.hospitality}`
    });
    setIsShareOpen(true);
  };

  return (
    <div className="py-10 bg-[var(--color-warm-white)] rounded-3xl border border-[var(--color-border)] p-6 sm:p-8 my-8 shadow-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] text-xs font-bold border border-[var(--color-champagne-500)]/30 inline-flex items-center gap-1.5 mb-2">
          <ArrowRightLeft className="w-4 h-4 text-[var(--color-champagne-600)]" /> المقارنة المباشرة للباقات
        </span>
        <h3 className="text-xl sm:text-3xl font-black font-tajawal text-[var(--color-navy-950)]">
          قارن بين أي باقتين لتحديد الخيار الأنسب لمناسبتك
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] font-cairo mt-1">
          حدد باقتين من القائمة أدناه للاستعراض والمقارنة بنداً ببند مع توضيح الفروقات في الخدمات والتجهيزات.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-[var(--color-ivory)] p-4 rounded-2xl border border-[var(--color-border)]">
          <label className="block text-xs font-bold text-[var(--color-navy-950)] mb-2 font-tajawal">الباقة الأولى:</label>
          <select
            value={pkg1}
            onChange={(e) => setPkg1(e.target.value)}
            className="w-full bg-[var(--color-warm-white)] border border-[var(--color-border)] rounded-xl p-3 text-xs text-[var(--color-navy-950)] font-bold focus:outline-none focus:border-[var(--color-champagne-500)]"
          >
            <option value="womens-silver-offer">عرض صالة النساء الفضية</option>
            <option value="mens-section-offer">عرض قسم الرجال والحوش</option>
            <option value="midweek-deal">العرض الشامل الملكي (نساء + رجال)</option>
          </select>
        </div>

        <div className="bg-[var(--color-ivory)] p-4 rounded-2xl border border-[var(--color-border)]">
          <label className="block text-xs font-bold text-[var(--color-navy-950)] mb-2 font-tajawal">الباقة الثانية:</label>
          <select
            value={pkg2}
            onChange={(e) => setPkg2(e.target.value)}
            className="w-full bg-[var(--color-warm-white)] border border-[var(--color-border)] rounded-xl p-3 text-xs text-[var(--color-navy-950)] font-bold focus:outline-none focus:border-[var(--color-champagne-500)]"
          >
            <option value="midweek-deal">العرض الشامل الملكي (نساء + رجال)</option>
            <option value="womens-silver-offer">عرض صالة النساء الفضية</option>
            <option value="mens-section-offer">عرض قسم الرجال والحوش</option>
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Package 1 */}
        <div className="bg-[var(--color-ivory)] p-6 rounded-2xl border-2 border-[var(--color-champagne-500)]/40 space-y-4 shadow-md">
          <div className="text-center border-b border-[var(--color-border)] pb-3">
            <span className="text-xs text-[var(--color-champagne-700)] font-bold">خيارك الأول</span>
            <h4 className="text-lg font-black font-tajawal text-[var(--color-navy-950)] mt-0.5">{p1.name}</h4>
            <div className="text-sm font-bold font-tajawal text-[var(--color-champagne-700)] mt-1">{p1.badge}</div>
          </div>
          <div className="space-y-2 text-xs text-[var(--color-text-secondary)] font-cairo">
            <p><strong className="text-[var(--color-navy-950)]">نطاق الصالة:</strong> {p1.hallType}</p>
            <p><strong className="text-[var(--color-navy-950)]">البوفيه المفتوح:</strong> {p1.buffet}</p>
            <p><strong className="text-[var(--color-navy-950)]">الضيافة والطاولات:</strong> {p1.hospitality}</p>
            <p><strong className="text-[var(--color-navy-950)]">طاقم الخدمة:</strong> {p1.staff}</p>
            <p><strong className="text-[var(--color-navy-950)]">المؤثرات والجلسات:</strong> {p1.effects}</p>
          </div>
          <button
            onClick={() => handleShare(p1)}
            className="w-full bg-[var(--color-warm-white)] hover:bg-[var(--color-navy-950)] text-[var(--color-navy-950)] hover:text-[var(--color-champagne-300)] text-xs font-bold py-2.5 rounded-xl border border-[var(--color-border)] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-3 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة هذه الباقة</span>
          </button>
        </div>

        {/* Package 2 */}
        <div className="bg-[var(--color-ivory)] p-6 rounded-2xl border-2 border-[var(--color-champagne-500)]/40 space-y-4 shadow-md">
          <div className="text-center border-b border-[var(--color-border)] pb-3">
            <span className="text-xs text-[var(--color-champagne-700)] font-bold">خيارك الثاني</span>
            <h4 className="text-lg font-black font-tajawal text-[var(--color-navy-950)] mt-0.5">{p2.name}</h4>
            <div className="text-sm font-bold font-tajawal text-[var(--color-champagne-700)] mt-1">{p2.badge}</div>
          </div>
          <div className="space-y-2 text-xs text-[var(--color-text-secondary)] font-cairo">
            <p><strong className="text-[var(--color-navy-950)]">نطاق الصالة:</strong> {p2.hallType}</p>
            <p><strong className="text-[var(--color-navy-950)]">البوفيه المفتوح:</strong> {p2.buffet}</p>
            <p><strong className="text-[var(--color-navy-950)]">الضيافة والطاولات:</strong> {p2.hospitality}</p>
            <p><strong className="text-[var(--color-navy-950)]">طاقم الخدمة:</strong> {p2.staff}</p>
            <p><strong className="text-[var(--color-navy-950)]">المؤثرات والجلسات:</strong> {p2.effects}</p>
          </div>
          <button
            onClick={() => handleShare(p2)}
            className="w-full bg-[var(--color-warm-white)] hover:bg-[var(--color-navy-950)] text-[var(--color-navy-950)] hover:text-[var(--color-champagne-300)] text-xs font-bold py-2.5 rounded-xl border border-[var(--color-border)] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-3 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة هذه الباقة</span>
          </button>
        </div>
      </div>

      <SharePackageModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        packageData={sharePackage}
      />
    </div>
  );
};
