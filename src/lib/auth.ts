const BASE = '';

export async function authStatus() {
  const res = await fetch(`${BASE}/auth/status`, { credentials: 'include' });
  return res.json();
}

export async function loginEmail(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return res.json();
}

export async function registerEmail(email: string, password: string, name?: string) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password, name })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Registration failed');
  return res.json();
}

export async function logout() {
  const res = await fetch(`${BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
  return res.json();
}

export function loginWithGoogle() {
  window.location.href = `${BASE}/auth/google`;
}

export function loginWithLinkedIn() {
  window.location.href = `${BASE}/auth/linkedin`;
}


