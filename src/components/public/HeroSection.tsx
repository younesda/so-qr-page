import { motion } from "framer-motion";
import { FaBuilding, FaCheckCircle, FaRegClock } from "react-icons/fa";
import type { PublicBusiness } from "./public-page.types";
import type { QRThemeStyles } from "./qrTheme";

interface HeroSectionProps {
  business: PublicBusiness;
  isOpenNow: boolean | null;
  themeStyles: QRThemeStyles;
}

export const HeroSection = ({ business, isOpenNow, themeStyles }: HeroSectionProps) => {
  const accent = business.accentColor || "#14b8a6";
  const baseline = business.description || "Scannez, contactez, collaborez en quelques secondes.";
  const isLight = themeStyles.pageRoot.includes("text-slate-900");

  return (
    <motion.section
      className={`relative overflow-hidden rounded-[30px] border p-5 sm:p-6 ${themeStyles.card}`}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className={`pointer-events-none absolute inset-0 ${themeStyles.cardOverlay}`} />
      <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full blur-3xl" style={{ backgroundColor: `${accent}7f` }} />
      <div className={`pointer-events-none absolute -right-20 -bottom-16 h-52 w-52 rounded-full blur-3xl ${themeStyles.rightHalo}`} />

      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className={`relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border shadow-xl ${themeStyles.iconBadge}`}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_65%)]" />
              {business.logoUrl ? (
                <img alt={business.name} className="h-full w-full object-cover" src={business.logoUrl} />
              ) : (
                <FaBuilding className="text-2xl" />
              )}
            </div>

            <div className="min-w-0">
              <p className={`text-[10px] uppercase tracking-[0.24em] ${themeStyles.muted}`}>QR Business Card</p>
              <h1 className={`mt-1 truncate text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl ${themeStyles.title}`}>{business.name}</h1>
            </div>
          </div>

          {isOpenNow !== null && (
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                isOpenNow
                  ? isLight
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-emerald-300/45 bg-emerald-400/20 text-emerald-100"
                  : isLight
                    ? "border-amber-300 bg-amber-50 text-amber-700"
                    : "border-amber-300/40 bg-amber-400/15 text-amber-100"
              }`}
            >
              {isOpenNow ? <FaCheckCircle /> : <FaRegClock />}
              {isOpenNow ? "Ouvert" : "Ferme"}
            </div>
          )}
        </div>

        <p className={`text-base leading-relaxed sm:text-lg ${themeStyles.body}`}>{baseline}</p>
      </div>
    </motion.section>
  );
};

