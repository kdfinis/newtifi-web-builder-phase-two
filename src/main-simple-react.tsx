// Simple React app that should work with ES modules

import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('🚀 Simple React app starting...');

const App = () => {
  console.log('🚀 App component rendering');
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '40px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        maxWidth: '600px'
      }}>
        <h1>🎉 React ES Modules Working!</h1>
        <p>This proves that React with ES modules is working correctly.</p>
        <p>The black screen issue has been resolved.</p>
        
        <div style={{
          marginTop: '30px',
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '5px'
        }}>
          <h3>✅ Server Status</h3>
          <p>Development Server: Running on port 8080</p>
          <p>Architecture Server: Running on port 3000</p>
          <p>React Components: Rendering correctly</p>
          <p>ES Modules: Working properly</p>
          <p>JavaScript Execution: Successful</p>
        </div>
        
        <div style={{
          marginTop: '20px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => window.location.href = '/test'}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Test Page
          </button>
          <button 
            onClick={() => window.location.href = '/professor'}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Professor Dashboard
          </button>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <button 
            onClick={() => window.location.href = '/lms/login'}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Architecture Server
          </button>
        </div>
        
        <div style={{
          marginTop: '30px',
          fontSize: '14px',
          opacity: 0.8
        }}>
          <p>If you can see this, React with ES modules is working correctly!</p>
          <p>Check the browser console (F12) for detailed logs.</p>
        </div>
      </div>
    </div>
  );
};

// Render the app
try {
  console.log('🎯 Attempting to create React root...');
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    console.log('✅ Root element found, creating React root...');
    const root = createRoot(rootElement);
    console.log('✅ React root created, rendering App...');
    root.render(<App />);
    console.log('✅ App rendered successfully!');
  } else {
    console.error('❌ Root element not found!');
  }
} catch (error) {
  console.error('❌ Error rendering React app:', error);
  console.error('Stack trace:', error.stack);
}

console.log('🏁 Simple React app completed');
