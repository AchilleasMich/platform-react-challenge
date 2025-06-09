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

export const apiPost = async (url, body, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    ...(options.headers || {}),
  };

  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(body),
    headers,
    ...options,
  };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res;
};

export const apiDelete = async (url, options = {}) => {
  const headers = {
    "x-api-key": API_KEY,
    ...(options.headers || {}),
  };

  const fetchOptions = {
    method: "DELETE",
    headers,
    ...options,
  };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res;
};
