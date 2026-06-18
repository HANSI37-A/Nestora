import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "");

const axiosInstance = axios.create({
  baseURL: `${cleanBaseUrl}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const token = JSON.parse(userInfo).token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (_) {}
  return config;
});

export default axiosInstance;