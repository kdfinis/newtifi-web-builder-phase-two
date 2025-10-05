import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log('🚀 Basic main.tsx starting...');

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('✅ Root element found');
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log('✅ App rendered');
} else {
  console.error('❌ Root element not found');
}
