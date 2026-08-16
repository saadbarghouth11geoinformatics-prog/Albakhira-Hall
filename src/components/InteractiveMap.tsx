import React, { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Phone,
  ShieldCheck,
  Car,
  Clock,
  Milestone,
  Search,
  Route as RouteIcon,
  RotateCcw,
  ArrowRightLeft
} from 'lucide-react';
import { HALL_SPECS } from '../data/hallData';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// Luxury Dark Map Styles matching the hall's dark navy & gold palette
const darkMapStyles = [
  { elementType: 'geometry', stylers: [{ color: 'var(--color-navy-900)' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: 'var(--color-navy-950)' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: 'var(--color-navy-100)' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: 'var(--color-champagne-500)' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: 'var(--color-text-muted)' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: 'var(--color-navy-950)' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: 'var(--color-navy-900)' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: 'var(--color-navy-700)' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: 'var(--color-text-muted)' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: 'var(--color-navy-700)' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: 'var(--color-navy-950)' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: 'var(--color-champagne-300)' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: 'var(--color-navy-800)' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: 'var(--color-champagne-500)' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: 'var(--color-navy-950)' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: 'var(--color-navy-700)' }],
  },
];

// Popular starting points in Jeddah for quick route calculation
const JEDDAH_LANDMARKS = [
  {
    id: 'airport',
    name: 'مطار الملك عبد العزيز الدولي',
    coords: { lat: 21.6796, lng: 39.1565 },
    approxDistance: '38 كم',
    approxTime: '32 دقيقة',
    via: 'طريق الحرمين السريع'
  },
  {
    id: 'downtown',
    name: 'وسط جدة / منطقة البلد',
    coords: { lat: 21.4858, lng: 39.1925 },
    approxDistance: '24 كم',
    approxTime: '22 دقيقة',
    via: 'طريق مكة القديم'
  },
  {
    id: 'safa',
    name: 'حي الصفا / المروة',
    coords: { lat: 21.5794, lng: 39.2018 },
    approxDistance: '21 كم',
    approxTime: '18 دقيقة',
    via: 'طريق الحرمين - مخرج الحرازات'
  },
  {
    id: 'corniche',
    name: 'الكورنيش / حي الشاطئ',
    coords: { lat: 21.5623, lng: 39.1121 },
    approxDistance: '34 كم',
    approxTime: '30 دقيقة',
    via: 'طريق الملك عبد الله ثم الحرمين'
  },
  {
    id: 'expressway',
    name: 'مخرج الحرازات من طريق الحرمين',
    coords: { lat: 21.4600, lng: 39.2900 },
    approxDistance: '4.5 كم',
    approxTime: '5 دقائق',
    via: 'شارع الحرازات العام (بعد محطة المدينة 500m)'
  }
];

// Inner component for drawing active Google Maps routes
function ActiveRouteOverlay({ originCoords }: { originCoords: google.maps.LatLngLiteral | null }) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!routesLib || !map || !originCoords) return;

    // Clear previous polylines
    polylinesRef.current.forEach(p => p.setMap(null));
    polylinesRef.current = [];

    routesLib.Route.computeRoutes({
      origin: originCoords,
      destination: HALL_SPECS.coordinates,
      travelMode: 'DRIVING',
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport'],
    }).then(({ routes }) => {
      if (routes?.[0]) {
        const newPolylines = routes[0].createPolylines();
        newPolylines.forEach(p => {
          p.setOptions({
            strokeColor: 'var(--color-champagne-500)',
            strokeWeight: 6,
            strokeOpacity: 0.9,
          });
          p.setMap(map);
        });
        polylinesRef.current = newPolylines;

        if (routes[0].viewport) {
          map.fitBounds(routes[0].viewport);
        }
      }
    }).catch(err => {
      console.log('Route computation note:', err);
    });

    return () => {
      polylinesRef.current.forEach(p => p.setMap(null));
    };
  }, [routesLib, map, originCoords]);

  return null;
}

