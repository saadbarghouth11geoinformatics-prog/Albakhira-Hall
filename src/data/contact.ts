import { ContactInformation, HallSpecsData } from '../types';

export const SUPERVISOR_CONTACT: ContactInformation = {
  label: 'مشرف القاعة والحجوزات العامة',
  title: 'مشرف القاعة والحجوزات العامة',
  phone: '0500292974',
  internationalPhone: '+966500292974',
  phoneFormatted: '050 029 2974',
  tel: 'tel:+966500292974',
  whatsappNumber: '966500292974',
  whatsappMessage: 'السلام عليكم، أرغب في الاستفسار عن قاعة الباخرة للاحتفالات ومعرفة الباقات والعروض والمواعيد المتاحة للحجز.',
  whatsappUrl: 'https://wa.me/966500292974?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%82%D8%A7%D8%B9%D8%A9%20%D8%A7%D9%84%D8%A8%D8%A7%D8%AE%D8%B1%D8%A9%20%D9%84%D9%84%D8%A7%D8%AD%D8%AA%D9%81%D8%A7%D9%84%D8%A7%D8%AA%20%D9%88%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D8%A8%D8%A7%D9%82%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%A3%D8%B3%D8%B9%D8%A7%D8%B1%20%D9%88%D8%A7%D9%84%D9%85%D9%88%D8%A7%D8%B9%D9%8A%D8%AF%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9%20%D9%84%D9%84%D8%AD%D8%AC%D8%B2.',
};

export const WOMEN_SUPERVISOR_CONTACT: ContactInformation = {
  label: 'مشرفة قسم النساء',
  title: 'مشرفة قسم النساء',
  phone: '0541370138',
  internationalPhone: '+966541370138',
  phoneFormatted: '054 137 0138',
  tel: 'tel:+966541370138',
  whatsappNumber: '966541370138',
  whatsappMessage: 'السلام عليكم، أرغب في الاستفسار عن قسم النساء في قاعة الباخرة ومعرفة التجهيزات والباقات والمواعيد المتاحة.',
  whatsappUrl: 'https://wa.me/966541370138?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%82%D8%B3%D9%85%20%D8%A7%D9%84%D9%86%D8%B3%D8%A7%D8%A1%20%D9%81%D9%8A%20%D9%82%D8%A7%D8%B9%D8%A9%20%D8%A7%D9%84%D8%A8%D8%A7%D8%AE%D8%B1%D8%A9%20%D9%88%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AC%D9%87%D9%8A%D8%B2%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%A8%D8%A7%D9%82%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D9%85%D9%88%D8%A7%D8%B9%D9%8A%D8%AF%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9.',
};

export const LANDLINE_CONTACT: ContactInformation = {
  label: 'هاتف القاعة الأرضي',
  title: 'هاتف القاعة الأرضي',
  phone: '0122888452',
  internationalPhone: '+966122888452',
  phoneFormatted: '012 288 8452',
  tel: 'tel:+966122888452',
};

export const HALL_SPECS: HallSpecsData = {
  nameAr: 'قاعة الباخرة للاحتفالات',
  nameEn: 'Al Bakhera Wedding Hall',
  tagline: 'العرض الرسمي الفاخر لقسمي الرجال والنساء - جدة (الحرازات)',
  addressAr: 'شارع الحرازات العام، حي الحرازات، جدة 22374، المملكة العربية السعودية',
  addressShortAr: 'جدة – الحرازات – الشارع العام',
  locationCode: 'F8GP+WR3, Jeddah, Saudi Arabia',
  capacityMax: 500,
  capacityMin: 50,
  sailingDurationStandard: 'قسم الرجال + صالة النساء المجهزة بالكامل',
  cityAr: 'جدة - الحرازات',
  locationAr: 'شارع الحرازات العام، حي الحرازات، جدة 22374 (رمز الموقع: F8GP+WR3)',

  supervisor: SUPERVISOR_CONTACT,
  womenSupervisor: WOMEN_SUPERVISOR_CONTACT,
  landline: LANDLINE_CONTACT,

  phonePrimary: '0500292974',
  phoneSecondary: '0541370138',
  whatsappNumber: '966500292974',

  instagramAccount: '@albakhera.1',
  instagramUrl: 'https://www.instagram.com/albakhera.1/',
  googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=F8GP%2BWR3%2C%20Jeddah%2C%20Saudi%20Arabia',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=F8GP%2BWR3%2C%20Jeddah%2C%20Saudi%20Arabia',
  googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=F8GP%2BWR3%2C%20Jeddah%2C%20Saudi%20Arabia',
  wazeUrl: 'https://www.waze.com/ar/live-map/directions/sa/mkh-almkrmh/jdh/bakhrh-llihtfalat-rwafd-njd-llistqdam?to=place.ChIJwVjDT78ywhURl8Fqwnj8mhg',

  workingHours: 'من الساعة 4 عصراً حتى 2 صباحاً يومياً',
  coordinates: {
    lat: 21.4678,
    lng: 39.3175,
  },
};
