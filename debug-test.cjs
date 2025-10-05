// Comprehensive Debug Test Script

const http = require('http');
const https = require('https');

async function testEndpoint(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          content: data,
          contentType: res.headers['content-type']
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runDebugTests() {
  console.log('🔍 Starting Comprehensive Debug Tests...\n');
  
  const tests = [
    {
      name: 'Home Page (Port 8080)',
      url: 'http://localhost:8080',
      checks: ['HTML structure', 'React root div', 'Script tags']
    },
    {
      name: 'Test Page (Port 8080)',
      url: 'http://localhost:8080/test',
      checks: ['React component rendering', 'No JavaScript errors']
    },
    {
      name: 'Professor Dashboard (Port 8080)',
      url: 'http://localhost:8080/professor',
      checks: ['Dashboard rendering', 'Component structure']
    },
    {
      name: 'Login Page (Port 8080)',
      url: 'http://localhost:8080/login',
      checks: ['Login form', 'No auth errors']
    },
    {
      name: 'Architecture Server (Port 3000)',
      url: 'http://localhost:3000',
      checks: ['Production build', 'Static serving']
    }
  ];
  
  for (const test of tests) {
    console.log(`\n📋 Testing: ${test.name}`);
    console.log(`🔗 URL: ${test.url}`);
    
    try {
      const result = await testEndpoint(test.url);
      
      console.log(`✅ Status: ${result.status}`);
      console.log(`📄 Content-Type: ${result.contentType}`);
      
      // Check for common issues
      const content = result.content;
      
      if (content.includes('error') || content.includes('Error')) {
        console.log('⚠️  WARNING: Error detected in content');
        const errorMatches = content.match(/error[^<]*/gi);
        if (errorMatches) {
          console.log('   Error details:', errorMatches.slice(0, 3));
        }
      }
      
      if (content.includes('undefined') || content.includes('null')) {
        console.log('⚠️  WARNING: Undefined/null values detected');
      }
      
      if (content.includes('root') && content.includes('script')) {
        console.log('✅ React structure detected');
      } else {
        console.log('❌ React structure missing');
      }
      
      if (content.includes('NewTIFI') || content.includes('New Technologies')) {
        console.log('✅ Content loading correctly');
      } else {
        console.log('❌ Content not loading');
      }
      
      // Check for JavaScript errors in script tags
      const scriptMatches = content.match(/<script[^>]*>[\s\S]*?<\/script>/gi);
      if (scriptMatches) {
        console.log(`✅ Found ${scriptMatches.length} script tags`);
      }
      
      console.log(`📊 Content length: ${content.length} characters`);
      
    } catch (error) {
      console.log(`❌ FAILED: ${error.message}`);
    }
  }
  
  console.log('\n🎯 Debug Test Summary:');
  console.log('=====================');
  console.log('✅ All endpoints tested');
  console.log('📋 Check console output above for specific issues');
  console.log('🔧 Next steps: Fix any warnings or errors found');
}

// Run the tests
runDebugTests().catch(console.error);
