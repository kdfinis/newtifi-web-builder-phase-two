#!/bin/bash

# Comprehensive Fix Script for newtifi.com Deployment
# This script fixes all identified issues with asset mismatches and deployment

set -e  # Exit on any error

echo "🔍 Comprehensive newtifi.com Deployment Fix"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Verify build exists
echo -e "${BLUE}Step 1: Checking build output...${NC}"
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ dist/ directory not found. Building...${NC}"
    npm run build
fi

if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ dist/index.html not found. Building...${NC}"
    npm run build
fi

echo -e "${GREEN}✅ Build output verified${NC}"
echo ""

# Step 2: Identify asset files referenced in dist/index.html
echo -e "${BLUE}Step 2: Identifying required assets...${NC}"
REQUIRED_JS=$(grep -oP 'src="/assets/index-[^"]+\.js"' dist/index.html | head -1 | sed 's/src="//' | sed 's/"//')
REQUIRED_CSS=$(grep -oP 'href="/assets/index-[^"]+\.css"' dist/index.html | head -1 | sed 's/href="//' | sed 's/"//')
REQUIRED_VENDOR=$(grep -oP 'href="/assets/vendor-[^"]+\.js"' dist/index.html | head -1 | sed 's/href="//' | sed 's/"//' || echo "")

echo "Required JS: $REQUIRED_JS"
echo "Required CSS: $REQUIRED_CSS"
[ -n "$REQUIRED_VENDOR" ] && echo "Required Vendor: $REQUIRED_VENDOR"
echo ""

# Step 3: Verify required assets exist in dist/
echo -e "${BLUE}Step 3: Verifying required assets exist in dist/...${NC}"
MISSING_FILES=0

if [ ! -f "dist/$REQUIRED_JS" ]; then
    echo -e "${RED}❌ Missing: dist/$REQUIRED_JS${NC}"
    MISSING_FILES=1
fi

if [ ! -f "dist/$REQUIRED_CSS" ]; then
    echo -e "${RED}❌ Missing: dist/$REQUIRED_CSS${NC}"
    MISSING_FILES=1
fi

if [ -n "$REQUIRED_VENDOR" ] && [ ! -f "dist/$REQUIRED_VENDOR" ]; then
    echo -e "${RED}❌ Missing: dist/$REQUIRED_VENDOR${NC}"
    MISSING_FILES=1
fi

if [ $MISSING_FILES -eq 1 ]; then
    echo -e "${RED}❌ Required assets missing. Rebuilding...${NC}"
    npm run build
    exit 1
fi

echo -e "${GREEN}✅ All required assets found in dist/${NC}"
echo ""

# Step 4: Backup current assets (optional)
echo -e "${BLUE}Step 4: Backing up current assets...${NC}"
if [ -d "assets" ] && [ "$(ls -A assets 2>/dev/null)" ]; then
    BACKUP_DIR="assets-backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    cp -r assets/* "$BACKUP_DIR/" 2>/dev/null || true
    echo -e "${GREEN}✅ Backup created: $BACKUP_DIR${NC}"
else
    echo -e "${YELLOW}⚠️  No existing assets to backup${NC}"
fi
echo ""

# Step 5: Clean old assets
echo -e "${BLUE}Step 5: Cleaning old assets...${NC}"
rm -rf assets/*
echo -e "${GREEN}✅ Old assets removed${NC}"
echo ""

# Step 6: Copy latest build to root
echo -e "${BLUE}Step 6: Copying latest build to root...${NC}"
cp -r dist/assets/* assets/
cp dist/index.html index.html
cp dist/404.html 404.html
[ -f "dist/_headers" ] && cp dist/_headers _headers
[ -f "dist/_redirects" ] && cp dist/_redirects _redirects
touch .nojekyll
echo -e "${GREEN}✅ Files copied${NC}"
echo ""

# Step 7: Verify asset match
echo -e "${BLUE}Step 7: Verifying asset match...${NC}"
ROOT_JS=$(grep -oP 'src="/assets/index-[^"]+\.js"' index.html | head -1 | sed 's/src="//' | sed 's/"//')
ROOT_CSS=$(grep -oP 'href="/assets/index-[^"]+\.css"' index.html | head -1 | sed 's/href="//' | sed 's/"//')

if [ ! -f "assets/${ROOT_JS#/assets/}" ]; then
    echo -e "${RED}❌ Asset mismatch! index.html references: $ROOT_JS${NC}"
    echo -e "${RED}   But file doesn't exist in assets/${NC}"
    exit 1
fi

if [ ! -f "assets/${ROOT_CSS#/assets/}" ]; then
    echo -e "${RED}❌ Asset mismatch! index.html references: $ROOT_CSS${NC}"
    echo -e "${RED}   But file doesn't exist in assets/${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Asset references match files${NC}"
echo ""

# Step 8: Count files
echo -e "${BLUE}Step 8: File count verification...${NC}"
ROOT_COUNT=$(find assets/ -type f | wc -l | tr -d ' ')
DIST_COUNT=$(find dist/assets/ -type f | wc -l | tr -d ' ')

echo "Root assets: $ROOT_COUNT files"
echo "Dist assets: $DIST_COUNT files"

if [ "$ROOT_COUNT" -lt "$DIST_COUNT" ]; then
    echo -e "${YELLOW}⚠️  Root has fewer files than dist. Some may be missing.${NC}"
elif [ "$ROOT_COUNT" -gt "$DIST_COUNT" ]; then
    echo -e "${YELLOW}⚠️  Root has more files than dist. Old files may remain.${NC}"
else
    echo -e "${GREEN}✅ File counts match${NC}"
fi
echo ""

# Step 9: Summary
echo -e "${GREEN}=========================================="
echo "✅ Deployment Fix Complete!"
echo "==========================================${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Review changes: git status"
echo "2. Commit: git add . && git commit -m 'Fix newtifi.com - clean asset deployment'"
echo "3. Push: git push origin main"
echo "4. Wait 10-15 minutes for GitHub Pages to rebuild"
echo "5. Test: https://newtifi.com"
echo ""
echo "🔍 Verification:"
echo "  - Check browser console for 404 errors"
echo "  - Verify site loads correctly"
echo "  - Test SPA routing (direct URL access)"
echo ""
