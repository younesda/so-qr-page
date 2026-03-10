import { motion } from "framer-motion";
import { FaBolt, FaLayerGroup, FaRocket, FaTools } from "react-icons/fa";
import { EmptySectionFallback } from "./EmptySectionFallback";
import { SectionWrapper } from "./SectionWrapper";
import type { ServiceItem } from "@/components/public/public-page.types";

const icons = [FaRocket, FaLayerGroup, FaBolt, FaTools];

export const ServicesSection = ({ services = [] }: { services?: ServiceItem[] }) => {
  if (!services.length) return <EmptySectionFallback label="Aucun service configure." />;

  return (
    <SectionWrapper title="Services" subtitle="Ce que nous proposons">
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.article
              key={`${service.title}-${index}`}
              className="rounded-2xl border border-white/12 bg-white/10 p-4"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/20 text-cyan-200">
                <Icon />
              </div>
              <h3 className="text-base font-semibold text-white">{service.title || "Service"}</h3>
              <p className="mt-2 text-sm text-white/75">{service.description || ""}</p>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
