import { useState } from 'react';
import { AuthContext } from './auth-context';

const SESSION_KEY = 'skyward-auth-session';

async function authRequest(endpoint, body) {
  const res = await fetch(`/api/auth/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Authentication failed' }));
    throw new Error(error.message || 'Authentication failed');
  }

  return res.json();
}

function saveSession(payload) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession()?.user ?? null);
  const [loading] = useState(false);

  const signIn = async (email, password) => {
    const data = await authRequest('login', { email, password });
    saveSession(data);
    setUser(data.user);
    return data;
  };

  const signUp = async (email, password, fullName) => {
    const data = await authRequest('register', { email, password, fullName });
    saveSession(data);
    setUser(data.user);
    return data;
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
