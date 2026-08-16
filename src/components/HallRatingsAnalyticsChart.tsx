import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
} from 'recharts';
import { Star, Award, TrendingUp, ShieldCheck, CheckCircle2, BarChart3, PieChart } from 'lucide-react';

// Star distribution data
const STAR_DISTRIBUTION_DATA = [
  { starLabel: '5 نجوم (ممتاز)', count: 485, percentage: 95.1, color: 'var(--color-champagne-500)' },
  { starLabel: '4 نجوم (جيد جدًا)', count: 22, percentage: 4.3, color: 'var(--color-champagne-300)' },
  { starLabel: '3 نجوم (جيد)', count: 3, percentage: 0.6, color: 'var(--color-text-muted)' },
  { starLabel: 'نجمتان (مقبول)', count: 0, percentage: 0.0, color: 'var(--color-text-secondary)' },
  { starLabel: 'نجمة واحدة', count: 0, percentage: 0.0, color: 'var(--color-text-secondary)' },
];

// Category scores breakdown out of 5.0
const CATEGORY_SCORES = [
  { category: 'جودة البوفيه المفتوح 10م', score: 4.95, fullMark: 5, percentage: 99 },
  { category: 'كرم الضيافة وطاقم الخدمة', score: 4.98, fullMark: 5, percentage: 100 },
  { category: 'نظافة الصالات وجناح العروس', score: 4.93, fullMark: 5, percentage: 99 },
  { category: 'الصوتيات والإضاءة والزفة', score: 4.89, fullMark: 5, percentage: 98 },
  { category: 'الالتزام ببنود العرض الشامل', score: 5.0, fullMark: 5, percentage: 100 },
  { category: 'قوة التكييف المركزي والموقع', score: 4.91, fullMark: 5, percentage: 98 },
];

// Custom Tooltip for Bar Chart
const CustomBarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)] p-3 rounded-xl shadow-2xl text-right font-cairo text-xs">
        <p className="font-bold text-[var(--color-champagne-300)] text-sm mb-1">{data.starLabel}</p>
        <p className="text-white flex items-center justify-end gap-1.5">
          <span className="font-mono font-bold text-[var(--color-champagne-500)]">{data.count}</span>
          <span>حفل ومناسبة</span>
        </p>
        <p className="text-[var(--color-text-muted)] text-[11px] mt-0.5">
          النسبة: <span className="text-[#25D366] font-bold">{data.percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Radar Chart
const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)] p-3 rounded-xl shadow-2xl text-right font-cairo text-xs">
        <p className="font-bold text-[var(--color-champagne-300)] mb-1">{data.category}</p>
        <p className="text-white">
          التقييم: <span className="font-mono font-bold text-[var(--color-champagne-500)] text-sm">{data.score} / 5.0</span>
        </p>
        <p className="text-[#25D366] text-[11px] font-bold">نسبة الرضا: {data.percentage}%</p>
      </div>
    );
  }
  return null;
};

