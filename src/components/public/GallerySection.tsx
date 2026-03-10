import { motion } from "framer-motion";
import { FaImages, FaStar } from "react-icons/fa";
import type { QRThemeStyles } from "./qrTheme";

interface GallerySectionProps {
  images?: string[];
  themeStyles: QRThemeStyles;
}

export const GallerySection = ({ images = [], themeStyles }: GallerySectionProps) => {
  const hasImages = images.length > 0;

  return (
    <motion.section
      className={`relative overflow-hidden rounded-2xl border p-4 ${themeStyles.card}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={`pointer-events-none absolute inset-0 ${themeStyles.cardOverlay}`} />

      <div className={`relative mb-3 flex items-center justify-between gap-2 ${themeStyles.body}`}>
        <div className="flex items-center gap-2">
          <FaImages className="text-cyan-300" />
          <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] ${themeStyles.muted}`}>Galerie</h2>
        </div>
        {!hasImages && (
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs ${themeStyles.secondaryButton}`}>
            <FaStar className="text-[9px]" /> Bientot disponible
          </span>
        )}
      </div>

      {hasImages ? (
        <div className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {images.map((src, index) => (
            <div key={`${src}-${index}`} className={`group overflow-hidden rounded-xl border ${themeStyles.mediaFrame}`}>
              <img alt={`Galerie ${index + 1}`} className="h-32 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-32" loading="lazy" src={src} />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="aspect-square rounded-xl border border-dashed border-white/30 bg-gradient-to-br from-white/12 via-white/6 to-transparent" />
          ))}
        </div>
      )}
    </motion.section>
  );
};

