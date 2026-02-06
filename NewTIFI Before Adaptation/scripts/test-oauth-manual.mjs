#!/usr/bin/env node

/**
 * Manual OAuth Testing Script
 * Tests OAuth functionality step by step
 */

import https from 'https';
import http from 'http';
import { URL } from 'url';

console.log('🧪 MANUAL OAUTH TESTING');
console.log('='.repeat(50));

async function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      timeout: 10000
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          url: url
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testLocalhost() {
  console.log('\n📱 TESTING LOCALHOST (http://localhost:8080)');
  console.log('─'.repeat(50));
  
  try {
    // Test homepage
    const homeResponse = await makeRequest('http://localhost:8080');
    console.log(`✅ Homepage: ${homeResponse.statusCode}`);
    
    // Test login page
    const loginResponse = await makeRequest('http://localhost:8080/login');
    console.log(`✅ Login Page: ${loginResponse.statusCode}`);
    
    if (loginResponse.statusCode === 200) {
      const content = loginResponse.data;
      const hasGoogleButton = content.includes('Google') || content.includes('google');
      const hasLinkedInButton = content.includes('LinkedIn') || content.includes('linkedin');
      console.log(`✅ Google Button: ${hasGoogleButton ? 'Present' : 'Missing'}`);
      console.log(`✅ LinkedIn Button: ${hasLinkedInButton ? 'Present' : 'Missing'}`);
      
      // Check for OAuth redirect URIs
      const hasGoogleCallback = content.includes('/auth/google/callback');
      const hasLinkedInCallback = content.includes('/auth/linkedin/callback');
      console.log(`✅ Google Callback URI: ${hasGoogleCallback ? 'Present' : 'Missing'}`);
      console.log(`✅ LinkedIn Callback URI: ${hasLinkedInCallback ? 'Present' : 'Missing'}`);
    }
    
    // Test OAuth callback routes
    const googleCallbackResponse = await makeRequest('http://localhost:8080/auth/google/callback');
    console.log(`✅ Google Callback Route: ${googleCallbackResponse.statusCode}`);
    
    const linkedinCallbackResponse = await makeRequest('http://localhost:8080/auth/linkedin/callback');
    console.log(`✅ LinkedIn Callback Route: ${linkedinCallbackResponse.statusCode}`);
    
    // Test dashboard
    const dashboardResponse = await makeRequest('http://localhost:8080/dashboard');
    console.log(`✅ Dashboard Route: ${dashboardResponse.statusCode}`);
    
  } catch (error) {
    console.log(`❌ Localhost Error: ${error.message}`);
  }
}

async function testProduction() {
  console.log('\n🌐 TESTING PRODUCTION (https://newtifi.com)');
  console.log('─'.repeat(50));
  
  try {
    // Test homepage
    const homeResponse = await makeRequest('https://newtifi.com');
    console.log(`✅ Homepage: ${homeResponse.statusCode}`);
    
    // Test login page
    const loginResponse = await makeRequest('https://newtifi.com/login');
    console.log(`✅ Login Page: ${loginResponse.statusCode}`);
    
    if (loginResponse.statusCode === 200) {
      const content = loginResponse.data;
      const hasGoogleButton = content.includes('Google') || content.includes('google');
      const hasLinkedInButton = content.includes('LinkedIn') || content.includes('linkedin');
      console.log(`✅ Google Button: ${hasGoogleButton ? 'Present' : 'Missing'}`);
      console.log(`✅ LinkedIn Button: ${hasLinkedInButton ? 'Present' : 'Missing'}`);
      
      // Check for OAuth redirect URIs
      const hasGoogleCallback = content.includes('/auth/google/callback');
      const hasLinkedInCallback = content.includes('/auth/linkedin/callback');
      console.log(`✅ Google Callback URI: ${hasGoogleCallback ? 'Present' : 'Missing'}`);
      console.log(`✅ LinkedIn Callback URI: ${hasLinkedInCallback ? 'Present' : 'Missing'}`);
    }
    
    // Test OAuth callback routes
    const googleCallbackResponse = await makeRequest('https://newtifi.com/auth/google/callback');
    console.log(`✅ Google Callback Route: ${googleCallbackResponse.statusCode}`);
    
    const linkedinCallbackResponse = await makeRequest('https://newtifi.com/auth/linkedin/callback');
    console.log(`✅ LinkedIn Callback Route: ${linkedinCallbackResponse.statusCode}`);
    
    // Test dashboard
    const dashboardResponse = await makeRequest('https://newtifi.com/dashboard');
    console.log(`✅ Dashboard Route: ${dashboardResponse.statusCode}`);
    
  } catch (error) {
    console.log(`❌ Production Error: ${error.message}`);
  }
}

async function runManualTests() {
  console.log('🚀 Starting manual OAuth testing...\n');
  
  await testLocalhost();
  await testProduction();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 MANUAL TEST SUMMARY');
  console.log('='.repeat(50));
  
  console.log('\n🎯 NEXT STEPS:');
  console.log('1. If localhost works but production doesn\'t:');
  console.log('   - GitHub Pages SPA routing needs fixing');
  console.log('   - Check if 404.html is properly configured');
  console.log('   - Verify .nojekyll file is present');
  
  console.log('\n2. If OAuth URIs are missing:');
  console.log('   - Check if OAuth buttons are rendered');
  console.log('   - Verify redirect URIs in the code');
  console.log('   - Test OAuth flow manually in browser');
  
  console.log('\n3. If OAuth callbacks return 404:');
  console.log('   - SPA routing is not working');
  console.log('   - Need to fix GitHub Pages configuration');
  
  console.log('\n🚀 Manual testing complete!');
}

runManualTests().catch(console.error);
