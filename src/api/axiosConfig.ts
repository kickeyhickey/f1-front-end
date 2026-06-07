import axios from 'axios';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// External F1 API instance - proxied through /f1-api
const axiosInst = axios.create({
  baseURL: '/f1-api',
});

// Your backend API instance
export const localApiInst = axios.create({
  baseURL: '/api',
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

// clerk token added
localApiInst.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInst;
