import React, { useEffect, useState } from 'react';
import { CloudSun, Droplets, MapPin, RefreshCw, Wind } from 'lucide-react';

interface WeatherData {
  tempC: number;
  condition: string;
  humidity: string;
  windSpeed: string;
}

const fallbackWeather: WeatherData = {
  tempC: 28,
  condition: 'أجواء مناسبة للزيارة والمعاينة',
  humidity: '56%',
  windSpeed: '13 كم/س',
};

export const LiveNileWeather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>(fallbackWeather);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/weather');
      const payload = await response.json();
      if (payload?.data) setWeather(payload.data);
    } catch {
      setWeather(fallbackWeather);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchWeather();
  }, []);

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-warm-white)] p-4 shadow-[var(--shadow-sm)]" aria-label="ملخص طقس جدة">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-champagne-100)] text-[var(--color-champagne-700)]">
            {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <CloudSun className="h-6 w-6" />}
          </span>
          <div className="min-w-0">
            <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--color-text-muted)]"><MapPin className="h-3 w-3" /> طقس جدة - الحرازات</span>
            <div className="mt-0.5 flex items-baseline gap-2">
              <strong className="text-2xl font-black text-[var(--color-navy-950)] font-tajawal" dir="ltr">{weather.tempC}°</strong>
              <span className="truncate text-xs font-bold text-[var(--color-text-secondary)]">{weather.condition}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-bold text-[var(--color-text-secondary)]">
          <span className="inline-flex items-center gap-1"><Droplets className="h-3.5 w-3.5 text-sky-600" /> {weather.humidity}</span>
          <span className="inline-flex items-center gap-1"><Wind className="h-3.5 w-3.5 text-emerald-600" /> {weather.windSpeed}</span>
          <button type="button" onClick={() => void fetchWeather()} disabled={loading} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-ivory)] text-[var(--color-champagne-700)]" aria-label="تحديث حالة الطقس" title="تحديث الطقس"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /></button>
        </div>
      </div>
    </div>
  );
};
