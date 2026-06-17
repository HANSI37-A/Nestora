import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || "https://furniturenestora.vercel.app";
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "");

const axiosInstance = axios.create({
  baseURL: `${cleanBaseUrl}/api`, 
  withCredentials: true, 
});


export default axiosInstance;