# GitHub and Firebase Structure (newtifi.com)

## Overview

| Layer | Role |
|-------|------|
| **GitHub** | Source code; branch `main` triggers production deploy. |
| **Firebase Hosting** | Serves the built site; custom domain **newtifi.com**. |
| **GitHub Actions** | Builds on push to `main`, then runs `firebase deploy --only hosting`. |

## Key Files

- **`.firebaserc`** — Firebase project ID: `newtifi-web`
- **`firebase.json`** — Hosting: `public: "dist"`, SPA rewrites `** → /index.html`
- **`.github/workflows/firebase-deploy.yml`** — Runs on **push to `main`** (and `workflow_dispatch`). Builds with `npm run build`, deploys `dist/` to Firebase Hosting.

## How newtifi.com Gets Updated

1. **Automatic (recommended):** Merge your branch into `main` and push. The workflow runs, builds, and deploys to Firebase → **newtifi.com** updates (usually within a few minutes; CDN cache 2–5 min).
2. **Manual:** From a branch with the code you want live: `npm run build` then `npm run deploy:auto` (or `firebase deploy --only hosting`). Requires `firebase login` locally. Deploys current build to Firebase without changing `main`.

## Branches

- **`main`** — Production source; pushes here trigger deploy to newtifi.com.
- **`new-visual-identity`** — New Visual Identity (Membership2-inspired) work. Merge into `main` and push to go live.
- **`gh-pages`** — Used by `npm run deploy` (gh-pages); secondary to Firebase for newtifi.com.

## Scripts

- `npm run build` — Output to `dist/`
- `npm run deploy:auto` — Build + `firebase deploy --only hosting`
- `npm run deploy:firebase` — Runs `scripts/auto-deploy.sh` (build + deploy)
- `npm run deploy` — Pushes `dist/` to `gh-pages` branch (not used for newtifi.com when Firebase is primary)

## Secrets (GitHub Actions)

- **`FIREBASE_TOKEN`** — CI token for `firebase deploy` in the workflow. Generate with `firebase login:ci`; add in repo Settings → Secrets and variables → Actions.
