# 🔐 Admin Article Viewer - Complete Guide

## Overview

The Admin Article Viewer is a comprehensive database viewer that shows all articles posted on the website with all their properties. It's **hidden from normal users** and only accessible to admin accounts.

---

## Access

### URL
**http://localhost:8080/admin/articles**

### Requirements
- Must be logged in
- Must have admin privileges
- Currently configured for: **karlodefinis@gmail.com**

---

## Features

### 1. Complete Article Database View
- Shows ALL articles (published, draft, pending)
- Displays all article properties and data indicators
- Real-time data from the database

### 2. Search & Filter
- **Search**: By title, ID, author, keywords, abstract
- **Filter**: By status (all, published, draft, pending, review)
- Real-time filtering

### 3. Statistics Dashboard
- Total articles count
- Published articles count
- Draft articles count
- Pending articles count

### 4. Detailed Article View
Click "View" on any article to see:
- **Basic Information**: ID, title, status, category
- **Publication Data**: Published date, last modified, journal, DOI
- **Author Information**: Author(s), affiliation
- **Content**: Abstract, keywords, subject areas
- **File Information**: Filename, PDF URL, file size, version
- **Metadata**: Peer reviewed, license, featured, requires login
- **Statistics**: Views, downloads

### 5. Actions
- **View Details**: Click "View" to see complete article properties
- **Download PDF**: Direct link to PDF file
- **Refresh**: Reload all data from database

---

## Article Properties Displayed

### Core Properties
- ✅ ID
- ✅ Title
- ✅ Status (published/draft/pending/review)
- ✅ Published Date
- ✅ Journal ID
- ✅ Author(s) - structured data
- ✅ Abstract
- ✅ Keywords
- ✅ DOI

### File Properties
- ✅ PDF URL (new storage structure)
- ✅ Filename
- ✅ File Size
- ✅ Version
- ✅ Current Version

### Enhanced Metadata
- ✅ Subject Areas
- ✅ Peer Reviewed status
- ✅ License
- ✅ Featured status
- ✅ Requires Login
- ✅ Views count
- ✅ Downloads count

### Additional Data
- ✅ Affiliation
- ✅ Category
- ✅ Last Modified
- ✅ Journal name

---

## Access Control

### Admin Check
The viewer checks:
1. User is logged in
2. User email is `karlodefinis@gmail.com` OR
3. User role is `ADMIN` or `admin`

### Protection
- **Frontend**: Redirects to login if not authenticated
- **Frontend**: Redirects to dashboard if not admin
- **Backend**: API endpoint requires admin authentication
- **Backend**: Returns 403 if not admin

---

## Navigation

### From Admin Dashboard
- Click "View All Articles" button in the Admin Dashboard
- Or navigate directly to `/admin/articles`

### From Other Pages
- Must be logged in as admin
- Direct URL: `/admin/articles`

---

## Usage

### Viewing All Articles
1. Log in with admin account (karlodefinis@gmail.com)
2. Go to Dashboard (automatically shows Admin Dashboard)
3. Click "View All Articles" button
4. Or navigate to `/admin/articles`

### Searching Articles
1. Type in search box (searches title, ID, author, keywords, abstract)
2. Results filter in real-time

### Filtering by Status
1. Select status from dropdown
2. Table shows only articles with that status

### Viewing Article Details
1. Click "View" button on any article row
2. Modal opens with complete article properties
3. All data indicators visible
4. Click X to close

### Downloading PDFs
1. Click "PDF" button on any article row
2. Opens PDF in new tab

---

## Data Verification

### What to Check
- ✅ All articles are listed
- ✅ All data indicators are present
- ✅ Storage paths are correct (new structure)
- ✅ Metadata is complete
- ✅ File information is accurate
- ✅ Statistics are correct

### Database Integrity
- Articles loaded from `data/admin_articles.json`
- Enriched metadata from `data/articles/investment-management/`
- All properties synced and displayed

---

## Technical Details

### API Endpoint
- **GET** `/api/admin/articles`
- **Requires**: Admin authentication
- **Returns**: Array of all articles with complete properties

### Component Location
- `src/pages/admin/ArticleViewer.tsx`

### Route
- `/admin/articles` (protected, admin-only)

---

## Future Enhancements

The interface is built to support:
- Article editing
- Bulk operations
- Export functionality
- Advanced filtering
- Data validation tools
- File management

---

## Troubleshooting

### Can't Access
- ✅ Check you're logged in
- ✅ Verify email is karlodefinis@gmail.com
- ✅ Check user role is ADMIN
- ✅ Verify backend is running

### No Articles Showing
- ✅ Check backend API: `http://localhost:3001/api/admin/articles`
- ✅ Verify articles exist in database
- ✅ Check browser console for errors

### Missing Data
- ✅ Run sync script: `node scripts/sync-articles-with-metadata.js`
- ✅ Verify enriched metadata exists
- ✅ Check API response includes all fields

---

**Ready to use!** Log in with karlodefinis@gmail.com and navigate to `/admin/articles` to view all articles with complete database information.
