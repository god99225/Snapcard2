// src/api/axiosConfig.jsx
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://demo3.wms.net.in/api', // Make sure this is correct
});

// Add an interceptor to include the token in headers if needed
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
