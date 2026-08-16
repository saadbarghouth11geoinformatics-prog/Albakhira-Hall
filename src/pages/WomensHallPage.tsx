import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  UtensilsCrossed,
  Cake,
  Wine,
  Gift,
  Cookie,
  Users,
  HeartHandshake,
  Flame,
  Music,
  Disc,
  Zap,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  Play,
  Maximize2,
  ShieldCheck,
  Award,
  Clock,
  Printer,
  Share2,
  Check,
  Layers,
  ChevronRight,
  Info,
  Sliders,
  Camera,
  Video as VideoIcon,
  X
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageTransition } from '../components/PageTransition';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionDivider } from '../components/SectionDivider';
import { WOMEN_HALL_DATA, HallFeatureItem } from '../data/hallSectionsData';
import { HALL_SPECS } from '../data/hallData';

interface WomensHallPageProps {
  onOpenBooking: (packageId?: string, prefilled?: any) => void;
}

export const WomensHallPage: React.FC<WomensHallPageProps> = ({ onOpenBooking }) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'videos'>('photos');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'Cake':
        return <Cake className="w-5 h-5" />;
      case 'Wine':
        return <Wine className="w-5 h-5" />;
      case 'Gift':
        return <Gift className="w-5 h-5" />;
      case 'Cookie':
        return <Cookie className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Music':
        return <Music className="w-5 h-5" />;
      case 'Disc':
        return <Disc className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleShare = () => {
    const text = `💎 مواصفات صالة النساء الملكية - قاعة الباخرة للاحتفالات بجدة:
- بوفيه مفتوح 10 متر فضي لـ 100 سيدة + تورتة 3 أدوار.
- 40 صحن حلا + 40 صحن معجنات على 40 طاولة مجاناً.
- 30 لتر عصيرات طازجة (مانجو - جوافة - كوكتيل).
- 10 مباشرات + المشرفة + عاملات مسك فستان العروسة.
- تشغيل دي جي مجاناً + زفة العروسة والعصير وليزر وبخار وكشاف العروسة.
- تأمين الفحم والمباخر وأدوات النظافة.
للحجز والاستفسار: 0500292974 - 0534049130`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <PageTransition className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-text)] font-cairo">
      <SEO
        title="صالة النساء الملكية | قاعة الباخرة للاحتفالات بجدة"
        description="استكشف مواصفات صالة النساء الملكية بقاعة الباخرة بجدة (الحرازات). بوفيه مفتوح 10 متر فضي، تورتة 3 أدوار، ضيافة 40 طاولة مجاناً، 10 مباشرات ومشرفة، وعاملات فستان العروس مع المؤثرات المجانية."
        keywords="صالة النساء قاعة الباخرة, قاعة افراح نساء جدة, بوفيه 10 متر فضي, تورتة 3 ادوار, كوشة العروسة, عاملات فستان العروسة, قاعات الحرازات"
        ogImage="/02_Women_Hall/women_03.jpg"
      />

      {/* Hero Banner Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[var(--color-navy-950)] text-white pt-24 pb-16">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={WOMEN_HALL_DATA.heroImage}
            alt="صالة النساء الملكية قاعة الباخرة"
            className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] text-xs sm:text-sm font-bold mb-4 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>المواصفات الرسمية المعتمدة • قسم النساء</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-tajawal text-white tracking-tight mb-4 leading-tight"
          >
            {WOMEN_HALL_DATA.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-[var(--color-navy-100)] max-w-3xl mx-auto mb-8 font-cairo leading-relaxed"
          >
            {WOMEN_HALL_DATA.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => onOpenBooking('womens-silver-offer', { hallSection: 'قسم النساء' })}
              className="btn-primary px-6 sm:px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[var(--color-champagne-300)]" />
              <span>طلب حجز ومعاينة صالة النساء</span>
            </button>

            <a
              href={`https://wa.me/${HALL_SPECS.whatsappNumber}?text=${encodeURIComponent('مرحباً قاعة الباخرة، أود الاستفسار وحجز صالة النساء الملكية ومعرفة المواعيد المتاحة.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#25D366] text-black font-black text-sm flex items-center gap-2 shadow-xl hover:bg-[#1ebd59] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>استفسار فوري عبر الواتساب</span>
            </a>

            <button
              onClick={handleShare}
              className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[var(--color-champagne-300)]" />}
              <span>{copied ? 'تم نسخ المواصفات' : 'مشاركة المواصفات'}</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary Highlights Strip */}
      <section className="bg-[var(--color-navy-900)] text-white py-6 border-b border-[var(--color-champagne-500)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-[var(--color-navy-950)]/60 border border-[var(--color-champagne-500)]/20">
              <span className="block text-xl sm:text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">10 متر</span>
              <span className="text-xs text-[var(--color-navy-100)]">بوفيه مفتوح فضي لـ 100 سيدة</span>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--color-navy-950)]/60 border border-[var(--color-champagne-500)]/20">
              <span className="block text-xl sm:text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">3 أدوار</span>
              <span className="text-xs text-[var(--color-navy-100)]">تورتة زفاف ملكية مشمولة</span>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--color-navy-950)]/60 border border-[var(--color-champagne-500)]/20">
              <span className="block text-xl sm:text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">40 + 40 صحن</span>
              <span className="text-xs text-[var(--color-navy-100)]">ضيافة حلا ومعجنات على 40 طاولة مجاناً</span>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--color-navy-950)]/60 border border-[var(--color-champagne-500)]/20">
              <span className="block text-xl sm:text-2xl font-black font-tajawal text-[var(--color-champagne-300)]">10 مباشرات + مشرفة</span>
              <span className="text-xs text-[var(--color-navy-100)]">مع عاملات مسك فستان العروسة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Specs Breakdown Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold text-[var(--color-champagne-700)] bg-[var(--color-champagne-100)] px-3 py-1 rounded-full border border-[var(--color-champagne-500)]/30">
              تفاصيل الخدمات المعتمدة في ورقة العرض الرسمية
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-tajawal text-[var(--color-navy-950)] mt-3">
              كل ما تتضمنه صالة النساء لليلة زفاف أسطورية
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-2 font-cairo">
              تمت صياغة كافة التجهيزات بدقة متناهية لتوفير تجربة فاخرة لا تُنسى لجميع الحاضرات.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WOMEN_HALL_DATA.featuresCategories.map((cat, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="bg-[var(--color-warm-white)] rounded-3xl border border-[var(--color-border)] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5 border-b border-[var(--color-border)] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)] flex items-center justify-center border border-[var(--color-champagne-500)]/30">
                        {getIcon(cat.items[0]?.iconName || 'Sparkles')}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-tajawal text-[var(--color-navy-950)]">
                        {cat.categoryName}
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-700)] border border-[var(--color-champagne-500)]/30 whitespace-nowrap">
                      {cat.badge}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`p-4 rounded-2xl border transition-all ${
                          item.highlight
                            ? 'bg-[var(--color-champagne-500)]/10 border-[var(--color-champagne-500)]/40 shadow-xs'
                            : 'bg-[var(--color-ivory)] border-[var(--color-border)]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 font-bold text-sm font-tajawal text-[var(--color-navy-950)]">
                            <span className="text-[var(--color-champagne-700)]">{getIcon(item.iconName)}</span>
                            <span>{item.title}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[var(--color-warm-white)] text-[var(--color-champagne-700)] border border-[var(--color-champagne-500)]/30 shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)] font-cairo leading-relaxed pr-6">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>مشمول ومعتمد ضمن العقد</span>
                  </span>
                  <span className="font-bold text-[var(--color-champagne-700)]">قاعة الباخرة</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contract & Agreement Terms Section */}
      <section className="py-12 bg-[var(--color-navy-950)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-[var(--color-champagne-300)] bg-[var(--color-champagne-500)]/20 px-3 py-1 rounded-full border border-[var(--color-champagne-500)]/40">
                شروط واتفاقيات العقد المعتمدة
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-tajawal text-white mt-2">
                ملاحظات يتم الاتفاق عليها مسبقاً مع القاعة
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo mt-1">
                توضح هذه البنود المسؤوليات المشتركة لضمان انسيابية الحفل وتفادي أي تعارض.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WOMEN_HALL_DATA.contractNotes.map((note, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="bg-[var(--color-navy-900)] rounded-2xl p-5 border border-[var(--color-champagne-500)]/30 h-full flex flex-col justify-between hover:border-[var(--color-champagne-500)] transition-all">
                  <div>
                    <span className={`inline-block text-[10px] font-black px-2.5 py-1 rounded-full mb-3 ${
                      note.type === 'hall_responsibility'
                        ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)]'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {note.tag}
                    </span>
                    <h4 className="text-sm font-bold font-tajawal text-white mb-2">{note.title}</h4>
                    <p className="text-xs text-[var(--color-navy-100)] font-cairo leading-relaxed">{note.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media & Real Visuals Showcase Section (Photos & Videos) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs sm:text-sm font-bold text-[var(--color-champagne-700)] bg-[var(--color-champagne-100)] px-3 py-1 rounded-full border border-[var(--color-champagne-500)]/30">
              تغطية حقيقية بالصور والفيديوهات
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-tajawal text-[var(--color-navy-950)] mt-2">
              معرض الصور والمقاطع الحية لصالة النساء
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 font-cairo">
              شاهد التفاصيل الواقعية لمسرح العروسة، ممر الزفة، الكوشة، وضيافة البوفيه.
            </p>

            {/* Media Tabs Switcher */}
            <div className="inline-flex p-1.5 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border)] mt-6 shadow-xs">
              <button
                onClick={() => setActiveMediaTab('photos')}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  activeMediaTab === 'photos'
                    ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-navy-950)]'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>ألبوم الصور الحقيقية ({WOMEN_HALL_DATA.galleryImages.length})</span>
              </button>
              <button
                onClick={() => setActiveMediaTab('videos')}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  activeMediaTab === 'videos'
                    ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-navy-950)]'
                }`}
              >
                <VideoIcon className="w-4 h-4" />
                <span>الفيديوهات الحية ({WOMEN_HALL_DATA.videos.length})</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Photos Grid Tab */}
        {activeMediaTab === 'photos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WOMEN_HALL_DATA.galleryImages.map((img, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div
                  onClick={() => setSelectedPhoto(img.src)}
                  className="group relative rounded-3xl overflow-hidden bg-[var(--color-navy-950)] aspect-4/3 cursor-pointer shadow-md hover:shadow-2xl transition-all border border-[var(--color-border)]"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-950)] via-[var(--color-navy-950)]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] shadow-md">
                      {img.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 inset-x-4 z-10 text-white">
                    <h4 className="text-sm sm:text-base font-bold font-tajawal leading-snug">{img.title}</h4>
                    <p className="text-xs text-[var(--color-navy-100)] font-cairo mt-1 line-clamp-1">{img.desc}</p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <span className="w-12 h-12 rounded-full bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Videos Grid Tab */}
        {activeMediaTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WOMEN_HALL_DATA.videos.map((vid, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="bg-[var(--color-warm-white)] rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-md p-4 flex flex-col justify-between">
                  <div
                    onClick={() => setActiveVideo(vid.src)}
                    className="relative aspect-video rounded-2xl overflow-hidden bg-black cursor-pointer group mb-4"
                  >
                    <img
                      src={vid.poster}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current mr-0.5" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm font-tajawal text-[var(--color-navy-950)] mb-1">{vid.title}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] font-cairo">{vid.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal for Photos */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="معاينة صالة النساء"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full max-h-[80vh] aspect-video object-contain"
            />
          </div>
        </div>
      )}

      {/* Call to Action Footer Strip */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-navy-950)] to-[var(--color-navy-900)] text-white border-t border-[var(--color-champagne-500)]/30">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-black font-tajawal mb-3">
            هل ترغب في معاينة صالة النساء على أرض الواقع؟
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-navy-100)] max-w-2xl mx-auto mb-6 font-cairo">
            مواعيد المعاينة الميدانية متاحة يومياً بالحرازات - جدة، يسعدنا استقبالكم وإطلاعكم على كافة التجهيزات.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking('womens-silver-offer', { hallSection: 'قسم النساء' })}
              className="btn-primary px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              طلب موعد معاينة الصالة الآن
            </button>
            <a
              href={`tel:${HALL_SPECS.supervisor.phone}`}
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-[var(--color-champagne-300)]" />
              <span>اتصال مباشر: {HALL_SPECS.supervisor.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
