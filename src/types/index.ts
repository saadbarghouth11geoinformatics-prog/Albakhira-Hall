export type EventCategory = 'wedding' | 'engagement' | 'birthday' | 'graduation' | 'corporate';

export interface PackageFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface CustomAddon {
  id: string;
  name: string;
  price?: number;
  unit: string;
  description: string;
  category: 'shows' | 'decor' | 'media' | 'catering';
}

export interface EventPackage {
  id: string;
  name: string;
  nameEn: string;
  category: EventCategory;
  price?: number;
  originalPrice?: number;
  guestCapacity: number;
  badge?: string;
  popular?: boolean;
  tagline: string;
  description: string;
  features: PackageFeature[];
  imageUrl: string;
  buffetType: string;
  sailingDuration: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail?: string;
  alt: string;
  width: number;
  height: number;
  categoryId: string;
  title?: string;
  description?: string;
  badge?: string;
  featured?: boolean;
  objectPosition?: string;
}

export interface GalleryCategory {
  id: string;
  title: string;
  titleEn?: string;
  coverImage: string;
  description: string;
  images: GalleryImage[];
}

export interface GalleryMedia {
  id: string;
  title: string;
  category: 'wedding' | 'corporate' | 'gala' | 'buffet' | 'decor' | 'interior' | 'deck';
  imageUrl: string;
  thumbnailUrl?: string;
  description: string;
  photographerCredit?: string;
  badge?: string;
  width?: number;
  height?: number;
}

export interface VideoShowcase {
  id: string;
  title: string;
  duration: string;
  category: string;
  posterUrl: string;
  src: string;
  description: string;
  views: string;
  driveId: string;
  driveUrl: string;
}

export interface MenuItem {
  id: string;
  category: 'appetizers' | 'main_courses' | 'carving_station' | 'desserts' | 'beverages';
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  highlighted?: boolean;
  iconName?: string;
}

export interface Testimonial {
  id: string;
  names: string;
  eventDate: string;
  eventType: string;
  rating: number;
  comment: string;
  avatarUrl: string;
  verifiedBooking: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'capacity' | 'sailing' | 'decor';
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  category: string;
  date: string;
  link: string;
}

export interface BookingFormData {
  customerName: string;
  phone: string;
  eventDate: string;
  eventType: EventCategory;
  guestCount: number;
  selectedPackageId: string;
  selectedAddons: string[];
  notes: string;
  preferredTimeSlot: 'afternoon' | 'evening' | 'late_night';
}

export interface ContactInformation {
  label: string;
  title?: string;
  phone: string;
  internationalPhone: string;
  phoneFormatted?: string;
  tel: string;
  whatsappNumber?: string;
  whatsappUrl?: string;
  whatsappMessage?: string;
}

export interface HallCoordinates {
  lat: number;
  lng: number;
}

export interface HallSpecsData {
  nameAr: string;
  nameEn: string;
  tagline: string;
  addressAr: string;
  addressShortAr: string;
  locationCode: string;
  capacityMax: number;
  capacityMin: number;
  sailingDurationStandard: string;
  cityAr: string;
  locationAr: string;
  supervisor: ContactInformation;
  womenSupervisor: ContactInformation;
  landline: ContactInformation;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  instagramAccount: string;
  instagramUrl: string;
  googleMapsSearchUrl: string;
  googleMapsDirectionsUrl: string;
  googleMapsUrl: string;
  wazeUrl: string;
  workingHours: string;
  coordinates: HallCoordinates;
}
