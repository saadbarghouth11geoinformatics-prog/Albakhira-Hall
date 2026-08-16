import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Sparkles,
  CheckCircle2,
  Heart,
  Send,
  Calendar,
  User,
  PartyPopper,
  MessageSquare,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Testimonial } from '../types';

interface InteractiveStarReviewFormProps {
  onReviewAdded?: (newReview: Testimonial) => void;
}

const RATING_LABELS: Record<number, { text: string; color: string; desc: string }> = {
  5: { text: 'ممتاز جداً وفاخر (5/5)', color: 'var(--color-champagne-500)', desc: 'تجربة استثنائية فاقت التوقعات في كل تفاصيل الحفل' },
  4: { text: 'جيد جداً ومميز (4/5)', color: 'var(--color-champagne-300)', desc: 'خدمة راقية وتنظيم رائع نال استحسان الجميع' },
  3: { text: 'جيد ومقبول (3/5)', color: 'var(--color-text-muted)', desc: 'تجربة مناسبة مع بعض الملاحظات البسيطة' },
  2: { text: 'يحتاج تحسين (2/5)', color: 'var(--color-warning)', desc: 'هناك نقاط بحاجة للتطوير والمتابعة' },
  1: { text: 'غير مرضي (1/5)', color: 'var(--color-error)', desc: 'لم تكن التجربة على المستوى المطلوب' },
};

