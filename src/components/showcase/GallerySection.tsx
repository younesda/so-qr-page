import { EmptySectionFallback } from "./EmptySectionFallback";
import { SectionWrapper } from "./SectionWrapper";

export const GallerySection = ({ images = [] }: { images?: string[] }) => {
  if (!images.length) return <EmptySectionFallback label="Galerie en cours de configuration." />;

  return (
    <SectionWrapper title="Galerie" subtitle="Univers visuel">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, index) => (
          <article key={`${src}-${index}`} className="group overflow-hidden rounded-2xl border border-white/12 bg-white/5">
            <img alt={`Gallery ${index + 1}`} className="h-36 w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" src={src} />
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};
