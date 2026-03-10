import axios from "axios";
import { authStore } from "@/utils/auth";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: apiBase });

api.interceptors.request.use((config) => {
  const token = authStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
export { apiBase };