export const InteractiveStarReviewForm: React.FC<InteractiveStarReviewFormProps> = ({ onReviewAdded }) => {
  const [overallRating, setOverallRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Sub-criteria ratings
  const [buffetRating, setBuffetRating] = useState<number>(5);
  const [serviceRating, setServiceRating] = useState<number>(5);
  const [cleanlinessRating, setCleanlinessRating] = useState<number>(5);
  const [audioLightingRating, setAudioLightingRating] = useState<number>(5);

  const [authorName, setAuthorName] = useState<string>('');
  const [eventType, setEventType] = useState<string>('حفل زفاف ملكي');
  const [eventDate, setEventDate] = useState<string>('');
  const [reviewComment, setReviewComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showDetailedStars, setShowDetailedStars] = useState<boolean>(true);

  const activeRating = hoverRating !== null ? hoverRating : overallRating;
  const ratingInfo = RATING_LABELS[activeRating] || RATING_LABELS[5];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) return;

    const newReview: Testimonial = {
      id: `review-${Date.now()}`,
      names: authorName.trim(),
      eventType: eventType,
      eventDate: eventDate.trim() || 'شوال 1447هـ (2026)',
      rating: overallRating,
      comment: reviewComment.trim(),
      avatarUrl: '',
      verifiedBooking: true,
    };

    if (onReviewAdded) {
      onReviewAdded(newReview);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setAuthorName('');
    setReviewComment('');
    setEventDate('');
    setOverallRating(5);
  };

  return (
    <div className="bg-gradient-to-b from-[var(--color-navy-900)] via-[var(--color-navy-950)] to-[var(--color-navy-900)] p-6 sm:p-10 rounded-3xl border-2 border-[var(--color-champagne-500)]/40 shadow-2xl max-w-3xl mx-auto my-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Title Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/30 mb-3">
            <Sparkles className="w-4 h-4 text-[var(--color-champagne-500)]" /> نظام التقييم بالنجوم المعتمد
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-tajawal gold-text mb-2">
            أقمت ليلتك في قاعة الباخرة؟ قيّم تجربتك الآن
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo max-w-xl mx-auto">
            صوتك وانطباعك يهمنا ويفيد كل عريس وعروسة يخططون لحفل زفافهم القادم بالحرازات.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--color-success)]/90 border border-[var(--color-success)]/40 p-8 rounded-3xl text-center space-y-4 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/20 border border-[var(--color-success)] flex items-center justify-center text-[var(--color-success)] mx-auto animate-bounce">
                <PartyPopper className="w-8 h-8" />
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-tajawal text-white">
                شكراً جزيلاً، تم تسجيل تقييمك بنجاح!
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo max-w-md mx-auto leading-relaxed">
                تم إضافة تقييمك بنجومه وكلماتك الطيبة إلى سجل تجارب القاعة وسيظهر لجميع زوار الموقع مباركاً لكم ولعائلتكم الكريمة.
              </p>
              <div className="flex items-center justify-center gap-1.5 text-[var(--color-champagne-500)] my-2">
                {[...Array(overallRating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[var(--color-champagne-500)]" />
                ))}
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[var(--color-navy-950)] hover:bg-[var(--color-navy-800)] border border-[var(--color-success)]/50 text-xs font-bold text-[var(--color-warm-white)] transition-all cursor-pointer"
              >
                إضافة تقييم آخر
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* 1. Main Interactive 5-Star Rating Selector */}
              <div className="bg-[var(--color-navy-950)]/90 p-6 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center space-y-3">
                <label className="block text-xs sm:text-sm font-bold text-[var(--color-champagne-300)] font-tajawal">
                  اختر تقييمك العام للقاعة بالنجوم:
                </label>

                {/* Stars Buttons */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= activeRating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setOverallRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 sm:p-2 transition-transform transform hover:scale-125 focus:outline-none cursor-pointer group"
                        title={`${star} نجوم`}
                      >
                        <Star
                          className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-200 ${
                            isFilled
                              ? 'text-[var(--color-champagne-500)] fill-[var(--color-champagne-500)] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                              : 'text-slate-600 group-hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Rating Feedback Text */}
                <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/30">
                  <span className="font-black text-sm font-tajawal" style={{ color: ratingInfo.color }}>
                    {ratingInfo.text}
                  </span>
                  <span className="text-[11px] text-[var(--color-text-muted)] block font-cairo mt-0.5">
                    {ratingInfo.desc}
                  </span>
                </div>
              </div>

              {/* 2. Sub-Criteria Star Ratings (Detailed Feedback) */}
              {showDetailedStars && (
                <div className="bg-[var(--color-navy-950)]/70 p-5 rounded-2xl border border-[var(--color-champagne-500)]/20 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--color-champagne-500)]/15">
                    <span className="text-xs font-bold text-[var(--color-champagne-300)] font-tajawal flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> تقييم المعايير والخدمات المحددة:
                    </span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">انقر لتحديد عدد النجوم</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-cairo">
                    {/* Buffet */}
                    <div className="flex items-center justify-between bg-[var(--color-navy-900)] p-3 rounded-xl border border-[var(--color-champagne-500)]/15">
                      <span className="text-[var(--color-navy-100)]">🍲 البوفيه 10م والتورتة:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setBuffetRating(s)}
                            className="text-[var(--color-champagne-500)] hover:scale-110 cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${s <= buffetRating ? 'fill-[var(--color-champagne-500)]' : 'text-slate-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Service & Staff */}
                    <div className="flex items-center justify-between bg-[var(--color-navy-900)] p-3 rounded-xl border border-[var(--color-champagne-500)]/15">
                      <span className="text-[var(--color-navy-100)]">☕ المباشرين والقهوجي:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setServiceRating(s)}
                            className="text-[var(--color-champagne-500)] hover:scale-110 cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${s <= serviceRating ? 'fill-[var(--color-champagne-500)]' : 'text-slate-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cleanliness & Suite */}
                    <div className="flex items-center justify-between bg-[var(--color-navy-900)] p-3 rounded-xl border border-[var(--color-champagne-500)]/15">
                      <span className="text-[var(--color-navy-100)]">✨ نظافة الصالة وجناح VIP:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setCleanlinessRating(s)}
                            className="text-[var(--color-champagne-500)] hover:scale-110 cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${s <= cleanlinessRating ? 'fill-[var(--color-champagne-500)]' : 'text-slate-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Audio & Lighting */}
                    <div className="flex items-center justify-between bg-[var(--color-navy-900)] p-3 rounded-xl border border-[var(--color-champagne-500)]/15">
                      <span className="text-[var(--color-navy-100)]">🎶 الزفة والصوت والليزر:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setAudioLightingRating(s)}
                            className="text-[var(--color-champagne-500)] hover:scale-110 cursor-pointer"
                          >
                            <Star className={`w-4 h-4 ${s <= audioLightingRating ? 'fill-[var(--color-champagne-500)]' : 'text-slate-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. User & Event Info Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-cairo">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-navy-100)] mb-1.5 text-right flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> اسم العائلة أو العروسين:
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="مثال: عائلة السلمي"
                    className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-navy-100)] mb-1.5 text-right flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> نوع الحفل والمناسبة:
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-xl p-3 text-xs text-[var(--color-champagne-300)] font-bold focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo"
                  >
                    <option value="حفل زفاف ملكي">حفل زفاف ملكي</option>
                    <option value="حفل ملكة وعقد قران">حفل ملكة وعقد قران</option>
                    <option value="حفل خطوبة وحناء">حفل خطوبة وحناء</option>
                    <option value="حفل تخرج وتكريم">حفل تخرج وتكريم</option>
                    <option value="اجتماع وفعالية عائلية">اجتماع وفعالية عائلية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-navy-100)] mb-1.5 text-right flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> تاريخ إقامة الحفل:
                  </label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="مثال: رجب 1447هـ"
                    className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo"
                  />
                </div>
              </div>

              {/* 4. Text Review */}
              <div>
                <label className="block text-xs font-bold text-[var(--color-navy-100)] mb-1.5 text-right flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> تفاصيل رأيك وتجربتك مع قاعة الباخرة:
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="اكتب هنا عن تجربتك، كيف كان مذاق وتنوع البوفيه، تعامل المشرفة والمباشرين، نظافة الجناح، وأجواء ليلتكم..."
                  className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-champagne-500)] text-right font-cairo leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black py-4 rounded-2xl shadow-xl transition-all hover:scale-[1.02] cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>إرسال ونشر التقييم في سجل القاعة</span>
              </button>

              <p className="text-[11px] text-center text-[var(--color-text-muted)] font-cairo flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>تقييمك يظهر فوراً ويُدرج ضمن مؤشرات الرضا العامة لقاعة الباخرة بجدة</span>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
