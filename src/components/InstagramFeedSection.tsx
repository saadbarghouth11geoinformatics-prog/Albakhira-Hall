import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, CheckCircle2, Bookmark, Share2, Eye, Grid, Film, UserCheck } from 'lucide-react';
import { HALL_SPECS, INSTAGRAM_POSTS } from '../data/hallData';
import { InstagramPost } from '../types';

export const InstagramFeedSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'الجميع' },
    { id: 'كوشة وزفة', label: 'الكوشة والزفة' },
    { id: 'البوفيه الفضي', label: 'البوفيه الفضي' },
    { id: 'قسم الرجال', label: 'قسم الرجال' },
    { id: 'صالة النساء', label: 'صالة النساء' },
    { id: 'ضيافة وبوفيه', label: 'الضيافة' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? INSTAGRAM_POSTS
    : INSTAGRAM_POSTS.filter(p => p.category === selectedCategory);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="instagram-feed" className="py-20 relative bg-[var(--color-soft-beige)] border-t border-[var(--color-border)]">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--color-champagne-600)]/10 via-[var(--color-champagne-600)]/10 to-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--color-champagne-600)]/20 via-[var(--color-champagne-600)]/20 to-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-600)]/40 mb-3 shadow-lg">
            <Instagram className="w-4 h-4 text-[var(--color-champagne-600)]" /> التغطية المباشرة من حسابنا الرسمي
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-tajawal text-white mb-3">
            تابعوا يومياتنا على <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-champagne-600)] via-[var(--color-champagne-600)] to-[var(--color-champagne-500)]">إنستغرام</span>
          </h2>
          <p className="text-[var(--color-navy-100)] text-sm sm:text-base font-cairo">
            شاهد أحدث صور الحفلات الحقيقية، الكوشات الفاخرة، تجهيزات البوفيه الـ 10 متر، وانطباعات العرسان اليومية بجدة.
          </p>
        </motion.div>

        {/* Instagram Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="dark-overlay-card p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto mb-12 bg-[var(--color-navy-900)]/90 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Avatar & User Info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[var(--color-champagne-600)] via-[var(--color-champagne-600)] to-[var(--color-champagne-600)] shadow-xl">
                  <img
                    src="/logo-official.png"
                    loading="lazy"
                    decoding="async"
                    alt="شعار قاعة الباخرة للاحتفالات"
                    className="w-full h-full object-cover rounded-full border-2 border-[var(--color-navy-900)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[var(--color-success)] p-1 rounded-full text-white border-2 border-[var(--color-navy-900)]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-tajawal text-white">
                    @{HALL_SPECS.instagramAccount}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-[10px] font-bold border border-[var(--color-champagne-500)]/40">
                    الحساب الرسمي
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-cairo mb-3">
                  قاعة الباخرة للاحتفالات بجدة - الحرازات ⚓ | العروض المعتمدة
                </p>

                {/* Account Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-6 text-xs text-[var(--color-navy-100)] font-cairo">
                  <div>
                    <span className="font-bold text-white text-sm">380+</span> منشور
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  <div>
                    <span className="font-bold text-[var(--color-champagne-500)] text-sm">42.5K</span> متابع
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  <div>
                    <span className="font-bold text-white text-sm">100%</span> توثيق عقود
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button to Open Instagram */}
            <a
              href={HALL_SPECS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--color-champagne-600)] via-[var(--color-error)] to-[var(--color-champagne-600)] text-white font-bold text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-[var(--color-champagne-600)]/30 hover:scale-105 transition-all shrink-0"
            >
              <Instagram className="w-5 h-5" />
              <span>متابعة الحساب الرسمي</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </a>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-cairo transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[var(--color-champagne-600)] to-[var(--color-champagne-600)] text-white shadow-lg shadow-[var(--color-champagne-600)]/20 border border-white/20'
                  : 'bg-[var(--color-navy-900)]/80 text-[var(--color-text-muted)] border border-[var(--color-champagne-500)]/20 hover:border-[var(--color-champagne-500)]/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => {
            const isLiked = likedPosts[post.id];
            const currentLikes = isLiked ? post.likes + 1 : post.likes;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
                className="dark-overlay-card rounded-2xl overflow-hidden bg-[var(--color-navy-900)] hover:border-[var(--color-champagne-500)] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Header of Instagram Post */}
                <div className="p-3.5 flex items-center justify-between border-b border-white/5 bg-[var(--color-navy-950)]/80">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/logo-official.png"
                      loading="lazy"
                      decoding="async"
                      alt="شعار قاعة الباخرة للاحتفالات"
                      className="w-8 h-8 rounded-full object-cover border border-[var(--color-champagne-500)]/40"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white font-tajawal">@{HALL_SPECS.instagramAccount}</h4>
                      <p className="text-[10px] text-[var(--color-text-muted)]">{post.date}</p>
                    </div>
                  </div>

                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-champagne-600)] hover:bg-[var(--color-champagne-600)]/10 transition-colors"
                    title="فتح في إنستجرام"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Post Image Container */}
                <div
                  onClick={() => setActivePost(post)}
                  className="relative aspect-[4/3] sm:aspect-square overflow-hidden cursor-pointer group/img"
                >
                  <img
                    src={post.imageUrl}
                    loading="lazy"
                    decoding="async"
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Category Tag Overlay */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40">
                    {post.category}
                  </div>

                  {/* Hover Overlay with Likes & Comments */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold">
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6 fill-white text-white" />
                      <span>{currentLikes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 fill-white text-white" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Action Bar (Like, Comment, Share) */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => toggleLike(post.id, e)}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                          isLiked ? 'text-[var(--color-champagne-600)]' : 'text-[var(--color-navy-100)] hover:text-[var(--color-champagne-600)]'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-[var(--color-champagne-600)] text-[var(--color-champagne-600)]' : ''}`} />
                        <span>{currentLikes}</span>
                      </button>

                      <button
                        onClick={() => setActivePost(post)}
                        className="flex items-center gap-1.5 text-xs text-[var(--color-navy-100)] hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                    </div>

                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[var(--color-champagne-500)] hover:underline flex items-center gap-1"
                    >
                      <span>عرض في الإنستجرام</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Caption Text Snippet */}
                  <p className="text-xs text-[var(--color-navy-100)] font-cairo line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action for Official Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href={HALL_SPECS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--color-navy-900)] border-2 border-[var(--color-champagne-500)]/50 text-white font-bold text-sm sm:text-base font-cairo shadow-2xl hover:border-[var(--color-champagne-500)] hover:bg-[var(--color-navy-900)] transition-all group"
          >
            <Instagram className="w-6 h-6 text-[var(--color-champagne-600)] group-hover:scale-110 transition-transform" />
            <span>انتقل إلى الحساب الرسمي @albakhera.1 لرؤية كامل الستوريات والتغطيات المباشرة</span>
            <ExternalLink className="w-4 h-4 text-[var(--color-champagne-500)]" />
          </a>
        </motion.div>
      </div>

      {/* Lightbox / Post Detail Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePost(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/50 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
            >
              {/* Image Column */}
              <div className="md:w-1/2 bg-black flex items-center justify-center relative overflow-hidden min-h-[300px]">
                <img
                  src={activePost.imageUrl}
                  loading="eager"
                  decoding="async"
                  alt={activePost.caption}
                  className="w-full h-full object-cover max-h-[500px]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details Column */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/logo-official.png"
                        loading="lazy"
                        decoding="async"
                        alt="شعار قاعة الباخرة للاحتفالات"
                        className="w-10 h-10 rounded-full object-cover border border-[var(--color-champagne-500)]/40"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white font-tajawal">@{HALL_SPECS.instagramAccount}</h4>
                        <p className="text-xs text-[var(--color-text-muted)]">جدة - الحرازات</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActivePost(null)}
                      className="text-[var(--color-text-muted)] hover:text-white p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo leading-relaxed mb-6 whitespace-pre-line">
                    {activePost.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[var(--color-navy-100)]">
                    <div className="flex items-center gap-1.5 text-[var(--color-champagne-600)] font-bold">
                      <Heart className="w-4 h-4 fill-[var(--color-champagne-600)]" />
                      <span>{activePost.likes} إعجاب</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      <span>{activePost.comments} تعليق</span>
                    </div>
                  </div>

                  <a
                    href={activePost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[var(--color-champagne-600)] hover:bg-[var(--color-champagne-600)] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>مشاهدة في إنستجرام</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
