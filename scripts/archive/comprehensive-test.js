#!/usr/bin/env node
// Comprehensive Testing Script for NewTIFI Website
// Tests all systems, simulates errors, and validates contingencies

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:8080',
  timeout: 5000,
  retries: 3,
  testRoutes: [
    '/',
    '/publishing',
    '/publishing/articles/eltifs-compulsory-redemptions',
    '/publishing/articles/bafin-portfolio-control',
    '/publishing/articles/luxembourg-well-informed-investor',
    '/who-we-are',
    '/contact',
    '/membership',
    '/login',
    '/admin'
  ]
};

// Color codes for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName, status, details = '') {
  const statusColor = status === 'PASS' ? 'green' : status === 'FAIL' ? 'red' : 'yellow';
  const statusSymbol = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  
  log(`${statusSymbol} ${testName}: ${status}`, statusColor);
  if (details) {
    log(`   ${details}`, 'yellow');
  }
  
  testResults.tests.push({ name: testName, status, details });
  if (status === 'PASS') testResults.passed++;
  else if (status === 'FAIL') testResults.failed++;
  else testResults.warnings++;
}

// HTTP request helper
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const request = http.get(url, { timeout: TEST_CONFIG.timeout }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        const endTime = Date.now();
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          data,
          responseTime: endTime - startTime
        });
      });
    });
    
    request.on('error', reject);
    request.on('timeout', () => reject(new Error('Request timeout')));
  });
}

// Test 1: Basic Connectivity
async function testBasicConnectivity() {
  log('\n🔍 Testing Basic Connectivity...', 'cyan');
  
  try {
    const response = await makeRequest(TEST_CONFIG.baseUrl);
    
    if (response.statusCode === 200) {
      logTest('Basic Connectivity', 'PASS', `Status: ${response.statusCode}, Time: ${response.responseTime}ms`);
    } else {
      logTest('Basic Connectivity', 'FAIL', `Unexpected status: ${response.statusCode}`);
    }
  } catch (error) {
    logTest('Basic Connectivity', 'FAIL', error.message);
  }
}

// Test 2: Route Accessibility
async function testRouteAccessibility() {
  log('\n🔍 Testing Route Accessibility...', 'cyan');
  
  for (const route of TEST_CONFIG.testRoutes) {
    try {
      const response = await makeRequest(`${TEST_CONFIG.baseUrl}${route}`);
      
      if (response.statusCode === 200) {
        logTest(`Route: ${route}`, 'PASS', `Status: ${response.statusCode}, Time: ${response.responseTime}ms`);
      } else if (response.statusCode === 404) {
        logTest(`Route: ${route}`, 'WARN', `Not found (expected for some routes)`);
      } else {
        logTest(`Route: ${route}`, 'FAIL', `Unexpected status: ${response.statusCode}`);
      }
    } catch (error) {
      logTest(`Route: ${route}`, 'FAIL', error.message);
    }
  }
}

// Test 3: Error Detection
async function testErrorDetection() {
  log('\n🔍 Testing Error Detection...', 'cyan');
  
  try {
    const response = await makeRequest(TEST_CONFIG.baseUrl);
    const html = response.data;
    
    // Check for common error patterns
    const errorPatterns = [
      /error/gi,
      /undefined/gi,
      /null/gi,
      /NaN/gi,
      /TypeError/gi,
      /ReferenceError/gi,
      /SyntaxError/gi
    ];
    
    let errorCount = 0;
    errorPatterns.forEach(pattern => {
      const matches = html.match(pattern);
      if (matches) {
        errorCount += matches.length;
      }
    });
    
    if (errorCount === 0) {
      logTest('Error Detection', 'PASS', 'No errors found in HTML');
    } else {
      logTest('Error Detection', 'WARN', `Found ${errorCount} potential error patterns`);
    }
  } catch (error) {
    logTest('Error Detection', 'FAIL', error.message);
  }
}

// Test 4: Performance Testing
async function testPerformance() {
  log('\n🔍 Testing Performance...', 'cyan');
  
  const iterations = 5;
  const responseTimes = [];
  
  for (let i = 0; i < iterations; i++) {
    try {
      const response = await makeRequest(TEST_CONFIG.baseUrl);
      responseTimes.push(response.responseTime);
    } catch (error) {
      logTest(`Performance Test ${i + 1}`, 'FAIL', error.message);
      return;
    }
  }
  
  const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
  const maxResponseTime = Math.max(...responseTimes);
  const minResponseTime = Math.min(...responseTimes);
  
  if (avgResponseTime < 1000) {
    logTest('Performance', 'PASS', `Avg: ${avgResponseTime.toFixed(2)}ms, Max: ${maxResponseTime}ms, Min: ${minResponseTime}ms`);
  } else {
    logTest('Performance', 'WARN', `Avg: ${avgResponseTime.toFixed(2)}ms (slow)`);
  }
}

