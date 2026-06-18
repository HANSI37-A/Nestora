import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://furniturenestora.vercel.app";
const cleanBaseUrl = backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl;

const axiosInstance = axios.create({
  baseURL: `${cleanBaseUrl}/api`,
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;