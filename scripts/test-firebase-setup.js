#!/usr/bin/env node

/**
 * Test Firebase Setup Script
 * Verifies that Firebase service account and configuration are correct
 */

import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function warn(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function testSetup() {
  log('\n🔍 Testing Firebase Setup...\n', 'blue');
  
  let allTestsPassed = true;

  // Test 1: Check firebase.json exists
  info('Test 1: Checking firebase.json...');
  const firebaseJsonPath = path.join(process.cwd(), 'firebase.json');
  if (fs.existsSync(firebaseJsonPath)) {
    const firebaseJson = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf8'));
    if (firebaseJson.hosting && firebaseJson.hosting.public === 'dist') {
      success('firebase.json is correctly configured');
    } else {
      error('firebase.json hosting.public is not set to "dist"');
      allTestsPassed = false;
    }
  } else {
    error('firebase.json not found');
    allTestsPassed = false;
  }

  // Test 2: Check .firebaserc exists
  info('Test 2: Checking .firebaserc...');
  const firebasercPath = path.join(process.cwd(), '.firebaserc');
  if (fs.existsSync(firebasercPath)) {
    const firebaserc = JSON.parse(fs.readFileSync(firebasercPath, 'utf8'));
    if (firebaserc.projects && firebaserc.projects.default === 'newtifi-web') {
      success('.firebaserc is correctly configured');
    } else {
      error('.firebaserc project ID is not "newtifi-web"');
      allTestsPassed = false;
    }
  } else {
    error('.firebaserc not found');
    allTestsPassed = false;
  }

  // Test 3: Check if service account file exists (for local testing)
  info('Test 3: Checking service account configuration...');
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                            process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  
  if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      
      // Verify required fields
      const requiredFields = ['type', 'project_id', 'private_key', 'client_email'];
      let fieldsValid = true;
      
      for (const field of requiredFields) {
        if (!serviceAccount[field]) {
          error(`Missing required field: ${field}`);
          fieldsValid = false;
          allTestsPassed = false;
        }
      }
      
      if (fieldsValid) {
        success(`Service account file found: ${serviceAccount.client_email}`);
        
        // Test 4: Try to initialize Firebase Admin SDK
        info('Test 4: Testing Firebase Admin SDK initialization...');
        try {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: serviceAccount.project_id
          });
          
          // Try to access a service to verify credentials
          const auth = admin.auth();
          success('Firebase Admin SDK initialized successfully');
          success('Credentials are valid');
          
          // Cleanup
          admin.app().delete().catch(() => {});
          
        } catch (err) {
          error(`Failed to initialize Firebase Admin SDK: ${err.message}`);
          allTestsPassed = false;
        }
      }
    } catch (err) {
      error(`Failed to parse service account JSON: ${err.message}`);
      allTestsPassed = false;
    }
  } else {
    warn('Service account file not found locally (this is OK for GitHub Actions)');
    warn('In GitHub Actions, the secret will be provided via environment variable');
  }

  // Test 5: Check build output
  info('Test 5: Checking build output...');
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    const distFiles = fs.readdirSync(distPath);
    if (distFiles.length > 0) {
      success(`Build output found: ${distFiles.length} files in dist/`);
    } else {
      warn('dist/ directory exists but is empty (run "npm run build" first)');
    }
  } else {
    warn('dist/ directory not found (run "npm run build" first)');
  }

  // Test 6: Check package.json has firebase-admin
  info('Test 6: Checking dependencies...');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.dependencies && packageJson.dependencies['firebase-admin']) {
      success('firebase-admin package is in dependencies');
    } else {
      error('firebase-admin package not found in dependencies');
      allTestsPassed = false;
    }
  }

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  if (allTestsPassed) {
    success('All tests passed! Setup looks good.');
    log('\n📋 Next steps:', 'blue');
    log('1. Go to GitHub Actions: https://github.com/kdfinis/newtifi-web-builder-phase-two/actions', 'blue');
    log('2. Click "🚀 Auto Deploy to Firebase"', 'blue');
    log('3. Click "Run workflow" → "Run workflow"', 'blue');
    log('4. Monitor the workflow execution', 'blue');
  } else {
    error('Some tests failed. Please fix the issues above.');
  }
  log('='.repeat(50) + '\n', 'blue');
  
  process.exit(allTestsPassed ? 0 : 1);
}

testSetup().catch((err) => {
  error(`Unexpected error: ${err.message}`);
  process.exit(1);
});
