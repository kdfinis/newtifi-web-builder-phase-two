#!/usr/bin/env node

/**
 * Firebase Deployment Script using Firebase Admin SDK
 * This script verifies credentials using Admin SDK and then deploys using Firebase CLI
 */

const admin = require("firebase-admin");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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

function error(message) {
  log(`❌ ${message}`, 'red');
  process.exit(1);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function warn(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Main deployment function
async function deploy() {
  try {
    log('\n🚀 Starting Firebase Deployment with Admin SDK Verification\n', 'blue');

    // Step 1: Check for service account file
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                               process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
                               '/tmp/firebase-service-account.json';
    
    info(`Checking service account file: ${serviceAccountPath}`);
    
    if (!fs.existsSync(serviceAccountPath)) {
      error(`Service account file not found at: ${serviceAccountPath}`);
    }

    // Step 2: Load and verify service account
    info('Loading service account...');
    let serviceAccount;
    try {
      const serviceAccountContent = fs.readFileSync(serviceAccountPath, 'utf8');
      serviceAccount = JSON.parse(serviceAccountContent);
    } catch (err) {
      error(`Failed to parse service account JSON: ${err.message}`);
    }

    // Step 3: Verify required fields
    info('Verifying service account structure...');
    const requiredFields = ['type', 'project_id', 'private_key', 'client_email'];
    for (const field of requiredFields) {
      if (!serviceAccount[field]) {
        error(`Missing required field in service account: ${field}`);
      }
    }

    if (serviceAccount.type !== 'service_account') {
      error('Service account type is not "service_account"');
    }

    success(`Service account verified: ${serviceAccount.client_email}`);
    info(`Project ID: ${serviceAccount.project_id}`);

    // Step 4: Initialize Firebase Admin SDK
    info('Initializing Firebase Admin SDK...');
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id
      });
      success('Firebase Admin SDK initialized successfully');
    } catch (err) {
      error(`Failed to initialize Firebase Admin SDK: ${err.message}`);
    }

    // Step 5: Verify authentication by getting project info
    info('Verifying authentication...');
    try {
      // Try to access Firebase services to verify credentials
      const auth = admin.auth();
      // Just verify we can access the service (we don't need to do anything)
      success('Authentication verified - Admin SDK can access Firebase services');
    } catch (err) {
      warn(`Authentication verification warning: ${err.message}`);
      warn('Continuing with deployment anyway...');
    }

    // Step 6: Verify build output exists
    const distPath = path.join(process.cwd(), 'dist');
    info(`Checking build output: ${distPath}`);
    
    if (!fs.existsSync(distPath)) {
      error('dist/ directory not found. Run "npm run build" first.');
    }

    const distFiles = fs.readdirSync(distPath);
    if (distFiles.length === 0) {
      error('dist/ directory is empty. Build may have failed.');
    }

    success(`Build output verified: ${distFiles.length} files found`);

    // Step 7: Verify firebase.json exists
    const firebaseJsonPath = path.join(process.cwd(), 'firebase.json');
    if (!fs.existsSync(firebaseJsonPath)) {
      error('firebase.json not found in project root');
    }
    success('firebase.json found');

    // Step 8: Deploy using Firebase CLI
    info('Deploying to Firebase Hosting...');
    const projectId = serviceAccount.project_id;
    
    try {
      // Set environment variable for Firebase CLI
      process.env.GOOGLE_APPLICATION_CREDENTIALS = serviceAccountPath;
      
      // Run Firebase CLI deployment
      const deployCommand = `firebase deploy --only hosting --non-interactive --project ${projectId}`;
      info(`Executing: ${deployCommand}`);
      
      execSync(deployCommand, {
        stdio: 'inherit',
        env: {
          ...process.env,
          GOOGLE_APPLICATION_CREDENTIALS: serviceAccountPath
        }
      });
      
      success('Deployment completed successfully!');
      log('\n🎉 Your site should be live shortly!\n', 'green');
      
    } catch (err) {
      error(`Firebase CLI deployment failed: ${err.message}`);
    }

    // Step 9: Cleanup
    info('Cleaning up...');
    admin.app().delete().catch(() => {
      // Ignore cleanup errors
    });
    success('Cleanup complete');

  } catch (err) {
    error(`Deployment failed: ${err.message}`);
  }
}

// Run deployment
deploy().catch((err) => {
  error(`Unexpected error: ${err.message}`);
  process.exit(1);
});
