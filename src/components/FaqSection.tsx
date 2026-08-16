import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Check,
  Maximize2,
  Minimize2,
  Sparkles,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  FileCheck,
  Building,
  MapPin,
  Utensils,
  Type,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { FAQS } from '../data/hallData';
import { HALL_SPECS } from '../data/hallData';

export const FaqSection: React.FC = () => {
  const [openFaqIds, setOpenFaqIds] = useState<string[]>([FAQS[0].id]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, 'up' | 'down'>>({});
  const [copiedFaqId, setCopiedFaqId] = useState<string | null>(null);

  // Font Size Adjustment State (Accessibility - Range 85% to 145%)
  const [fontScale, setFontScale] = useState<number>(100);

  const handleDecreaseFont = () => setFontScale((prev) => Math.max(85, prev - 15));
  const handleIncreaseFont = () => setFontScale((prev) => Math.min(145, prev + 15));
  const handleResetFont = () => setFontScale(100);

  // Categories mapping
  const categories = [
    { id: 'all', label: 'الجميع', icon: HelpCircle },
    { id: 'booking', label: 'الحجوزات والعربون', icon: FileCheck },
    { id: 'decor', label: 'الكوشة والشروط', icon: Utensils },
    { id: 'capacity', label: 'السعة والمبيعات', icon: Building },
    { id: 'sailing', label: 'الموقع والخصوصية', icon: MapPin },
  ];

  // Filter FAQs based on category and search query
  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    if (openFaqIds.includes(id)) {
      setOpenFaqIds(openFaqIds.filter((item) => item !== id));
    } else {
      setOpenFaqIds([...openFaqIds, id]);
    }
  };

  const handleExpandAll = () => {
    setOpenFaqIds(filteredFaqs.map((f) => f.id));
  };

  const handleCollapseAll = () => {
    setOpenFaqIds([]);
  };

  const handleVote = (id: string, vote: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    setHelpfulVotes((prev) => ({ ...prev, [id]: prev[id] === vote ? (undefined as any) : vote }));
  };

  const handleCopyShare = (faq: typeof FAQS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const textToShare = `سؤال من قاعة الباخرة:\nس: ${faq.question}\nج: ${faq.answer}`;
    navigator.clipboard.writeText(textToShare);
    setCopiedFaqId(faq.id);
    setTimeout(() => setCopiedFaqId(null), 2000);
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 relative bg-[var(--color-navy-950)] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--color-champagne-500)]/10 via-[var(--color-navy-700)]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/40 mb-3 shadow-lg">
            <HelpCircle className="w-4 h-4 text-[var(--color-champagne-500)]" /> مركز الأسئلة والأكوردوين التفاعلي
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tajawal text-white mb-3">
            الأسئلة الشائعة وشروط <span className="gold-text">عقد قاعة الباخرة</span>
          </h2>
          <p className="text-[var(--color-navy-100)] text-xs sm:text-base font-cairo">
            إجابات رسمية موثقة ومفصلة حول عروض الباخرة الشاملة، سياسات العربون، البوفيه، الشروط والخصوصية بالحرازات.
          </p>
        </motion.div>

        {/* Font Size Adjustment Bar (Accessibility Feature) */}
        <div className="bg-[var(--color-navy-900)]/95 border-2 border-[var(--color-champagne-500)]/40 rounded-2xl p-3 sm:p-4 mb-6 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)]/40 flex items-center justify-center text-[var(--color-champagne-500)] shrink-0">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs sm:text-sm font-tajawal">التحكم في حجم خط القراءة</span>
                <span className="bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                  {fontScale}%
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-navy-100)] font-cairo hidden sm:block">
                يمكنك التكبير والتصغير لسهولة القراءة وراحة العين لجميع الزوار
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Presets */}
            <button
              onClick={() => setFontScale(85)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-cairo transition-all cursor-pointer ${
                fontScale === 85
                  ? 'gold-gradient text-[var(--color-navy-950)] font-black shadow-md'
                  : 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-white/10 hover:border-[var(--color-champagne-500)]/50'
              }`}
            >
              صغير
            </button>
            <button
              onClick={() => setFontScale(100)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-cairo transition-all cursor-pointer ${
                fontScale === 100
                  ? 'gold-gradient text-[var(--color-navy-950)] font-black shadow-md'
                  : 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-white/10 hover:border-[var(--color-champagne-500)]/50'
              }`}
            >
              عادي (افتراضي)
            </button>
            <button
              onClick={() => setFontScale(115)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-cairo transition-all cursor-pointer ${
                fontScale === 115
                  ? 'gold-gradient text-[var(--color-navy-950)] font-black shadow-md'
                  : 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-white/10 hover:border-[var(--color-champagne-500)]/50'
              }`}
            >
              كبير
            </button>
            <button
              onClick={() => setFontScale(130)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-cairo transition-all cursor-pointer ${
                fontScale === 130
                  ? 'gold-gradient text-[var(--color-navy-950)] font-black shadow-md'
                  : 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-white/10 hover:border-[var(--color-champagne-500)]/50'
              }`}
            >
              كبير جدًا
            </button>

            <div className="h-4 w-px bg-white/20 mx-1 hidden sm:block" />

            {/* Incremental Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleDecreaseFont}
                disabled={fontScale <= 85}
                className="w-8 h-8 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] hover:text-white hover:border-[var(--color-champagne-500)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-black transition-all cursor-pointer"
                title="تصغير حجم الخط"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleIncreaseFont}
                disabled={fontScale >= 145}
                className="w-8 h-8 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] hover:text-white hover:border-[var(--color-champagne-500)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center font-black transition-all cursor-pointer"
                title="تكبير حجم الخط"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetFont}
                className="px-2.5 py-1.5 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-[var(--color-navy-100)] hover:text-white hover:border-[var(--color-champagne-500)] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                title="إعادة ضبط الخط إلى الحجم الطبيعي"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                <span className="hidden md:inline">إعادة ضبط</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Filter Controls Container */}
        <div className="dark-overlay-card p-4 sm:p-6 rounded-3xl bg-[var(--color-navy-900)]/90 shadow-2xl mb-8 space-y-5">
          
          {/* Live Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[var(--color-champagne-500)]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة (مثال: العربون، البوفيه، الكوشة، الخصوصية، السعة)..."
              className="w-full pr-12 pl-10 py-3.5 rounded-2xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 text-white text-xs sm:text-sm font-cairo placeholder-[var(--color-text-muted)] focus:border-[var(--color-champagne-500)] focus:ring-2 focus:ring-[var(--color-champagne-500)]/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--color-text-muted)] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills & Global Expand/Collapse Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/5">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold font-cairo transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'gold-gradient text-[var(--color-navy-950)] shadow-md border border-white/20 font-black'
                        : 'bg-[var(--color-navy-950)] text-[var(--color-navy-100)] border border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)]/50 hover:text-white'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-[var(--color-navy-950)]' : 'text-[var(--color-champagne-500)]'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Expand / Collapse All Toggle Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleExpandAll}
                className="px-3 py-1.5 rounded-lg bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] text-[11px] font-bold hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-colors flex items-center gap-1 cursor-pointer"
                title="فتح جميع الأسئلة"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>توسيع الكل</span>
              </button>

              <button
                onClick={handleCollapseAll}
                className="px-3 py-1.5 rounded-lg bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-[var(--color-text-muted)] text-[11px] font-bold hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                title="طوي جميع الأسئلة"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>إغلاق الكل</span>
              </button>
            </div>
          </div>
        </div>

        {/* FAQs Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIds.includes(faq.id);
              const vote = helpfulVotes[faq.id];
              const isCopied = copiedFaqId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={`dark-overlay-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[var(--color-champagne-500)] bg-[var(--color-navy-900)] shadow-2xl'
                      : 'border-[var(--color-champagne-500)]/30 bg-[var(--color-navy-900)]/60 hover:border-[var(--color-champagne-500)]/60'
                  }`}
                >
                  {/* Collapsible Accordion Trigger Button */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-right p-5 flex items-center justify-between gap-4 font-bold font-tajawal text-sm sm:text-base text-white hover:text-[var(--color-champagne-300)] cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors mt-0.5 ${
                          isOpen
                            ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)]'
                            : 'bg-[var(--color-navy-950)] text-[var(--color-champagne-500)] border border-[var(--color-champagne-500)]/40 group-hover:border-[var(--color-champagne-500)]'
                        }`}
                      >
                        {index + 1}
                      </span>

                      <div>
                        <span
                          className="leading-snug block transition-all"
                          style={{ fontSize: `${(15 * (fontScale / 100)).toFixed(1)}px` }}
                        >
                          {faq.question}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-cairo px-2 py-0.5 rounded-md bg-[var(--color-navy-950)] text-[var(--color-champagne-500)] border border-[var(--color-champagne-500)]/30 font-bold">
                            {faq.category === 'booking'
                              ? 'الحجوزات والعربون'
                              : faq.category === 'decor'
                              ? 'الكوشة والتجميل'
                              : faq.category === 'capacity'
                              ? 'السعة والخدمات'
                              : 'الموقع والخصوصية'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? 'bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-500)] rotate-180'
                            : 'bg-[var(--color-navy-950)] text-[var(--color-text-muted)] group-hover:text-white'
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </button>

                  {/* Collapsible Accordion Content Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden border-t border-[var(--color-champagne-500)]/20 bg-[var(--color-navy-950)]/90"
                      >
                        <div className="p-5 sm:p-6 text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed font-cairo space-y-4">
                          <div
                            className="bg-[var(--color-navy-900)] p-4 sm:p-5 rounded-xl border border-[var(--color-champagne-500)]/20 text-white whitespace-pre-line leading-loose transition-all"
                            style={{ fontSize: `${(14 * (fontScale / 100)).toFixed(1)}px` }}
                          >
                            {faq.answer}
                          </div>

                          {/* Footer Controls inside Collapsed Answer */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/5 text-xs text-[var(--color-text-muted)]">
                            
                            {/* Helpfulness Vote Buttons */}
                            <div className="flex items-center gap-3">
                              <span className="text-[11px]">هل كانت الإجابة مفيدة؟</span>
                              <button
                                onClick={(e) => handleVote(faq.id, 'up', e)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                                  vote === 'up'
                                    ? 'bg-[var(--color-success)]/20 border-[var(--color-success)] text-[var(--color-success)] font-bold'
                                    : 'bg-[var(--color-navy-900)] border-white/10 hover:border-white/30 text-[var(--color-navy-100)]'
                                }`}
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>نعم</span>
                              </button>

                              <button
                                onClick={(e) => handleVote(faq.id, 'down', e)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                                  vote === 'down'
                                    ? 'bg-[var(--color-error)]/20 border-[var(--color-error)] text-[var(--color-error)] font-bold'
                                    : 'bg-[var(--color-navy-900)] border-white/10 hover:border-white/30 text-[var(--color-navy-100)]'
                                }`}
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                                <span>لا</span>
                              </button>
                            </div>

                            {/* Copy Question & Share Link */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => handleCopyShare(faq, e)}
                                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all cursor-pointer text-[11px]"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-[var(--color-success)]" /> : <Share2 className="w-3.5 h-3.5" />}
                                <span>{isCopied ? 'تم نسخ الإجابة' : 'مشاركة السؤال'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty Search Results State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-4 dark-overlay-card rounded-3xl"
          >
            <HelpCircle className="w-12 h-12 text-[var(--color-champagne-500)] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white font-tajawal mb-2">
              لم نجد نتائج مطابقة لـ "{searchQuery}"
            </h3>
            <p className="text-xs text-[var(--color-navy-100)] font-cairo mb-6">
              يسعدنا إجابة استفسارك المباشر فورًا عبر خدمة العملاء والمبيعات على الواتساب.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/50 text-[var(--color-champagne-300)] font-bold text-xs hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-colors cursor-pointer"
            >
              عرض جميع الأسئلة
            </button>
          </motion.div>
        )}

        {/* Direct WhatsApp Callout for Unanswered Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-900)] to-[var(--color-navy-900)] p-6 sm:p-8 rounded-3xl border border-[var(--color-champagne-500)]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-tajawal mb-1">
                لديك استفسار آخر لم يتم ذكره؟
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo">
                فريق المبيعات متواجد على مدار 24 ساعة للإجابة المباشرة وإرسال بروشور القاعة.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={HALL_SPECS.supervisor.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all w-full sm:w-auto cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>محادثة واتساب مع المشرف</span>
            </a>

            <a
              href={HALL_SPECS.supervisor.tel}
              className="px-6 py-3.5 rounded-2xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/50 text-[var(--color-champagne-300)] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all w-full sm:w-auto cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال بمشرف القاعة ({HALL_SPECS.supervisor.phone})</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
