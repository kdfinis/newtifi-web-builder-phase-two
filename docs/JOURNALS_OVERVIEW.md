# Journals Overview - NewTIFI Website

## Summary

The NewTIFI website hosts academic journals through the **NewTIFI Publishing** platform. Currently, there is **1 active journal** and **1 planned journal**.

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
- **Editor-in-Chief**: Dr. Ezechiel Havrenne (Luxembourg School of Business)
- **Associate Editor**: Delphine Filsack (NewTIFI Institute)
- **Managing Editor**: Karlo Definis (NewTIFI Institute)

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

## Planned Journals

### 2. FinTech Innovation Journal
- **Status**: 🟡 Planned
- **ID**: `fintech-innovation`
- **ISSN**: YYYY-YYYY (To be assigned)
- **Publisher**: NewTIFI Publishing
- **Location**: Luxembourg
- **Frequency**: Bi-annual
- **Peer Review**: Single-blind
- **Launch Date**: 2025-12-01 (planned)
- **Last Updated**: 2025-10-04

#### Editorial Board
- **Editor-in-Chief**: Dr. Karlo Definis (NewTIFI)

---

## Website Structure

### Routes
- **Journal Main Page**: `/publishing/investment-management`
- **Article Pages**: `/publishing/investment-management/article/{slug}`
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
- **`config/journals.json`**: Journal metadata and configuration
- **`data/articles/investment-management/`**: Article metadata (JSON files)
- **`data/articles.json`**: Main articles index
- **`data/admin_journals.json`**: Admin journal management data

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
✅ **Article Viewing**: PDF viewing with metadata  
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
- **Articles**: `/publishing/investment-management/article/{slug}` - Individual articles

### Admin Access
- **Admin Dashboard**: `/admin` - Journal and article management
- **Journal Manager**: Admin component for managing journals
- **Article Viewer**: Admin article viewing/editing

---

## Key URLs

### Live Site
- **Journal**: https://newtifi.com/publishing/investment-management
- **Article Example**: https://newtifi.com/publishing/investment-management/article/eltifs-compulsory-redemptions

### Internal Routes
- Publishing Hub: `/publishing`
- Journal: `/publishing/investment-management`
- Articles: `/publishing/investment-management/article/{slug}`

---

## Statistics

- **Total Journals**: 2 (1 active, 1 planned)
- **Total Articles**: 3 (all in Investment Management Journal)
- **Published Articles**: 3
- **Featured Articles**: 3
- **Authors**: 1 (Ezechiel Havrenne)
- **Average Articles per Journal**: 3 (active journal)

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

1. **FinTech Innovation Journal**: Launch planned for December 2025
2. **Additional Journals**: More journals may be added
3. **Enhanced Features**: Full submission system, peer review workflow
4. **Analytics**: Article performance tracking
5. **User System**: Complete registration and authentication

---

**Last Updated**: 2026-01-23  
**Status**: ✅ Active and operational
