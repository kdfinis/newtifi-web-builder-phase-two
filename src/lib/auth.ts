import { urlFactory } from './urls/UrlFactory';

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

// OAuth Functions with state parameter for security
export function loginWithGoogle() {
  // Store current URL to redirect back after auth
  sessionStorage.setItem('auth_redirect', window.location.pathname);
  // Redirect to OAuth endpoint
  window.location.href = urlFactory.getOAuthGoogleUrl();
}

export function loginWithLinkedIn() {
  // Store current URL to redirect back after auth
  sessionStorage.setItem('auth_redirect', window.location.pathname);
  // Redirect to OAuth endpoint
  window.location.href = urlFactory.getOAuthLinkedInUrl();
}

// Account linking functions
export async function linkGoogleAccount(googleId: string) {
  const res = await fetch(`${BASE}/api/me/link-google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ googleId })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to link Google account');
  return res.json();
}

export async function linkLinkedInAccount(linkedinId: string) {
  const res = await fetch(`${BASE}/api/me/link-linkedin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ linkedinId })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to link LinkedIn account');
  return res.json();
}

export async function unlinkProvider(provider: 'google' | 'linkedin') {
  const res = await fetch(`${BASE}/api/me/unlink-provider`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ provider })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to unlink provider');
  return res.json();
}

// Password reset functions
export async function requestPasswordReset(email: string) {
  const res = await fetch(`${BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to request password reset');
  return res.json();
}

export async function resetPassword(token: string, password: string) {
  const res = await fetch(`${BASE}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ token, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to reset password');
  return res.json();
}


