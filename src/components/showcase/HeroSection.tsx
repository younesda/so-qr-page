import { motion } from "framer-motion";
import { FaBuilding } from "react-icons/fa";
import { ContactActions } from "./ContactActions";
import type { PublicBusiness } from "@/components/public/public-page.types";

export const HeroSection = ({ business }: { business: PublicBusiness }) => {
  const title = business.heroTitle || business.name;
  const subtitle = business.heroSubtitle || business.description || "";
  const cover = business.coverImage || "";

  return (
    <motion.section
      className="relative overflow-hidden rounded-[30px] border border-white/15 bg-white/10 p-6 text-white shadow-[0_30px_110px_-45px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      {cover && <img alt={business.name} className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30" src={cover} />}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/65 to-cyan-950/55" />

      <div className="relative space-y-5">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-white/25 bg-white/10">
            {business.logoUrl ? (
              <img alt={business.name} className="h-full w-full object-cover" src={business.logoUrl} />
            ) : (
              <FaBuilding className="text-xl text-white/80" />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Site vitrine</p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
          </div>
        </div>

        {subtitle && <p className="max-w-2xl text-sm text-white/85 sm:text-base">{subtitle}</p>}

        <ContactActions business={business} className="sm:grid-cols-4" />
      </div>
    </motion.section>
  );
};
