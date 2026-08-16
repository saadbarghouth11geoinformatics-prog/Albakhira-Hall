import React, { useState } from 'react';
import { Calculator, Check, Send, Download, Users, FileText, Sparkles, Zap, Share2 } from 'lucide-react';
import { PACKAGES, CUSTOM_ADDONS, HALL_SPECS } from '../data/hallData';
import { SharePackageModal, PackageShareData } from './SharePackageModal';

interface OfferCalculatorProps {
  initialPackageId?: string;
  onOpenBookingWithData?: (data: any) => void;
}

export const OfferCalculator: React.FC<OfferCalculatorProps> = ({
  initialPackageId = 'albakhera-grand-offer',
  onOpenBookingWithData,
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(initialPackageId);
  const [guestCount, setGuestCount] = useState<number>(200);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['kosha-decor-hall', 'security-phone-inspector']);
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];

  const baseCapacity = selectedPkg.guestCapacity;
  const extraGuests = Math.max(0, guestCount - baseCapacity);

  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
      setSelectedAddonIds(selectedAddonIds.filter((item) => item !== id));
    } else {
      setSelectedAddonIds([...selectedAddonIds, id]);
    }
  };

  const handleSendWhatsAppQuote = () => {
    const selectedAddonNames = selectedAddonIds
      .map((id) => CUSTOM_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(' + ');

    const text = `مرحباً قاعة الباخرة للاحتفالات%0Aأود الاستفسار وحجز الباقة التالية والتأكد من التوفر:%0A- العرض المختار: ${selectedPkg.name}%0A- عدد الضيوف: ${guestCount} ضيف%0A- الخدمات والإضافات المختارة: ${selectedAddonNames || 'حسب العرض الأساسي المعتمد'}%0Aيرجى تأكيد التوفر والتواصل معي.`;

    window.open(`https://wa.me/${HALL_SPECS.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="calculator" className="py-20 relative bg-[var(--color-ivory)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/40 mb-3">
            <Calculator className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> المنسق التفاعلي لعروض قاعة الباخرة
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tajawal gold-text mb-4">
            تنسيق وحساب مواصفات باقة الحفل
          </h2>
          <p className="text-[var(--color-navy-100)] text-sm sm:text-base font-cairo">
            اختر العرض المعتمد، حدد عدد الضيوف، وأضف خدمات الاتفاق للحصول على كشف المواصفات المعتمد بجدة (الحرازات).
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Base Package Selection */}
            <div className="glass-card p-6 rounded-3xl border border-[var(--color-champagne-500)]/30">
              <label className="text-base font-bold font-tajawal text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] text-xs font-black flex items-center justify-center">1</span>
                اختر العرض الرئيسي المطلوب:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACKAGES.map((pkg) => {
                  const isSelected = pkg.id === selectedPkgId;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-4 rounded-2xl text-right transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[var(--color-navy-900)] border-[var(--color-champagne-500)] shadow-lg ring-1 ring-[var(--color-champagne-500)]'
                          : 'bg-[var(--color-navy-950)]/60 border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)]/50'
                      }`}
                    >
                      <div className="text-xs text-[var(--color-champagne-300)] font-bold mb-1">{pkg.nameEn}</div>
                      <div className="font-bold text-sm text-white font-tajawal mb-2">{pkg.name}</div>
                      <div className="text-xs text-[var(--color-champagne-400)] font-bold">{pkg.badge || 'العرض المعتمد'}</div>
                      <div className="text-[10px] text-[var(--color-text-muted)] mt-1">{pkg.guestCapacity} ضيف أساسي</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Guest Count Slider */}
            <div className="glass-card p-6 rounded-3xl border border-[var(--color-champagne-500)]/30">
              <div className="flex items-center justify-between mb-4">
                <label className="text-base font-bold font-tajawal text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] text-xs font-black flex items-center justify-center">2</span>
                  حدد عدد الضيوف والحضور:
                </label>
                <div className="flex items-center gap-1 bg-[var(--color-navy-900)] px-4 py-1.5 rounded-xl border border-[var(--color-champagne-500)]/40">
                  <Users className="w-4 h-4 text-[var(--color-champagne-500)]" />
                  <span className="text-lg font-black gold-text font-tajawal">{guestCount}</span>
                  <span className="text-xs text-[var(--color-navy-100)]">ضيف</span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-[var(--color-navy-950)] rounded-lg appearance-none cursor-pointer accent-[var(--color-champagne-500)]"
              />

              <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-2 font-cairo">
                <span>50 ضيف</span>
                <span>200 ضيف (الأساسي)</span>
                <span>500 ضيف (أقصى طاقة)</span>
              </div>

              {extraGuests > 0 && (
                <div className="mt-3 text-xs text-[var(--color-champagne-300)] bg-[var(--color-champagne-500)]/10 p-2.5 rounded-xl border border-[var(--color-champagne-500)]/20 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[var(--color-champagne-500)] shrink-0" />
                  <span>زيادة {extraGuests} ضيف عن سعة العرض الأساسية ({baseCapacity} ضيف) يتم تجهيز مقاعد وخدمات إضافية لهم</span>
                </div>
              )}
            </div>

            {/* Step 3: Custom Add-ons */}
            <div className="glass-card p-6 rounded-3xl border border-[var(--color-champagne-500)]/30">
              <label className="text-base font-bold font-tajawal text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] text-xs font-black flex items-center justify-center">3</span>
                خدمات وسياسات الاتفاق الإضافية:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CUSTOM_ADDONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'bg-[var(--color-navy-900)] border-[var(--color-champagne-500)]'
                          : 'bg-[var(--color-navy-950)]/50 border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)]/40'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isChecked
                              ? 'bg-[var(--color-champagne-500)] border-[var(--color-champagne-500)] text-[var(--color-navy-950)]'
                              : 'border-[var(--color-champagne-500)]/40 bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white font-tajawal">{addon.name}</div>
                          <div className="text-[10px] text-[var(--color-text-muted)]">{addon.description}</div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[var(--color-champagne-400)] shrink-0">
                        {addon.unit}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Receipt Box */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-card p-6 md:p-8 rounded-3xl border-2 border-[var(--color-champagne-500)]/50 shadow-2xl bg-gradient-to-b from-[var(--color-navy-900)] to-[var(--color-navy-950)]">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-champagne-500)]/30 mb-6">
                <div>
                  <span className="text-xs text-[var(--color-champagne-300)] font-bold block">ملخص مواصفات الحفل المعتمد</span>
                  <h3 className="text-xl font-black font-tajawal text-white">قاعة الباخرة للاحتفالات</h3>
                </div>
                <Sparkles className="w-8 h-8 text-[var(--color-champagne-500)]" />
              </div>

              {/* Itemized Lines */}
              <div className="space-y-3 text-xs sm:text-sm mb-6">
                <div className="flex justify-between items-center text-[var(--color-navy-100)] pb-2 border-b border-[var(--color-champagne-500)]/10">
                  <span>{selectedPkg.name}:</span>
                  <span className="font-bold text-white">{baseCapacity} ضيف أساسي</span>
                </div>

                {extraGuests > 0 && (
                  <div className="flex justify-between items-center text-[var(--color-navy-100)] pb-2 border-b border-[var(--color-champagne-500)]/10">
                    <span>تجهيزات ضيوف إضافيين:</span>
                    <span className="font-bold text-[var(--color-champagne-300)]">+{extraGuests} ضيف</span>
                  </div>
                )}

                {selectedAddonIds.length > 0 ? (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-[var(--color-champagne-500)] block">الخدمات والإضافات المختارة:</span>
                    {selectedAddonIds.map((id) => {
                      const addon = CUSTOM_ADDONS.find((a) => a.id === id);
                      if (!addon) return null;
                      return (
                        <div key={id} className="flex justify-between items-center text-xs text-[var(--color-text-muted)] pl-2">
                          <span>• {addon.name}</span>
                          <span className="text-[var(--color-champagne-300)]">مشمول بالطلب</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-[var(--color-text-muted)] italic">شامل كافة الخدمات والتجهيزات المكتوبة في العرض.</div>
                )}
              </div>

              {/* Total Summary Card */}
              <div className="bg-[var(--color-navy-950)] p-5 rounded-2xl border border-[var(--color-champagne-500)]/40 mb-6 text-center">
                <span className="text-xs text-[var(--color-text-muted)] font-bold block mb-1">حالة التجهيز:</span>
                <div className="text-2xl sm:text-3xl font-black gold-text font-tajawal">
                  جاهز للتأكيد والحجز
                </div>
                <span className="text-[10px] text-[var(--color-champagne-500)] mt-1 block">جدة - الحرازات - بعد محطة المدينة بـ 500م</span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleSendWhatsAppQuote}
                  className="w-full gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-bold py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال وتأكيد العرض عبر واتساب</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full glass-card hover:bg-[var(--color-navy-900)] text-[var(--color-champagne-300)] font-bold py-2.5 rounded-xl border border-[var(--color-champagne-500)]/40 flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                    <span>معاينة للطباعة</span>
                  </button>

                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full bg-[var(--color-navy-900)] hover:bg-[var(--color-navy-800)] text-[var(--color-champagne-500)] hover:text-[var(--color-champagne-300)] font-bold py-2.5 rounded-xl border border-[var(--color-champagne-500)]/50 flex items-center justify-center gap-1.5 text-xs cursor-pointer transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                    <span>مشاركة الباقة</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Printed Invoice / Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[var(--color-navy-900)] border-2 border-[var(--color-champagne-500)] rounded-3xl max-w-xl w-full p-6 sm:p-8 text-right shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[var(--color-navy-950)] text-[var(--color-champagne-500)] border border-[var(--color-champagne-500)]/40 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            {/* Printable Quote Content */}
            <div className="border border-[var(--color-champagne-500)]/30 p-6 rounded-2xl bg-[var(--color-navy-950)]/90 mb-6">
              <div className="flex items-center justify-between border-b border-[var(--color-champagne-500)]/30 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <img src="/logo-official.jpg" alt="شعار قاعة الباخرة للاحتفالات" loading="lazy" decoding="async" className="w-10 h-10 rounded-full border border-[var(--color-champagne-500)]" />
                  <div>
                    <h4 className="font-bold gold-text font-tajawal text-base">كشف مواصفات العرض الرسمي - قاعة الباخرة</h4>
                    <span className="text-[10px] text-[var(--color-text-muted)]">جدة - الحرازات - بعد محطة المدينة بـ 500م</span>
                  </div>
                </div>
                <div className="text-left text-[10px] text-[var(--color-text-muted)]">
                  التاريخ: {new Date().toLocaleDateString('ar-SA')}
                </div>
              </div>

              <div className="space-y-2 text-xs text-[var(--color-navy-100)] mb-4">
                <div className="flex justify-between">
                  <span>العرض المختار:</span>
                  <span className="font-bold text-[var(--color-champagne-300)]">{selectedPkg.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>عدد الضيوف:</span>
                  <span className="font-bold text-[var(--color-champagne-300)]">{guestCount} ضيف</span>
                </div>
                <div className="flex justify-between">
                  <span>نوع البوفيه:</span>
                  <span className="font-bold text-[var(--color-champagne-300)]">{selectedPkg.buffetType}</span>
                </div>
                <div className="flex justify-between">
                  <span>الموقع:</span>
                  <span className="font-bold text-[var(--color-champagne-300)]">{HALL_SPECS.locationAr}</span>
                </div>
              </div>

              <div className="border-t border-[var(--color-champagne-500)]/20 pt-3">
                <span className="text-xs font-bold text-[var(--color-champagne-500)] block mb-2">تفاصيل الخدمات والإضافات:</span>
                {selectedAddonIds.map((id) => {
                  const addon = CUSTOM_ADDONS.find((a) => a.id === id);
                  return (
                    <div key={id} className="flex justify-between text-xs text-[var(--color-navy-100)] py-1 border-b border-white/5">
                      <span>• {addon?.name}</span>
                      <span className="text-[var(--color-champagne-300)]">مشمول بالطلب</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t-2 border-[var(--color-champagne-500)] flex justify-between items-center font-bold text-sm">
                <span>حالة المواصفات:</span>
                <span className="gold-text text-base font-tajawal">معتمد من الإدارة</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 glass-card hover:bg-[var(--color-navy-900)] text-[var(--color-champagne-300)] font-bold py-3 rounded-xl border border-[var(--color-champagne-500)]/40 flex items-center justify-center gap-2 text-xs"
              >
                <Download className="w-4 h-4 text-[var(--color-champagne-500)]" />
                <span>طباعة الكشف الرسمي (PDF)</span>
              </button>
              <button
                onClick={() => {
                  setShowQuoteModal(false);
                  handleSendWhatsAppQuote();
                }}
                className="flex-1 gold-gradient text-[var(--color-navy-950)] font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>إرسال العرض والاتفاق عبر واتساب</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Package Modal */}
      <SharePackageModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        packageData={{
          id: selectedPkg.id,
          name: selectedPkg.name,
          description: `تخصيص لـ ${guestCount} ضيف مع ${selectedAddonIds.length} خدمات إضافية. ${selectedPkg.description}`,
          badge: selectedPkg.badge
        }}
      />
    </section>
  );
};
