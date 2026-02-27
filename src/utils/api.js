import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// This interceptor runs *every time* you make a request.
api.interceptors.request.use(
  (config) => {
    // We grab the token INSIDE the function so it's always the latest one
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;