#!/bin/bash

# Import Check Script - Validates all imports before deployment
# This prevents import errors that cause build failures

echo "🔍 Checking imports and dependencies..."

# Check for missing imports
echo "📋 Checking for missing imports..."

# Find all TypeScript/JavaScript files
find src/ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | while read file; do
    echo "Checking: $file"
    
    # Check for @/ imports
    if grep -q "from ['\"]@/" "$file"; then
        echo "  Found @/ imports in $file"
        
        # Extract import paths
        grep -o "from ['\"]@/[^'\"]*" "$file" | while read import_path; do
            # Remove 'from "' and get the path
            clean_path=$(echo "$import_path" | sed "s/from ['\"]//")
            # Convert @/ to src/
            actual_path="src/${clean_path#@/}"
            
            # Check if file exists
            if [ ! -f "$actual_path.ts" ] && [ ! -f "$actual_path.tsx" ] && [ ! -f "$actual_path.js" ] && [ ! -f "$actual_path.jsx" ]; then
                echo "  ❌ MISSING: $actual_path (imported in $file)"
            else
                echo "  ✅ Found: $actual_path"
            fi
        done
    fi
done

echo "✅ Import check complete!"
