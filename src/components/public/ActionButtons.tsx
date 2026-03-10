import { motion } from "framer-motion";
import { FaEnvelope, FaGlobe, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import type { PublicBusiness } from "./public-page.types";
import { withProtocol } from "./public-page.types";
import type { QRThemeStyles } from "./qrTheme";

interface ActionButtonsProps {
  business: PublicBusiness;
  themeStyles: QRThemeStyles;
  onTrackAction?: (type: "whatsapp" | "phone" | "email" | "website") => void;
}

const getPhoneLink = (phone = "") => `tel:${phone.replace(/\s+/g, "")}`;
const getWhatsAppLink = (phone = "") => `https://wa.me/${phone.replace(/\D/g, "")}`;

export const ActionButtons = ({ business, themeStyles, onTrackAction }: ActionButtonsProps) => {
  const buttons = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: business.whatsapp ? getWhatsAppLink(business.whatsapp) : "",
      icon: FaWhatsapp,
      shellClass: themeStyles.ctaWhatsappShell,
      external: true,
      trackType: "whatsapp" as const
    },
    {
      key: "call",
      label: "Appeler",
      href: business.phone ? getPhoneLink(business.phone) : "",
      icon: FaPhoneAlt,
      shellClass: themeStyles.ctaCallShell,
      trackType: "phone" as const
    },
    {
      key: "email",
      label: "Email",
      href: business.email ? `mailto:${business.email}` : "",
      icon: FaEnvelope,
      shellClass: themeStyles.ctaEmailShell,
      trackType: "email" as const
    },
    {
      key: "website",
      label: "Visiter le site",
      href: business.website ? withProtocol(business.website) : "",
      icon: FaGlobe,
      shellClass: themeStyles.ctaCallShell,
      external: true,
      trackType: "website" as const
    }
  ].filter((button) => Boolean(button.href));

  if (!buttons.length) return null;

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {buttons.map((button, index) => {
        const Icon = button.icon;

        return (
          <motion.a
            key={button.key}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${button.shellClass} p-[1px] shadow-[0_20px_45px_-28px_rgba(0,0,0,0.75)]`}
            href={button.href}
            target={button.external ? "_blank" : undefined}
            rel={button.external ? "noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.4 }}
            whileHover={{ y: -2, scale: 1.005 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onTrackAction?.(button.trackType)}
          >
            <div className={`relative flex min-h-[58px] items-center justify-center gap-2 rounded-2xl px-4 text-base font-bold backdrop-blur-md sm:min-h-[62px] ${themeStyles.ctaInner} ${themeStyles.ctaText}`}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_46%)] opacity-90" />
              <Icon className="relative text-lg" />
              <span className="relative">{button.label}</span>
            </div>
          </motion.a>
        );
      })}
    </section>
  );
};
