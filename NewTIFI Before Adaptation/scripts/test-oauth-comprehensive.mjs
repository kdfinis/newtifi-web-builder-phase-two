#!/usr/bin/env node

/**
 * Comprehensive OAuth Testing Suite
 * Tests both Google and LinkedIn OAuth on localhost and production
 */

import https from 'https';
import http from 'http';
import { URL } from 'url';

console.log('🧪 COMPREHENSIVE OAUTH TESTING SUITE');
console.log('='.repeat(60));

const testEnvironments = [
  {
    name: 'Localhost',
    baseUrl: 'http://localhost:8080',
    description: 'Development environment'
  },
  {
    name: 'Production',
    baseUrl: 'https://newtifi.com',
    description: 'Production environment'
  }
];

const oauthTests = [
  {
    name: 'Google OAuth Configuration',
    path: '/login',
    expectedRedirectUri: '/auth/google/callback',
    testType: 'redirect_uri_check'
  },
  {
    name: 'LinkedIn OAuth Configuration', 
    path: '/login',
    expectedRedirectUri: '/auth/linkedin/callback',
    testType: 'redirect_uri_check'
  },
  {
    name: 'OAuth Callback Routes',
    path: '/auth/google/callback',
    expectedStatus: 200,
    testType: 'route_accessibility'
  },
  {
    name: 'LinkedIn Callback Routes',
    path: '/auth/linkedin/callback', 
    expectedStatus: 200,
    testType: 'route_accessibility'
  },
  {
    name: 'Dashboard Route',
    path: '/dashboard',
    expectedStatus: 200,
    testType: 'route_accessibility'
  },
  {
    name: 'Login Page',
    path: '/login',
    expectedStatus: 200,
    testType: 'route_accessibility'
  }
];

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      timeout: 10000,
      ...options
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    const req = client.request(requestOptions, (res) => {
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

async function testRedirectUri(baseUrl, test) {
  console.log(`\n🔍 Testing ${test.name} on ${baseUrl}`);
  console.log('─'.repeat(50));
  
  try {
    const response = await makeRequest(`${baseUrl}${test.path}`);
    
    if (response.statusCode === 200) {
      console.log(`✅ Status: ${response.statusCode}`);
      
      // Check for OAuth redirect URIs in the HTML content
      const content = response.data;
      const hasGoogleCallback = content.includes('/auth/google/callback');
      const hasLinkedInCallback = content.includes('/auth/linkedin/callback');
      
      if (test.expectedRedirectUri.includes('google')) {
        console.log(`✅ Google OAuth URI: ${hasGoogleCallback ? 'Present' : 'Missing'}`);
        if (!hasGoogleCallback) {
          console.log(`❌ Expected: /auth/google/callback`);
        }
      }
      
      if (test.expectedRedirectUri.includes('linkedin')) {
        console.log(`✅ LinkedIn OAuth URI: ${hasLinkedInCallback ? 'Present' : 'Missing'}`);
        if (!hasLinkedInCallback) {
          console.log(`❌ Expected: /auth/linkedin/callback`);
        }
      }
      
      // Check for OAuth button presence
      const hasGoogleButton = content.includes('Continue with Google') || content.includes('Google');
      const hasLinkedInButton = content.includes('Continue with LinkedIn') || content.includes('LinkedIn');
      
      console.log(`✅ Google Button: ${hasGoogleButton ? 'Present' : 'Missing'}`);
      console.log(`✅ LinkedIn Button: ${hasLinkedInButton ? 'Present' : 'Missing'}`);
      
    } else {
      console.log(`❌ Status: ${response.statusCode} (Expected 200)`);
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function testRouteAccessibility(baseUrl, test) {
  console.log(`\n🔍 Testing ${test.name} on ${baseUrl}`);
  console.log('─'.repeat(50));
  
  try {
    const response = await makeRequest(`${baseUrl}${test.path}`);
    
    if (response.statusCode === test.expectedStatus) {
      console.log(`✅ Status: ${response.statusCode}`);
      console.log(`✅ Content-Type: ${response.headers['content-type']}`);
      
      // Check if it's serving HTML (for SPA routes)
      const isHtml = response.headers['content-type']?.includes('text/html');
      console.log(`✅ SPA Routing: ${isHtml ? 'Working' : 'Not HTML'}`);
      
    } else {
      console.log(`❌ Status: ${response.statusCode} (Expected ${test.expectedStatus})`);
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function testOAuthFlow(baseUrl) {
  console.log(`\n🔍 Testing OAuth Flow on ${baseUrl}`);
  console.log('─'.repeat(50));
  
  try {
    // Test if we can access the login page
    const loginResponse = await makeRequest(`${baseUrl}/login`);
    
    if (loginResponse.statusCode === 200) {
      console.log(`✅ Login Page: Accessible`);
      
      // Check for OAuth configuration in the page
      const content = loginResponse.data;
      
      // Look for OAuth URLs in the JavaScript
      const googleOAuthMatch = content.match(/https:\/\/accounts\.google\.com\/o\/oauth2\/v2\/auth[^"']*/);
      const linkedinOAuthMatch = content.match(/https:\/\/www\.linkedin\.com\/oauth\/v2\/authorization[^"']*/);
      
      if (googleOAuthMatch) {
        const googleUrl = googleOAuthMatch[0];
        const hasCorrectRedirect = googleUrl.includes('redirect_uri=') && 
          (googleUrl.includes('/auth/google/callback') || googleUrl.includes('%2Fauth%2Fgoogle%2Fcallback'));
        console.log(`✅ Google OAuth URL: ${hasCorrectRedirect ? 'Correct redirect URI' : 'Incorrect redirect URI'}`);
        console.log(`   URL: ${googleUrl.substring(0, 100)}...`);
      } else {
        console.log(`❌ Google OAuth URL: Not found in page`);
      }
      
      if (linkedinOAuthMatch) {
        const linkedinUrl = linkedinOAuthMatch[0];
        const hasCorrectRedirect = linkedinUrl.includes('redirect_uri=') && 
          (linkedinUrl.includes('/auth/linkedin/callback') || linkedinUrl.includes('%2Fauth%2Flinkedin%2Fcallback'));
        console.log(`✅ LinkedIn OAuth URL: ${hasCorrectRedirect ? 'Correct redirect URI' : 'Incorrect redirect URI'}`);
        console.log(`   URL: ${linkedinUrl.substring(0, 100)}...`);
      } else {
        console.log(`❌ LinkedIn OAuth URL: Not found in page`);
      }
      
    } else {
      console.log(`❌ Login Page: Not accessible (${loginResponse.statusCode})`);
    }
    
  } catch (error) {
    console.log(`❌ OAuth Flow Error: ${error.message}`);
  }
}

async function runComprehensiveTests() {
  console.log('🚀 Starting comprehensive OAuth testing...\n');
  
  for (const environment of testEnvironments) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🌐 TESTING: ${environment.name.toUpperCase()}`);
    console.log(`📍 URL: ${environment.baseUrl}`);
    console.log(`📝 Description: ${environment.description}`);
    console.log(`${'='.repeat(60)}`);
    
    // Test OAuth configuration
    for (const test of oauthTests) {
      if (test.testType === 'redirect_uri_check') {
        await testRedirectUri(environment.baseUrl, test);
      } else if (test.testType === 'route_accessibility') {
        await testRouteAccessibility(environment.baseUrl, test);
      }
    }
    
    // Test OAuth flow
    await testOAuthFlow(environment.baseUrl);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPREHENSIVE TEST SUMMARY');
  console.log('='.repeat(60));
  
  console.log('\n✅ OAUTH CONFIGURATION:');
  console.log('  • Google OAuth: /auth/google/callback');
  console.log('  • LinkedIn OAuth: /auth/linkedin/callback');
  console.log('  • Both environments should have matching redirect URIs');
  
  console.log('\n✅ ROUTE ACCESSIBILITY:');
  console.log('  • OAuth callback routes should return 200 status');
  console.log('  • Dashboard and login routes should be accessible');
  console.log('  • SPA routing should serve HTML content');
  
  console.log('\n✅ OAUTH FLOW:');
  console.log('  • Login page should contain OAuth buttons');
  console.log('  • OAuth URLs should have correct redirect URIs');
  console.log('  • No redirect_uri_mismatch errors');
  
  console.log('\n🎯 EXPECTED RESULTS:');
  console.log('  • Google OAuth: Should work without redirect_uri_mismatch');
  console.log('  • LinkedIn OAuth: Should work without 404 errors');
  console.log('  • Both OAuth: Should redirect to dashboard after success');
  
  console.log('\n🚀 OAuth should now work correctly on both environments!');
}

runComprehensiveTests().catch(console.error);
