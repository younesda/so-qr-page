import api from "./api";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data).then((r) => r.data),

  register: (data: { email: string; password: string }) =>
    api.post("/auth/register", data).then((r) => r.data),
};
