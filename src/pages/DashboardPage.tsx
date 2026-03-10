import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import BusinessCard from "@/components/BusinessCard";
import { useBusinesses } from "@/hooks/useBusinesses";
import { businessApi } from "@/services/businessApi";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { items, loading, error, refresh } = useBusinesses();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((b) => [b.name, b.slug, b.email, b.phone].some((v) => (v || "").toLowerCase().includes(q)));
  }, [items, query]);

  const publishedCount = useMemo(() => items.filter((item) => item.isPublished).length, [items]);

  const onDelete = async (id: string) => {
    if (!window.confirm("Confirmer la suppression de cette entreprise ?")) return;
    await businessApi.remove(id);
    await refresh();
  };

  const onTogglePublish = async (id: string) => {
    await businessApi.togglePublish(id);
    await refresh();
  };

  return (
    <section className="space-y-6">
      <motion.div
        className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-5 shadow-[0_25px_90px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">Vos entreprises</h1>
            <p className="mt-2 text-sm text-white/70">Gerez, publiez et optimisez vos pages QR en temps reel.</p>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-900/30 transition hover:brightness-110"
            onClick={() => navigate("/business/new")}
            type="button"
          >
            Creer une fiche <FaArrowRight className="text-xs" />
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">Total</p>
            <p className="mt-1 text-3xl font-semibold text-white">{items.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">Publiees</p>
            <p className="mt-1 text-3xl font-semibold text-emerald-300">{publishedCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-white/60">Brouillons</p>
            <p className="mt-1 text-3xl font-semibold text-amber-200">{Math.max(items.length - publishedCount, 0)}</p>
          </div>
        </div>
      </motion.div>

      <div className="relative">
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/45" />
        <input
          className="w-full rounded-2xl border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/50 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par nom, slug, email ou telephone"
          value={query}
        />
      </div>

      {loading && <p className="text-white/70">Chargement...</p>}
      {error && <p className="text-rose-300">{error}</p>}

      {!loading && !filtered.length && (
        <p className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/75 backdrop-blur-xl">
          Aucune entreprise pour le moment.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((business) => (
          <BusinessCard key={business.id} business={business} onDelete={onDelete} onTogglePublish={onTogglePublish} />
        ))}
      </div>
    </section>
  );
};

export default DashboardPage;
