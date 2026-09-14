import axios from 'axios';

import { clearAuthToken, getAuthToken } from '../utils/storage';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
    }

    error.message = error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
    return Promise.reject(error);
  }
);
