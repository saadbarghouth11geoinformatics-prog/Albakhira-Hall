import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { MenuSection } from '../components/MenuSection';
import { PageTransition } from '../components/PageTransition';
import { PageVideoHeader } from '../components/PageVideoHeader';
import { SectionDivider } from '../components/SectionDivider';
import { GourmetBuffetDishExplorer } from '../components/pageDetails/GourmetBuffetDishExplorer';
import { GuestHospitalityEstimator } from '../components/pageDetails/GuestHospitalityEstimator';
import { Utensils, CheckCircle2, ShieldCheck, Coffee, Sparkles, Heart, Award, ChevronRight, Check } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const [customDishNotes, setCustomDishNotes] = useState('');
  const [submittedRequest, setSubmittedRequest] = useState(false);
  const [selectedCakeFlavor, setSelectedCakeFlavor] = useState<'vanilla' | 'chocolate' | 'pistachio' | 'redvelvet'>('vanilla');

  const cakeFlavors = [
    {
      id: 'vanilla',
      name: 'فانيلا ملكية مع التوت الطبيعي',
      desc: 'طبقات كيك الفانيلا الهشة المحشوة بفرولة طازجة وكريمة الشانتيه الفاخرة.',
    },
    {
      id: 'chocolate',
      name: 'شوكولاتة بلجيكية بالبندق',
      desc: 'غناش الشوكولاتة الداكنة 70% مع فتات البندق المحمص وطبقات الفادج اللذيذة.',
    },
    {
      id: 'pistachio',
      name: 'فستق ذهبي مع الرمان',
      desc: 'كيك الفستق الحلبي الطبيعي محشو بحبيبات الرمان والورد المحمدي المشرق.',
    },
    {
      id: 'redvelvet',
      name: 'ريد فيلفيت الملكية',
      desc: 'الكيك المخملي الأحمر الشهير بجبنة الكريمة الخفيفة ولمسات الذهب القابل للأكل.',
    },
  ];

  const handleCustomMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDishNotes.trim()) return;
    setSubmittedRequest(true);
  };

  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="قائمة البوفيه والضيافة المعتمدة | قاعة الباخرة بجدة"
        description="استعرض أصناف بوفيه الـ 10 متر الفضي، تورتة الـ 3 دور، 40 صحن حلا و40 صحن معجنات مجاناً، وعصائر الضيافة بقاعة الباخرة للاحتفالات بجدة."
        pageType="menu"
      />

      {/* Top Hero Banner with Autoplay Video Background */}
      <PageVideoHeader
        driveId="1qZrP-Ezk4jr2WYuXq-JtsdXSanhKzCbL"
        driveUrl="https://drive.google.com/file/d/1qZrP-Ezk4jr2WYuXq-JtsdXSanhKzCbL/view?usp=drive_link"
        localVideoSrc="/Videos/video_13.mp4"
        localPoster="/Videos/posters/table-decor.jpg"
        badge="بوفيه 10 أمتار وتورتة الزفاف"
        subtitle="جدة - الحرازات - بعد محطة المدينة بـ 500 متر"
        title="بوفيه مفتوح فضي 10 متر وضيافة فاخرة"
        description="استعرض أصناف البوفيه الفضي بطول 10 أمتار، وتورتة الزفاف من 3 أدوار، و40 صحن حلا و40 صحن معجنات مجاناً، والعصائر وخدمة القهوة العربية."
      />

      {/* Main Menu Component */}
      <SectionDivider variant="crown" label="تفاصيل قائمة البوفيه الفضي الـ 10 متر" />
      <MenuSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GourmetBuffetDishExplorer />
        <GuestHospitalityEstimator />
      </div>

      <SectionDivider variant="sparkle" label="مخصص تورتة العروسين الملكية (3 أدوار مجاناً)" />

      {/* Interactive Cake Customizer */}
      <section className="surface-light py-14 bg-[var(--color-soft-beige)] border-y border-[var(--color-champagne-500)]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] text-xs font-bold border border-[var(--color-champagne-500)]/30 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-[var(--color-champagne-600)]" /> خيارات نكهات تورتة الزفاف الملكية
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-tajawal text-[var(--color-navy-950)] mb-2">
              اختر نكهة وتصميم تورتة زفافك المشمولة مجاناً
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              تقدم قاعة الباخرة تورتة زفاف 3 أدوار مغطاة بعجينة السكر الفاخرة والتزيين الذهبي:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {cakeFlavors.map((cake) => {
              const isSelected = selectedCakeFlavor === cake.id;
              return (
                <div
                  key={cake.id}
                  onClick={() => setSelectedCakeFlavor(cake.id as any)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[var(--color-warm-white)] border-[var(--color-champagne-500)] shadow-lg scale-102'
                      : 'bg-[var(--color-warm-white)] border-[var(--color-border)] hover:border-[var(--color-champagne-500)]/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${isSelected ? 'gold-gradient text-[var(--color-navy-950)]' : 'bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)]'}`}>
                    {isSelected ? <Check className="w-5 h-5 stroke-[3]" /> : <Heart className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-tajawal text-[var(--color-navy-950)] mb-1">
                      {cake.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {cake.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-[var(--color-warm-white)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/40 text-center text-xs text-[var(--color-champagne-700)] font-medium shadow-sm">
            تم اختيار: <span className="font-bold font-tajawal text-[var(--color-navy-950)]">{cakeFlavors.find(c => c.id === selectedCakeFlavor)?.name}</span> - سيتم اعتماد الخيار تلقائياً في العقد.
          </div>
        </div>
      </section>

      <SectionDivider variant="diamond" label="استفسارات وطلبات الضيافة الخاصة" />

      {/* Custom Menu Request Section */}
      <section className="surface-light py-16 bg-[var(--color-ivory)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-warm-white)] p-8 rounded-3xl border border-[var(--color-champagne-500)]/30 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] flex items-center justify-center mx-auto mb-3">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black font-tajawal text-[var(--color-navy-950)] mb-2">
                هل لديك استفسار عن ترتيبات الضيافة أو إضافات خاصة؟
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                نستطيع التنسيق المباشر مع فريق المبيعات والمطابخ المعتمدة لتلبية كافة طلباتكم (طبخ الذبائح، البوفيهات الخاصة، أو زيادة المباشرين).
              </p>
            </div>

            {submittedRequest ? (
              <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 p-6 rounded-2xl text-center text-[var(--color-navy-950)]">
                <CheckCircle2 className="w-8 h-8 text-[var(--color-success)] mx-auto mb-2" />
                <h4 className="font-bold text-base text-[var(--color-navy-950)] font-tajawal">تم إرسال استفساركم بنجاح!</h4>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                  سيتواصل معكم فريق المبيعات لتنسيق كافة ترتيبات البوفيه والضيافة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCustomMenuSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-navy-950)] mb-2 text-right">
                    اكتب تفاصيل أو ملاحظاتكم الخاصة بالبوفيه والضيافة:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={customDishNotes}
                    onChange={(e) => setCustomDishNotes(e.target.value)}
                    placeholder="اكتب ملاحظاتكم هنا..."
                    className="w-full bg-[var(--color-ivory)] border border-[var(--color-border)] rounded-xl p-4 text-xs text-[var(--color-navy-950)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-champagne-500)] text-right"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full gold-gradient text-[var(--color-navy-950)] font-bold py-3.5 rounded-xl shadow-lg hover:scale-102 transition-transform cursor-pointer text-xs"
                >
                  إرسال ملاحظات البوفيه إلى إدارة القاعة
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
