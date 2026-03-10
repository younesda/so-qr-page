import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import type { PublicBusiness } from "./public-page.types";
import type { QRThemeStyles } from "./qrTheme";

interface InfoCardsProps {
  business: PublicBusiness;
  themeStyles: QRThemeStyles;
}

export const InfoCards = ({ business, themeStyles }: InfoCardsProps) => {
  const cards = [
    {
      key: "address",
      title: "Adresse",
      value: business.address,
      icon: FaMapMarkerAlt,
      href: business.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}` : ""
    },
    {
      key: "hours",
      title: "Horaires",
      value: business.openingHours,
      icon: FaClock,
      href: ""
    }
  ].filter((card) => Boolean(card.value));

  if (!cards.length) return null;

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const Wrapper = card.href ? "a" : "div";

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04 * index, duration: 0.36 }}
            className="h-full"
          >
            <Wrapper
              {...(card.href ? { href: card.href, target: "_blank", rel: "noreferrer" } : {})}
              className={`group relative flex h-full items-start gap-3 overflow-hidden rounded-2xl border p-4 transition-all ${themeStyles.card}`}
            >
              <div className={`pointer-events-none absolute inset-0 ${themeStyles.cardOverlay}`} />
              <div className={`relative mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border text-sm ${themeStyles.iconBadge}`}>
                <Icon />
              </div>
              <div className="relative min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${themeStyles.muted}`}>{card.title}</p>
                <p className={`mt-1 text-base leading-relaxed ${themeStyles.body}`}>{card.value}</p>
              </div>
            </Wrapper>
          </motion.div>
        );
      })}
    </section>
  );
};
