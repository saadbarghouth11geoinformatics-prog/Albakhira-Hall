import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  MessageSquare,
  Heart,
  ShieldCheck,
  UserCheck,
  ThumbsUp,
  Search,
  Filter,
  CheckCircle2,
  Award,
  Sparkles,
  Crown,
  Quote,
  PlusCircle,
  X
} from 'lucide-react';
import { TESTIMONIALS } from '../data/hallData';
import { Testimonial } from '../types';

const INITIAL_LIKES: Record<string, number> = {
  t1: 42,
  t2: 38,
  t3: 56,
  t4: 29,
  t5: 34,
  t6: 21,
  t7: 19,
  t8: 27,
  t9: 31,
  t10: 25,
  t11: 48,
  t12: 33,
  t13: 22,
  t14: 28,
  t15: 36,
  t16: 45,
};

const OFFICIAL_REPLIES: Record<string, string> = {
  t1: 'شكراً لكم عائلة الحارثي الكرام! سررنا جداً بخدمتكم ورسم البسمة في ليلتكم المباركة. نرحب بكم دائماً في قاعة الباخرة.',
  t3: 'ألف مبروك يا عروس شهد! أسعدتينا بكلماتك الرقيقة، ويسعدنا أن تكون مؤثرات الدخلة والزفة عند حسن ظنك المأمول.',
  t2: 'الله يجمل حالك يا شيخ أبو فهد ويحييكم دائماً بين أهلكم وإخوانكم في جدة والحرازات.',
  t9: 'ألف مبروك لعائلة الجهني الكرام، ويسعدنا أن جناح العروسة نال إعجابكم واستحسانكم.',
  t11: 'ألف مبروك يا عروس ريم! يسعدنا جداً أن تصميم الكوشة والممر الملكي نال إعجابك وإعجاب صديقاتك.',
  t16: 'شكراً لعائلة الغامدي الكرام! سعدنا بخدمتكم في زفاف المهندس أحمد ونتمنى لكم حياة ملؤها السعادة والتوفيق.',
};

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(INITIAL_LIKES);

  // New review form states
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newEventType, setNewEventType] = useState('حفل زفاف');
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleToggleLike = (id: string) => {
    setLikedReviews((prev) => {
      const isLiked = prev[id];
      const nextState = { ...prev, [id]: !isLiked };
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: (prevCounts[id] || 0) + (isLiked ? -1 : 1),
      }));
      return nextState;
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const newEntry: Testimonial = {
      id: `user-${Date.now()}`,
      names: newReviewName,
      eventDate: 'الآن (مباشر)',
      eventType: newEventType,
      rating: newRating,
      comment: newReviewText,
      verifiedBooking: true,
      avatarUrl: '',
    };

    setReviewsList([newEntry, ...reviewsList]);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowFormModal(false);
      setNewReviewName('');
      setNewReviewText('');
    }, 2000);
  };

  // Filtering
  const filteredReviews = reviewsList.filter((rev) => {
    const matchesSearch =
      rev.names.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.eventType.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'wedding')
      return matchesSearch && (rev.eventType.includes('زفاف') || rev.eventType.includes('عروس'));
    if (selectedCategory === 'buffet')
      return matchesSearch && (rev.comment.includes('بوفيه') || rev.comment.includes('حلا'));
    if (selectedCategory === 'men')
      return matchesSearch && (rev.comment.includes('رجال') || rev.comment.includes('حوش'));
    if (selectedCategory === 'zaffa')
      return matchesSearch && (rev.comment.includes('زفة') || rev.comment.includes('كشاف'));

    return matchesSearch;
  });

  return (
    <section id="reviews" className="py-20 relative bg-[var(--color-navy-950)]/60 backdrop-blur-md">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-champagne-500)_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/40 mb-3 shadow-md">
            <Heart className="w-3.5 h-3.5 text-[var(--color-champagne-500)] fill-[var(--color-champagne-500)]" /> تجارب وآراء العرسان والضيوف بجدة
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-tajawal gold-text mb-4">
            ماذا يقول من احتفلوا في قاعة الباخرة؟
          </h2>
          <p className="text-[var(--color-navy-100)] text-xs sm:text-sm font-cairo max-w-2xl mx-auto leading-relaxed">
            تقييمات موثقة وانطباعات حقيقية من العرسان وأهاليهم حول جودة البوفيه 10 متر، الزفة، الضيافة، والالتزام بجميع بنود العرض الشامل.
          </p>
        </motion.div>

        {/* Rating Overview Grid Stats Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-card p-6 md:p-8 rounded-3xl border-2 border-[var(--color-champagne-500)]/40 max-w-4xl mx-auto mb-12 bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-900)] to-[var(--color-navy-900)] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-champagne-500)]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score Big Display */}
            <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-l border-[var(--color-champagne-500)]/30 pb-6 md:pb-0 md:pl-6">
              <span className="text-xs font-bold text-[var(--color-champagne-500)] font-cairo block mb-1">التقييم العام الموثق</span>
              <div className="text-5xl sm:text-6xl font-black gold-text font-tajawal mb-2">4.9 / 5.0</div>
              <div className="flex items-center justify-center gap-1 text-[var(--color-champagne-500)] mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[var(--color-navy-100)] font-cairo bg-[var(--color-champagne-500)]/15 px-3 py-1 rounded-full border border-[var(--color-champagne-500)]/30 inline-block font-bold">
                بناءً على +1250 حفل ومناسبة موثقة
              </span>
            </div>

            {/* Sub-ratings Breakdown */}
            <div className="md:col-span-8 space-y-3 font-cairo text-xs text-[var(--color-navy-100)]">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#25D366]" /> النظافة والتعقيم وحراسة النساء:</span>
                  <span className="text-[var(--color-champagne-300)]">100% (ممتاز جداً)</span>
                </div>
                <div className="w-full h-2 bg-[var(--color-navy-950)] rounded-full overflow-hidden border border-[var(--color-champagne-500)]/20">
                  <div className="h-full bg-gradient-to-r from-[var(--color-champagne-500)] to-[#25D366] w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[var(--color-champagne-500)]" /> جودة البوفيه الفضي 10m والحلويات:</span>
                  <span className="text-[var(--color-champagne-300)]">99% (طازج وفندقي)</span>
                </div>
                <div className="w-full h-2 bg-[var(--color-navy-950)] rounded-full overflow-hidden border border-[var(--color-champagne-500)]/20">
                  <div className="h-full bg-gradient-to-r from-[var(--color-champagne-700)] to-[var(--color-champagne-500)] w-[99%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[var(--color-champagne-500)]" /> قسم الرجال وضيافة الحوش والقهوجي:</span>
                  <span className="text-[var(--color-champagne-300)]">100% (أصول كرم الضيافة)</span>
                </div>
                <div className="w-full h-2 bg-[var(--color-navy-950)] rounded-full overflow-hidden border border-[var(--color-champagne-500)]/20">
                  <div className="h-full bg-gradient-to-r from-[var(--color-champagne-500)] to-[var(--color-champagne-100)] w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[var(--color-success)]" /> مؤشرات الزفة والبخار والدي جي:</span>
                  <span className="text-[var(--color-champagne-300)]">98% (أجواء ملكية)</span>
                </div>
                <div className="w-full h-2 bg-[var(--color-navy-950)] rounded-full overflow-hidden border border-[var(--color-champagne-500)]/20">
                  <div className="h-full bg-gradient-to-r from-[var(--color-navy-800)] to-[var(--color-success)] w-[98%]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Toolbar & Add Review Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-[var(--color-navy-900)]/80 p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 shadow-lg">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[var(--color-champagne-500)] absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برأي العائلة أو الكلمة..."
              className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'wedding', label: 'حفلات الزفاف والعروس' },
              { id: 'buffet', label: 'البوفيه الفضي والحلويات' },
              { id: 'men', label: 'قسم الرجال والحوش' },
              { id: 'zaffa', label: 'الزفة والمؤثرات' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-cairo ${
                  selectedCategory === cat.id
                    ? 'gold-gradient text-[var(--color-navy-950)] shadow-md scale-105'
                    : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] hover:text-white border border-[var(--color-champagne-500)]/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Add Review Button */}
          <button
            onClick={() => setShowFormModal(!showFormModal)}
            className="w-full md:w-auto gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>اكتب رأيك بالقاعة</span>
          </button>
        </div>

        {/* Add Review Modal / Drawer */}
        {showFormModal && (
          <div className="mb-12 bg-[var(--color-navy-900)] p-6 rounded-3xl border-2 border-[var(--color-champagne-500)] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 relative">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 left-4 p-2 text-[var(--color-text-muted)] hover:text-white bg-[var(--color-navy-950)] rounded-full border border-[var(--color-champagne-500)]/30"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center max-w-xl mx-auto mb-6">
              <h3 className="text-xl font-black font-tajawal gold-text mb-1">أضف تقييمك ورأيك في قاعة الباخرة</h3>
              <p className="text-xs text-[var(--color-navy-100)]">
                شارك انطباعك ليظهر مباشرة لجميع زوار الموقع وعرسان المستقبل.
              </p>
            </div>

            {successMsg ? (
              <div className="bg-[var(--color-success)] border border-[var(--color-success)] p-5 rounded-2xl text-center text-[var(--color-warm-white)]">
                <CheckCircle2 className="w-8 h-8 text-[var(--color-success)] mx-auto mb-2" />
                <h4 className="font-bold text-sm font-tajawal">تم نشر رأيك بنجاح في الموقع!</h4>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="max-w-2xl mx-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-navy-100)] mb-1 text-right">
                      اسم العائلة أو العروسين:
                    </label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="مثال: عائلة الغامدي - جدة"
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--color-navy-100)] mb-1 text-right">نوع المناسبة:</label>
                    <select
                      value={newEventType}
                      onChange={(e) => setNewEventType(e.target.value)}
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-xl p-3 text-xs text-[var(--color-champagne-300)] font-bold focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo"
                    >
                      <option value="حفل زفاف ملكي">حفل زفاف ملكي</option>
                      <option value="حفل ملكة وعقد قران">حفل ملكة وعقد قران</option>
                      <option value="حفل تخرج وتكريم">حفل تخرج وتكريم</option>
                      <option value="مناسبة خاصة واجتماع">مناسبة خاصة واجتماع</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-navy-100)] mb-1 text-right">
                    التقييم بالنجوم:
                  </label>
                  <div className="flex items-center gap-2 justify-end">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 text-[var(--color-champagne-500)] hover:scale-125 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= newRating ? 'fill-[var(--color-champagne-500)]' : 'opacity-40'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-navy-100)] mb-1 text-right">تفاصيل رأيك وانطباعك:</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="اكتب هنا عن البوفيه، النظافة، التنظيم، والخدمة..."
                    className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient text-[var(--color-navy-950)] font-black py-3 rounded-xl shadow-lg transition-transform cursor-pointer text-xs"
                >
                  نشر التقييم فوراً
                </button>
              </form>
            )}
          </div>
        )}

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((t, idx) => {
            const likes = likeCounts[t.id] || 15;
            const isLiked = likedReviews[t.id];
            const officialReply = OFFICIAL_REPLIES[t.id];

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
                className="glass-card p-6 rounded-3xl border border-[var(--color-champagne-500)]/30 flex flex-col justify-between relative bg-gradient-to-b from-[var(--color-navy-900)] via-[var(--color-navy-950)] to-[var(--color-navy-950)] shadow-xl hover:border-[var(--color-champagne-500)]/60 transition-all group"
              >
                <div>
                  {/* Card Top Banner */}
                  <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-[var(--color-champagne-500)]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[var(--color-champagne-700)] to-[var(--color-champagne-500)] text-[var(--color-navy-950)] flex items-center justify-center font-black font-tajawal text-sm shadow-md shrink-0">
                        {t.names.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-white font-tajawal truncate">{t.names}</h4>
                        <span className="text-[10px] text-[var(--color-text-muted)] font-cairo block mt-0.5">
                          {t.eventType} • {t.eventDate}
                        </span>
                      </div>
                    </div>

                    {t.verifiedBooking && (
                      <span className="shrink-0 flex items-center gap-1 text-[10px] text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded-full border border-[#25D366]/30 font-bold font-cairo">
                        <UserCheck className="w-3 h-3" /> حجز مؤكد
                      </span>
                    )}
                  </div>

                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-[var(--color-champagne-500)]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[var(--color-champagne-500)]/30" />
                  </div>

                  {/* Comment Body */}
                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed font-cairo mb-4 bg-[var(--color-navy-950)]/70 p-3.5 rounded-2xl border border-[var(--color-champagne-500)]/15">
                    "{t.comment}"
                  </p>

                  {/* Official Administration Reply Box if available */}
                  {officialReply && (
                    <div className="mb-4 bg-[var(--color-navy-800)] p-3 rounded-2xl border-r-4 border-r-[var(--color-champagne-500)] border-y border-l border-[var(--color-champagne-500)]/20">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-champagne-300)] mb-1">
                        <Crown className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                        <span>رد إدارة قاعة الباخرة:</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-navy-100)] font-cairo leading-normal">{officialReply}</p>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-[var(--color-champagne-500)]/15 flex items-center justify-between text-xs text-[var(--color-text-muted)] font-cairo">
                  <span className="text-[10px] text-[var(--color-champagne-500)] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> العرض الشامل المعتمد
                  </span>

                  <button
                    onClick={() => handleToggleLike(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      isLiked
                        ? 'bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] border-[var(--color-champagne-500)]'
                        : 'bg-[var(--color-navy-950)] text-[var(--color-text-muted)] border-[var(--color-champagne-500)]/20 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'text-[var(--color-champagne-500)] fill-[var(--color-champagne-500)]' : ''}`} />
                    <span className="font-bold text-[11px]">مفيد ({likes})</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Seal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/40 text-xs font-bold text-[var(--color-champagne-300)] font-cairo shadow-xl">
            <Award className="w-5 h-5 text-[var(--color-champagne-500)]" />
            <span>جميع التقييمات المعروضة مستمدة من عقود الحجز المعتمدة بقاعة الباخرة بالحرازات</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
