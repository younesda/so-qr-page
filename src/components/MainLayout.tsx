import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaQrcode, FaSignOutAlt } from "react-icons/fa";
import { authStore } from "@/utils/auth";

const MainLayout = () => {
  const navigate = useNavigate();
  const user = authStore.getUser();

  const onLogout = () => {
    authStore.clearSession();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_5%_10%,rgba(20,184,166,0.25),transparent_30%),radial-gradient(circle_at_95%_5%,rgba(14,165,233,0.22),transparent_35%),linear-gradient(180deg,#020617_0%,#0b1120_60%,#020617_100%)]" />
      <div className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-44 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
          <Link className="group inline-flex items-center gap-3" to="/">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 shadow-lg shadow-black/30 transition group-hover:scale-105">
              <FaQrcode className="text-teal-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Workspace</p>
              <p className="text-sm font-semibold text-white sm:text-base">QR Business Studio</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/70 md:block">
              {user?.email}
            </span>
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-3 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-teal-900/30 transition hover:brightness-110 sm:px-4 sm:text-sm"
              to="/business/new"
            >
              <FaPlus /> Nouvelle entreprise
            </Link>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/85 transition hover:bg-white/15 sm:text-sm"
              onClick={onLogout}
              type="button"
            >
              <FaSignOutAlt /> Deconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default MainLayout;
