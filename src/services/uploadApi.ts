import api from "./api";

export const uploadApi = {
  uploadLogo: (file: File) => {
    const formData = new FormData();
    formData.append("logo", file);
    return api
      .post("/upload/logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
};
