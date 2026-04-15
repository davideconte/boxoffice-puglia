export interface SanityImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Category {
  _id?: string;
  title: string;
  slug: { current: string };
  icon?: string;
  color?: string;
}

export interface Venue {
  name: string;
  city: string;
  province: string;
  address: string;
  geopoint?: { lat: number; lng: number };
  googleMapsUrl?: string;
}

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  endDate?: string;
  shortDescription?: string;
  description?: unknown[]; // Portable Text
  price?: string;
  isFeatured?: boolean;
  isSoldOut?: boolean;
  tags?: string[];
  image?: SanityImage;
  gallery?: SanityImage[];
  category?: Category;
  venue?: Venue;
  ticketOneUrl?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
}

export interface PointOfSale {
  _id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  geopoint?: { lat: number; lng: number };
  phone?: string;
  email?: string;
  openingHours?: string;
  services?: string[];
  image?: SanityImage;
}

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt: string;
  image?: SanityImage;
  author?: { name: string; image?: SanityImage };
  categories?: Category[];
  body?: unknown[]; // Portable Text
  seo?: { metaTitle?: string; metaDescription?: string };
}

export interface Service {
  _id: string;
  title: string;
  description?: unknown[];
  icon?: string;
  image?: SanityImage;
}
