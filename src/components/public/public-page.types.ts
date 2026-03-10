export type QRTheme = "dark" | "light" | "gradient";

export interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  message: string;
  avatar?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PublicBusiness {
  id?: string | number;
  slug: string;
  name: string;
  description?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  address?: string;
  logoUrl?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  xTwitter?: string;
  telegram?: string;
  snapchat?: string;
  pinterest?: string;
  openingHours?: string;
  accentColor?: string;
  visitsCount?: number;
  scansCount?: number;
  siteMode?: "qr" | "showcase" | string;
  theme?: QRTheme | string;
  heroTitle?: string;
  heroSubtitle?: string;
  coverImage?: string;
  galleryImages?: string[];
  services?: ServiceItem[];
  aboutTitle?: string;
  aboutText?: string;
  testimonials?: TestimonialItem[];
  faqItems?: FaqItem[];
  ctaTitle?: string;
  ctaText?: string;
}

export const withProtocol = (url = "") => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
};

export const normalizeQrTheme = (theme?: string): QRTheme => {
  if (theme === "dark" || theme === "light" || theme === "gradient") return theme;
  return "gradient";
};

export const isBusinessOpenNow = (openingHours = "") => {
  if (!openingHours.trim()) return null;

  const normalized = openingHours.toLowerCase();
  if (normalized.includes("24/7") || normalized.includes("24h")) return true;

  const match = normalized.match(/(\d{1,2})[:h](\d{2})\s*[-a]\s*(\d{1,2})[:h](\d{2})/);
  if (!match) return null;

  const [, startHourRaw, startMinRaw, endHourRaw, endMinRaw] = match;
  const now = new Date();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const start = Number(startHourRaw) * 60 + Number(startMinRaw);
  const end = Number(endHourRaw) * 60 + Number(endMinRaw);

  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  if (start <= end) return minutesNow >= start && minutesNow <= end;
  return minutesNow >= start || minutesNow <= end;
};

export const createVCard = (business: PublicBusiness) => {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${business.name || "Business"}`,
    business.phone ? `TEL:${business.phone}` : "",
    business.email ? `EMAIL:${business.email}` : "",
    business.website ? `URL:${withProtocol(business.website)}` : "",
    business.address ? `ADR:;;${business.address};;;;` : "",
    "END:VCARD"
  ].filter(Boolean);

  return lines.join("\n");
};

export const normalizePublicBusiness = (business: PublicBusiness): PublicBusiness => ({
  ...business,
  siteMode: business.siteMode === "showcase" ? "showcase" : "qr",
  theme: normalizeQrTheme(business.theme),
  galleryImages: Array.isArray(business.galleryImages) ? business.galleryImages.filter(Boolean) : [],
  services: Array.isArray(business.services) ? business.services : [],
  testimonials: Array.isArray(business.testimonials) ? business.testimonials : [],
  faqItems: Array.isArray(business.faqItems) ? business.faqItems : []
});
