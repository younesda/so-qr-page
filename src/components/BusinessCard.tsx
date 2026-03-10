import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { FaEdit, FaExternalLinkAlt, FaGlobe, FaTrash } from "react-icons/fa";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const apiOrigin = apiBase.replace(/\/api\/?$/, "");

interface Business {
  id: string;
  name: string;
  slug: string;
  accentColor: string;
  isPublished: boolean;
  scansCount: number;
  visitsCount: number;
}

interface BusinessCardProps {
  business: Business;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

const BusinessCard = ({ business, onDelete, onTogglePublish }: BusinessCardProps) => {
  const publicPath = `/p/${business.slug}`;
  const scanUrl = `${apiOrigin}/api/businesses/public/${business.slug}/scan`;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-300 hover:bg-white/15">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg, ${business.accentColor}, rgba(255,255,255,0))` }}
      />

      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{business.name}</h3>
          <p className="font-mono text-xs text-white/60">/{business.slug}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-950"
            style={{ backgroundColor: business.accentColor }}
          >
            Theme
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              business.isPublished ? "bg-emerald-500/30 text-emerald-100" : "bg-amber-400/25 text-amber-100"
            }`}
          >
            {business.isPublished ? "Publiee" : "Brouillon"}
          </span>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
          <p className="text-2xl font-semibold text-white">{business.scansCount}</p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">Scans QR</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
          <p className="text-2xl font-semibold text-white">{business.visitsCount}</p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">Visites</p>
        </div>
      </div>

      <div className="mb-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-3">
        <div className="shrink-0 rounded-xl bg-white p-2">
          <QRCodeSVG value={scanUrl} size={82} bgColor="#f8fafc" fgColor="#0f172a" />
        </div>
        <div className="min-w-0 text-sm text-white/80">
          <p className="truncate font-mono text-[11px] text-white/60">{scanUrl}</p>
          <a
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-200 transition hover:text-white"
            href={publicPath}
            target="_blank"
            rel="noreferrer"
          >
            Ouvrir la page <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/15"
          onClick={() => onTogglePublish(business.id)}
          type="button"
        >
          <FaGlobe className="text-cyan-200" /> {business.isPublished ? "Depublier" : "Publier"}
        </button>
        <Link
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/15"
          to={`/business/${business.id}/edit`}
        >
          <FaEdit className="text-cyan-200" /> Modifier
        </Link>
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-rose-400/35 bg-rose-500/15 px-3 py-2 text-xs font-medium text-rose-100 transition hover:bg-rose-500/25"
          onClick={() => onDelete(business.id)}
          type="button"
        >
          <FaTrash /> Supprimer
        </button>
      </div>
    </article>
  );
};

export default BusinessCard;
