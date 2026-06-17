import axios from 'axios';


const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const cleanBaseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const axiosInstance = axios.create({
  baseURL: cleanBaseUrl,
});

export default axiosInstance;