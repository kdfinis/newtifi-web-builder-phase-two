#!/bin/bash

# Script to trigger Firebase deployment workflow on GitHub

echo "🚀 Triggering Firebase Deployment Workflow..."
echo ""

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found"
    echo "📋 Triggering workflow: 🚀 Auto Deploy to Firebase"
    
    gh workflow run "🚀 Auto Deploy to Firebase" --ref main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Workflow triggered successfully!"
        echo ""
        echo "📊 Monitor the workflow at:"
        echo "   https://github.com/kdfinis/newtifi-web-builder-phase-two/actions"
        echo ""
        echo "💡 To watch the workflow in real-time:"
        echo "   gh run watch"
    else
        echo ""
        echo "❌ Failed to trigger workflow"
        echo "💡 Make sure you're authenticated: gh auth login"
    fi
else
    echo "⚠️  GitHub CLI not installed"
    echo ""
    echo "📋 Manual steps to trigger the workflow:"
    echo "1. Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/actions"
    echo "2. Click '🚀 Auto Deploy to Firebase' in the left sidebar"
    echo "3. Click 'Run workflow' button (top right)"
    echo "4. Select branch: main"
    echo "5. Click 'Run workflow'"
    echo ""
    echo "💡 Or install GitHub CLI:"
    echo "   brew install gh"
    echo "   gh auth login"
fi
