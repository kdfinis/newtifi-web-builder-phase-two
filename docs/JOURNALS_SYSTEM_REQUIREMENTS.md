# Journals System - Requirements & Future Planning

**Last Updated**: 2026-01-23  
**Purpose**: Document requirements for multi-journal publishing system

---

## Current System Status

### What Works Now
✅ Single journal (Investment Management Journal)  
✅ Article publishing with PDFs  
✅ Article metadata (JSON files)  
✅ Version management (v1, v2, etc.)  
✅ Storage structure (`storage/journals/{journal-id}/articles/{article-id}/`)  
✅ Article viewing pages  
✅ Journal landing pages  
✅ Editorial board display  
✅ Abstracts and technical information  

### Current Limitations
⚠️ Hardcoded journal-specific logic in components  
⚠️ Static article data in some components  
⚠️ Mixed data sources (config files vs. actual published content)  
⚠️ No standardized journal creation process  
⚠️ No automated article publishing workflow  

---

## Requirements for Multi-Journal System

### 1. Journal Management

#### Journal Configuration
- **Location**: `config/journals.json`
- **Required Fields**:
  - `id`: Unique journal identifier (e.g., "investment-management")
  - `name`: Display name
  - `slug`: URL-friendly identifier
  - `status`: active | planned | inactive | archived
  - `publisher`: Publisher name
  - `frequency`: Publication frequency
  - `peerReview`: Peer review type
  - `editorialBoard`: Array of board members
  - `launchDate`: When journal launched
  - `lastUpdated`: Last update timestamp

#### Editorial Board Data
- **IMPORTANT**: Only include titles/credentials if explicitly published
- **Format**: `{ name: string, role: string, affiliation: string, email?: string }`
- **No assumptions**: Do not add "Dr.", "Prof.", etc. unless shown on website

### 2. Article Management

#### Article Data Structure
- **Location**: `data/articles/{journal-id}/{article-id}.json`
- **Required Fields**:
  - `id`: Article ID (e.g., "IMJ-2025-001")
  - `journalId`: Journal identifier
  - `title`: Article title
  - `authors`: Array of author objects
  - `publishedDate`: Publication date
  - `status`: published | draft | review | rejected
  - `doi`: Digital Object Identifier
  - `abstract`: Article abstract
  - `keywords`: Array of keywords
  - `files`: File references
  - `version`: Current version
  - `versionHistory`: Array of version objects
  - `peerReviewed`: Boolean
  - `license`: License type

#### Article Storage Structure
```
storage/journals/{journal-id}/articles/{article-id}/
  ├── current/ (symlink to latest version)
  ├── v1/
  │   ├── article.pdf
  │   └── metadata.json
  ├── v2/ (if updated)
  │   └── ...
```

#### Article Naming Convention
- **Format**: `{JOURNAL-PREFIX}-{YEAR}-{NUMBER}`
- **Example**: `IMJ-2025-001` (Investment Management Journal, 2025, article 1)
- **Each journal needs unique prefix**:
  - Investment Management Journal: `IMJ`
  - FinTech Innovation Journal: `FTIJ` (or similar)
  - Future journals: Define unique prefix

### 3. Routing System

#### Current Routes
- `/publishing` - Publishing hub (all content types)
- `/publishing/{journal-slug}` - Journal main page
- `/publishing/{journal-slug}/article/{article-slug}` - Article page

#### Requirements
- ✅ Dynamic routing based on journal slug
- ✅ Article slug mapping (article ID → URL slug)
- ✅ Backward compatibility for old URLs

### 4. Component Architecture

#### Journal Components
- `JournalCard` - Display journal information
- `JournalHeader` - Journal header component
- `{JournalName}Journal` - Journal-specific page component
- **Future**: Generic `JournalPage` component that works for all journals

#### Article Components
- `ArticlePage` - Generic article viewing page
- `ArticleCard` - Article preview card
- `ArticleMetadata` - Article metadata display

#### Requirements
- ✅ Reusable components across journals
- ⚠️ Reduce journal-specific hardcoding
- ⚠️ Standardize data sources

### 5. Data Sources & Truth

#### Primary Sources (Use These)
1. **Published Article Data**: `data/articles/{journal-id}/*.json`
2. **Website Components**: Actual displayed content in React components
3. **Storage Files**: `storage/journals/{journal-id}/articles/`
4. **Documentation**: `docs/WEBSITE_JOURNALS_DATA.md` (this file)

