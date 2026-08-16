import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Heart,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Send,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Award,
  Crown,
  Quote,
  PlusCircle,
  X,
  UserCheck,
  Star,
  PenTool,
  Search,
  Filter
} from 'lucide-react';

export interface GuestbookEntry {
  id: string;
  coupleNames: string;
  guestName: string;
  relation: string; // e.g. "أخت العروسة", "صديق العريس", "والد العريس"
  eventType: string; // e.g. "حفل زفاف ملكي", "حفل ملكة وعقد قران", "حفل تخرج وتكريم"
  eventDate: string;
  message: string;
  rating: number;
  likes: number;
  verified: boolean;
  avatarColor: string;
}

const INITIAL_GUESTBOOK_ENTRIES: GuestbookEntry[] = [
  {
    id: 'gb-1',
    coupleNames: 'عائلة آل الغامدي وآل الشهري',
    guestName: 'أبو عبد الله الغامدي',
    relation: 'والد العريس',
    eventType: 'حفل زفاف كامل',
    eventDate: 'حفل زفاف - محرم 1448 هـ',
    message: 'ما شاء الله تبارك الله، كانت ليلة من العمر بمعنى الكلمة! البوفيه الفضي الـ 10 متر بياض وجه أمام الضيوف، والقهوجي وقسم الرجال بيضوا وجيهنا. شكراً لإدارة قاعة الباخرة على جودة التنظيم والإخلاص.',
    rating: 5,
    likes: 84,
    verified: true,
    avatarColor: 'from-[var(--color-champagne-500)] to-[var(--color-champagne-700)]',
  },
  {
    id: 'gb-2',
    coupleNames: 'العروسين محمد وأمل',
    guestName: 'سارة الشهري',
    relation: 'أخت العروسة',
    eventType: 'حفل زفاف ملكي',
    eventDate: 'حفل زفاف ملكي - ذو الحجة 1447 هـ',
    message: 'دخَلة أختي مع كشاف العروسة والبخار المكثف كانت كأنها مشهد سينمائي فاخر! المباشرات متفرغات ولطيفات جداً، وتورتة الـ 3 دور كانت لديدة ومجهزة بطريقة راقية جداً. ألف شكر لقاعة الباخرة.',
    rating: 5,
    likes: 67,
    verified: true,
    avatarColor: 'from-[var(--color-champagne-100)] to-[var(--color-champagne-500)]',
  },
  {
    id: 'gb-3',
    coupleNames: 'عائلة آل السلمي وآل الحربي',
    guestName: 'المهندس خالد السلمي',
    relation: 'العريس',
    eventType: 'حفل ملكة وزفاف',
    eventDate: 'حفل ملكة وزفاف - ربيع الأول 1448 هـ',
    message: 'اخترنا عرض وسط الأسبوع الشامل وكان أفضل قرار! البنود المكتوبة تم تنفيذها بالحرف بدون أي زيادة، والمواقف واسعة والحوش الخارجي بـ 100 فرش شال كل الجماعة بكل أريحية.',
    rating: 5,
    likes: 92,
    verified: true,
    avatarColor: 'from-[var(--color-success)] to-[var(--color-navy-700)]',
  },
  {
    id: 'gb-4',
    coupleNames: 'عائلة آل المطيري وآل العتيبي',
    guestName: 'أم فهد العتيبي',
    relation: 'والدة العروسة',
    eventType: 'حفل زفاف',
    eventDate: 'حفل زفاف - شوال 1447 هـ',
    message: 'النظافة والاهتمام بالأمان وحراسة النساء بياض وجه! الضيوف كلهم أثنوا على حلا الطاولات والقهوة والعصائر الفريش. القاعة مرتبة وتفتح النفس والمسرح واسع جداً.',
    rating: 5,
    likes: 58,
    verified: true,
    avatarColor: 'from-[#25D366] to-[var(--color-navy-950)]',
  },
  {
    id: 'gb-5',
    coupleNames: 'العروسين فيصل وريم',
    guestName: 'د. طلال الحربي',
    relation: 'صديق العريس',
    eventType: 'حفل زفاف',
    eventDate: 'حفل زفاف - شعبان 1447 هـ',
    message: 'التنظيم في قسم الرجال كان ممتازا، القهوجي والصبابين متواجدين باستمرار ودلال القهوة دايمة. القاعة موقعها في الحرازات ممتاز وواضح والوصول لها أسهل مما تتوقع.',
    rating: 5,
    likes: 45,
    verified: true,
    avatarColor: 'from-[var(--color-champagne-500)] to-[var(--color-navy-950)]',
  },
];

