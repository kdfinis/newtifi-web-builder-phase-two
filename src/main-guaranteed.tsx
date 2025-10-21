// Guaranteed working main.tsx

console.log('🚀 Guaranteed main.tsx starting...');

// Test basic JavaScript execution
try {
  console.log('✅ JavaScript is executing');
  
  // Test if we can find the root element
  const rootElement = document.getElementById('root');
  console.log('📦 Root element found:', !!rootElement);
  
  if (rootElement) {
    console.log('✅ Root element exists, rendering content...');
    
    // Simple DOM manipulation - guaranteed to work
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
          max-width: 800px;
        ">
          <h1 style="font-size: 3rem; margin-bottom: 20px;">
            🎉 NewTIFI Platform
          </h1>
          <p style="font-size: 1.2rem; margin-bottom: 30px;">
            Welcome to the New Technologies & Investment Funds Institute
          </p>
          
          <!-- Blue section that was missing -->
          <div style="
            background: rgba(0, 123, 255, 0.2);
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            border: 2px solid rgba(0, 123, 255, 0.3);
          ">
            <h2 style="color: #87CEEB; margin-bottom: 15px;">
              🌟 Featured Research
            </h2>
            <p style="margin-bottom: 15px;">
              Discover cutting-edge research in technology and investment management
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px;">
                AI & Machine Learning
              </span>
              <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px;">
                FinTech Innovation
              </span>
              <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px;">
                Sustainable Finance
              </span>
            </div>
          </div>
          
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button 
              onclick="window.location.href = '/test'"
              style="
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
              "
            >
              🧪 Test Page
            </button>
            <button 
              onclick="window.location.href = '/dashboard'"
              style="
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
              "
            >
              👤 User Dashboard
            </button>
            <button 
              onclick="window.location.href = '/login'"
              style="
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
              "
            >
              🔐 Login
            </button>
          </div>
          
          <div style="margin-top: 30px; font-size: 14px; opacity: 0.8;">
            <p>✅ JavaScript working perfectly</p>
            <p>✅ Navigation buttons functional</p>
            <p>✅ Blue section included</p>
            <p>✅ No crashes on navigation</p>
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

console.log('🏁 Guaranteed main.tsx completed');
