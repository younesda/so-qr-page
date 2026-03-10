import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import type { PublicBusiness } from "@/components/public/public-page.types";

interface ContactActionsProps {
  business: PublicBusiness;
  className?: string;
}

const tel = (value = "") => `tel:${value.replace(/\s+/g, "")}`;
const wa = (value = "") => `https://wa.me/${value.replace(/\D/g, "")}`;

export const ContactActions = ({ business, className = "" }: ContactActionsProps) => {
  const actions = [
    { key: "call", label: "Appeler", href: business.phone ? tel(business.phone) : "", icon: FaPhoneAlt },
    { key: "whatsapp", label: "WhatsApp", href: business.whatsapp ? wa(business.whatsapp) : "", icon: FaWhatsapp },
    { key: "email", label: "Email", href: business.email ? `mailto:${business.email}` : "", icon: FaEnvelope },
    {
      key: "route",
      label: "Itineraire",
      href: business.address
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`
        : "",
      icon: FaMapMarkedAlt
    }
  ].filter((item) => Boolean(item.href));

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <a
            key={action.key}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-900/35 transition hover:brightness-110"
            href={action.href}
            target={action.key === "call" || action.key === "email" ? undefined : "_blank"}
            rel={action.key === "call" || action.key === "email" ? undefined : "noreferrer"}
          >
            <Icon /> {action.label}
          </a>
        );
      })}
    </div>
  );
};
