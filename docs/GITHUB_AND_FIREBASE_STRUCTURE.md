# GitHub and Firebase Structure (newtifi.com)

## Overview

| Layer | Role |
|-------|------|
| **GitHub** | Source code; **`new-visual-identity`** is the branch that serves the website. |
| **Firebase Hosting** | Serves the built site; custom domain **newtifi.com**. |
| **GitHub Actions** | Builds and deploys when the **production branch** (configured to serve the site) is pushed; runs `firebase deploy --only hosting`. |

**Production branch:** **`new-visual-identity`** — This is the branch configured to serve newtifi.com. Push here to update the live site.

## Key Files

- **`.firebaserc`** — Firebase project ID: `newtifi-web`
- **`firebase.json`** — Hosting: `public: "dist"`, SPA rewrites `** → /index.html`
- **`.github/workflows/firebase-deploy.yml`** — Builds with `npm run build`, deploys `dist/` to Firebase Hosting. Triggers on push to **main** or **new-visual-identity** (every push deploys; no path filter).

## How newtifi.com Gets Updated

1. **Automatic:** Push to **`new-visual-identity`** (the branch that serves the website). The workflow runs, builds, and deploys to Firebase → **newtifi.com** updates (usually within a few minutes; CDN cache 2–5 min).
2. **Manual:** From a branch with the code you want live: `npm run build` then `npm run deploy:auto` (or `firebase deploy --only hosting`). Requires `firebase login` locally.

## Branches

- **`new-visual-identity`** — **Production.** The branch that serves newtifi.com. Push here to update the live site.
- **`main`** — Legacy/default; not the branch that serves the site.
- **`gh-pages`** — Used by `npm run deploy` (gh-pages); secondary to Firebase for newtifi.com.

## Scripts

- `npm run build` — Output to `dist/`
- `npm run deploy:auto` — Build + `firebase deploy --only hosting`
- `npm run deploy:firebase` — Runs `scripts/auto-deploy.sh` (build + deploy)
- `npm run deploy` — Pushes `dist/` to `gh-pages` branch (not used for newtifi.com when Firebase is primary)

## Secrets (GitHub Actions)

- **`FIREBASE_TOKEN`** — CI token for `firebase deploy` in the workflow. Generate with `firebase login:ci`; add in repo Settings → Secrets and variables → Actions.
