import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaSnapchatGhost,
  FaTelegramPlane,
  FaTiktok,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import type { PublicBusiness } from "./public-page.types";
import { withProtocol } from "./public-page.types";
import type { QRThemeStyles } from "./qrTheme";

interface SocialLinksProps {
  business: PublicBusiness;
  themeStyles: QRThemeStyles;
}

const socialConfig = [
  { key: "facebook", label: "Facebook", icon: FaFacebookF, color: "bg-[#1877F2]" },
  { key: "instagram", label: "Instagram", icon: FaInstagram, color: "bg-[#E1306C]" },
  { key: "tiktok", label: "TikTok", icon: FaTiktok, color: "bg-[#111111]" },
  { key: "youtube", label: "YouTube", icon: FaYoutube, color: "bg-[#FF0000]" },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedinIn, color: "bg-[#0A66C2]" },
  { key: "telegram", label: "Telegram", icon: FaTelegramPlane, color: "bg-[#27A7E7]" },
  { key: "pinterest", label: "Pinterest", icon: FaPinterestP, color: "bg-[#BD081C]" },
  { key: "snapchat", label: "Snapchat", icon: FaSnapchatGhost, color: "bg-[#FFFC00] text-black" },
  { key: "xTwitter", label: "X", icon: FaTwitter, color: "bg-[#0f172a]" }
] as const;

export const SocialLinks = ({ business, themeStyles }: SocialLinksProps) => {
  const links = socialConfig
    .map((item) => ({ ...item, href: withProtocol((business as Record<string, string | undefined>)[item.key] || "") }))
    .filter((item) => Boolean(item.href));

  if (!links.length) return null;

  return (
    <section className={`relative overflow-hidden rounded-2xl border p-4 ${themeStyles.card}`}>
      <div className={`pointer-events-none absolute inset-0 ${themeStyles.cardOverlay}`} />
      <h2 className={`relative mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${themeStyles.muted}`}>Reseaux sociaux</h2>
      <div className="relative grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
        {links.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.key}
              className="group"
              href={item.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, delay: index * 0.03 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              title={item.label}
            >
              <span className={`mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl ${item.color} text-lg text-white shadow-lg shadow-black/30 transition-transform duration-200 group-hover:-translate-y-0.5`}>
                <Icon />
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};

