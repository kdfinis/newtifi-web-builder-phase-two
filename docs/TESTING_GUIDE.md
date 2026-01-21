# 🧪 Testing Guide - Complete Implementation

## Quick Start

### 1. Start Backend Server
```bash
node simple-admin-server.js
```

**Expected Output:**
```
Simple admin server running at http://localhost:3001
View tracking system initialized
Session management initialized
✅ API Endpoints Available:
  - GET  /api/me
  - PUT  /api/me
  - POST /api/contact
  ...
```

### 2. Start Frontend (in another terminal)
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:8080/
```

---

## 🧪 Test Scenarios

### Test 1: Contact Form ✅

**Steps:**
1. Navigate to `http://localhost:8080/contact`
2. Fill out the form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Subject: "Test Inquiry"
   - Message: "This is a test message"
3. Click "Send Message"

**Expected Results:**
- ✅ Success message appears: "Your message has been sent successfully!"
- ✅ Form clears
- ✅ Check `data/contact-submissions.json` - should contain the submission

**Verify:**
```bash
cat data/contact-submissions.json
```

---

### Test 2: Profile Save ✅

**Steps:**
1. Login (any method: password, Google, or LinkedIn)
2. Navigate to `http://localhost:8080/profile`
3. Update any field (e.g., name, bio, organization)
4. Click "Save Changes"

**Expected Results:**
- ✅ Success message: "Saved successfully!"
- ✅ Changes persist
- ✅ Check `data/users.json` - user data should be updated

**Verify:**
```bash
cat data/users.json | grep -A 5 "test@example.com"
```

---

### Test 3: Contributor Application ✅

**Steps:**
1. Login (any method)
2. Navigate to `http://localhost:8080/apply-contributor`
3. Fill out:
   - Bio: "I am a researcher in..."
   - Motivation: "I want to contribute because..."
4. Click "Submit Application"

**Expected Results:**
- ✅ Success message appears
- ✅ Application status shows "pending"
- ✅ Check `data/applications.json` - should contain the application

**Verify:**
```bash
cat data/applications.json
```

---

### Test 4: Admin Dashboard - Approve Application ✅

**Steps:**
1. Login as admin:
   - Email: `karlodefinis@newtifi.com`
   - Password: `mistamoney`
2. Navigate to `http://localhost:8080/dashboard`
3. Should see Admin Dashboard
4. Find a pending application
5. Click "Approve"

**Expected Results:**
- ✅ Application status changes to "approved"
- ✅ User role changes to "CONTRIBUTOR"
- ✅ Check `data/applications.json` - status should be "approved"
- ✅ Check `data/users.json` - user role should be "CONTRIBUTOR"

**Verify:**
```bash
cat data/applications.json | grep -A 3 "approved"
cat data/users.json | grep -A 3 "CONTRIBUTOR"
```

---

### Test 5: Create Article (Contributor) ✅

**Steps:**
1. Login as a contributor (or approve your application first)
2. Navigate to `http://localhost:8080/dashboard`
3. Should see Contributor Dashboard
4. Click "New Article" (if route exists)
5. Fill out article form
6. Submit

**Expected Results:**
- ✅ Article created with status "draft"
- ✅ Article appears in "My Articles"
- ✅ Check `data/admin_articles.json` - should contain new article

**Verify:**
```bash
cat data/admin_articles.json | tail -20
```

---

### Test 6: Admin - Publish Article ✅

**Steps:**
1. Login as admin
2. Navigate to Admin Dashboard
3. Find a draft article
4. Click "Publish"

**Expected Results:**
- ✅ Article status changes to "published"
- ✅ Article appears in public articles list
- ✅ Check `data/admin_articles.json` - status should be "published"

---

### Test 7: Password Reset ✅

**Steps:**
1. Navigate to `http://localhost:8080/forgot-password`
2. Enter email address
3. Click "Send Reset Link"

**Expected Results:**
- ✅ Success message (even if user doesn't exist - security)
- ✅ Check server console for reset token
- ✅ Check `data/reset-tokens.json` - should contain token

**Verify Token:**
```bash
cat data/reset-tokens.json
```

**Reset Password:**
1. Copy token from console or JSON file
2. Navigate to `http://localhost:8080/reset-password?token=TOKEN`
3. Enter new password
4. Submit

**Expected Results:**
- ✅ Password reset successfully
- ✅ Can login with new password
- ✅ Token removed from `data/reset-tokens.json`

---

### Test 8: Session Management ✅

**Steps:**
1. Login (any method)
2. Check browser cookies (DevTools → Application → Cookies)
3. Should see `sessionId` cookie
4. Make API call (e.g., go to profile page)
5. Cookie should be sent with request

**Expected Results:**
- ✅ Session cookie exists
- ✅ Cookie is HttpOnly
- ✅ Cookie has SameSite=Lax
- ✅ API calls work with session

**Verify:**
- Open DevTools → Network tab
- Make a request (e.g., save profile)
- Check Request Headers → should include Cookie: sessionId=...

---

## 🔍 API Endpoint Testing

### Test All Endpoints with curl

```bash
# Test contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'

# Test get current user (requires session)
curl http://localhost:3001/api/me \
  -H "Cookie: sessionId=YOUR_SESSION_ID"

# Test get applications (admin only)
curl http://localhost:3001/api/admin/applications \
  -H "Cookie: sessionId=ADMIN_SESSION_ID"

# Test get articles
curl http://localhost:3001/api/articles

# Test get journals
curl http://localhost:3001/api/journals
```

---

## 📊 Data Verification

### Check All Data Files

```bash
# Users
cat data/users.json

# Applications
cat data/applications.json

# Contact submissions
cat data/contact-submissions.json

# Reset tokens
cat data/reset-tokens.json

# Articles
cat data/admin_articles.json | jq '.[0:3]'  # First 3 articles

# Journals
cat data/admin_journals.json
```

---

## ✅ Success Criteria

All tests should pass:
- ✅ Contact form submits and stores data
- ✅ Profile save works and persists
- ✅ Contributor applications submit
- ✅ Admin can approve/reject applications
- ✅ Articles can be created and published
- ✅ Sessions work correctly
- ✅ Data persists to JSON files
- ✅ No console errors in browser
- ✅ All forms show proper feedback

---

## 🐛 Troubleshooting

### Backend not starting?
- Check if port 3001 is already in use: `lsof -i :3001`
- Kill existing process: `kill -9 $(lsof -t -i:3001)`

### Frontend not connecting?
- Verify backend is running on port 3001
- Check browser console for errors
- Verify `buildApiUrl()` returns `http://localhost:3001/api/...`

### Session not working?
- Check cookies are enabled in browser
- Verify session cookie is being set
- Check server logs for session creation

### Data not persisting?
- Check `data/` directory exists
- Verify file permissions
- Check server logs for write errors

---

**All features are implemented and ready for testing! 🎉**
