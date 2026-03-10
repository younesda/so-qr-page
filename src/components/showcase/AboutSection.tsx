import { EmptySectionFallback } from "./EmptySectionFallback";
import { SectionWrapper } from "./SectionWrapper";

interface AboutSectionProps {
  title?: string;
  text?: string;
}

export const AboutSection = ({ title, text }: AboutSectionProps) => {
  if (!title && !text) return <EmptySectionFallback label="Section a propos non renseignee." />;

  return (
    <SectionWrapper title={title || "A propos"} subtitle="Positionnement">
      <p className="text-sm leading-relaxed text-white/85 sm:text-base">{text || ""}</p>
    </SectionWrapper>
  );
};
