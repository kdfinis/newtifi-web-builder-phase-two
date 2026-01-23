#!/bin/bash
# Verify Firebase CI Token
# Usage: ./scripts/verify-firebase-token.sh <token>

if [ -z "$1" ]; then
    echo "Usage: ./scripts/verify-firebase-token.sh <FIREBASE_TOKEN>"
    exit 1
fi

TOKEN="$1"

echo "🔍 Verifying Firebase token..."
echo ""

# Test token by listing projects
if firebase projects:list --token "$TOKEN" --non-interactive 2>&1 | grep -q "newtifi-web"; then
    echo "✅ Token is VALID and has access to newtifi-web project!"
    echo ""
    echo "Next steps:"
    echo "1. Go to: https://github.com/kdfinis/newtifi-web-builder-phase-two/settings/secrets/actions"
    echo "2. Click 'New repository secret'"
    echo "3. Name: FIREBASE_TOKEN"
    echo "4. Value: (paste the token)"
    echo "5. Click 'Add secret'"
    exit 0
else
    echo "❌ Token verification failed"
    echo ""
    echo "Output:"
    firebase projects:list --token "$TOKEN" --non-interactive 2>&1
    exit 1
fi
