// Ultra-simple main.tsx for debugging

console.log('🚀 main.tsx starting...');

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
    
    // Simple DOM manipulation test
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
          <h1>🎉 JavaScript is Working!</h1>
          <p>This proves that JavaScript execution is working.</p>
          <p>If you see this, the issue is with React, not JavaScript.</p>
          <div style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
            <p>✅ Document loaded</p>
            <p>✅ Root element found</p>
            <p>✅ DOM manipulation working</p>
          </div>
        </div>
      </div>
    `;
    
    console.log('✅ Content rendered successfully');
  } else {
    console.error('❌ Root element not found!');
  }
  
} catch (error) {
  console.error('❌ Error in main.tsx:', error);
  console.error('Stack trace:', error.stack);
}

console.log('🏁 main.tsx completed');
