import { EmptySectionFallback } from "./EmptySectionFallback";
import { SectionWrapper } from "./SectionWrapper";
import type { TestimonialItem } from "@/components/public/public-page.types";

export const TestimonialsSection = ({ testimonials = [] }: { testimonials?: TestimonialItem[] }) => {
  if (!testimonials.length) return <EmptySectionFallback label="Temoignages non renseignes." />;

  return (
    <SectionWrapper title="Temoignages" subtitle="Ils nous font confiance">
      <div className="grid gap-3 sm:grid-cols-2">
        {testimonials.map((item, index) => (
          <article key={`${item.name}-${index}`} className="rounded-2xl border border-white/12 bg-white/10 p-4">
            <p className="text-sm leading-relaxed text-white/85">"{item.message}"</p>
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-sm font-semibold text-white">{item.name || "Client"}</p>
              <p className="text-xs text-white/60">{item.role || ""}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};
