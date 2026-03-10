import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { businessApi } from "@/services/businessApi";
import { uploadApi } from "@/services/uploadApi";
import { emptyBusiness } from "@/utils/business";

interface BusinessFormPageProps {
  mode: "create" | "edit";
}

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/55 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-cyan-300/55";

const sectionClass = "rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5";

const sanitizeList = <T,>(list: T[], fallback: T) => {
  if (!Array.isArray(list) || list.length === 0) return [fallback];
  return list;
};

const BusinessFormPage = ({ mode }: BusinessFormPageProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === "edit";

  const [form, setForm] = useState(emptyBusiness);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!isEdit || !id) return;
      try {
        const data = await businessApi.getById(id);
        setForm({
          ...emptyBusiness,
          ...data,
          siteMode: data.siteMode || "qr",
          theme: data.theme || "gradient",
          galleryImages: sanitizeList(data.galleryImages || [], ""),
          services: sanitizeList(data.services || [], { title: "", description: "", icon: "" }),
          testimonials: sanitizeList(data.testimonials || [], { name: "", role: "", message: "", avatar: "" }),
          faqItems: sanitizeList(data.faqItems || [], { question: "", answer: "" })
        });
      } catch {
        setError("Impossible de charger l'entreprise.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? target.checked : value }));
  };

  const handleArrayItemChange = <T extends Record<string, any>>(
    field: "services" | "testimonials" | "faqItems",
    index: number,
    key: keyof T,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item: T, itemIndex: number) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    }));
  };

  const handleGalleryChange = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.map((item: string, itemIndex: number) => (itemIndex === index ? value : item))
    }));
  };

  const addListItem = (field: "galleryImages" | "services" | "testimonials" | "faqItems") => {
    setForm((prev) => {
      const next = { ...prev } as any;
      if (field === "galleryImages") next.galleryImages = [...next.galleryImages, ""];
      if (field === "services") next.services = [...next.services, { title: "", description: "", icon: "" }];
      if (field === "testimonials") next.testimonials = [...next.testimonials, { name: "", role: "", message: "", avatar: "" }];
      if (field === "faqItems") next.faqItems = [...next.faqItems, { question: "", answer: "" }];
      return next;
    });
  };

  const removeListItem = (field: "galleryImages" | "services" | "testimonials" | "faqItems", index: number) => {
    setForm((prev) => {
      const next = { ...prev } as any;
      const current = [...next[field]];
      current.splice(index, 1);

      if (field === "galleryImages") next.galleryImages = current.length ? current : [""];
      if (field === "services") next.services = current.length ? current : [{ title: "", description: "", icon: "" }];
      if (field === "testimonials") {
        next.testimonials = current.length ? current : [{ name: "", role: "", message: "", avatar: "" }];
      }
      if (field === "faqItems") next.faqItems = current.length ? current : [{ question: "", answer: "" }];

      return next;
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const { url } = await uploadApi.uploadLogo(file);
      setForm((prev) => ({ ...prev, logoUrl: url }));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Echec upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      galleryImages: form.galleryImages.filter((value: string) => value.trim()),
      services: form.services.filter((item: any) => item.title.trim() || item.description.trim()),
      testimonials: form.testimonials.filter((item: any) => item.name.trim() || item.message.trim()),
      faqItems: form.faqItems.filter((item: any) => item.question.trim() || item.answer.trim())
    };

    try {
      if (isEdit && id) {
        await businessApi.update(id, payload);
      } else {
        await businessApi.create(payload);
      }
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Echec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white/70">Chargement...</p>;

  return (
    <motion.section className="mx-auto max-w-5xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Edition</p>
        <h1 className="mt-1 text-3xl font-semibold text-white">{isEdit ? "Modifier" : "Creer"} une entreprise</h1>
      </div>

      <form className="space-y-5 rounded-3xl border border-white/15 bg-white/10 p-5 shadow-[0_24px_80px_-35px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-6" onSubmit={handleSubmit}>
        <div className={sectionClass}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Mode d'affichage</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">Type de page</label>
              <select className={inputClass} name="siteMode" onChange={handleChange} value={form.siteMode}>
                <option value="qr">Carte digitale (qr)</option>
                <option value="showcase">Site vitrine (showcase)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">Theme QR</label>
              <select className={inputClass} name="theme" onChange={handleChange} value={form.theme}>
                <option value="dark">Dark premium</option>
                <option value="light">Light minimal</option>
                <option value="gradient">Gradient moderne</option>
              </select>
              <p className="mt-1 text-xs text-white/55">Applique uniquement a la QR page.</p>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Informations de base</h2>
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">Nom *</label>
              <input className={inputClass} name="name" onChange={handleChange} required value={form.name} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">Description</label>
              <textarea className={inputClass} name="description" onChange={handleChange} rows={3} value={form.description} />
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Contact et liens</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Telephone", name: "phone" },
              { label: "WhatsApp", name: "whatsapp" },
              { label: "Email", name: "email" },
              { label: "Site web", name: "website" },
              { label: "Adresse", name: "address" },
              { label: "Horaires", name: "openingHours" }
            ].map((f) => (
              <div key={f.name}>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">{f.label}</label>
                <input className={inputClass} name={f.name} onChange={handleChange} value={(form as any)[f.name]} />
              </div>
            ))}
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Branding</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">URL du logo</label>
              <input className={inputClass} name="logoUrl" onChange={handleChange} value={form.logoUrl} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">Upload logo</label>
              <input accept="image/png,image/jpeg,image/webp,image/svg+xml" className={inputClass} onChange={handleLogoUpload} type="file" />
              {uploading && <p className="mt-1 text-xs text-white/65">Upload en cours...</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">Couleur principale</label>
              <input className="h-11 w-full rounded-xl border border-white/15 bg-white/10 px-2 py-1" name="accentColor" onChange={handleChange} type="color" value={form.accentColor} />
            </div>
            <label className="flex items-center gap-2 pt-7 text-sm text-white/85">
              <input checked={form.isPublished} name="isPublished" onChange={handleChange} type="checkbox" />
              Rendre la page publique
            </label>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Reseaux sociaux</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "facebook",
              "instagram",
              "linkedin",
              "tiktok",
              "youtube",
              "xTwitter",
              "telegram",
              "snapchat",
              "pinterest"
            ].map((name) => (
              <div key={name}>
                <label className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-white/60">{name}</label>
                <input className={inputClass} name={name} onChange={handleChange} value={(form as any)[name]} />
              </div>
            ))}
          </div>
        </div>

        {form.siteMode === "showcase" && (
          <>
            <div className={sectionClass}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Hero showcase</h2>
              <div className="grid gap-4">
                <input className={inputClass} name="heroTitle" onChange={handleChange} placeholder="Titre hero" value={form.heroTitle} />
                <textarea className={inputClass} name="heroSubtitle" onChange={handleChange} placeholder="Sous-titre hero" rows={2} value={form.heroSubtitle} />
                <input className={inputClass} name="coverImage" onChange={handleChange} placeholder="URL image de couverture" value={form.coverImage} />
              </div>
            </div>

            <div className={sectionClass}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">A propos</h2>
              <div className="grid gap-4">
                <input className={inputClass} name="aboutTitle" onChange={handleChange} placeholder="Titre section" value={form.aboutTitle} />
                <textarea className={inputClass} name="aboutText" onChange={handleChange} placeholder="Texte a propos" rows={4} value={form.aboutText} />
              </div>
            </div>

            <div className={sectionClass}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Services</h2>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs" onClick={() => addListItem("services")} type="button">
                  <FaPlus /> Ajouter
                </button>
              </div>
              <div className="space-y-3">
                {form.services.map((item: any, index: number) => (
                  <div key={`service-${index}`} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 flex justify-end">
                      <button className="inline-flex items-center gap-1 rounded-md border border-rose-400/30 px-2 py-1 text-xs text-rose-200" onClick={() => removeListItem("services", index)} type="button">
                        <FaMinus /> Supprimer
                      </button>
                    </div>
                    <div className="grid gap-2">
                      <input className={inputClass} placeholder="Titre" value={item.title} onChange={(e) => handleArrayItemChange("services", index, "title", e.target.value)} />
                      <input className={inputClass} placeholder="Description" value={item.description} onChange={(e) => handleArrayItemChange("services", index, "description", e.target.value)} />
                      <input className={inputClass} placeholder="Icone (optionnel)" value={item.icon} onChange={(e) => handleArrayItemChange("services", index, "icon", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={sectionClass}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Galerie</h2>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs" onClick={() => addListItem("galleryImages")} type="button">
                  <FaPlus /> Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {form.galleryImages.map((item: string, index: number) => (
                  <div key={`gallery-${index}`} className="flex gap-2">
                    <input className={inputClass} placeholder="URL image" value={item} onChange={(e) => handleGalleryChange(index, e.target.value)} />
                    <button className="rounded-lg border border-rose-400/30 px-2 text-rose-200" onClick={() => removeListItem("galleryImages", index)} type="button">
                      <FaMinus />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className={sectionClass}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Temoignages</h2>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs" onClick={() => addListItem("testimonials")} type="button">
                  <FaPlus /> Ajouter
                </button>
              </div>
              <div className="space-y-3">
                {form.testimonials.map((item: any, index: number) => (
                  <div key={`testimonial-${index}`} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 flex justify-end">
                      <button className="inline-flex items-center gap-1 rounded-md border border-rose-400/30 px-2 py-1 text-xs text-rose-200" onClick={() => removeListItem("testimonials", index)} type="button">
                        <FaMinus /> Supprimer
                      </button>
                    </div>
                    <div className="grid gap-2">
                      <input className={inputClass} placeholder="Nom" value={item.name} onChange={(e) => handleArrayItemChange("testimonials", index, "name", e.target.value)} />
                      <input className={inputClass} placeholder="Role" value={item.role} onChange={(e) => handleArrayItemChange("testimonials", index, "role", e.target.value)} />
                      <textarea className={inputClass} placeholder="Message" rows={2} value={item.message} onChange={(e) => handleArrayItemChange("testimonials", index, "message", e.target.value)} />
                      <input className={inputClass} placeholder="Avatar (optionnel)" value={item.avatar} onChange={(e) => handleArrayItemChange("testimonials", index, "avatar", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={sectionClass}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">FAQ</h2>
                <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs" onClick={() => addListItem("faqItems")} type="button">
                  <FaPlus /> Ajouter
                </button>
              </div>
              <div className="space-y-3">
                {form.faqItems.map((item: any, index: number) => (
                  <div key={`faq-${index}`} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 flex justify-end">
                      <button className="inline-flex items-center gap-1 rounded-md border border-rose-400/30 px-2 py-1 text-xs text-rose-200" onClick={() => removeListItem("faqItems", index)} type="button">
                        <FaMinus /> Supprimer
                      </button>
                    </div>
                    <div className="grid gap-2">
                      <input className={inputClass} placeholder="Question" value={item.question} onChange={(e) => handleArrayItemChange("faqItems", index, "question", e.target.value)} />
                      <textarea className={inputClass} placeholder="Reponse" rows={2} value={item.answer} onChange={(e) => handleArrayItemChange("faqItems", index, "answer", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={sectionClass}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Final CTA</h2>
              <div className="grid gap-4">
                <input className={inputClass} name="ctaTitle" onChange={handleChange} placeholder="Titre CTA" value={form.ctaTitle} />
                <textarea className={inputClass} name="ctaText" onChange={handleChange} placeholder="Texte CTA" rows={3} value={form.ctaText} />
              </div>
            </div>
          </>
        )}

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-900/30 transition hover:brightness-110 disabled:opacity-60" disabled={saving} type="submit">
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
          <Link className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/15" to="/">
            Annuler
          </Link>
        </div>
      </form>
    </motion.section>
  );
};

export default BusinessFormPage;



