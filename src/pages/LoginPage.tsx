import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaShieldAlt } from "react-icons/fa";
import { authApi } from "@/services/authApi";
import { authStore } from "@/utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "youneshachami9@gmail.com", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authApi.login(form);
      authStore.setSession(data);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Connexion impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.25),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(59,130,246,0.25),transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_60%,#020617_100%)]" />

      <motion.section
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_30px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 bg-white/10 text-teal-300">
            <FaShieldAlt />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/55">Admin access</p>
            <h1 className="text-2xl font-semibold text-white">Connexion securisee</h1>
          </div>
        </div>

        <p className="mb-6 rounded-xl border border-cyan-300/30 bg-cyan-400/15 px-3 py-2 text-xs text-cyan-100">
          Compte autorise: youneshachami9@gmail.com
        </p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">Email</label>
            <input
              className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              name="email"
              onChange={onChange}
              required
              type="email"
              value={form.email}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">Mot de passe</label>
            <div className="relative">
              <FaLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/45" />
              <input
                className="w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
                name="password"
                onChange={onChange}
                required
                type="password"
                value={form.password}
              />
            </div>
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-900/30 transition hover:brightness-110 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </motion.section>
    </div>
  );
};

export default LoginPage;
