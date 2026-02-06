#!/usr/bin/env node
/**
 * Firebase Deployment Diagnostic Script
 * Tests Firebase connectivity and configuration before deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

console.log('🔍 Firebase Deployment Diagnostics\n');
console.log('='.repeat(60));

// Check 1: Firebase CLI
console.log('\n1️⃣  Checking Firebase CLI...');
try {
  const version = execSync('firebase --version', { encoding: 'utf8', cwd: repoRoot }).trim();
  console.log(`   ✅ Firebase CLI installed: ${version}`);
} catch (e) {
  console.log('   ❌ Firebase CLI not found');
  console.log('   💡 Install with: npm install -g firebase-tools');
  process.exit(1);
}

// Check 2: firebase.json
console.log('\n2️⃣  Checking firebase.json...');
const firebaseJsonPath = path.join(repoRoot, 'firebase.json');
if (fs.existsSync(firebaseJsonPath)) {
  const firebaseJson = JSON.parse(fs.readFileSync(firebaseJsonPath, 'utf8'));
  console.log('   ✅ firebase.json exists');
  if (firebaseJson.hosting?.public) {
    console.log(`   ✅ Public directory: ${firebaseJson.hosting.public}`);
  } else {
    console.log('   ❌ Missing hosting.public in firebase.json');
  }
} else {
  console.log('   ❌ firebase.json not found');
  process.exit(1);
}

// Check 3: .firebaserc
console.log('\n3️⃣  Checking .firebaserc...');
const firebasercPath = path.join(repoRoot, '.firebaserc');
if (fs.existsSync(firebasercPath)) {
  const firebaserc = JSON.parse(fs.readFileSync(firebasercPath, 'utf8'));
  console.log('   ✅ .firebaserc exists');
  if (firebaserc.projects?.default) {
    console.log(`   ✅ Default project: ${firebaserc.projects.default}`);
  } else {
    console.log('   ❌ Missing projects.default in .firebaserc');
  }
} else {
  console.log('   ❌ .firebaserc not found');
  process.exit(1);
}

// Check 4: Build output
console.log('\n4️⃣  Checking build output...');
const distPath = path.join(repoRoot, 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log(`   ✅ dist/ directory exists (${files.length} items)`);
  
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('   ✅ dist/index.html exists');
  } else {
    console.log('   ❌ dist/index.html missing');
  }
} else {
  console.log('   ❌ dist/ directory not found');
  console.log('   💡 Run: npm run build');
  process.exit(1);
}

// Check 5: Authentication (if token provided)
const token = process.env.FIREBASE_TOKEN;
if (token) {
  console.log('\n5️⃣  Testing Firebase token...');
  try {
    const output = execSync(`firebase projects:list --token "${token}" --non-interactive 2>&1`, {
      encoding: 'utf8',
      cwd: repoRoot
    });
    if (output.includes('newtifi-web')) {
      console.log('   ✅ Token is valid and has access to newtifi-web');
    } else {
      console.log('   ⚠️  Token is valid but may not have access to newtifi-web');
      console.log(`   Output: ${output.substring(0, 200)}...`);
    }
  } catch (e) {
    console.log('   ❌ Token test failed');
    console.log(`   Error: ${e.message.substring(0, 200)}`);
    console.log('   💡 Token might be expired - run: firebase login:ci');
  }
} else {
  console.log('\n5️⃣  FIREBASE_TOKEN not provided (skipping token test)');
}

// Check 6: Service Account (if provided)
const saJson = process.env.FIREBASE_SERVICE_ACCOUNT;
if (saJson) {
  console.log('\n6️⃣  Testing Firebase service account...');
  try {
    const sa = JSON.parse(saJson);
    console.log('   ✅ Service account JSON is valid');
    if (sa.project_id) {
      console.log(`   ✅ Project ID: ${sa.project_id}`);
      if (sa.project_id !== 'newtifi-web') {
        console.log(`   ⚠️  Warning: Project ID mismatch (${sa.project_id} vs newtifi-web)`);
      }
    }
    if (sa.client_email) {
      console.log(`   ✅ Client email: ${sa.client_email}`);
    } else {
      console.log('   ❌ Missing client_email in service account');
    }
  } catch (e) {
    console.log('   ❌ Service account JSON is invalid');
    console.log(`   Error: ${e.message}`);
  }
} else {
  console.log('\n6️⃣  FIREBASE_SERVICE_ACCOUNT not provided (skipping service account test)');
}

console.log('\n' + '='.repeat(60));
console.log('\n✅ Diagnostics complete!');
console.log('\nIf all checks passed, deployment should work.');
console.log('If deployment still fails, check the error logs for specific issues.\n');
