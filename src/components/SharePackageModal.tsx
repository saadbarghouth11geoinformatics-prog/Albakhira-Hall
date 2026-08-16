import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Sparkles,
  QrCode,
  ExternalLink,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

export interface PackageShareData {
  id: string;
  name: string;
  price?: number;
  originalPrice?: number;
  description: string;
  badge?: string;
}

interface SharePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: PackageShareData | null;
}

export const SharePackageModal: React.FC<SharePackageModalProps> = ({
  isOpen,
  onClose,
  packageData
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!packageData) return null;

  // Build direct shareable URL
  const shareUrl = `${window.location.origin}/offers?package=${packageData.id}#offers`;
  
  // Format summary text for copy/messaging
  const formattedShareMessage = `✨ *عرض قاعة الباخرة للاحتفالات بجدة* ✨\n\n🏆 *${packageData.name}*\n📝 *الوصف والتفاصيل:* ${packageData.description}\n\n📍 *الموقع:* جدة - الحرازات (بعد محطة المدينة بـ 500m)\n🔗 *للمعاينة ورؤية باقي التفاصيل:* ${shareUrl}`;

  // Copy URL to Clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Copy Text Summary to Clipboard
  const handleCopyFullText = async () => {
    try {
      await navigator.clipboard.writeText(formattedShareMessage);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  // Web Share API (Native mobile share sheet)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `عرض ${packageData.name} | قاعة الباخرة بجدة`,
          text: formattedShareMessage,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share dismissed or failed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  // Social Share URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedShareMessage)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`عرض ${packageData.name} - قاعة الباخرة بجدة`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`شاهد عرض ${packageData.name} بقاعة الباخرة للاحتفالات بجدة:`)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-cairo">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[var(--color-navy-900)] border-2 border-[var(--color-champagne-500)]/50 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          >
            {/* Header Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[var(--color-champagne-500)]/15 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-slate-400 hover:text-white hover:border-[var(--color-champagne-500)] transition-all flex items-center justify-center cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/30 mb-2">
                <Share2 className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> مشاركة العرض الرسمي مع الأهل والأصدقاء
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-tajawal gold-text">
                مشاركة باقة: {packageData.name}
              </h3>
            </div>

            {/* Package Summary Card Preview */}
            <div className="bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-2xl p-4 mb-6 relative">
              {packageData.badge && (
                <span className="absolute top-3 left-3 text-[10px] bg-[var(--color-champagne-500)]/20 text-[var(--color-champagne-300)] border border-[var(--color-champagne-500)]/40 px-2 py-0.5 rounded-full font-bold">
                  {packageData.badge}
                </span>
              )}
              <div className="flex items-center gap-2 mb-1">
                <Tag className="w-4 h-4 text-[var(--color-champagne-500)]" />
                <span className="font-bold font-tajawal text-white text-base">{packageData.name}</span>
              </div>
              <div className="text-sm font-bold font-tajawal text-[var(--color-champagne-300)] mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>العرض المعتمد الرسمي لقاعة الباخرة</span>
              </div>
              <p className="text-xs text-[var(--color-navy-100)] line-clamp-2 leading-relaxed">
                {packageData.description}
              </p>
            </div>

            {/* Primary Sharing Action Buttons */}
            <div className="space-y-3 mb-6">
              {/* WhatsApp Share Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 text-xs sm:text-sm cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                <span>مشاركة مباشرة عبر واتساب (WhatsApp)</span>
              </a>

              {/* Native Device Share (If supported) */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="w-full gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer border border-[var(--color-champagne-100)]/60"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة عبر تطبيقات الهاتف المختلفة</span>
                </button>
              )}

              {/* Secondary Apps (Telegram & Twitter) */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-navy-700)]/20 hover:bg-[var(--color-navy-700)]/30 border border-[var(--color-navy-700)]/40 text-[var(--color-navy-700)] font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[var(--color-navy-700)]" />
                  <span>تليجرام Telegram</span>
                </a>

                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-navy-700)]/20 hover:bg-[var(--color-navy-700)]/30 border border-[var(--color-navy-700)]/40 text-[var(--color-navy-700)] font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>منصة X (تويتر)</span>
                </a>
              </div>
            </div>

            {/* Direct Copy Link Bar */}
            <div className="bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 rounded-2xl p-3 space-y-2">
              <label className="block text-[11px] font-bold text-[var(--color-champagne-300)]">رابط الباقة المباشر:</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-[var(--color-navy-900)] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono text-left dir-ltr truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    copied
                      ? 'bg-[#25D366] text-white'
                      : 'gold-gradient text-[var(--color-navy-950)] hover:scale-105'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>نسخ الرابط</span>
                    </>
                  )}
                </button>
              </div>

              {/* Copy Full Formatted Text Option */}
              <button
                onClick={handleCopyFullText}
                className="w-full text-center text-[11px] text-[var(--color-navy-100)] hover:text-[var(--color-champagne-500)] pt-1.5 transition-colors flex items-center justify-center gap-1 font-bold cursor-pointer"
              >
                {copiedText ? (
                  <span className="text-[#25D366] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> تم نسخ رسالة العرض المكتوبة كاملاً!
                  </span>
                ) : (
                  <span>📋 نسخ نص الرسالة كاملاً للواتساب أو الرسائل</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
