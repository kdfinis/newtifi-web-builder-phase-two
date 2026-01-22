#!/usr/bin/env node

/**
 * Firebase Deployment Diagnostic Script
 * Identifies why Firebase deployment is failing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function warn(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function diagnose() {
  log('\n🔍 Firebase Deployment Diagnostic\n', 'blue');
  log('='.repeat(60), 'blue');
  
  let issues = [];
  let warnings = [];
  
  // Check 1: firebase.json
  info('\n1. Checking firebase.json...');
  const firebaseJsonPath = path.join(process.cwd(), 'firebase.json');
  if (fs.existsSync(firebaseJsonPath)) {
    try {
      const firebaseJson = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf8'));
      if (firebaseJson.hosting?.public === 'dist') {
        success('firebase.json: Correctly configured (public: "dist")');
      } else {
        issues.push('firebase.json: hosting.public is not "dist"');
        error('firebase.json: hosting.public should be "dist"');
      }
    } catch (err) {
      issues.push('firebase.json: Invalid JSON');
      error(`firebase.json: ${err.message}`);
    }
  } else {
    issues.push('firebase.json: Missing');
    error('firebase.json: File not found');
  }
  
  // Check 2: .firebaserc
  info('\n2. Checking .firebaserc...');
  const firebasercPath = path.join(process.cwd(), '.firebaserc');
  if (fs.existsSync(firebasercPath)) {
    try {
      const firebaserc = JSON.parse(fs.readFileSync(firebasercPath, 'utf8'));
      if (firebaserc.projects?.default === 'newtifi-web') {
        success('.firebaserc: Correctly configured (project: "newtifi-web")');
      } else {
        issues.push('.firebaserc: Project ID mismatch');
        error('.firebaserc: Project ID should be "newtifi-web"');
      }
    } catch (err) {
      issues.push('.firebaserc: Invalid JSON');
      error(`.firebaserc: ${err.message}`);
    }
  } else {
    issues.push('.firebaserc: Missing');
    error('.firebaserc: File not found');
  }
  
  // Check 3: Build output
  info('\n3. Checking build output...');
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    const distFiles = fs.readdirSync(distPath);
    if (distFiles.length > 0) {
      success(`dist/: Found ${distFiles.length} files`);
      if (!distFiles.includes('index.html')) {
        warnings.push('dist/: index.html missing');
        warn('dist/: index.html not found');
      } else {
        success('dist/: index.html found');
      }
    } else {
      issues.push('dist/: Empty directory');
      error('dist/: Directory is empty (run "npm run build")');
    }
  } else {
    issues.push('dist/: Missing');
    error('dist/: Directory not found (run "npm run build")');
  }
  
  // Check 4: Service account (local only)
  info('\n4. Checking service account (local)...');
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                            process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  
  if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      const requiredFields = ['type', 'project_id', 'private_key', 'client_email'];
      let valid = true;
      
      for (const field of requiredFields) {
        if (!serviceAccount[field]) {
          issues.push(`Service account: Missing field "${field}"`);
          error(`Service account: Missing required field "${field}"`);
          valid = false;
        }
      }
      
      if (valid) {
        success(`Service account: Valid (${serviceAccount.client_email})`);
        if (serviceAccount.project_id !== 'newtifi-web') {
          warnings.push('Service account: Project ID mismatch');
          warn(`Service account: Project ID is "${serviceAccount.project_id}", expected "newtifi-web"`);
        }
      }
    } catch (err) {
      issues.push('Service account: Invalid JSON');
      error(`Service account: ${err.message}`);
    }
  } else {
    warnings.push('Service account: Not found locally (OK for GitHub Actions)');
    warn('Service account: Not found locally (will be provided in GitHub Actions)');
  }
  
  // Check 5: GitHub Actions workflow
  info('\n5. Checking GitHub Actions workflow...');
  const workflowPath = path.join(process.cwd(), '.github/workflows/firebase-deploy.yml');
  if (fs.existsSync(workflowPath)) {
    success('.github/workflows/firebase-deploy.yml: Found');
    const workflowContent = fs.readFileSync(workflowPath, 'utf8');
    if (workflowContent.includes('FIREBASE_SERVICE_ACCOUNT')) {
      success('Workflow: Checks for FIREBASE_SERVICE_ACCOUNT secret');
    } else {
      issues.push('Workflow: Missing secret check');
      error('Workflow: Does not check for FIREBASE_SERVICE_ACCOUNT');
    }
  } else {
    issues.push('Workflow: Missing');
    error('.github/workflows/firebase-deploy.yml: Not found');
  }
  
  // Check 6: Dependencies
  info('\n6. Checking dependencies...');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.dependencies?.['firebase-admin']) {
      success('firebase-admin: Installed');
    } else {
      issues.push('firebase-admin: Missing dependency');
      error('firebase-admin: Not in dependencies');
    }
  }
  
  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log('\n📊 DIAGNOSTIC SUMMARY\n', 'blue');
  
  if (issues.length === 0 && warnings.length === 0) {
    success('All local checks passed!');
    log('\n⚠️  Note: Cannot verify GitHub secret or IAM roles from local machine', 'yellow');
    log('\n📋 Next steps:', 'blue');
    log('1. Verify FIREBASE_SERVICE_ACCOUNT secret exists in GitHub', 'blue');
    log('2. Check service account has required IAM roles', 'blue');
    log('3. Verify required APIs are enabled', 'blue');
    log('4. Run GitHub Actions workflow and check logs', 'blue');
  } else {
    if (issues.length > 0) {
      error(`Found ${issues.length} issue(s):`);
      issues.forEach((issue, i) => {
        log(`  ${i + 1}. ${issue}`, 'red');
      });
    }
    
    if (warnings.length > 0) {
      warn(`Found ${warnings.length} warning(s):`);
      warnings.forEach((warning, i) => {
        log(`  ${i + 1}. ${warning}`, 'yellow');
      });
    }
    
    log('\n📋 To fix:', 'blue');
    log('1. Address the issues listed above', 'blue');
    log('2. Check GitHub Actions logs for specific error', 'blue');
    log('3. Verify FIREBASE_SERVICE_ACCOUNT secret in GitHub', 'blue');
    log('4. Check service account IAM roles in Google Cloud Console', 'blue');
  }
  
  log('\n' + '='.repeat(60) + '\n', 'blue');
}

diagnose().catch((err) => {
  error(`Diagnostic failed: ${err.message}`);
  process.exit(1);
});