#### Secondary Sources (Verify Against Primary)
- `config/journals.json` - May contain outdated info
- Static data in components - May be hardcoded

#### Rules
- ✅ **Always verify** against actual website content
- ✅ **Do not assume** titles, credentials, or information
- ✅ **Update documentation** when content changes
- ❌ **Do not hallucinate** information not in source files

### 6. Publishing Workflow

#### Current Process (Manual)
1. Create article PDF
2. Create article JSON metadata file
3. Place PDF in storage structure
4. Update article listing
5. Deploy to website

#### Future Requirements
- ⚠️ Admin interface for article publishing
- ⚠️ Automated metadata generation
- ⚠️ Version management UI
- ⚠️ Peer review workflow
- ⚠️ Submission system

### 7. Multi-Journal Support

#### What's Needed
1. **Generic Journal Component**
   - Works for any journal
   - Loads journal config dynamically
   - Displays journal-specific content

2. **Journal-Specific Customization**
   - Custom styling per journal
   - Journal-specific sections
   - Editorial board display

3. **Article Routing**
   - Journal-aware article URLs
   - Article ID → Slug mapping per journal
   - Cross-journal article search

4. **Data Organization**
   - Separate data folders per journal
   - Separate storage per journal
   - Journal-specific configurations

### 8. Content Management

#### Editorial Board Management
- **Source**: Journal config file
- **Display**: Journal page component
- **Rules**:
  - Only include published information
  - No assumed titles/credentials
  - Update when board changes

#### Article Metadata
- **Source**: Article JSON files
- **Display**: Article page component
- **Rules**:
  - Keep metadata accurate
  - Update when articles revised
  - Maintain version history

### 9. Documentation Requirements

#### Required Documentation
1. **WEBSITE_JOURNALS_DATA.md** - Actual published data (PRIMARY SOURCE)
2. **JOURNALS_SYSTEM_REQUIREMENTS.md** - This file (system requirements)
3. **Journal-specific docs** - As needed for each journal

#### Documentation Rules
- ✅ Document only what's actually published
- ✅ Include source file references
- ✅ Update when content changes
- ❌ Do not include assumed information
- ❌ Do not add titles/credentials unless published

### 10. Future Journal Setup Process

#### When Adding New Journal
1. **Create Journal Config**
   - Add to `config/journals.json`
   - Define journal ID, name, slug
   - Set up editorial board (only published info)

2. **Create Storage Structure**
   - `storage/journals/{journal-id}/articles/`
   - Set up version management

3. **Create Data Directory**
   - `data/articles/{journal-id}/`
   - For article JSON files

4. **Create Journal Page Component**
   - Or use generic component
   - Add journal-specific content

5. **Update Routing**
   - Add route for journal page
   - Add route for journal articles

6. **Update Documentation**
   - Add to `WEBSITE_JOURNALS_DATA.md`
   - Document editorial board (no assumptions)
   - Document first articles

7. **Define Article ID Prefix**
   - Choose unique prefix for journal
   - Document in journal config

---

## Key Principles

### Data Accuracy
- ✅ Use actual published content as source
- ✅ Verify against website before documenting
- ✅ Include source file references
- ❌ Do not assume or hallucinate information

### Credentials & Titles
- ✅ Only include if explicitly published
- ✅ User confirmed: Karlo Definis is NOT a doctor
- ✅ Check actual website components for titles
- ❌ Do not add "Dr.", "Prof.", etc. unless shown

### Multi-Journal Support
- ✅ Design for multiple journals from start
- ✅ Use generic components where possible
- ✅ Journal-specific customization when needed
- ✅ Maintain separate data per journal

### Documentation
- ✅ Keep documentation updated
- ✅ Reference source files
- ✅ Document only published content
- ✅ Use as primary source of truth

---

## Checklist for New Journal

- [ ] Create journal config in `config/journals.json`
- [ ] Create storage structure `storage/journals/{journal-id}/`
- [ ] Create data directory `data/articles/{journal-id}/`
- [ ] Define article ID prefix (e.g., "FTIJ" for FinTech)
- [ ] Create journal page component or use generic
- [ ] Add routes for journal and articles
- [ ] Add editorial board (only published info, no assumptions)
- [ ] Update `WEBSITE_JOURNALS_DATA.md` with new journal
- [ ] Test article publishing workflow
- [ ] Verify all content matches published website

---

**This file documents the system requirements for the multi-journal publishing system.**
