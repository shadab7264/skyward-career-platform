const API_BASE = '/api';

function authHeaders() {
  try {
    const saved = JSON.parse(localStorage.getItem('skyward-auth-session'));
    return saved?.session?.access_token ? { Authorization: `Bearer ${saved.session.access_token}` } : {};
  } catch {
    return {};
  }
}

export async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}

export async function apiPost(endpoint, data, isFormData = false) {
  const options = {
    method: 'POST',
    body: isFormData ? data : JSON.stringify(data),
    headers: authHeaders(),
  };
  if (!isFormData) {
    options.headers = { ...options.headers, 'Content-Type': 'application/json' };
  }
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}

export async function apiPut(endpoint, data) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}