const LOCAL_STORAGE_KEY = 'albakhera_guestbook_entries';

export const ElectronicGuestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved guestbook entries', e);
    }
    return INITIAL_GUESTBOOK_ENTRIES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterRelation, setFilterRelation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // New Wish Form State
  const [newCouple, setNewCouple] = useState('');
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('ضيف الحفل');
  const [newEventType, setNewEventType] = useState('حفل زفاف');
  const [newMessage, setNewMessage] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Save to localStorage whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save guestbook entries to localStorage', e);
    }
  }, [entries]);

  // Filtered Entries
  const filteredEntries = entries.filter((item) => {
    const matchesRelation =
      filterRelation === 'all' ||
      (filterRelation === 'couple' && (item.relation.includes('عروس') || item.relation.includes('عريس'))) ||
      (filterRelation === 'parents' && item.relation.includes('والد')) ||
      (filterRelation === 'guests' && (item.relation.includes('ضيف') || item.relation.includes('صديق')));

    const matchesSearch =
      !searchTerm ||
      item.guestName.includes(searchTerm) ||
      item.coupleNames.includes(searchTerm) ||
      item.message.includes(searchTerm) ||
      item.relation.includes(searchTerm);

    return matchesRelation && matchesSearch;
  });

  const activeEntries = filteredEntries.length > 0 ? filteredEntries : entries;

  // Ensure current index is within bounds
  useEffect(() => {
    if (currentIndex >= activeEntries.length) {
      setCurrentIndex(0);
    }
  }, [activeEntries.length, currentIndex]);

  // Handle Carousel Navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeEntries.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeEntries.length - 1 ? 0 : prev + 1));
  };

  // Autoplay Effect
  useEffect(() => {
    if (isAutoplay && activeEntries.length > 1) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplay, currentIndex, activeEntries.length]);

  const toggleLike = (id: string) => {
    setLikedMap((prev) => {
      const isLiked = !!prev[id];
      const newLikedState = !isLiked;

      setEntries((prevEntries) =>
        prevEntries.map((item) =>
          item.id === id
            ? { ...item, likes: item.likes + (newLikedState ? 1 : -1) }
            : item
        )
      );

      return { ...prev, [id]: newLikedState };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouple || !newName || !newMessage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry: GuestbookEntry = {
        id: `gb-custom-${Date.now()}`,
        coupleNames: newCouple,
        guestName: newName,
        relation: newRelation,
        eventType: newEventType,
        eventDate: `مناسبة سعيدة - ${new Date().getFullYear()} م`,
        message: newMessage,
        rating: newRating,
        likes: 1,
        verified: true,
        avatarColor: 'from-[var(--color-champagne-500)] to-[var(--color-champagne-100)]',
      };

      setEntries([newEntry, ...entries]);
      setCurrentIndex(0);
      setIsSubmitting(false);
      setShowAddModal(false);
      setNewCouple('');
      setNewName('');
      setNewMessage('');
      setNewRating(5);
      setShowSuccessToast(true);

      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 600);
  };

  const activeItem = activeEntries[currentIndex] || entries[0];

  return (
    <section id="guestbook" className="py-8 sm:py-16 bg-[var(--color-ivory)] relative overflow-hidden font-cairo my-4 border-y border-[var(--color-border)]">
      {/* Gold Ambient Glow Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--color-success)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/40 shadow-lg">
            <BookOpen className="w-4 h-4 text-[var(--color-champagne-500)]" />
            <span>سجل التهاني والتبريكات الرقمي | Digital Guestbook</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-tajawal gold-text">
            دفتر زوار وتبريكات عرسان وضيوف قاعة الباخرة
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-navy-100)] leading-relaxed">
            كلمات من القلب ودعوات مباركة سطرها الأهالي والعرسان والحضور لتوثيق أروع لحظات العمر بقاعة الباخرة بجدة.
          </p>

          {/* Primary Action Button: Sign Guestbook */}
          <div className="pt-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2.5 cursor-pointer border-2 border-[var(--color-champagne-100)]/60"
            >
              <PenTool className="w-5 h-5 text-[var(--color-navy-950)]" />
              <span>توقيع سجل الزوار (Sign Guestbook)</span>
            </button>
          </div>
        </div>

        {/* Guestbook Stats Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
          <div className="bg-[var(--color-navy-950)]/80 backdrop-blur-xl p-3.5 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center">
            <span className="text-[11px] text-[var(--color-navy-100)] block">إجمالي التهاني الموثقة</span>
            <span className="text-lg sm:text-xl font-black font-tajawal text-[var(--color-champagne-300)]">+{entries.length + 120} كلمة</span>
          </div>
          <div className="bg-[var(--color-navy-950)]/80 backdrop-blur-xl p-3.5 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center">
            <span className="text-[11px] text-[var(--color-navy-100)] block">متوسط التقييم</span>
            <span className="text-lg sm:text-xl font-black font-tajawal text-[var(--color-champagne-300)] flex items-center justify-center gap-1">
              5.0 <Star className="w-4 h-4 fill-[var(--color-champagne-500)] text-[var(--color-champagne-500)]" />
            </span>
          </div>
          <div className="bg-[var(--color-navy-950)]/80 backdrop-blur-xl p-3.5 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center">
            <span className="text-[11px] text-[var(--color-navy-100)] block">نسبة رضا الضيوف</span>
            <span className="text-lg sm:text-xl font-black font-tajawal text-[var(--color-success)]">100% موثقة</span>
          </div>
          <div className="bg-[var(--color-navy-950)]/80 backdrop-blur-xl p-3.5 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center">
            <span className="text-[11px] text-[var(--color-navy-100)] block">التفاعل والإعجابات</span>
            <span className="text-lg sm:text-xl font-black font-tajawal text-[var(--color-error)] flex items-center justify-center gap-1">
              +{entries.reduce((acc, curr) => acc + curr.likes, 0)} <Heart className="w-4 h-4 fill-[var(--color-error)]" />
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 max-w-4xl mx-auto mb-6 bg-[var(--color-navy-950)]/60 p-3 rounded-2xl border border-[var(--color-champagne-500)]/20">
          {/* Relation Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[var(--color-navy-100)] font-bold ml-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> تصفية:
            </span>
            {[
              { id: 'all', label: 'الجميع' },
              { id: 'parents', label: 'أولياء الأمور' },
              { id: 'couple', label: 'العرسان والقرابة' },
              { id: 'guests', label: 'الضيوف والأصدقاء' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilterRelation(tab.id);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterRelation === tab.id
                    ? 'gold-gradient text-[var(--color-navy-950)] font-black shadow'
                    : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border border-white/10 hover:border-[var(--color-champagne-500)]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-auto min-w-[200px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="بحث في التهاني..."
              className="w-full bg-[var(--color-navy-900)] border border-[var(--color-champagne-500)]/30 rounded-xl py-1.5 pl-3 pr-8 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[var(--color-champagne-500)]"
            />
            <Search className="w-3.5 h-3.5 text-[var(--color-champagne-500)] absolute right-2.5 top-2.5" />
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {/* Main Active Card Slide */}
          <div className="min-h-[250px] sm:min-h-[270px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full bg-[var(--color-navy-950)]/90 backdrop-blur-2xl border-2 border-[var(--color-champagne-500)]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden group"
                >
                  {/* Decorative Quote Watermark */}
                  <Quote className="absolute top-4 left-4 w-20 h-20 text-[var(--color-champagne-500)]/10 pointer-events-none rotate-12" />

                  {/* Card Top Row: Avatar + Names + Rating */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--color-champagne-500)]/25 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeItem.avatarColor} flex items-center justify-center text-[var(--color-navy-950)] font-black text-lg shadow-md border border-white/40 shrink-0`}
                      >
                        {activeItem.guestName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-black text-white font-tajawal">
                            {activeItem.guestName}
                          </h3>
                          <span className="text-[10px] bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-300)] font-bold px-2 py-0.5 rounded-full">
                            {activeItem.relation}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-navy-100)] font-bold font-cairo flex items-center gap-1.5 mt-0.5">
                          <Crown className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" />
                          <span>مناسبة: <strong className="text-[var(--color-champagne-100)]">{activeItem.coupleNames}</strong></span>
                        </p>
                      </div>
                    </div>

                    {/* Verified & Date Badge */}
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#25D366] bg-[#25D366]/10 px-2.5 py-0.5 rounded-full border border-[#25D366]/30">
                        <UserCheck className="w-3.5 h-3.5" /> رسالة موثقة من الحفل
                      </span>
                      <span className="text-[11px] text-[var(--color-text-muted)] font-cairo flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[var(--color-champagne-500)]" /> {activeItem.eventDate}
                      </span>
                    </div>
                  </div>

                  {/* Message Body */}
                  <p className="text-sm sm:text-base text-[var(--color-navy-100)] font-cairo leading-relaxed mb-6 font-medium">
                    "{activeItem.message}"
                  </p>

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--color-champagne-500)]/20 text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-[var(--color-champagne-500)]">
                      {[...Array(activeItem.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[var(--color-champagne-500)] text-[var(--color-champagne-500)]" />
                      ))}
                      <span className="text-[11px] text-[var(--color-navy-100)] font-bold mr-1">({activeItem.rating}/5 تقييم ممتاز)</span>
                    </div>

                    <button
                      onClick={() => toggleLike(activeItem.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-xs ${
                        likedMap[activeItem.id]
                          ? 'bg-[var(--color-error)]/20 border-[var(--color-error)] text-[var(--color-error)] scale-105'
                          : 'bg-[var(--color-navy-950)] border-[var(--color-champagne-500)]/30 text-[var(--color-navy-100)] hover:text-white hover:border-[var(--color-champagne-500)]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedMap[activeItem.id]
                            ? 'fill-[var(--color-error)] text-[var(--color-error)]'
                            : 'text-[var(--color-champagne-500)]'
                        }`}
                      />
                      <span>دعوة مباركة ({activeItem.likes})</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Carousel Controls (Arrows & Indicators) */}
          <div className="flex items-center justify-between mt-6 gap-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-[var(--color-navy-950)] border-2 border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-500)] hover:text-white hover:bg-[var(--color-champagne-500)]/30 transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="الرسالة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {activeEntries.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-gradient-to-r from-[var(--color-champagne-500)] to-[var(--color-champagne-100)] shadow-md'
                      : 'w-2.5 bg-[var(--color-text-muted)]/40 hover:bg-[var(--color-champagne-500)]/50'
                  }`}
                  aria-label={`الانتقال للرسالة ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-[var(--color-navy-950)] border-2 border-[var(--color-champagne-500)]/40 text-[var(--color-champagne-500)] hover:text-white hover:bg-[var(--color-champagne-500)]/30 transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="الرسالة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Secondary Action Button to Sign Guestbook */}
          <div className="text-center mt-8 pt-4 border-t border-[var(--color-champagne-500)]/15">
            <button
              onClick={() => setShowAddModal(true)}
              className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-sm px-8 py-3.5 rounded-2xl shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer border border-[var(--color-champagne-100)]/50"
            >
              <PlusCircle className="w-5 h-5 text-[var(--color-navy-950)]" />
              <span>أضف مباركتك ودعواتك للعروسين في دفتر الزوار</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Wish / Sign Guestbook Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[var(--color-navy-900)] border-2 border-[var(--color-champagne-500)] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 left-4 text-[var(--color-text-muted)] hover:text-white p-1.5 rounded-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-right mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/30 mb-2">
                  <PenTool className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> توقيع سجل الزوار الرقمي
                </div>
                <h3 className="text-xl font-black font-tajawal gold-text">
                  توقيع وإضافة كلمة في دفتر الزوار
                </h3>
                <p className="text-xs text-[var(--color-navy-100)] mt-1">
                  اكتب كلمتك وتهنئتك لتبقى ذكرى مباركة وخالدة للعرسان وأهاليهم في سجل الباخرة.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-right">
                <div>
                  <label className="block text-xs font-bold text-[var(--color-champagne-300)] mb-1">
                    اسم العروسين أو العائلة الفاضلة *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عائلة آل الغامدي أو العروسين محمد وأمل"
                    value={newCouple}
                    onChange={(e) => setNewCouple(e.target.value)}
                    className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-champagne-500)] outline-none font-cairo"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-champagne-300)] mb-1">
                      اسمك الكريم *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="اسمك الكامل"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-champagne-500)] outline-none font-cairo"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--color-champagne-300)] mb-1">
                      صلة القرابة / الصفة
                    </label>
                    <select
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value)}
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[var(--color-champagne-500)] outline-none font-cairo cursor-pointer"
                    >
                      <option value="ضيف الحفل">ضيف الحفل</option>
                      <option value="والد العريس">والد العريس</option>
                      <option value="والدة العروسة">والدة العروسة</option>
                      <option value="أخت العروسة/العريس">أخت العروسة/العريس</option>
                      <option value="أخ العريس/العروسة">أخ العريس/العروسة</option>
                      <option value="العريس">العريس</option>
                      <option value="العروسة">العروسة</option>
                      <option value="صديق/صديقة">صديق / صديقة</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[var(--color-champagne-300)] mb-1">
                      نوع المناسبة
                    </label>
                    <select
                      value={newEventType}
                      onChange={(e) => setNewEventType(e.target.value)}
                      className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[var(--color-champagne-500)] outline-none font-cairo cursor-pointer"
                    >
                      <option value="حفل زفاف ملكي">حفل زفاف ملكي</option>
                      <option value="حفل ملكة وعقد قران">حفل ملكة وعقد قران</option>
                      <option value="حفل تخرج وتكريم">حفل تخرج وتكريم</option>
                      <option value="حفل استقبال وعائلي">حفل استقبال وعائلي</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--color-champagne-300)] mb-1">
                      التقييم والانطباع
                    </label>
                    <div className="flex items-center gap-1.5 pt-1.5 bg-[var(--color-navy-950)] p-2 rounded-xl border border-[var(--color-champagne-500)]/30 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 transition-colors ${
                              star <= newRating
                                ? 'fill-[var(--color-champagne-500)] text-[var(--color-champagne-500)]'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--color-champagne-300)] mb-1">
                    رسالة التبريك والدعاء المبارك *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="اكتب تهنئتك وانطباعك عن الحفل والخدمات والقاعة هنا..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/40 rounded-xl p-3 text-xs text-white placeholder-[var(--color-text-secondary)] focus:border-[var(--color-champagne-500)] outline-none font-cairo resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4 text-[var(--color-navy-950)]" />
                  <span>{isSubmitting ? 'جاري التدوين والتوقيع...' : 'توقيع وحفظ التهنئة الآن'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-[var(--color-navy-950)] border-2 border-[#25D366] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 font-cairo"
          >
            <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
            <div>
              <h4 className="font-bold text-xs text-[#25D366]">تم توقيع وتدوين التهنئة بنجاح!</h4>
              <p className="text-[11px] text-[var(--color-navy-100)]">
                شكرًا لك، تم حفظ تبريكاتك وتوقيعك في سجل زوار قاعة الباخرة الرقمي.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
