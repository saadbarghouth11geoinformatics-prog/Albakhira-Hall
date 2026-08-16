import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, Sparkles, Mic, Crown, Radio, X } from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

interface AudioChapter {
  id: number;
  title: string;
  text: string;
}

export const AudioGuideTour: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isSupported, setIsSubmitted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [speakingText, setSpeakingText] = useState('');

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const chapters: AudioChapter[] = [
    {
      id: 1,
      title: 'مرحباً بكم في قاعة الباخرة بجدة',
      text: 'أهلاً بكم في قاعة الباخرة للاحتفالات بجدة بمنطقة الحرازات. يسعدنا تقديم تجربة زفاف ملكية فاخرة تجمع بين الأناقة المعمارية وكرم الضيافة العربية الأصيلة.'
    },
    {
      id: 2,
      title: 'العرض الملكي الاستثنائي الشامل',
      text: 'احجز حفل زفافك في قاعة الباخرة مع عرض شامل يضم القاعة، البوفيه المفتوح 10 متر، والتورتة الملكية.'
    },
    {
      id: 3,
      title: 'البوفيه الفاخر 10 متر وتورتة العروسين',
      text: 'استمتع ببوفيه مفتوح امتداد 10 متر يضم المشويات والمأكولات البحرية والمقبلات، مع تورتة زفاف 3 أدوار مجاناً.'
    },
    {
      id: 4,
      title: 'قسم الرجال والحوش الخارجي (100 فرش)',
      text: 'استقبال فخم بزي القهوجية السعودي الأصيل، مع حوش خارجي واسع مجهز بـ 100 فرش مجاني لكبار الضيوف.'
    },
    {
      id: 5,
      title: 'جناح العروس VIP والمؤثرات الضوئية',
      text: 'جناح مستقل ومريح للعروس لتجهيز الميك أب والراحة، مع شاشات LED عملاقة وأجهزة ليزر ودخان الزفة.'
    }
  ];

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSubmitted(false);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakChapter = (index: number) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const chapter = chapters[index];
    setActiveChapterIndex(index);
    setSpeakingText(chapter.text);

    const utterance = new SpeechSynthesisUtterance(chapter.text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.92; // Elegant, comfortable speed
    utterance.pitch = 1.0;

    // Try finding Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.includes('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onend = () => {
      if (index < chapters.length - 1) {
        // Auto advance to next chapter
        setTimeout(() => {
          speakChapter(index + 1);
        }, 1200);
      } else {
        setIsPlaying(false);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        speakChapter(activeChapterIndex);
      }
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-18 left-3 sm:bottom-6 sm:left-24 z-40">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[var(--color-warm-white)] border border-[var(--color-champagne-500)] p-3.5 sm:p-5 rounded-3xl shadow-[var(--shadow-md)] w-[285px] xs:w-[310px] sm:w-[360px] text-[var(--color-text)] max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-champagne-500)]/30 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-[var(--color-navy-950)] font-bold">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-tajawal text-[var(--color-navy-950)]">المرشد الصوتي الملكي</h4>
                  <span className="text-[10px] text-[var(--color-text-secondary)]">جولة صوتية تفاعلية بالقاعة</span>
                </div>
              </div>

              <button
                onClick={() => {
                  stopAudio();
                  setIsExpanded(false);
                }}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chapter Selector Tabs */}
            <div className="space-y-2 mb-4 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
              {chapters.map((ch, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => speakChapter(idx)}
                    className={`w-full p-2.5 rounded-xl text-right text-xs font-tajawal transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'gold-gradient text-[var(--color-navy-950)] font-bold shadow-md'
                        : 'bg-[var(--color-ivory)] text-[var(--color-navy-900)] hover:bg-[var(--color-champagne-100)] border border-[var(--color-border)]'
                    }`}
                  >
                    <span className="line-clamp-1">{ch.title}</span>
                    {isActive && isPlaying && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[var(--color-navy-950)] rounded-full animate-ping" />
                        <span className="text-[10px]">جاري الشرح</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Audio Transcript Bar */}
            {isPlaying && (
              <div className="p-3 rounded-xl bg-[var(--color-soft-beige)] border border-[var(--color-border)] mb-3 text-[11px] font-cairo text-[var(--color-navy-900)] leading-relaxed line-clamp-3">
                "{speakingText}"
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-champagne-500)]/20">
              <button
                onClick={togglePlay}
                className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>إيقاف المؤقت</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>تشغيل المرشد الصوتي</span>
                  </>
                )}
              </button>

              <button
                onClick={stopAudio}
                className="text-xs text-red-400 hover:text-red-300 font-bold px-2 py-1"
              >
                إنهاء الجولة
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsExpanded(true);
              if (!isPlaying) {
                speakChapter(0);
              }
            }}
            className="bg-[var(--color-warm-white)] border border-[var(--color-champagne-500)] text-[var(--color-navy-900)] px-3.5 py-2 rounded-full shadow-[var(--shadow-sm)] flex items-center gap-2 cursor-pointer text-xs font-bold font-tajawal group"
          >
            <div className="w-6 h-6 rounded-full gold-gradient text-[var(--color-navy-950)] flex items-center justify-center font-bold group-hover:rotate-12 transition-transform">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <span>المرشد الصوتي</span>
            {isPlaying && (
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
