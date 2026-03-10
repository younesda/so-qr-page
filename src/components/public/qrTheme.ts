import type { QRTheme } from "./public-page.types";

export interface QRThemeStyles {
  pageRoot: string;
  pageBackground: string;
  rightHalo: string;
  card: string;
  cardOverlay: string;
  title: string;
  body: string;
  muted: string;
  iconBadge: string;
  secondaryShell: string;
  secondaryButton: string;
  secondaryButtonDisabled: string;
  ctaInner: string;
  ctaText: string;
  ctaCallShell: string;
  ctaWhatsappShell: string;
  ctaEmailShell: string;
  mapFrame: string;
  mediaFrame: string;
}

const themeStylesMap: Record<QRTheme, QRThemeStyles> = {
  dark: {
    pageRoot: "bg-[#020617] text-white",
    pageBackground:
      "bg-[radial-gradient(circle_at_18%_16%,rgba(14,165,233,0.24),transparent_38%),radial-gradient(circle_at_88%_9%,rgba(30,41,59,0.5),transparent_35%),linear-gradient(180deg,#020617_0%,#030712_60%,#020617_100%)]",
    rightHalo: "bg-violet-500/12",
    card: "border-white/12 bg-slate-900/65 text-white shadow-[0_24px_44px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl",
    cardOverlay: "bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_42%)]",
    title: "text-white",
    body: "text-slate-100",
    muted: "text-slate-300",
    iconBadge: "border-slate-500/70 bg-slate-950/70 text-cyan-200",
    secondaryShell: "border-white/12 bg-slate-900/60",
    secondaryButton: "border-slate-400/55 bg-slate-900/65 text-slate-100 hover:bg-slate-800/85",
    secondaryButtonDisabled: "disabled:opacity-45",
    ctaInner: "bg-slate-950/80",
    ctaText: "text-white",
    ctaCallShell: "from-sky-400/95 via-cyan-400 to-blue-500",
    ctaWhatsappShell: "from-emerald-400 via-green-400 to-emerald-500",
    ctaEmailShell: "from-fuchsia-500 via-violet-500 to-indigo-600",
    mapFrame: "border-slate-500/60 bg-slate-950/50",
    mediaFrame: "border-slate-500/60 bg-slate-950/50"
  },
  light: {
    pageRoot: "bg-slate-50 text-slate-900",
    pageBackground:
      "bg-[radial-gradient(circle_at_18%_16%,rgba(14,165,233,0.2),transparent_38%),radial-gradient(circle_at_88%_9%,rgba(99,102,241,0.12),transparent_34%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_45%,#eef2ff_100%)]",
    rightHalo: "bg-cyan-300/25",
    card: "border-slate-200/90 bg-white/95 text-slate-900 shadow-[0_22px_38px_-24px_rgba(15,23,42,0.24)] backdrop-blur-xl",
    cardOverlay: "bg-[linear-gradient(120deg,rgba(2,6,23,0.04),transparent_44%)]",
    title: "text-slate-950",
    body: "text-slate-800",
    muted: "text-slate-600",
    iconBadge: "border-slate-200 bg-slate-50 text-cyan-700",
    secondaryShell: "border-slate-200/90 bg-white/95",
    secondaryButton: "border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
    secondaryButtonDisabled: "disabled:opacity-50",
    ctaInner: "bg-white/95",
    ctaText: "text-slate-900",
    ctaCallShell: "from-sky-300 via-cyan-300 to-blue-400",
    ctaWhatsappShell: "from-emerald-300 via-green-300 to-emerald-400",
    ctaEmailShell: "from-fuchsia-300 via-purple-300 to-indigo-400",
    mapFrame: "border-slate-200 bg-white",
    mediaFrame: "border-slate-200 bg-white"
  },
  gradient: {
    pageRoot: "bg-[#030712] text-white",
    pageBackground:
      "bg-[radial-gradient(circle_at_18%_16%,rgba(20,184,166,0.28),transparent_38%),radial-gradient(circle_at_88%_9%,rgba(56,189,248,0.24),transparent_34%),linear-gradient(180deg,#020617_0%,#0b1222_60%,#020617_100%)]",
    rightHalo: "bg-fuchsia-500/12",
    card: "border-white/15 bg-white/10 text-white shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl",
    cardOverlay: "bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_38%)]",
    title: "text-white",
    body: "text-white/95",
    muted: "text-white/75",
    iconBadge: "border-white/25 bg-slate-900/45 text-cyan-200",
    secondaryShell: "border-white/15 bg-white/10",
    secondaryButton: "border-white/25 bg-white/10 text-white hover:bg-white/20",
    secondaryButtonDisabled: "disabled:opacity-50",
    ctaInner: "bg-slate-900/85",
    ctaText: "text-white",
    ctaCallShell: "from-sky-400/90 via-cyan-400 to-blue-500",
    ctaWhatsappShell: "from-emerald-400 via-green-400 to-emerald-500",
    ctaEmailShell: "from-fuchsia-500/95 via-purple-500/90 to-indigo-600",
    mapFrame: "border-white/20 bg-slate-900/20",
    mediaFrame: "border-white/20 bg-slate-900/20"
  }
};

export const getQrThemeStyles = (theme: QRTheme): QRThemeStyles => themeStylesMap[theme];
