import { FaClock, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { EmptySectionFallback } from "./EmptySectionFallback";
import { SectionWrapper } from "./SectionWrapper";
import { withProtocol } from "@/components/public/public-page.types";

interface InfoCardsProps {
  openingHours?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export const InfoCards = ({ openingHours, address, phone, email, website }: InfoCardsProps) => {
  const cards = [
    { label: "Horaires", value: openingHours, icon: FaClock },
    { label: "Adresse", value: address, icon: FaMapMarkerAlt },
    { label: "Telephone", value: phone, icon: FaPhoneAlt },
    { label: "Email", value: email, icon: FaEnvelope },
    { label: "Site web", value: website, icon: FaGlobe, href: website ? withProtocol(website) : "" }
  ].filter((item) => Boolean(item.value));

  if (!cards.length) return <EmptySectionFallback label="Informations de contact non renseignees." />;

  return (
    <SectionWrapper title="Infos utiles" subtitle="Contact">
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          const content = (
            <div className="rounded-2xl border border-white/12 bg-white/10 p-4">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/60">
                <Icon /> {card.label}
              </p>
              <p className="mt-2 text-sm text-white/90">{card.value}</p>
            </div>
          );

          if (card.href) {
            return (
              <a key={card.label} href={card.href} target="_blank" rel="noreferrer" className="block transition hover:brightness-110">
                {content}
              </a>
            );
          }

          return <div key={card.label}>{content}</div>;
        })}
      </div>
    </SectionWrapper>
  );
};
