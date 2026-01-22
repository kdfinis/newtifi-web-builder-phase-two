#!/usr/bin/env node

/**
 * Custom Domain Setup Guide for Firebase
 * Prepares instructions for setting up newtifi.com domain
 */

console.log('🌐 CUSTOM DOMAIN SETUP GUIDE');
console.log('='.repeat(50));

console.log('\n📋 STEP 1: FIREBASE CONSOLE');
console.log('1. Go to: https://console.firebase.google.com/project/newtifi-web/hosting');
console.log('2. Click "Add custom domain"');
console.log('3. Enter: newtifi.com');
console.log('4. Click "Continue"');

console.log('\n📋 STEP 2: DNS CONFIGURATION');
console.log('You will get DNS records to add to your domain:');
console.log('- A record: @ → [Firebase IP]');
console.log('- CNAME record: www → [Firebase subdomain]');

console.log('\n📋 STEP 3: UPDATE OAUTH REDIRECT URIS');
console.log('After domain is live, update OAuth providers:');
console.log('Google Console: https://console.cloud.google.com/apis/credentials');
console.log('- Add: https://newtifi.com/auth/google/callback');
console.log('LinkedIn Console: https://www.linkedin.com/developers/');
console.log('- Add: https://newtifi.com/auth/linkedin/callback');

console.log('\n📋 STEP 4: DEPLOY WITH NEW DOMAIN');
console.log('After DNS is configured:');
console.log('1. Run: npm run build');
console.log('2. Run: firebase deploy');
console.log('3. Test: https://newtifi.com/login');

console.log('\n✅ CUSTOM DOMAIN SETUP COMPLETE!');
console.log('Your website will be live at https://newtifi.com');
