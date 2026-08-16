import React from 'react';

export const PageLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-transparent text-center">
      <img
        src="/logo-official.jpg"
        alt="شعار قاعة الباخرة للاحتفالات"
        className="mb-6 h-24 w-56 animate-pulse object-contain"
      />

      <div className="mb-3 h-2 w-48 animate-pulse rounded-full bg-[var(--color-champagne-300)]" />
      <div className="h-2 w-32 animate-pulse rounded-full bg-[var(--color-stone)]" />
      
      <p className="mt-4 text-xs font-bold font-cairo text-[var(--color-champagne-500)] tracking-wider">
        جاري تحميل التفاصيل الملكية...
      </p>
    </div>
  );
};
