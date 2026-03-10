import { normalizePublicBusiness, type PublicBusiness } from "@/components/public/public-page.types";

const business: PublicBusiness = normalizePublicBusiness({
  id: 2,
  slug: "sphere-office-1",
  name: "Sph\u00e8re Office",
  description: "Equipez votre espace de travail avec style et efficacite",
  phone: "+221 33 848 46 68",
  whatsapp: "+221775414590",
  email: "ibrahimadiawo582@gmail.com",
  website: "https://www.sphereoffice92.com/",
  address: "111, Avenue Blaise Diagne Dakar, Senegal",
  logoUrl: "/sphere-office-logo.png",
  facebook: "https://www.facebook.com/profile.php?id=61577216255306",
  instagram: "https://www.instagram.com/sphere_office/",
  linkedin: "",
  tiktok: "https://www.tiktok.com/@sphereoffice",
  youtube: "",
  xTwitter: "",
  telegram: "",
  snapchat: "",
  pinterest: "",
  openingHours: "Lundi - Samedi: 8h-19h\nDimanche: Ferme",
  siteMode: "qr",
  theme: "light",
  heroTitle: "",
  heroSubtitle: "",
  coverImage: "",
  galleryImages: [],
  services: [],
  aboutTitle: "",
  aboutText: "",
  testimonials: [],
  faqItems: [],
  ctaTitle: "",
  ctaText: "",
  isPublished: true,
  visitsCount: 46,
  scansCount: 0,
  clickWhatsapp: 0,
  clickPhone: 0,
  clickEmail: 0,
  clickWebsite: 0,
  clickDirections: 0,
  clickShare: 0,
  accentColor: "#ffffff"
});

const acceptedSlugs = new Set([business.slug]);

export const staticBusiness = business;

export const getStaticBusinessBySlug = (slug?: string) => {
  if (!slug) return staticBusiness;
  return acceptedSlugs.has(slug) ? staticBusiness : null;
};
