import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || "https://furniturenestora.vercel.app";
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "");

const axiosInstance = axios.create({
  baseURL: `${cleanBaseUrl}/api`, 
  withCredentials: true, 
});

// Intercept requests starting with '/api' to prevent Axios from resetting the baseURL context
axiosInstance.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('/api')) {
    config.url = config.url.replace(/^\/api/, '');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;