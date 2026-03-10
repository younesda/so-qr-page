import { EmptySectionFallback } from "./EmptySectionFallback";
import { SectionWrapper } from "./SectionWrapper";
import type { FaqItem } from "@/components/public/public-page.types";

export const FAQSection = ({ items = [] }: { items?: FaqItem[] }) => {
  if (!items.length) return <EmptySectionFallback label="FAQ non configuree." />;

  return (
    <SectionWrapper title="FAQ" subtitle="Questions frequentes">
      <div className="space-y-2">
        {items.map((item, index) => (
          <details key={`${item.question}-${index}`} className="group rounded-xl border border-white/12 bg-white/10 p-3">
            <summary className="cursor-pointer list-none text-sm font-medium text-white">{item.question}</summary>
            <p className="mt-2 text-sm text-white/75">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
};
