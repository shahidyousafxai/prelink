import axios from 'axios';

import { queryClient } from './query.config';
import { clearAuthToken } from '../utils/storage';

// Cross-cutting query keys (needed by the interceptor below, and by any
// screen that cares about auth state) live here. Resource-specific keys
// (e.g. todos) live locally in that resource's Queries file instead.
export const queryKeys = {
  auth: {
    all: ['auth'],
    session: () => [...queryKeys.auth.all, 'session'],
    onboarding: () => [...queryKeys.auth.all, 'onboarding'],
  },
  consent: {
    all: () => ['consent'],
  },
};

export function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';
}

const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

// Reads the session token straight from the query cache (sync) rather than
// SecureStore (async) — the cache is already the source of truth by the time
// any screen can fire a request, since App.js gates rendering on the session
// query resolving first.
http.interceptors.request.use((config) => {
  const token = queryClient.getQueryData(queryKeys.auth.session());
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      queryClient.setQueryData(queryKeys.auth.session(), null);
    }

    error.message = getErrorMessage(error);
    return Promise.reject(error);
  }
);

export function get(url, config) {
  return http.get(url, config).then((res) => res.data);
}

export function post(url, data, config) {
  return http.post(url, data, config).then((res) => res.data);
}

export function put(url, data, config) {
  return http.put(url, data, config).then((res) => res.data);
}

export function patch(url, data, config) {
  return http.patch(url, data, config).then((res) => res.data);
}

export function del(url, config) {
  return http.delete(url, config).then((res) => res.data);
}

export { http };
