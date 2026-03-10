import type { PublicBusiness } from "@/components/public/public-page.types";
import { AboutSection } from "@/components/showcase/AboutSection";
import { FAQSection } from "@/components/showcase/FAQSection";
import { FinalCTASection } from "@/components/showcase/FinalCTASection";
import { GallerySection } from "@/components/showcase/GallerySection";
import { HeroSection } from "@/components/showcase/HeroSection";
import { InfoCards } from "@/components/showcase/InfoCards";
import { MapSection } from "@/components/showcase/MapSection";
import { ServicesSection } from "@/components/showcase/ServicesSection";
import { SocialLinks } from "@/components/showcase/SocialLinks";
import { TestimonialsSection } from "@/components/showcase/TestimonialsSection";

const ShowcaseModePage = ({ business }: { business: PublicBusiness }) => {
  const accent = business.accentColor || "#14b8a6";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(20,184,166,0.25),transparent_30%),radial-gradient(circle_at_90%_5%,rgba(59,130,246,0.22),transparent_30%),linear-gradient(180deg,#020617_0%,#111827_55%,#020617_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-28 h-80 w-80 rounded-full blur-3xl" style={{ backgroundColor: `${accent}3a` }} />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:gap-5 sm:py-8">
        <HeroSection business={business} />
        <AboutSection title={business.aboutTitle} text={business.aboutText} />
        <ServicesSection services={business.services} />
        <GallerySection images={business.galleryImages} />
        <InfoCards openingHours={business.openingHours} address={business.address} phone={business.phone} email={business.email} website={business.website} />
        <SocialLinks business={business} />
        <TestimonialsSection testimonials={business.testimonials} />
        <FAQSection items={business.faqItems} />
        <MapSection address={business.address} />
        <FinalCTASection business={business} />
      </main>
    </div>
  );
};

export default ShowcaseModePage;
