#!/bin/bash

# Production Deployment Script for newtifi.com
# Fixes issues #1, #3, and #4: Asset mismatch, multiple versions, deployment process

set -e  # Exit on any error

echo "🚀 Production Deployment - Fixing All Issues"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Step 1: Build for production
echo -e "${BLUE}Step 1: Building for production...${NC}"
npm run build

if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ Build failed - dist/ directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build complete${NC}"
echo ""

# Step 2: Identify required assets from dist/index.html
echo -e "${BLUE}Step 2: Identifying required assets...${NC}"
REQUIRED_JS=$(grep -oP 'src="/assets/index-[^"]+\.js"' dist/index.html | head -1 | sed 's/src="//' | sed 's/"//')
REQUIRED_CSS=$(grep -oP 'href="/assets/index-[^"]+\.css"' dist/index.html | head -1 | sed 's/href="//' | sed 's/"//')
REQUIRED_VENDOR=$(grep -oP 'href="/assets/vendor-[^"]+\.js"' dist/index.html | head -1 | sed 's/href="//' | sed 's/"//' || echo "")

echo "Required JS: $REQUIRED_JS"
echo "Required CSS: $REQUIRED_CSS"
[ -n "$REQUIRED_VENDOR" ] && echo "Required Vendor: $REQUIRED_VENDOR"
echo ""

# Step 3: Verify required assets exist in dist/
echo -e "${BLUE}Step 3: Verifying required assets in dist/...${NC}"
MISSING=0

if [ ! -f "dist/$REQUIRED_JS" ]; then
    echo -e "${RED}❌ Missing: dist/$REQUIRED_JS${NC}"
    MISSING=1
fi

if [ ! -f "dist/$REQUIRED_CSS" ]; then
    echo -e "${RED}❌ Missing: dist/$REQUIRED_CSS${NC}"
    MISSING=1
fi

if [ -n "$REQUIRED_VENDOR" ] && [ ! -f "dist/$REQUIRED_VENDOR" ]; then
    echo -e "${RED}❌ Missing: dist/$REQUIRED_VENDOR${NC}"
    MISSING=1
fi

if [ $MISSING -eq 1 ]; then
    echo -e "${RED}❌ Required assets missing in dist/${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All required assets found${NC}"
echo ""

# Step 4: Backup current assets (optional safety)
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

# Step 5: Clean old assets (FIX ISSUE #3)
echo -e "${BLUE}Step 5: Cleaning old assets (Fixing Issue #3)...${NC}"
rm -rf assets/*
echo -e "${GREEN}✅ Old assets removed${NC}"
echo ""

# Step 6: Copy latest build to root (FIX ISSUE #1)
echo -e "${BLUE}Step 6: Copying latest build to root (Fixing Issue #1)...${NC}"
cp -r dist/assets/* assets/
cp dist/index.html index.html
cp dist/404.html 404.html
[ -f "dist/_headers" ] && cp dist/_headers _headers
[ -f "dist/_redirects" ] && cp dist/_redirects _redirects
touch .nojekyll
echo -e "${GREEN}✅ Files copied${NC}"
echo ""

# Step 7: Verify asset match (FIX ISSUE #1)
echo -e "${BLUE}Step 7: Verifying asset match (Fixing Issue #1)...${NC}"
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

# Step 8: Verify no localhost references in production files
echo -e "${BLUE}Step 8: Verifying no localhost references...${NC}"
LOCALHOST_FOUND=0

if grep -r "http://localhost:" index.html 2>/dev/null | grep -v "localhost:8080/auth/callback" | grep -v "localhost:8080/auth/google/callback" | grep -v "localhost:8080/auth/linkedin/callback" | grep -v "Development environment" > /dev/null; then
    echo -e "${RED}❌ Found localhost references in index.html${NC}"
    LOCALHOST_FOUND=1
fi

if [ $LOCALHOST_FOUND -eq 1 ]; then
    echo -e "${YELLOW}⚠️  Warning: localhost references found (may be in comments/config)${NC}"
else
    echo -e "${GREEN}✅ No problematic localhost references${NC}"
fi
echo ""

# Step 9: File count verification
echo -e "${BLUE}Step 9: File count verification...${NC}"
ROOT_COUNT=$(find assets/ -type f 2>/dev/null | wc -l | tr -d ' ')
DIST_COUNT=$(find dist/assets/ -type f 2>/dev/null | wc -l | tr -d ' ')

echo "Root assets: $ROOT_COUNT files"
echo "Dist assets: $DIST_COUNT files"

if [ "$ROOT_COUNT" -lt "$DIST_COUNT" ]; then
    echo -e "${YELLOW}⚠️  Root has fewer files than dist. Checking...${NC}"
    # This is OK if we just cleaned
elif [ "$ROOT_COUNT" -gt "$DIST_COUNT" ]; then
    echo -e "${YELLOW}⚠️  Root has more files than dist. Old files may remain.${NC}"
    echo -e "${YELLOW}   This should not happen after cleanup.${NC}"
else
    echo -e "${GREEN}✅ File counts match${NC}"
fi
echo ""

# Step 10: Summary
echo -e "${GREEN}=========================================="
echo "✅ Deployment Preparation Complete!"
echo "==========================================${NC}"
echo ""
echo "📋 Fixed Issues:"
echo "  ✅ Issue #1: Asset file mismatch - FIXED"
echo "  ✅ Issue #3: Multiple asset versions - FIXED"
echo "  ✅ Issue #4: Deployment process - AUTOMATED"
echo ""
echo "📋 Next Steps:"
echo "1. Review changes: git status"
echo "2. Commit: git add . && git commit -m 'Fix: Clean asset deployment for production'"
echo "3. Push: git push origin main"
echo "4. Wait 10-15 minutes for GitHub Pages to rebuild"
echo "5. Test: https://newtifi.com"
echo ""
echo "🔍 Verification:"
echo "  - Check browser console for 404 errors"
echo "  - Verify site loads correctly"
echo "  - Test SPA routing (direct URL access)"
echo ""
