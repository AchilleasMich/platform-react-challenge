// src/utils/apiClient.js
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiFetch = async (url, options = {}) => {
  const headers = {
    "x-api-key": API_KEY,
    ...(options.headers || {}),
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res;
};
