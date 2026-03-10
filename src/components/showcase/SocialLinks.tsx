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
import { EmptySectionFallback } from "./EmptySectionFallback";
import { SectionWrapper } from "./SectionWrapper";
import type { PublicBusiness } from "@/components/public/public-page.types";
import { withProtocol } from "@/components/public/public-page.types";

const socials = [
  { key: "facebook", icon: FaFacebookF, color: "bg-[#1877F2]" },
  { key: "instagram", icon: FaInstagram, color: "bg-[#E1306C]" },
  { key: "tiktok", icon: FaTiktok, color: "bg-[#111111]" },
  { key: "youtube", icon: FaYoutube, color: "bg-[#FF0000]" },
  { key: "linkedin", icon: FaLinkedinIn, color: "bg-[#0A66C2]" },
  { key: "telegram", icon: FaTelegramPlane, color: "bg-[#27A7E7]" },
  { key: "pinterest", icon: FaPinterestP, color: "bg-[#BD081C]" },
  { key: "snapchat", icon: FaSnapchatGhost, color: "bg-[#FFFC00] text-black" },
  { key: "xTwitter", icon: FaTwitter, color: "bg-[#0f172a]" }
] as const;

export const SocialLinks = ({ business }: { business: PublicBusiness }) => {
  const links = socials
    .map((item) => ({ ...item, href: withProtocol((business as any)[item.key] || "") }))
    .filter((item) => Boolean(item.href));

  if (!links.length) return <EmptySectionFallback label="Aucun reseau social disponible." />;

  return (
    <SectionWrapper title="Reseaux sociaux" subtitle="Communaute">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`flex h-14 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg shadow-black/30 transition hover:-translate-y-0.5`}
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
