import React, { useEffect } from 'react';
import { HALL_SPECS, PACKAGES, FAQS, TESTIMONIALS } from '../data/hallData';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  pageType?: 'home' | 'about' | 'menu' | 'offers' | 'gallery' | 'reviews' | 'calculator' | 'faq' | 'contact';
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: Array<{ question: string; answer: string }>;
  reviews?: Array<{ author: string; rating: number; text: string; date?: string }>;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'قاعة الباخرة للاحتفالات بجدة | الموقع الرسمي والحجز',
  description = 'قاعة الباخرة للاحتفالات بجدة (الحرازات) - عروض زفاف شاملة مع بوفيه مفتوح 10 متر، تورتة 3 أدوار، وقسم رجال متكامل.',
  keywords = 'قاعة الباخرة, قاعة الباخرة للاحتفالات, قاعات أفراح جدة, قاعات الحرازات, عروض قاعات جدة, حجز قاعة زفاف جدة, بوفيه مفتوح جدة',
  canonical,
  ogImage = '/logo-official.png',
  ogType = 'website',
  pageType = 'home',
  breadcrumbs,
  faqItems,
  reviews,
}) => {
  const siteName = 'قاعة الباخرة للاحتفالات بجدة - الحرازات';
  const fullTitle = title.includes('قاعة الباخرة') ? title : `${title} | ${siteName}`;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://albakhera-hall.com';
  const canonicalUrl = canonical || currentUrl;
  
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://albakhera-hall.com';
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${origin}${ogImage}`;

  // 1. Venue & LocalBusiness Schema
  const venueSchema = {
    "@type": ["EventVenue", "LocalBusiness"],
    "@id": `${origin}/#venue`,
    "name": HALL_SPECS.nameAr,
    "alternateName": [HALL_SPECS.nameEn, "قاعة الباخرة بجدة الحرازات", "قاعة الباخرة العائمة"],
    "description": description || HALL_SPECS.tagline,
    "url": origin,
    "telephone": `+966${HALL_SPECS.phonePrimary.replace(/^0/, '')}`,
    "paymentAccepted": "Cash, Mada, Credit Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": HALL_SPECS.locationAr,
      "addressLocality": "جدة",
      "addressRegion": "منطقة مكة المكرمة",
      "postalCode": "21467",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": HALL_SPECS.coordinates.lat,
      "longitude": HALL_SPECS.coordinates.lng
    },
    "hasMap": HALL_SPECS.googleMapsUrl,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "16:00",
        "closes": "02:00"
      }
    ],
    "image": [
      `${origin}/01_Featured_Website/women_03.jpg`,
      `${origin}/02_Women_Hall/women_03.jpg`,
      `${origin}/04_Dining_Buffet/food_02.jpg`,
      `${origin}/05_Exterior_Outdoor_Yard/men_18.jpg`
    ],
    "sameAs": [
      HALL_SPECS.instagramUrl
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "بوفيه مفتوح فضي 10 متر", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "تورتة زفاف 3 دور", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "قسم رجال مع 100 فرش حوش خارجي", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "مؤثرات زفة مجانية (بخار، ليزر، كشاف عروسة)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "مواقف سيارات واسعة ومظللة", "value": true }
    ]
  };

  // 2. Breadcrumbs Schema
  const defaultBreadcrumbItems: BreadcrumbItem[] = [
    { name: 'الرئيسية', item: origin },
    ...(pageType !== 'home' ? [{ name: title.split('|')[0].trim(), item: currentUrl }] : [])
  ];
  const activeBreadcrumbs = breadcrumbs || defaultBreadcrumbItems;

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${currentUrl}/#breadcrumb`,
    "itemListElement": activeBreadcrumbs.map((bc, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": bc.name,
      "item": bc.item
    }))
  };

  // 3. Offers Catalog Schema
  const offerCatalogSchema = (pageType === 'home' || pageType === 'offers' || pageType === 'calculator') ? {
    "@type": "OfferCatalog",
    "@id": `${origin}/#offers`,
    "name": "عروض وباقات قاعة الباخرة للاحتفالات بجدة",
    "itemListElement": PACKAGES.map((pkg) => ({
      "@type": "Offer",
      "name": pkg.name,
      "description": pkg.description,
      "availability": "https://schema.org/InStock",
      "url": `${origin}/offers#${pkg.id}`
    }))
  } : null;

  // 4. FAQ Schema
  const faqsToUse = faqItems || FAQS.slice(0, 8).map(f => ({ question: f.question, answer: f.answer }));
  const faqSchema = (pageType === 'faq' || pageType === 'home' || faqItems) ? {
    "@type": "FAQPage",
    "@id": `${currentUrl}/#faq`,
    "mainEntity": faqsToUse.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // 5. Reviews Schema
  const reviewsToUse = reviews || TESTIMONIALS.slice(0, 6).map(t => ({
    author: t.names,
    rating: t.rating,
    text: t.comment,
    date: '2026-01-15'
  }));
  const reviewSchemas = (pageType === 'reviews' || pageType === 'home' || reviews) ? reviewsToUse.map((rev, idx) => ({
    "@type": "Review",
    "@id": `${currentUrl}/#review-${idx}`,
    "itemReviewed": {
      "@id": `${origin}/#venue`
    },
    "author": {
      "@type": "Person",
      "name": rev.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": rev.rating.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": rev.text,
    "datePublished": rev.date || "2026-01-15"
  })) : [];

  // Combine into unified JSON-LD Graph
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      venueSchema,
      breadcrumbSchema,
      offerCatalogSchema,
      faqSchema,
      ...reviewSchemas
    ].filter(Boolean)
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', siteName, true);
    setMeta('og:locale', 'ar_SA', true);
    setMeta('og:url', currentUrl, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', fullOgImage, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:url', currentUrl);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullOgImage);

    // Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // JSON-LD Script
    let jsonLdScript = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'seo-jsonld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(jsonLdGraph);
  }, [fullTitle, description, keywords, currentUrl, canonicalUrl, fullOgImage, ogType]);

  return null;
};
