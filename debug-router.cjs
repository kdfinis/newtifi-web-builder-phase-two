// Debug React Router Issues

const http = require('http');

async function testRouterBehavior() {
  console.log('🔍 Testing React Router Behavior...\n');
  
  // Test different routes
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/test', name: 'Test Page' },
    { path: '/professor', name: 'Professor Dashboard' },
    { path: '/login', name: 'Login' },
    { path: '/nonexistent', name: '404 Test' }
  ];
  
  for (const route of routes) {
    console.log(`\n📋 Testing Route: ${route.name} (${route.path})`);
    
    try {
      const result = await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:8080${route.path}`, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => resolve({ status: res.statusCode, content: data }));
        });
        req.on('error', reject);
        req.setTimeout(5000, () => reject(new Error('Timeout')));
      });
      
      console.log(`✅ Status: ${result.status}`);
      
      // Check if it's the same content (indicating SPA routing issue)
      const hasReactRoot = result.content.includes('<div id="root"></div>');
      const hasScript = result.content.includes('src="/src/main.tsx"');
      const hasTitle = result.content.includes('New Technologies & Investment Funds Institute');
      
      console.log(`   React Root: ${hasReactRoot ? '✅' : '❌'}`);
      console.log(`   Main Script: ${hasScript ? '✅' : '❌'}`);
      console.log(`   Title: ${hasTitle ? '✅' : '❌'}`);
      
      // Check for route-specific content
      if (route.path === '/test') {
        const hasTestContent = result.content.includes('Test Page') || result.content.includes('React is working');
        console.log(`   Test Content: ${hasTestContent ? '✅' : '❌'}`);
      }
      
      if (route.path === '/professor') {
        const hasProfessorContent = result.content.includes('Professor Dashboard') || result.content.includes('Professor');
        console.log(`   Professor Content: ${hasProfessorContent ? '✅' : '❌'}`);
      }
      
      if (route.path === '/login') {
        const hasLoginContent = result.content.includes('Sign in') || result.content.includes('login');
        console.log(`   Login Content: ${hasLoginContent ? '✅' : '❌'}`);
      }
      
      // Check content length
      console.log(`   Content Length: ${result.content.length} chars`);
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n🎯 Router Analysis:');
  console.log('==================');
  console.log('If all routes show the same content length and structure,');
  console.log('this indicates a React Router configuration issue.');
  console.log('The SPA should serve the same HTML but render different components.');
}

testRouterBehavior().catch(console.error);
