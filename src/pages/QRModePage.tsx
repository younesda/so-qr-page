import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaAddressCard, FaRoute, FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { ActionButtons } from "@/components/public/ActionButtons";
import { GallerySection } from "@/components/public/GallerySection";
import { HeroSection } from "@/components/public/HeroSection";
import { InfoCards } from "@/components/public/InfoCards";
import { MapSection } from "@/components/public/MapSection";
import { SocialLinks } from "@/components/public/SocialLinks";
import { createVCard, isBusinessOpenNow, normalizeQrTheme, type PublicBusiness } from "@/components/public/public-page.types";
import { getQrThemeStyles } from "@/components/public/qrTheme";
import { toast } from "@/components/ui/use-toast";

interface QRModePageProps {
  business: PublicBusiness;
}

const getWhatsAppLink = (phone = "") => `https://wa.me/${phone.replace(/\D/g, "")}`;
const shareQrUrl = "https://qr.sphereoffice92.com";

const QRModePage = ({ business }: QRModePageProps) => {
  const isOpenNow = useMemo(() => isBusinessOpenNow(business?.openingHours || ""), [business?.openingHours]);
  const theme = normalizeQrTheme(business.theme);
  const themeStyles = getQrThemeStyles(theme);

  const trackClick = useCallback((_type: "whatsapp" | "phone" | "email" | "website" | "directions" | "share") => undefined, []);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: "Decouvrez cette entreprise",
          url
        });
        trackClick("share");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      trackClick("share");
      toast({
        title: "Lien copi\u00e9",
        description: "Lien copi\u00e9"
      });
    } catch {
      toast({
        title: "Partage indisponible",
        description: "Impossible de copier le lien."
      });
    }
  };

  const handleAddContact = () => {
    const card = createVCard(business);
    const blob = new Blob([card], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${business.slug || "contact"}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const openDirections = () => {
    if (!business?.address) return;
    trackClick("directions");
    const destination = encodeURIComponent(business.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, "_blank", "noopener,noreferrer");
  };

  const accent = business.accentColor || "#14b8a6";
  const showFloatingWhatsApp = Boolean(business.whatsapp);

  return (
    <div className={`relative min-h-screen overflow-hidden antialiased [text-rendering:optimizeLegibility] ${themeStyles.pageRoot}`}>
      <div className={`pointer-events-none absolute inset-0 ${themeStyles.pageBackground}`} />
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full blur-3xl" style={{ backgroundColor: `${accent}3f` }} />
      <div className={`pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full blur-3xl ${themeStyles.rightHalo}`} />

      <main className={`relative mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 pb-10 sm:gap-5 sm:px-5 sm:py-7 lg:gap-6 lg:px-6 xl:px-8 ${showFloatingWhatsApp ? "pb-24 sm:pb-10" : ""}`}>
        <HeroSection business={business} isOpenNow={isOpenNow} themeStyles={themeStyles} />

        <ActionButtons business={business} themeStyles={themeStyles} onTrackAction={trackClick} />

        <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
          <div className="space-y-4 lg:col-span-7 xl:col-span-8">
            <InfoCards business={business} themeStyles={themeStyles} />
            <MapSection address={business.address} themeStyles={themeStyles} onTrackDirections={() => trackClick("directions")} />
          </div>

          <div className="space-y-4 lg:col-span-5 xl:col-span-4">
            <motion.section
              className={`relative overflow-hidden rounded-2xl border p-4 ${themeStyles.card}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <div className={`pointer-events-none absolute inset-0 ${themeStyles.cardOverlay}`} />
              <div className="relative flex flex-col items-center gap-3 text-center">
                <img
                  alt="QR code Sphere Office"
                  className="h-44 w-44 rounded-[28px] bg-white p-3 shadow-xl shadow-slate-950/10"
                  src="/qr-sphereoffice92.svg"
                />
                <div className="space-y-1">
                  <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${themeStyles.muted}`}>QR Code</p>
                  <p className={`text-sm ${themeStyles.body}`}>Scannez pour ouvrir la carte digitale Sphere Office.</p>
                </div>
                <a
                  className={`inline-flex min-h-11 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition active:scale-[0.98] ${themeStyles.secondaryButton}`}
                  href={shareQrUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  qr.sphereoffice92.com
                </a>
              </div>
            </motion.section>

            <SocialLinks business={business} themeStyles={themeStyles} />

            <motion.section
              className={`rounded-2xl border p-2.5 ${themeStyles.secondaryShell}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-2 text-xs font-semibold transition active:scale-[0.98] sm:min-h-12 sm:text-sm ${themeStyles.secondaryButton}`}
                  onClick={() => void handleShare()}
                  type="button"
                >
                  <FaShareAlt className="text-[12px]" /> Partager
                </button>
                <button
                  className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-2 text-xs font-semibold transition active:scale-[0.98] sm:min-h-12 sm:text-sm ${themeStyles.secondaryButton}`}
                  onClick={handleAddContact}
                  type="button"
                >
                  <FaAddressCard className="text-[12px]" /> Contact
                </button>
                <button
                  className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-2 text-xs font-semibold transition active:scale-[0.98] sm:min-h-12 sm:text-sm ${themeStyles.secondaryButton} ${themeStyles.secondaryButtonDisabled}`}
                  onClick={openDirections}
                  type="button"
                  disabled={!business.address}
                >
                  <FaRoute className="text-[12px]" /> Itineraire
                </button>
              </div>
            </motion.section>

            <GallerySection images={business.galleryImages || []} themeStyles={themeStyles} />
          </div>
        </div>
      </main>

      {showFloatingWhatsApp ? (
        <motion.a
          className={`fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-full border bg-gradient-to-r shadow-2xl md:hidden ${themeStyles.ctaWhatsappShell}`}
          href={getWhatsAppLink(business.whatsapp || "")}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => trackClick("whatsapp")}
          aria-label="WhatsApp"
        >
          <span className={`grid h-12 w-12 place-items-center rounded-full ${themeStyles.ctaInner} ${themeStyles.ctaText}`}>
            <FaWhatsapp className="text-xl" />
          </span>
        </motion.a>
      ) : null}
    </div>
  );
};

export default QRModePage;
