// Debug version of main.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('🚀 Debug main.tsx starting...');

// Test basic JavaScript execution
try {
  console.log('✅ JavaScript is executing');
  console.log('📦 Document ready state:', document.readyState);
  console.log('🌐 Window object available:', typeof window);
  
  // Test if we can find the root element
  const rootElement = document.getElementById('root');
  console.log('📦 Root element found:', !!rootElement);
  
  if (rootElement) {
    console.log('✅ Root element exists, attempting to render...');
    
    // Test React import
    console.log('📦 React version:', React.version);
    console.log('📦 createRoot available:', typeof createRoot);
    
    try {
      console.log('🎨 Creating React root...');
      const root = createRoot(rootElement);
      console.log('✅ React root created successfully');
      
      console.log('🎭 Rendering App component...');
      root.render(<App />);
      console.log('✅ App component rendered successfully');
      
    } catch (reactError) {
      console.error('❌ React rendering error:', reactError);
      console.error('Stack trace:', reactError.stack);
      
      // Fallback: render simple content
      rootElement.innerHTML = `
        <div style="
          min-height: 100vh; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          color: white;
          text-align: center;
        ">
          <div style="
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
          ">
            <h1>🎉 NewTIFI Academic LMS</h1>
            <p>React rendering error occurred, but JavaScript is working!</p>
            <p>Check browser console (F12) for details.</p>
            <div style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
              <p>✅ Document loaded</p>
              <p>✅ Root element found</p>
              <p>✅ JavaScript working</p>
              <p>❌ React rendering failed</p>
            </div>
          </div>
        </div>
      `;
    }
    
  } else {
    console.error('❌ Root element not found!');
  }
  
} catch (error) {
  console.error('❌ Error in main.tsx:', error);
  console.error('Stack trace:', error.stack);
}

console.log('🏁 Debug main.tsx completed');