// Comprehensive Debug Prevention System

const http = require('http');
const fs = require('fs');
const path = require('path');

class DebugPreventionSystem {
  constructor() {
    this.issues = [];
    this.fixes = [];
  }

  async runDiagnostics() {
    console.log('🔍 Running Comprehensive Diagnostics...\n');
    
    await this.checkServerHealth();
    await this.checkReactSetup();
    await this.checkRouterConfiguration();
    await this.checkModuleLoading();
    await this.checkBrowserCompatibility();
    
    this.generateReport();
  }

  async checkServerHealth() {
    console.log('📡 Checking Server Health...');
    
    try {
      const result = await this.testEndpoint('http://localhost:8080');
      
      if (result.status === 200) {
        console.log('✅ Development server is running');
        
        // Check for React root
        if (result.content.includes('<div id="root"></div>')) {
          console.log('✅ React root element found');
        } else {
          this.issues.push('❌ React root element missing');
        }
        
        // Check for main script
        if (result.content.includes('src="/src/main.tsx') || result.content.includes('main.tsx')) {
          console.log('✅ Main script reference found');
        } else {
          this.issues.push('❌ Main script reference missing');
        }
        
        // Check for Vite client
        if (result.content.includes('@vite/client')) {
          console.log('✅ Vite client found');
        } else {
          this.issues.push('❌ Vite client missing');
        }
        
      } else {
        this.issues.push(`❌ Server returned status ${result.status}`);
      }
    } catch (error) {
      this.issues.push(`❌ Server health check failed: ${error.message}`);
    }
  }

  async checkReactSetup() {
    console.log('\n⚛️ Checking React Setup...');
    
    try {
      // Check if main.tsx is accessible
      const mainResult = await this.testEndpoint('http://localhost:8080/src/main.tsx');
      
      if (mainResult.status === 200) {
        console.log('✅ Main.tsx is accessible');
        
        // Check for React imports
        if (mainResult.content.includes('createRoot')) {
          console.log('✅ React DOM createRoot found');
        } else {
          this.issues.push('❌ React DOM createRoot missing');
        }
        
        if (mainResult.content.includes('App')) {
          console.log('✅ App component import found');
        } else {
          this.issues.push('❌ App component import missing');
        }
        
      } else {
        this.issues.push('❌ Main.tsx not accessible');
      }
      
      // Check React modules
      const reactResult = await this.testEndpoint('http://localhost:8080/node_modules/.vite/deps/react.js');
      if (reactResult.status === 200) {
        console.log('✅ React modules accessible');
      } else {
        this.issues.push('❌ React modules not accessible');
      }
      
    } catch (error) {
      this.issues.push(`❌ React setup check failed: ${error.message}`);
    }
  }

  async checkRouterConfiguration() {
    console.log('\n🛣️ Checking Router Configuration...');
    
    const routes = ['/', '/test', '/professor', '/login', '/nonexistent'];
    const routeResults = [];
    
    for (const route of routes) {
      try {
        const result = await this.testEndpoint(`http://localhost:8080${route}`);
        routeResults.push({
          route,
          status: result.status,
          contentLength: result.content.length,
          hasReactRoot: result.content.includes('<div id="root"></div>')
        });
      } catch (error) {
        this.issues.push(`❌ Route ${route} failed: ${error.message}`);
      }
    }
    
    // Check if all routes return the same content (SPA routing issue)
    const contentLengths = routeResults.map(r => r.contentLength);
    const uniqueLengths = [...new Set(contentLengths)];
    
    if (uniqueLengths.length === 1) {
      console.log('✅ All routes return same HTML (SPA behavior)');
      
      // Check if React root is present in all routes
      const allHaveReactRoot = routeResults.every(r => r.hasReactRoot);
      if (allHaveReactRoot) {
        console.log('✅ All routes have React root element');
      } else {
        this.issues.push('❌ Some routes missing React root element');
      }
    } else {
      this.issues.push('❌ Routes return different content lengths (not SPA behavior)');
    }
  }

  async checkModuleLoading() {
    console.log('\n📦 Checking Module Loading...');
    
    const modules = [
      '/src/App.tsx',
      '/node_modules/.vite/deps/react.js',
      '/node_modules/.vite/deps/react-dom_client.js',
      '/node_modules/.vite/deps/react-router-dom.js'
    ];
    
    for (const module of modules) {
      try {
        const result = await this.testEndpoint(`http://localhost:8080${module}`);
        if (result.status === 200) {
          console.log(`✅ Module ${module} accessible`);
        } else {
          this.issues.push(`❌ Module ${module} not accessible (${result.status})`);
        }
      } catch (error) {
        this.issues.push(`❌ Module ${module} failed: ${error.message}`);
      }
    }
  }

  async checkBrowserCompatibility() {
    console.log('\n🌐 Checking Browser Compatibility...');
    
    // This would typically check browser features, but for now we'll check server headers
    try {
      const result = await this.testEndpoint('http://localhost:8080');
      const contentType = result.headers['content-type'];
      
      if (contentType && contentType.includes('text/html')) {
        console.log('✅ Correct content type for HTML');
      } else {
        this.issues.push('❌ Incorrect content type');
      }
      
      // Check for proper charset
      if (result.content.includes('charset=UTF-8') || result.content.includes('charset="UTF-8"')) {
        console.log('✅ UTF-8 charset specified');
      } else {
        this.issues.push('❌ UTF-8 charset not specified');
      }
      
    } catch (error) {
      this.issues.push(`❌ Browser compatibility check failed: ${error.message}`);
    }
  }

  async testEndpoint(url) {
    return new Promise((resolve, reject) => {
      const req = http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({
          status: res.statusCode,
          headers: res.headers,
          content: data
        }));
      });
      req.on('error', reject);
      req.setTimeout(5000, () => reject(new Error('Timeout')));
    });
  }

  generateReport() {
    console.log('\n📊 DIAGNOSTIC REPORT');
    console.log('====================');
    
    if (this.issues.length === 0) {
      console.log('✅ All checks passed! No issues found.');
    } else {
      console.log(`❌ Found ${this.issues.length} issues:`);
      this.issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue}`);
      });
    }
    
    console.log('\n🔧 PREVENTION RECOMMENDATIONS:');
    console.log('==============================');
    console.log('1. Always test routes after making changes');
    console.log('2. Check browser console for JavaScript errors');
    console.log('3. Verify React Router configuration');
    console.log('4. Test with minimal components first');
    console.log('5. Use debug scripts to isolate issues');
    console.log('6. Check module imports and dependencies');
    console.log('7. Verify Vite configuration');
    console.log('8. Test in different browsers');
    
    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      issues: this.issues,
      recommendations: [
        'Test routes after changes',
        'Check browser console',
        'Verify React Router config',
        'Use minimal components first',
        'Check module imports',
        'Verify Vite config',
        'Test in different browsers'
      ]
    };
    
    fs.writeFileSync('debug-report.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Report saved to debug-report.json');
  }
}

// Run the diagnostics
const debugSystem = new DebugPreventionSystem();
debugSystem.runDiagnostics().catch(console.error);
