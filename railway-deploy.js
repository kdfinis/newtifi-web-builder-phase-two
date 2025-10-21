#!/usr/bin/env node

// Railway API Deployment Script
const https = require('https');
const fs = require('fs');
const path = require('path');

// Railway API Configuration
const RAILWAY_API_URL = 'https://backboard.railway.app/graphql';
const RAILWAY_TOKEN = process.env.RAILWAY_TOKEN; // Set this in your environment

async function deployToRailway() {
  console.log('🚀 Deploying to Railway via API...');
  
  if (!RAILWAY_TOKEN) {
    console.log('❌ RAILWAY_TOKEN environment variable not set');
    console.log('📝 Get your token from: https://railway.app/account/tokens');
    console.log('💡 Set it with: export RAILWAY_TOKEN=your_token_here');
    return;
  }

  // GraphQL query to create deployment
  const query = `
    mutation {
      deploymentCreate(input: {
        projectId: "your-project-id"
        serviceId: "your-service-id"
        source: "github"
        repo: "kdfinis/newtifi-web-builder-phase-two"
        branch: "main"
      }) {
        id
        status
        url
      }
    }
  `;

  const options = {
    hostname: 'backboard.railway.app',
    port: 443,
    path: '/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RAILWAY_TOKEN}`,
      'User-Agent': 'Railway-CLI'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        console.log('✅ Deployment created:', result);
      } catch (error) {
        console.error('❌ Error parsing response:', error);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request failed:', error);
  });

  req.write(JSON.stringify({ query }));
  req.end();
}

// Alternative: Use Railway CLI programmatically
async function deployWithCLI() {
  const { exec } = require('child_process');
  
  console.log('🚀 Deploying with Railway CLI...');
  
  exec('railway login --browserless', (error, stdout, stderr) => {
    if (error) {
      console.log('❌ Login failed:', error);
      return;
    }
    
    console.log('✅ Logged in successfully');
    
    // Initialize project
    exec('railway init --name newtifi-oauth-backend', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Init failed:', error);
        return;
      }
      
      console.log('✅ Project initialized');
      
      // Deploy
      exec('railway up', (error, stdout, stderr) => {
        if (error) {
          console.log('❌ Deploy failed:', error);
          return;
        }
        
        console.log('✅ Deployed successfully!');
        console.log('🔗 Check your Railway dashboard for the URL');
      });
    });
  });
}

// Main execution
if (require.main === module) {
  console.log('🚀 Railway Deployment Options:');
  console.log('1. Railway CLI (recommended)');
  console.log('2. Railway API (requires token)');
  console.log('3. GitHub integration (automatic)');
  console.log('');
  
  // Try CLI first
  deployWithCLI();
}

module.exports = { deployToRailway, deployWithCLI };
