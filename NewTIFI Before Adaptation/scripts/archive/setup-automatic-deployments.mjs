#!/usr/bin/env node

/**
 * Automatic Deployments Setup for Firebase
 * Sets up GitHub Actions for automatic deployments
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 AUTOMATIC DEPLOYMENTS SETUP');
console.log('='.repeat(50));

// Create GitHub Actions workflow
const workflowDir = path.join(__dirname, '..', '.github', 'workflows');
const workflowFile = path.join(workflowDir, 'firebase-deploy.yml');

// Ensure .github/workflows directory exists
if (!fs.existsSync(workflowDir)) {
  fs.mkdirSync(workflowDir, { recursive: true });
}

const workflowContent = `name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '\${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '\${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        channelId: live
        projectId: newtifi-web
`;

fs.writeFileSync(workflowFile, workflowContent);

console.log('✅ GitHub Actions workflow created');
console.log('📁 File: .github/workflows/firebase-deploy.yml');

console.log('\n📋 NEXT STEPS:');
console.log('1. Go to: https://console.firebase.google.com/project/newtifi-web/settings/serviceaccounts/adminsdk');
console.log('2. Click "Generate new private key"');
console.log('3. Download the JSON file');
console.log('4. Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions');
console.log('5. Click "New repository secret"');
console.log('6. Name: FIREBASE_SERVICE_ACCOUNT');
console.log('7. Value: [paste the entire JSON content]');
console.log('8. Click "Add secret"');

console.log('\n✅ AUTOMATIC DEPLOYMENTS READY!');
console.log('Every push to main will automatically deploy to Firebase!');
