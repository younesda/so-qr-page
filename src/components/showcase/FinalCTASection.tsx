import { ContactActions } from "./ContactActions";
import { SectionWrapper } from "./SectionWrapper";
import type { PublicBusiness } from "@/components/public/public-page.types";

interface FinalCTASectionProps {
  business: PublicBusiness;
}

export const FinalCTASection = ({ business }: FinalCTASectionProps) => {
  return (
    <SectionWrapper title={business.ctaTitle || "Parlons de votre projet"} subtitle="Contact">
      <p className="mb-4 text-sm text-white/80">{business.ctaText || "Contactez-nous pour transformer votre idee en resultat concret."}</p>
      <ContactActions business={business} />
    </SectionWrapper>
  );
};
