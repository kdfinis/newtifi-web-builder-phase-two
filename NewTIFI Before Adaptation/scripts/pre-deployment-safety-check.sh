#!/bin/bash

# Pre-Deployment Safety Check
# Run this before any major changes or deployments

echo "🛡️  Running pre-deployment safety checks..."

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  WARNING: Git working directory is not clean!"
    echo "📋 Uncommitted changes:"
    git status --short
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Aborted. Please commit or stash changes first."
        exit 1
    fi
fi

# Check for critical files
echo "📁 Checking critical files..."
critical_files=(
    "src/App.tsx"
    "src/main.tsx"
    "package.json"
    "vite.config.ts"
    "src/components/Navbar.tsx"
    "src/pages/Home.tsx"
)

for file in "${critical_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ CRITICAL: Missing file $file"
        exit 1
    else
        echo "✅ Found: $file"
    fi
done

# Check for import errors
echo "🔍 Checking for import errors..."
if ! npm run build > /dev/null 2>&1; then
    echo "❌ BUILD FAILED: Import errors detected!"
    echo "🔧 Run: npm run build (to see full errors)"
    exit 1
fi

# Check for hardcoded URLs
echo "🔗 Checking for hardcoded URLs..."
hardcoded_patterns=(
    "localhost:3000"
    "localhost:1000"
    "http://localhost"
    "https://localhost"
)

found_hardcoded=false
for pattern in "${hardcoded_patterns[@]}"; do
    if grep -r "$pattern" src/ --include="*.ts" --include="*.tsx" > /dev/null 2>&1; then
        echo "⚠️  WARNING: Found hardcoded URL pattern: $pattern"
        found_hardcoded=true
    fi
done

if [ "$found_hardcoded" = true ]; then
    echo "🔧 Consider using environment variables or configuration files for URLs"
fi

# Check for missing dependencies
echo "📦 Checking dependencies..."
if ! npm install --dry-run > /dev/null 2>&1; then
    echo "❌ DEPENDENCY ISSUES: Run npm install"
    exit 1
fi

echo "✅ All safety checks passed!"
echo "🚀 Safe to proceed with deployment"
