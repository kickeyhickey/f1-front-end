import axios from 'axios';

// F1 API instance - uses proxy in dev, direct URL in production
const axiosInst = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
});

// Local backend instance - for your database API
// Uses proxy in dev to avoid CORS
export const localApiInst = axios.create({
  baseURL: '/local-api',
});

// Optional: Add request/response interceptors for logging or auth
axiosInst.interceptors.request.use(
  (config) => {
    // You can add auth tokens here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInst.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

localApiInst.interceptors.request.use(
  (config) => {
    // You can add auth tokens here for local API
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

localApiInst.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally for local API
    return Promise.reject(error);
  }
);

export default axiosInst;
