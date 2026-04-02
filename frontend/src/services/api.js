import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.56.101:30007/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ✅ Named exports for your services
export const getPatients = async () => {
  const res = await api.get('/patients');
  return res.data;
};

export const createSymptomQuery = async (data) => {
  const res = await api.post('/symptoms', data);
  return res.data;
};

// Optional: if you need getSymptomResponse
export const getSymptomResponse = async (queryData) => {
  const res = await api.post('/symptoms/response', queryData);
  return res.data;
};

export default api;