// Marker component with InfoWindow
const HallMarkerWithInfo: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={HALL_SPECS.coordinates}
        onClick={onToggle}
        title={HALL_SPECS.nameAr}
      >
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-2 rounded-full bg-[var(--color-champagne-500)]/40 animate-ping" />
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--color-champagne-500)] via-[var(--color-champagne-300)] to-[var(--color-champagne-700)] border-2 border-white shadow-2xl flex items-center justify-center text-[var(--color-navy-950)] hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6 fill-[var(--color-navy-950)]" />
          </div>
        </div>
      </AdvancedMarker>

      {isOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={onToggle}
          headerContent={
            <div className="font-bold font-tajawal text-[var(--color-navy-950)] text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[var(--color-champagne-700)]" /> {HALL_SPECS.nameAr}
            </div>
          }
        >
          <div className="p-1 text-right text-xs space-y-2 max-w-[220px] font-cairo">
            <p className="text-slate-700 leading-snug">{HALL_SPECS.locationAr}</p>
            <div className="pt-1 border-t border-slate-200 flex items-center justify-between">
              <a
                href={HALL_SPECS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-navy-950)] text-[var(--color-champagne-300)] font-bold px-3 py-1.5 rounded-lg text-[11px] inline-flex items-center gap-1 hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-colors"
              >
                <Navigation className="w-3 h-3" /> فتح التوجيه المباشر
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export const InteractiveMap: React.FC = () => {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [selectedLandmark, setSelectedLandmark] = useState<typeof JEDDAH_LANDMARKS[0] | null>(null);
  const [customOriginInput, setCustomOriginInput] = useState('');
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${HALL_SPECS.coordinates.lat}, ${HALL_SPECS.coordinates.lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleSelectLandmark = (lm: typeof JEDDAH_LANDMARKS[0]) => {
    setSelectedLandmark(lm);
    setCustomOriginInput(lm.name);
  };

  const handleClearRoute = () => {
    setSelectedLandmark(null);
    setCustomOriginInput('');
  };

  const directGoogleMapsRouteUrl = selectedLandmark
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(selectedLandmark.name)}&destination=F8GP%2BWR3%2C%20Jeddah%2C%20Saudi%20Arabia`
    : HALL_SPECS.googleMapsDirectionsUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-[var(--color-navy-900)] rounded-3xl border-2 border-[var(--color-champagne-500)]/40 shadow-2xl overflow-hidden relative"
    >
      {/* Top Header Controls Bar */}
      <div className="bg-gradient-to-r from-[var(--color-navy-950)] via-[var(--color-navy-900)] to-[var(--color-navy-950)] p-4 sm:p-6 border-b border-[var(--color-champagne-500)]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-champagne-500)]/20 border border-[var(--color-champagne-500)]/40 flex items-center justify-center text-[var(--color-champagne-500)] shadow-inner">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[var(--color-champagne-500)]/15 text-[var(--color-champagne-300)] text-[10px] font-bold border border-[var(--color-champagne-500)]/30 mb-1">
              <Sparkles className="w-3 h-3 text-[var(--color-champagne-500)]" /> خريطة تفاعلية وحساب اتجاهات الوصول
            </div>
            <h3 className="text-lg sm:text-2xl font-black font-tajawal text-white gold-text flex items-center gap-2">
              موقع {HALL_SPECS.nameAr}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-navy-100)] font-cairo">
              {HALL_SPECS.addressAr} (رمز الموقع: {HALL_SPECS.locationCode})
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <a
            href={HALL_SPECS.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-navy-700)]/50 text-[var(--color-navy-100)] text-xs font-bold hover:bg-[var(--color-navy-700)] hover:text-[var(--color-navy-950)] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            title="توجيه عبر تطبيق Waze"
          >
            <Compass className="w-4 h-4" />
            <span>Waze</span>
          </a>

          <button
            onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
            className="px-3.5 py-2.5 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-[var(--color-champagne-300)] text-xs font-bold hover:bg-[var(--color-champagne-500)] hover:text-[var(--color-navy-950)] transition-all flex items-center gap-2 cursor-pointer shadow-md"
            title="تبديل وضع الخريطة"
          >
            <Layers className="w-4 h-4" />
            <span>{mapType === 'roadmap' ? 'عرض القمر الصناعي' : 'خريطة مخصصة'}</span>
          </button>

          <button
            onClick={handleCopyCoords}
            className="px-3.5 py-2.5 rounded-xl bg-[var(--color-navy-950)] border border-[var(--color-champagne-500)]/30 text-[var(--color-navy-100)] text-xs font-bold hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-md"
            title="نسخ إحداثيات GPS"
          >
            {copiedCoords ? <Check className="w-4 h-4 text-[var(--color-success)]" /> : <Copy className="w-4 h-4 text-[var(--color-champagne-500)]" />}
            <span>{copiedCoords ? 'تم النسخ!' : 'نسخ الإحداثيات'}</span>
          </button>

          <a
            href={directGoogleMapsRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[var(--color-champagne-300)]/40 group"
          >
            <Navigation className="w-4 h-4 fill-[var(--color-navy-950)] group-hover:rotate-45 transition-transform" />
            <span>توجيه Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* Interactive Directions Calculation Panel */}
      <div className="bg-[var(--color-navy-950)]/90 p-4 sm:p-5 border-b border-[var(--color-champagne-500)]/20 font-cairo">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <RouteIcon className="w-5 h-5 text-[var(--color-champagne-500)]" />
            <h4 className="text-sm font-bold text-white font-tajawal">
              احسب اتجاهات ووقت الوصول للقاعة من موقعك بجدة:
            </h4>
          </div>

          {selectedLandmark && (
            <button
              onClick={handleClearRoute}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-champagne-500)] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> إعادة تعيين المسار
            </button>
          )}
        </div>

        {/* Quick Landmark Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          {JEDDAH_LANDMARKS.map((lm) => {
            const isSelected = selectedLandmark?.id === lm.id;
            return (
              <button
                key={lm.id}
                onClick={() => handleSelectLandmark(lm)}
                className={`p-2.5 rounded-xl text-xs text-right transition-all duration-300 flex flex-col justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--color-champagne-500)] text-[var(--color-navy-950)] font-bold border-white shadow-lg scale-102'
                    : 'bg-[var(--color-navy-900)] text-[var(--color-navy-100)] border-[var(--color-champagne-500)]/30 hover:border-[var(--color-champagne-500)] hover:bg-[var(--color-navy-900)]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-tajawal mb-1">
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'fill-[var(--color-navy-950)]' : 'text-[var(--color-champagne-500)]'}`} />
                  <span className="truncate">{lm.name}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] opacity-80 pt-1 border-t border-current/10">
                  <span>{lm.approxTime}</span>
                  <span>{lm.approxDistance}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Calculated Route Summary Banner */}
        <AnimatePresence>
          {selectedLandmark && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-[var(--color-navy-900)] via-[var(--color-navy-900)] to-[var(--color-navy-900)] p-4 rounded-2xl border border-[var(--color-champagne-500)]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-lg"
            >
              <div className="flex flex-wrap items-center gap-4 text-[var(--color-navy-100)]">
                <div className="flex items-center gap-1.5 text-white font-bold font-tajawal text-sm">
                  <Car className="w-4 h-4 text-[var(--color-champagne-500)]" />
                  <span>المسار المحدد: من {selectedLandmark.name}</span>
                </div>

                <div className="flex items-center gap-1 text-[var(--color-champagne-300)]">
                  <Clock className="w-4 h-4 text-[var(--color-champagne-500)]" />
                  <span>الزمن المتوقع: <strong className="text-white font-bold">{selectedLandmark.approxTime}</strong></span>
                </div>

                <div className="flex items-center gap-1 text-[var(--color-champagne-300)]">
                  <Milestone className="w-4 h-4 text-[var(--color-champagne-500)]" />
                  <span>المسافة: <strong className="text-white font-bold">{selectedLandmark.approxDistance}</strong></span>
                </div>

                <div className="text-[11px] text-[var(--color-text-muted)]">
                  عبر: {selectedLandmark.via}
                </div>
              </div>

              <a
                href={directGoogleMapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#1EBE5D] transition-colors shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>بدء الملاحة الصوتية والتوجيه</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Canvas Frame */}
      <div className="relative h-[420px] sm:h-[500px] w-full bg-[var(--color-navy-950)]">
        {hasValidKey ? (
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={HALL_SPECS.coordinates}
              defaultZoom={14}
              mapId="ALBAKHERA_DARK_MAP"
              mapTypeId={mapType}
              styles={darkMapStyles}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              disableDefaultUI={false}
              zoomControl={true}
            >
              <ActiveRouteOverlay originCoords={selectedLandmark ? selectedLandmark.coords : null} />
              <HallMarkerWithInfo isOpen={infoWindowOpen} onToggle={() => setInfoWindowOpen(!infoWindowOpen)} />
            </Map>
          </APIProvider>
        ) : (
          /* Interactive Fallback Map Styled View */
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <iframe
              title="موقع قاعة الباخرة بجدة"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29678.895024!2d${HALL_SPECS.coordinates.lng}!3d${HALL_SPECS.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI4JzA0LjEiTiAzOcKwMTknMDI4LjAiRQ!5e0!3m2!1sar!2ssa!4v1700000000000!5m2!1sar!2ssa`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: mapType === 'roadmap' ? 'invert(90%) hue-rotate(180deg) contrast(110%)' : 'none' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            />

            {/* Overlay Banner floating on top of Map */}
            <div className="absolute top-4 right-4 left-4 sm:left-auto sm:max-w-md bg-[var(--color-navy-950)]/90 backdrop-blur-md p-4 rounded-2xl border border-[var(--color-champagne-500)]/50 shadow-2xl text-right z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--color-success)] animate-pulse" />
                <h4 className="font-black text-sm font-tajawal text-white gold-text">
                  {HALL_SPECS.nameAr}
                </h4>
              </div>
              <p className="text-xs text-[var(--color-navy-100)] font-cairo leading-relaxed">
                {HALL_SPECS.locationAr}
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-[var(--color-champagne-500)]/20 text-[11px] text-[var(--color-champagne-300)]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-success)]" /> طريق الحرازات العام الرئيسي
                </span>
                <a
                  href={directGoogleMapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-navy-950)] gold-gradient font-bold px-3 py-1 rounded-lg flex items-center gap-1 hover:scale-105 transition-transform"
                >
                  <Navigation className="w-3 h-3 fill-current" /> فتح للتوجيه المباشر
                </a>
              </div>
            </div>

            {/* Floating Navigation Callout Button on Map */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm px-4">
              <a
                href={directGoogleMapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-gradient hover:gold-gradient-hover text-[var(--color-navy-950)] font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 border-2 border-white/30"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--color-navy-950)] text-[var(--color-champagne-500)] flex items-center justify-center">
                  <Navigation className="w-4 h-4 fill-current" />
                </div>
                <span>افتح الخريطة في خرائط جوجل للبدء بالصوت</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="bg-[var(--color-navy-950)] p-4 sm:p-5 border-t border-[var(--color-champagne-500)]/20 text-xs text-[var(--color-navy-100)] flex flex-wrap items-center justify-between gap-4 font-cairo">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[var(--color-champagne-500)]" />
          <span>{HALL_SPECS.addressAr} (رمز الموقع: {HALL_SPECS.locationCode})</span>
        </div>
        <div className="flex items-center gap-5 text-[var(--color-champagne-300)] font-bold">
          <a href={HALL_SPECS.supervisor.tel} className="flex items-center gap-1.5 hover:underline">
            <Phone className="w-4 h-4 text-[#25D366]" /> مشرف الحجوزات: <span dir="ltr">{HALL_SPECS.supervisor.phone}</span>
          </a>
          <a
            href={HALL_SPECS.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-champagne-500)] hover:underline flex items-center gap-1"
          >
            <Navigation className="w-4 h-4" /> توجيه الخريطة (GPS)
          </a>
        </div>
      </div>
    </motion.div>
  );
};
