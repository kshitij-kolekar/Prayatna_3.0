/**
 * src/api/requestApi.js
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  
  const savedUser = localStorage.getItem('medilink_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      if (user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }
    } catch (e) {
      console.error('Failed to parse user from local storage');
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { ...headers, ...(options.headers || {}) },
    ...options,
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data.data;
}

export async function createRequest(requestData) {
  return apiFetch('/requests', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}

export async function getAllRequests(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`/requests${params ? '?' + params : ''}`);
}

export async function updateRequestStatus(id, status, notes) {
  return apiFetch(`/requests/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes }),
  });
}
