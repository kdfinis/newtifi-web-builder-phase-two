// Test version of main.tsx to verify JavaScript execution

console.log('🚀 main-test.tsx starting...');

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
          <h1>🎉 JavaScript Modules Working!</h1>
          <p>This proves that ES modules are executing correctly.</p>
          <p>React should now work properly.</p>
          <div style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
            <p>✅ Document loaded</p>
            <p>✅ Root element found</p>
            <p>✅ ES modules working</p>
            <p>✅ DOM manipulation working</p>
          </div>
          <div style="margin-top: 20px;">
            <button onclick="window.location.reload()" style="
              background: rgba(255,255,255,0.2);
              border: 1px solid rgba(255,255,255,0.3);
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
            ">Test React App</button>
          </div>
        </div>
      </div>
    `;
    
    console.log('✅ Content rendered successfully');
  } else {
    console.error('❌ Root element not found!');
  }
  
} catch (error) {
  console.error('❌ Error in main-test.tsx:', error);
  console.error('Stack trace:', error.stack);
}

console.log('🏁 main-test.tsx completed');
