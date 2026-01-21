# 🔧 Quick Fix for localhost:8080

## Problem
Frontend at http://localhost:8080 not working properly.

## Solution

### Option 1: Use the Startup Script (Easiest)
```bash
./START_SERVERS.sh
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
node simple-admin-server.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 3: Check What's Wrong

1. **Check if ports are in use:**
   ```bash
   lsof -i :8080
   lsof -i :3001
   ```

2. **Kill existing processes:**
   ```bash
   pkill -f "vite.*8080"
   pkill -f "node.*simple-admin"
   ```

3. **Check for errors:**
   ```bash
   # Backend
   node simple-admin-server.js
   
   # Frontend (in another terminal)
   npm run dev
   ```

## All Changes Made

See `docs/ALL_CHANGES_SUMMARY.md` for complete list.

### Key Changes:
1. ✅ Extended `simple-admin-server.js` with 20+ endpoints
2. ✅ Made Contact form functional
3. ✅ Fixed Profile save
4. ✅ Fixed Contributor applications
5. ✅ Fixed Admin dashboard
6. ✅ Added Vite proxy for localhost connection
7. ✅ Updated URL builder for proxy support

## Verify It Works

1. Backend: `curl http://localhost:3001/api/articles`
2. Frontend: Open `http://localhost:8080` in browser
3. Contact form: Submit at `/contact`
4. Check browser console for errors

