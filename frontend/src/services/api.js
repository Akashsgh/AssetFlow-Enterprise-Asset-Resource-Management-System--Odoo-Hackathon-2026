const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
};

export const api = {
  get: (endpoint) =>
    fetch(`${API_BASE_URL}${endpoint}`, { headers: getHeaders() }).then(handleResponse),

  post: (endpoint, body) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),

  put: (endpoint, body) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),

  delete: (endpoint) =>
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    }).then(handleResponse),
};
