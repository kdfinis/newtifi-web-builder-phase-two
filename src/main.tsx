import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Dev-only: aggressively unregister any service workers to prevent stale caches
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) {
      registration.unregister().catch(() => {});
    }
    // Also try to remove caches
    if (window.caches?.keys) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
    }
  }).catch(() => {});
}

// Dev-only runtime banner for quick context (origin/env/SW)
if (import.meta.env.DEV) {
  const info = document.createElement('div');
  info.style.position = 'fixed';
  info.style.bottom = '6px';
  info.style.right = '8px';
  info.style.zIndex = '2147483647';
  info.style.padding = '4px 8px';
  info.style.borderRadius = '6px';
  info.style.background = 'rgba(0,0,0,0.6)';
  info.style.color = '#fff';
  info.style.font = '12px/1.2 system-ui, sans-serif';
  info.textContent = `${location.origin} · DEV · SW:off`;
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(info);
  });
}

createRoot(document.getElementById('root')!).render(<App />);
