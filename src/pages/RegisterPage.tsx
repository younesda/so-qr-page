import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/services/authApi";
import { authStore } from "@/utils/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const data = await authApi.register(form);
      authStore.setSession(data);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Inscription impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Créer l'admin initial</h1>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
            <input
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              name="email"
              onChange={onChange}
              required
              type="email"
              value={form.email}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Mot de passe</label>
            <input
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              minLength={6}
              name="password"
              onChange={onChange}
              required
              type="password"
              value={form.password}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? "Création..." : "Créer le compte"}
          </button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link className="font-medium text-primary hover:underline" to="/login">
            Se connecter
          </Link>
        </p>
      </section>
    </div>
  );
};

export default RegisterPage;
