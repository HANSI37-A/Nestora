import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "");

const axiosInstance = axios.create({
  baseURL: `${cleanBaseUrl}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  try {
    const persisted = localStorage.getItem("persist:root");
    if (persisted) {
      const auth = JSON.parse(JSON.parse(persisted).auth || "{}");
      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }
  } catch (_) {}
  return config;
});

export default axiosInstance;