# Ralph Loop Spec - Fix Deployment to newtifi.com

## Codebase Notice:
- Primary website codebase is in the root directory
- Backend API server: `simple-admin-server.js` (port 3001)
- Frontend dev server: Vite (port 8080)
- **Hosting**: Supports both GitHub Pages (primary) and Firebase Hosting
- **Firebase Protocol**: **REQUIRED AWARENESS** - Always consider Firebase requirements
  - See `docs/FIREBASE_PROTOCOL_GUIDE.md` for complete guide
  - See `docs/DEVELOPMENT_PROTOCOL.md` for development guidelines
  - See `AGENT_INSTRUCTIONS.md` for agent-specific instructions
  - See `.cursorrules` for quick reference
- **Build Output**: Must be in `dist/` directory (Firebase requirement)
- **Asset Paths**: Must be absolute/root-relative (`/assets/...`) for Firebase compatibility
- **SPA Routing**: Must work on both platforms (Firebase via `firebase.json`, GitHub Pages via `404.html`)
- **DO NOT** modify secrets, credentials, or OAuth configurations - leave them as-is
- **DO NOT** change any source code - only fix deployment process

## Goal:
Ensure the latest local code is deployed and visible on newtifi.com. The issue is that local development code is not appearing on the live site.

## Problem Analysis:
- Local code: Latest commits on `main` branch (c9eb69a, ce3e3e2, 021efa4)
- Deployment method: `npm run deploy` uses `gh-pages -d dist` to push to `gh-pages` branch
- GitHub Pages: May be configured to serve from `main` branch (`.nojekyll` exists in main)
- Issue: Code deployed to `gh-pages` but site serves from `main` branch
- Result: Latest local code never appears on newtifi.com

## Constraints:
- Do not ask questions. Make reasonable assumptions and proceed.
- **DO NOT touch secrets, credentials, or OAuth configs** - leave them exactly as-is
- **DO NOT modify source code** - only fix deployment
- **FIREBASE PROTOCOL**: Always consider Firebase hosting requirements - see `docs/FIREBASE_PROTOCOL_GUIDE.md`
- **DUAL COMPATIBILITY**: Code must work on both GitHub Pages and Firebase Hosting
- Ensure latest local code gets to newtifi.com
- Preserve all local development work
- Fix deployment process, not the code

## Acceptance Criteria:
- [ ] Latest local code is built correctly
- [ ] Built files are deployed to the correct branch that GitHub Pages uses
- [ ] newtifi.com shows the latest code (admin article browser, security fixes, article page fixes)
- [ ] All features work on live site
- [ ] Deployment process is documented and repeatable
- [ ] No code changes made to source files

## Implementation Steps:

### Step 1: Determine GitHub Pages Source Branch
- [ ] Check which branch GitHub Pages is configured to use
- [ ] Verify by checking for `.nojekyll` file location
- [ ] Check GitHub repository settings (if accessible via git)

### Step 2: Build Latest Code
- [ ] Run `npm run build` to create latest dist
- [ ] Verify dist contains latest features
- [ ] Check that ArticleViewer, security fixes, ArticlePage fixes are in dist

### Step 3: Deploy to Correct Branch
- [ ] If GitHub Pages uses `main`: Copy dist files to main branch root
- [ ] If GitHub Pages uses `gh-pages`: Ensure `npm run deploy` works correctly
- [ ] Commit and push built files to correct branch
- [ ] Verify deployment succeeded

### Step 4: Verify Live Site
- [ ] Check newtifi.com shows latest code
- [ ] Verify admin article browser works at /admin/articles
- [ ] Verify article pages work (e.g., /publishing/article/eltifs-compulsory-redemptions)
- [ ] Verify all latest features are present

### Step 5: Document Deployment Process
- [ ] Document which branch GitHub Pages uses
- [ ] Document correct deployment command/process
- [ ] Update deployment guide if needed

## What NOT to Touch:
- Source code files (src/, components, pages, etc.)
- OAuth credentials and configurations
- Client secrets (leave hardcoded if present)
- Authentication provider settings
- Any secret/credential-related code
- Local development code

## Success Metrics:
- newtifi.com shows latest local code
- All latest features visible on live site
- Deployment process works correctly
- No source code changes made
- Repeatable deployment process documented
