# Journals Overview - NewTIFI Website

⚠️ **IMPORTANT**: This file is for general overview only.  
**For accurate, up-to-date information, see**: `docs/WEBSITE_JOURNALS_DATA.md` (PRIMARY SOURCE)

## Summary

The NewTIFI website hosts academic journals through the **NewTIFI Publishing** platform. Currently, there are **2 active journals**.

---

## Active Journals

### 1. Investment Management Journal
- **Status**: ✅ Active
- **ID**: `investment-management`
- **URL**: `/publishing/investment-management`
- **ISSN**: TBD (To be registered)
- **Publisher**: NewTIFI Publishing
- **Location**: Luxembourg
- **Frequency**: Quarterly
- **Peer Review**: Double-blind peer review
- **Launch Date**: 2025-06-28
- **Last Updated**: 2025-10-04

#### Description
A peer-reviewed academic publication dedicated to advancing rigorous scholarship and high-impact analysis in investment management. Focuses on legal, tax, regulatory, and operational dimensions of alternative investment funds.

#### Editorial Board
**Source**: Actual website content (`src/pages/publishing/journals/investment-management.tsx`)
- **Editor-in-Chief**: Ezechiel Havrenne (NewTiFi Institute)
- **Associate Editor**: Delphine Filsack (NewTiFi Institute)
- **Managing Editor**: Karlo Definis (NewTiFi Institute)

**Note**: No titles/credentials shown on website - only names and roles as published.

#### Published Articles (3)
1. **IMJ-2025-001**: "Closed-Ended Luxembourg ELTIFs: Compulsory Redemptions and Compartment Termination & Amalgamation Provisions"
   - Author: Ezechiel Havrenne
   - Published: 2025-06-28
   - DOI: 10.1234/newtifi.2025.001
   - Status: Published, Featured

2. **IMJ-2025-002**: "Investor Oversight or Undue Influence? Reassessing BaFin's Stance on AIFM Portfolio Control"
   - Author: Ezechiel Havrenne
   - Published: 2025-06-28
   - DOI: 10.1234/newtifi.2025.002
   - Status: Published, Featured

3. **IMJ-2025-003**: "Luxembourg SICARs, SIFs, and RAIFs: A 20-year Perspective on the Well-Informed Investor Notion"
   - Author: Ezechiel Havrenne
   - Published: 2025-06-28
   - DOI: 10.1234/newtifi.2025.003
   - Status: Published, Featured

#### Article Storage Structure
```
storage/journals/investment-management/articles/
  ├── IMJ-2025-001/
  │   ├── current/ (symlink)
  │   └── v1/
  │       ├── article.pdf
  │       └── metadata.json
  ├── IMJ-2025-002/
  │   └── ...
  └── IMJ-2025-003/
      └── ...
```

#### Features
- **Abstracts Section**: Expandable abstracts with full article information
- **Technical Information**: Journal metadata, peer review process, indexing
- **Committee Members**: Editorial board information
- **Article Viewing**: Full PDF articles with metadata
- **Registration/Login**: User registration and login system (in development)

---

### 2. Restructuring & Insolvency Journal
- **Status**: ✅ Active
- **ID**: `restructuring-insolvency-journal`
- **URL**: `/publishing/restructuring-insolvency-journal`
- **ISSN**: TBD (To be registered)
- **Publisher**: NewTIFI Publishing
- **Location**: Luxembourg
- **Frequency**: Quarterly
- **Peer Review**: Double-blind peer review
- **Launch Date**: 2026-01-15
- **Last Updated**: 2026-01-26

#### Description
A peer-reviewed academic publication dedicated to advancing rigorous scholarship and high-impact analysis in insolvency, restructuring, and recovery frameworks across Luxembourg and comparative jurisdictions.

#### Editorial Board
**Source**: Actual website content (`src/pages/publishing/journals/restructuring-insolvency-journal.tsx`)
- **Editor-in-Chief**: Ezechiel Havrenne (NewTiFi Institute)
- **Associate Editor**: Delphine Filsack (NewTiFi Institute)
- **Managing Editor**: Karlo Definis (NewTiFi Institute)

#### Published Articles (3)
1. **RIJ-2026-001**: "Compartment Insolvency in Luxembourg Investment Funds - Ruling 18625 and the Boundary Between Bankruptcy and Judicial Liquidation After the 2023 Reform"
   - Author: Ezechiel Havrenne
   - Published: 2026-01-15
   - DOI: 10.1234/newtifi.2026.001
   - Status: Published, Featured, View-only (no downloads)

2. **RIJ-2026-002**: "Ipso Jure Dissolution and Liquidation in Luxembourg Investment Funds - A Doctrinal Analysis of Civil Code and Product Fund Law Triggers"
   - Author: Ezechiel Havrenne
   - Published: 2026-02-01
   - DOI: 10.1234/newtifi.2026.002
   - Status: Published, Featured, View-only (no downloads)

