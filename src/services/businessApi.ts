import api from "./api";

export const businessApi = {
  getAll: () => api.get("/businesses").then((r) => r.data),

  getById: (id: string) => api.get(`/businesses/${id}`).then((r) => r.data),

  create: (data: Record<string, unknown>) =>
    api.post("/businesses", data).then((r) => r.data),

  update: (id: string, data: Record<string, unknown>) =>
    api.put(`/businesses/${id}`, data).then((r) => r.data),

  remove: (id: string) => api.delete(`/businesses/${id}`).then((r) => r.data),

  togglePublish: (id: string) =>
    api.patch(`/businesses/${id}/publish`).then((r) => r.data),

  getPublicBySlug: (slug: string) =>
    api.get(`/businesses/public/${slug}`).then((r) => r.data),

  trackPublicClick: (slug: string, type: "whatsapp" | "phone" | "email" | "website" | "directions" | "share") =>
    api.post(`/businesses/public/${slug}/click`, { type }).then((r) => r.data)
};