export const HallRatingsAnalyticsChart: React.FC = () => {
  const [chartView, setChartView] = useState<'distribution' | 'radar'>('distribution');

  return (
    <div className="bg-gradient-to-b from-[var(--color-navy-900)] via-[var(--color-navy-950)] to-[var(--color-navy-900)] p-6 sm:p-8 rounded-3xl border-2 border-[var(--color-champagne-500)]/40 shadow-2xl my-10 max-w-6xl mx-auto relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-champagne-500)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-success)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header with Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--color-champagne-500)]/25 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-xs font-bold border border-[var(--color-champagne-500)]/30 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-[var(--color-champagne-500)]" /> لوحة تحليل التقييمات العامة
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-tajawal gold-text">
              الرسم البياني لمتوسط تقييمات قاعة الباخرة
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo mt-1">
              مؤشرات إحصائية ورسوم بيانية تفاعلية تلخص معدلات رضا أكثر من 510 عائلة وعريس بجدة.
            </p>
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-2 bg-[var(--color-navy-950)] p-1.5 rounded-2xl border border-[var(--color-champagne-500)]/30 self-start lg:self-center">
            <button
              onClick={() => setChartView('distribution')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-tajawal transition-all cursor-pointer flex items-center gap-1.5 ${
                chartView === 'distribution'
                  ? 'gold-gradient text-[var(--color-navy-950)] shadow-md font-black'
                  : 'text-[var(--color-navy-100)] hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>توزيع النجوم</span>
            </button>
            <button
              onClick={() => setChartView('radar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-tajawal transition-all cursor-pointer flex items-center gap-1.5 ${
                chartView === 'radar'
                  ? 'gold-gradient text-[var(--color-navy-950)] shadow-md font-black'
                  : 'text-[var(--color-navy-100)] hover:text-white'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>محاور الجودة (Radar)</span>
            </button>
          </div>
        </div>

        {/* Overall Score Summary Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--color-navy-950)]/90 p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center">
            <span className="text-[11px] text-[var(--color-text-muted)] block mb-1">المتوسط العام التراكمي</span>
            <div className="text-3xl font-black font-tajawal text-[var(--color-champagne-100)] flex items-center justify-center gap-1">
              <span>4.9</span>
              <span className="text-xs text-[var(--color-text-muted)]">/ 5</span>
            </div>
            <div className="flex items-center justify-center gap-0.5 mt-1 text-[var(--color-champagne-500)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[var(--color-champagne-500)]" />
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-navy-950)]/90 p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center">
            <span className="text-[11px] text-[var(--color-text-muted)] block mb-1">إجمالي التقييمات الموثقة</span>
            <div className="text-3xl font-black font-tajawal text-white">510+</div>
            <span className="text-[10px] text-[#25D366] font-bold mt-1 inline-block">حفل زفاف ومناسبة</span>
          </div>

          <div className="bg-[var(--color-navy-950)]/90 p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center">
            <span className="text-[11px] text-[var(--color-text-muted)] block mb-1">نسبة التقييم 5 نجوم</span>
            <div className="text-3xl font-black font-tajawal text-[var(--color-champagne-500)]">95.1%</div>
            <span className="text-[10px] text-[var(--color-navy-100)] mt-1 inline-block">أعلى نسبة رضا بالحرازات</span>
          </div>

          <div className="bg-[var(--color-navy-950)]/90 p-4 rounded-2xl border border-[var(--color-champagne-500)]/30 text-center">
            <span className="text-[11px] text-[var(--color-text-muted)] block mb-1">الالتزام ببنود العقد</span>
            <div className="text-3xl font-black font-tajawal text-[var(--color-success)]">100%</div>
            <span className="text-[10px] text-[#25D366] font-bold mt-1 inline-block">بضمان الإدارة الرسمية</span>
          </div>
        </div>

        {/* Dynamic Chart Display Section */}
        {chartView === 'distribution' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Recharts Bar Chart */}
            <div className="lg:col-span-8 bg-[var(--color-navy-950)]/80 p-4 sm:p-6 rounded-2xl border border-[var(--color-champagne-500)]/30 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-champagne-500)]/20 text-xs font-bold text-[var(--color-champagne-300)]">
                <span>رسم بياني: عدد الحفلات حسب مستوى النجوم</span>
                <span className="text-[var(--color-text-muted)] font-normal text-[11px]">محدث لعام 2026</span>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={STAR_DISTRIBUTION_DATA}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-champagne-500)" strokeOpacity={0.1} horizontal={false} />
                    <XAxis type="number" stroke="var(--color-text-muted)" fontSize={11} tickLine={false} />
                    <YAxis
                      dataKey="starLabel"
                      type="category"
                      stroke="var(--color-champagne-300)"
                      fontSize={11}
                      width={110}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {STAR_DISTRIBUTION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Criteria Breakdown Cards */}
            <div className="lg:col-span-4 space-y-3 font-cairo text-xs">
              <div className="bg-[var(--color-navy-950)]/90 p-4 rounded-2xl border border-[var(--color-champagne-500)]/20">
                <h5 className="font-bold text-sm text-[var(--color-champagne-300)] font-tajawal mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[var(--color-champagne-500)]" /> تفاصيل معايير التقييم:
                </h5>
                <ul className="space-y-2 text-[var(--color-navy-100)]">
                  <li className="flex justify-between items-center pb-1.5 border-b border-[var(--color-champagne-500)]/10">
                    <span>🍲 جودة البوفيه الفضي 10م:</span>
                    <span className="font-mono font-bold text-[var(--color-champagne-300)]">4.95 / 5</span>
                  </li>
                  <li className="flex justify-between items-center pb-1.5 border-b border-[var(--color-champagne-500)]/10">
                    <span>✨ فخامة الصالة ونظافة الجناح:</span>
                    <span className="font-mono font-bold text-[var(--color-champagne-300)]">4.93 / 5</span>
                  </li>
                  <li className="flex justify-between items-center pb-1.5 border-b border-[var(--color-champagne-500)]/10">
                    <span>☕ طاقم المباشرين والقهوجي:</span>
                    <span className="font-mono font-bold text-[var(--color-champagne-300)]">4.98 / 5</span>
                  </li>
                  <li className="flex justify-between items-center pb-1.5 border-b border-[var(--color-champagne-500)]/10">
                    <span>🎶 الصوتيات والإضاءة والزفة:</span>
                    <span className="font-mono font-bold text-[var(--color-champagne-300)]">4.89 / 5</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>💎 الالتزام بالعقد المعتمد:</span>
                    <span className="font-mono font-bold text-[var(--color-success)]">5.00 / 5</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-[var(--color-navy-800)] rounded-2xl border border-[var(--color-champagne-500)]/30 text-[11px] text-[var(--color-navy-100)] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#25D366] shrink-0" />
                <span>جميع التقييمات موثقة من واقع عقود الحجز الفعلية لضمان المصداقية التامة.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Recharts Radar Chart */}
            <div className="lg:col-span-8 bg-[var(--color-navy-950)]/80 p-4 sm:p-6 rounded-2xl border border-[var(--color-champagne-500)]/30 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--color-champagne-500)]/20 text-xs font-bold text-[var(--color-champagne-300)]">
                <span>مخطط رادار محاور الجودة الخمسة (Radar Chart)</span>
                <span className="text-[var(--color-text-muted)] font-normal text-[11px]">مقارنة أداء الأقسام</span>
              </div>

              <div className="h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={CATEGORY_SCORES}>
                    <PolarGrid stroke="var(--color-champagne-500)" strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="category" stroke="var(--color-champagne-300)" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="var(--color-text-muted)" fontSize={9} />
                    <Radar
                      name="متوسط التقييم"
                      dataKey="score"
                      stroke="var(--color-champagne-500)"
                      fill="var(--color-champagne-500)"
                      fillOpacity={0.45}
                    />
                    <Tooltip content={<CustomRadarTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Insights Breakdown */}
            <div className="lg:col-span-4 space-y-3 font-cairo text-xs">
              <div className="bg-[var(--color-navy-950)]/90 p-4 rounded-2xl border border-[var(--color-champagne-500)]/20 space-y-3">
                <h5 className="font-bold text-sm text-[var(--color-champagne-300)] font-tajawal flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> أبرز نقاط القوة في تقييمات الضيوف:
                </h5>
                <div className="space-y-2 text-[var(--color-navy-100)]">
                  <p className="flex items-start gap-1.5">
                    <span className="text-[var(--color-champagne-500)] font-bold">•</span>
                    <span><strong>كرم الضيافة والقهوجي:</strong> نال تقييم 4.98/5 بفضل كفاءة المباشرين وتقديم القهوة والشاي على مدار الحفل.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[var(--color-champagne-500)] font-bold">•</span>
                    <span><strong>البوفيه المفتوح بطول 10 أمتار:</strong> تقييم 4.95/5 للإشادة بطازجية وتنوع الأطباق وحسن تنسيق طاولات الطعام.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[var(--color-champagne-500)] font-bold">•</span>
                    <span><strong>الالتزام بالعقد المعتمد:</strong> تقييم كامل 5.0/5 لتنفيذ جميع ما هو مسجل بورقة العرض الرسمي.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