3. **RIJ-2026-003**: "Ruling 1019 and the Architecture of Liquidation in Luxembourg Investment Funds - CSSF Gatekeeping, General Company Law, and the RAIF Counter-Model"
   - Author: Ezechiel Havrenne
   - Published: 2026-03-01
   - DOI: 10.1234/newtifi.2026.003
   - Status: Published, Featured, View-only (no downloads)

---

## Website Structure

### Routes
- **Journal Main Page**: `/publishing/investment-management`
- **Journal Main Page**: `/publishing/restructuring-insolvency-journal`
- **Article Pages**: `/publishing/{journalSlug}/article/{slug}`
- **Publishing Hub**: `/publishing` (shows all journals, articles, books, etc.)

### Components
- **JournalCard**: Displays journal information cards
- **JournalHeader**: Journal header component
- **ArticlePage**: Individual article viewing page
- **InvestmentManagementJournal**: Main journal page component

### Services
- **JournalService**: Manages journal data and operations
- **ArticleService**: Manages article data and operations
- **ConfigManager**: Handles journal configuration

---

## Data Structure

### Configuration Files
- **`data/admin_journals.json`**: Admin journal management data
- **`data/admin_articles.json`**: Admin article management data

### Article Metadata Format
```json
{
  "id": "IMJ-2025-001",
  "journalId": "investment-management",
  "version": "v1",
  "title": "Article Title",
  "abstract": "Article abstract...",
  "authors": [...],
  "keywords": [...],
  "doi": "10.1234/newtifi.2025.001",
  "status": "published",
  "publishedDate": "2025-06-28",
  "files": {...},
  "versionHistory": [...],
  "subjectAreas": [...],
  "peerReviewed": true,
  "license": "All Rights Reserved"
}
```

---

## Features & Functionality

### Current Features
✅ **Journal Display**: Cards and detailed pages  
✅ **Article Viewing**: Article pages with metadata (downloads disabled for RIJ)  
✅ **Abstracts**: Expandable article abstracts  
✅ **Technical Information**: Journal metadata display  
✅ **Editorial Board**: Committee member information  
✅ **Search**: Article search functionality  
✅ **Versioning**: Article version management  
✅ **Storage**: Structured file storage system  

### In Development
🟡 **User Registration**: Registration/login system  
🟡 **Peer Review Process**: Full review workflow  
🟡 **Submission System**: Article submission portal  
🟡 **Analytics**: Article views/downloads tracking  

---

## Access Points

### Public Access
- **Homepage**: `/` - Features journal articles
- **Publishing**: `/publishing` - Publishing hub with journals tab
- **Journal Page**: `/publishing/investment-management` - Main journal page
- **Journal Page**: `/publishing/restructuring-insolvency-journal` - Main journal page
- **Articles**: `/publishing/{journalSlug}/article/{slug}` - Individual articles

### Admin Access
- **Admin Dashboard**: `/admin` - Journal and article management
- **Journal Manager**: Admin component for managing journals
- **Article Viewer**: Admin article viewing/editing

---

## Key URLs

### Live Site
- **Journal**: https://newtifi.com/publishing/investment-management
- **Journal**: https://newtifi.com/publishing/restructuring-insolvency-journal
- **Article Example**: https://newtifi.com/publishing/restructuring-insolvency-journal/article/compartment-insolvency-18625

### Internal Routes
- Publishing Hub: `/publishing`
- Journal: `/publishing/investment-management`
- Journal: `/publishing/restructuring-insolvency-journal`
- Articles: `/publishing/{journalSlug}/article/{slug}`

---

## Statistics

- **Total Journals**: 2 (all active)
- **Total Articles**: 6 (3 IMJ, 3 RIJ)
- **Published Articles**: 6
- **Featured Articles**: 6
- **Authors**: 1 (Ezechiel Havrenne)
- **Average Articles per Journal**: 3

---

## Technical Details

### Technology Stack
- **Frontend**: React + TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **File Storage**: Local file system structure
- **PDF Viewing**: Browser-native PDF viewer

### File Organization
- **Articles**: `storage/journals/{journal-id}/articles/{article-id}/`
- **Metadata**: `data/articles/{journal-id}/{article-id}.json`
- **Configuration**: `config/journals.json`

---

## Future Plans

1. **Additional Journals**: More journals may be added
2. **Enhanced Features**: Full submission system, peer review workflow
3. **Analytics**: Article performance tracking
4. **User System**: Complete registration and authentication

---

**Last Updated**: 2026-01-26  
**Status**: ✅ Active and operational
