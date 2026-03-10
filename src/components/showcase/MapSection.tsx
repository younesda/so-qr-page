import { EmptySectionFallback } from "./EmptySectionFallback";
import { SectionWrapper } from "./SectionWrapper";

export const MapSection = ({ address = "" }: { address?: string }) => {
  if (!address.trim()) return <EmptySectionFallback label="Adresse non disponible pour la carte." />;

  const src = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=14&output=embed`;

  return (
    <SectionWrapper title="Localisation" subtitle="Nous trouver">
      <div className="overflow-hidden rounded-2xl border border-white/12">
        <iframe className="h-64 w-full" loading="lazy" src={src} title="Google map" />
      </div>
    </SectionWrapper>
  );
};
