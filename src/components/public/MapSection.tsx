import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaRoute } from "react-icons/fa";
import type { QRThemeStyles } from "./qrTheme";

interface MapSectionProps {
  address?: string;
  themeStyles: QRThemeStyles;
  onTrackDirections?: () => void;
}

export const MapSection = ({ address = "", themeStyles, onTrackDirections }: MapSectionProps) => {
  if (!address.trim()) return null;

  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&z=15&output=embed`;
  const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const openMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const handleTrack = () => {
    onTrackDirections?.();
  };

  return (
    <motion.section
      className={`relative overflow-hidden rounded-2xl border p-4 ${themeStyles.card}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={`pointer-events-none absolute inset-0 ${themeStyles.cardOverlay}`} />

      <div className={`relative mb-3 flex flex-wrap items-center justify-between gap-3 ${themeStyles.body}`}>
        <div className="flex items-center gap-2">
          <div className={`grid h-8 w-8 place-items-center rounded-lg border ${themeStyles.iconBadge}`}>
            <FaMapMarkedAlt />
          </div>
          <div>
            <h2 className={`text-base font-semibold uppercase tracking-[0.16em] ${themeStyles.title}`}>Localisation</h2>
            <p className={`text-sm ${themeStyles.muted}`}>Acces rapide a Google Maps</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition active:scale-[0.98] ${themeStyles.secondaryButton}`}
            href={openMapUrl}
            rel="noreferrer"
            target="_blank"
            onClick={handleTrack}
          >
            <FaMapMarkedAlt /> Ouvrir Maps
          </a>
          <a
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition active:scale-[0.98] ${themeStyles.secondaryButton}`}
            href={directionUrl}
            rel="noreferrer"
            target="_blank"
            onClick={handleTrack}
          >
            <FaRoute /> Itineraire
          </a>
        </div>
      </div>

      <div className={`relative overflow-hidden rounded-xl border ${themeStyles.mapFrame}`}>
        <iframe
          className="h-56 w-full sm:h-64 lg:h-72"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          title="Google Maps"
        />
      </div>
    </motion.section>
  );
};