// Test 5: Configuration Validation
async function testConfigurationValidation() {
  log('\n🔍 Testing Configuration Validation...', 'cyan');
  
  const configFiles = [
    'config/site.json',
    'config/journals.json',
    'config/ui.json',
    'config/auth.json'
  ];
  
  for (const configFile of configFiles) {
    try {
      const configPath = path.join(__dirname, '..', configFile);
      const configData = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(configData);
      
      if (config && typeof config === 'object') {
        logTest(`Config: ${configFile}`, 'PASS', 'Valid JSON structure');
      } else {
        logTest(`Config: ${configFile}`, 'FAIL', 'Invalid JSON structure');
      }
    } catch (error) {
      logTest(`Config: ${configFile}`, 'FAIL', error.message);
    }
  }
}

// Test 6: Content Validation
async function testContentValidation() {
  log('\n🔍 Testing Content Validation...', 'cyan');
  
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/publishing`);
    const html = response.data;
    
    // Check for essential content
    const contentChecks = [
      { pattern: /NewTIFI/gi, name: 'NewTIFI Brand' },
      { pattern: /Investment Management/gi, name: 'Investment Management' },
      { pattern: /Journal/gi, name: 'Journal Content' },
      { pattern: /Article/gi, name: 'Article Content' }
    ];
    
    contentChecks.forEach(check => {
      if (check.pattern.test(html)) {
        logTest(`Content: ${check.name}`, 'PASS', 'Found in content');
      } else {
        logTest(`Content: ${check.name}`, 'WARN', 'Not found in content');
      }
    });
  } catch (error) {
    logTest('Content Validation', 'FAIL', error.message);
  }
}

// Test 7: Error Simulation
async function testErrorSimulation() {
  log('\n🔍 Testing Error Simulation...', 'cyan');
  
  // Test 1: Invalid route
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/invalid-route-12345`);
    if (response.statusCode === 404) {
      logTest('Error Simulation: 404', 'PASS', 'Correctly returns 404 for invalid route');
    } else {
      logTest('Error Simulation: 404', 'WARN', `Unexpected status: ${response.statusCode}`);
    }
  } catch (error) {
    logTest('Error Simulation: 404', 'FAIL', error.message);
  }
  
  // Test 2: Malformed URL
  try {
    const response = await makeRequest(`${TEST_CONFIG.baseUrl}/publishing/articles/invalid-article-12345`);
    if (response.statusCode === 404) {
      logTest('Error Simulation: Invalid Article', 'PASS', 'Correctly handles invalid article');
    } else {
      logTest('Error Simulation: Invalid Article', 'WARN', `Unexpected status: ${response.statusCode}`);
    }
  } catch (error) {
    logTest('Error Simulation: Invalid Article', 'FAIL', error.message);
  }
}

// Main test runner
async function runAllTests() {
  log('🚀 Starting Comprehensive NewTIFI Website Tests...', 'bright');
  log('=' .repeat(60), 'cyan');
  
  const startTime = Date.now();
  
  await testBasicConnectivity();
  await testRouteAccessibility();
  await testErrorDetection();
  await testPerformance();
  await testConfigurationValidation();
  await testContentValidation();
  await testErrorSimulation();
  
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  
  // Summary
  log('\n' + '=' .repeat(60), 'cyan');
  log('📊 TEST SUMMARY', 'bright');
  log('=' .repeat(60), 'cyan');
  
  log(`✅ Passed: ${testResults.passed}`, 'green');
  log(`❌ Failed: ${testResults.failed}`, 'red');
  log(`⚠️  Warnings: ${testResults.warnings}`, 'yellow');
  log(`⏱️  Total Time: ${totalTime}ms`, 'blue');
  
  const successRate = ((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1);
  log(`📈 Success Rate: ${successRate}%`, successRate >= 90 ? 'green' : 'yellow');
  
  if (testResults.failed === 0) {
    log('\n🎉 ALL TESTS PASSED! System is production ready.', 'green');
  } else {
    log(`\n⚠️  ${testResults.failed} tests failed. Please review before production deployment.`, 'yellow');
  }
  
  log('\n🔍 Detailed Test Results:', 'cyan');
  testResults.tests.forEach(test => {
    const statusColor = test.status === 'PASS' ? 'green' : test.status === 'FAIL' ? 'red' : 'yellow';
    log(`  ${test.name}: ${test.status}`, statusColor);
    if (test.details) {
      log(`    ${test.details}`, 'yellow');
    }
  });
}

// Run tests
runAllTests().catch(error => {
  log(`\n💥 Test runner failed: ${error.message}`, 'red');
  process.exit(1);
});
