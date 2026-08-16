import React from 'react';

interface NileWavesBackgroundProps {
  opacity?: number;
  height?: string;
  className?: string;
  position?: 'top' | 'bottom' | 'center' | 'full';
  showGoldCaustics?: boolean;
}

export const NileWavesBackground: React.FC<NileWavesBackgroundProps> = ({
  opacity = 0.8,
  height = 'h-48 sm:h-64',
  className = '',
  position = 'bottom',
  showGoldCaustics = true,
}) => {
  return (
    <div
      className={`absolute inset-x-0 pointer-events-none overflow-hidden select-none z-0 ${
        position === 'bottom'
          ? 'bottom-0'
          : position === 'top'
          ? 'top-0 rotate-180'
          : position === 'center'
          ? 'top-1/2 -translate-y-1/2'
          : 'inset-0'
      } ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Ambient Water Caustics Glow - Pure Champagne Gold */}
      {showGoldCaustics && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_60%,rgba(184,142,62,0.08)_0%,rgba(229,202,133,0.04)_50%,transparent_80%)] animate-water-caustics" />
      )}

      {/* Wave Layer 1: Warm Espresso & Bronze Wave */}
      <div className={`absolute bottom-0 left-0 w-[200%] ${height} animate-nile-wave-3`}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full text-[var(--color-navy-800)]/20 fill-current"
        >
          <path d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Wave Layer 2: Gold Shimmer Wave */}
      <div className={`absolute bottom-0 left-0 w-[200%] ${height} animate-nile-wave-2`}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full text-[var(--color-champagne-500)]/[0.08] fill-current"
        >
          <path d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Wave Layer 3: Warm Ivory Soft Crest Wave */}
      <div className={`absolute bottom-0 left-0 w-[200%] ${height} animate-nile-wave-1`}>
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full text-[var(--color-champagne-300)]/[0.05] fill-current"
        >
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,229.3C960,213,1056,171,1152,160C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Gentle Bottom Blend Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--color-navy-950)] to-transparent pointer-events-none" />
    </div>
  );
};
