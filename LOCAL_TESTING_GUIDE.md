# 🧪 Local Testing Guide

## Quick Start

### Option 1: Use the start script (Recommended)
```bash
./scripts/start-local-test.sh
```

### Option 2: Manual start
```bash
# Terminal 1 - Backend
node simple-admin-server.js

# Terminal 2 - Frontend  
npm run dev
```

---

## Server URLs

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001

---

## Testing Checklist

### 1. Homepage ✅
- [ ] Visit: http://localhost:8080
- [ ] Verify articles are displayed
- [ ] Check article links work

### 2. Articles Page ✅
- [ ] Visit: http://localhost:8080/articles
- [ ] Verify all 3 articles are listed
- [ ] Check article cards display correctly
- [ ] Verify article links work

### 3. Article Detail Pages ✅
- [ ] Visit: http://localhost:8080/publishing/article/eltifs-compulsory-redemptions
- [ ] Verify article content displays
- [ ] Check PDF preview button works
- [ ] Verify download button works
- [ ] Test other articles:
  - http://localhost:8080/publishing/article/bafin-portfolio-control
  - http://localhost:8080/publishing/article/luxembourg-well-informed-investor

### 4. Publishing Page ✅
- [ ] Visit: http://localhost:8080/publishing
- [ ] Verify journal information displays
- [ ] Check article listings

### 5. API Endpoints ✅
- [ ] Test: http://localhost:3001/api/articles
  - Should return 3 articles with all data indicators
- [ ] Test: http://localhost:3001/api/articles/search?q=ELTIFs
  - Should return search results
- [ ] Test: http://localhost:3001/api/journals
  - Should return journal information

### 6. PDF File Serving ✅
- [ ] Test: http://localhost:3001/storage/journals/investment-management/articles/IMJ-2025-001/current/article.pdf
  - Should download/display PDF
- [ ] Test other article PDFs

### 7. Data Verification ✅
Check that articles have:
- [ ] Status: "published"
- [ ] Published Date: "2025-06-28"
- [ ] Journal ID: "investment-management"
- [ ] PDF URLs using new storage structure
- [ ] Authors array with structured data
- [ ] Subject areas
- [ ] Peer reviewed status

---

## Expected Results

### Article Data
All articles should have:
- ✅ Proper status indicators
- ✅ Published dates
- ✅ Journal IDs
- ✅ Storage URLs (new structure)
- ✅ Author information
- ✅ Enhanced metadata

### API Responses
- ✅ All endpoints return proper JSON
- ✅ Articles include all data indicators
- ✅ Search returns relevant results
- ✅ No 404 errors

### Frontend
- ✅ All pages load correctly
- ✅ Articles display with all metadata
- ✅ PDF previews work
- ✅ No console errors (except expected 401s)

---

## Troubleshooting

### Backend not starting
```bash
# Check if port 3001 is in use
lsof -i :3001

# Check server logs
tail -f server.log
```

### Frontend not starting
```bash
# Check if port 8080 is in use
lsof -i :8080

# Try clearing cache
rm -rf node_modules/.vite
```

### PDFs not loading
- Verify files exist: `ls -la storage/journals/investment-management/articles/IMJ-2025-001/v1/`
- Check backend is serving: `curl -I http://localhost:3001/storage/journals/investment-management/articles/IMJ-2025-001/current/article.pdf`

---

## Test Data Summary

### Articles Available
1. **IMJ-2025-001**: Closed-Ended Luxembourg ELTIFs...
2. **IMJ-2025-002**: Investor Oversight or Undue Influence...
3. **IMJ-2025-003**: Luxembourg SICARs, SIFs, and RAIFs...

All articles are:
- ✅ Published
- ✅ Have proper data indicators
- ✅ Stored in new structure
- ✅ Accessible via API
- ✅ Displayed on website

---

## Quick Test Commands

```bash
# Test API
curl http://localhost:3001/api/articles | jq '.[0] | {id, status, publishedDate, pdfUrl}'

# Test search
curl "http://localhost:3001/api/articles/search?q=ELTIFs" | jq '.results | length'

# Test PDF serving
curl -I http://localhost:3001/storage/journals/investment-management/articles/IMJ-2025-001/current/article.pdf
```

---

**Ready to test!** 🚀
