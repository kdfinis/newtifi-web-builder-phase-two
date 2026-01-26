# Journals Documentation - Quick Reference

## Primary Documentation Files

### 1. WEBSITE_JOURNALS_DATA.md ⭐ PRIMARY SOURCE
**Purpose**: Actual published data from the website  
**Use**: Primary source of truth for all journal information  
**Contains**:
- Actual editorial board (no assumptions)
- Published articles with full metadata
- File structure and storage locations
- Source file references
- Rules for data accuracy
- Official publisher information from ISSN application

**⚠️ IMPORTANT**: Always use this file as the primary source. Do not assume or hallucinate information.

### 1a. ISSN_APPLICATION_DATA.md ⭐ OFFICIAL REGISTRATION
**Purpose**: Official ISSN application data from Bibliothèque Nationale du Luxembourg  
**Use**: Official publisher information, ISSN status, first issue designation  
**Contains**:
- Official journal description
- Publisher registration details
- Contact information
- First issue information
- Integration notes for website updates

**⚠️ IMPORTANT**: Contains official registration data. Use for publisher information and when ISSN is assigned.

### 2. JOURNALS_SYSTEM_REQUIREMENTS.md
**Purpose**: System requirements and future planning  
**Use**: Understanding the multi-journal system architecture  
**Contains**:
- Current system status
- Requirements for multi-journal support
- Article management structure
- Publishing workflow
- Checklist for adding new journals

### 3. JOURNALS_OVERVIEW.md
**Purpose**: General overview (legacy)  
**Use**: Quick reference only  
**Note**: May contain outdated information - always verify against WEBSITE_JOURNALS_DATA.md

---

## Key Rules

### Data Accuracy
- ✅ **ONLY** document what is actually published on the website
- ✅ **VERIFY** against actual website content before documenting
- ✅ **INCLUDE** source file references for all data
- ❌ **DO NOT** assume titles, credentials, or information
- ❌ **DO NOT** add "Dr.", "Prof.", etc. unless explicitly shown

### Credentials & Titles
- ✅ User confirmed: **Karlo Definis is NOT a doctor**
- ✅ Only include titles if explicitly published on website
- ✅ Check actual website components for displayed information
- ❌ Do not add credentials from config files if not shown on website

### Multi-Journal Support
- ✅ System designed for multiple journals
- ✅ Each journal needs unique article ID prefix
- ✅ Separate data storage per journal
- ✅ Generic components where possible

---

## Quick Facts (From WEBSITE_JOURNALS_DATA.md)

### Active Journals
- **Investment Management Journal**
- **Restructuring & Insolvency Journal**
- **6 published articles** (3 IMJ, 3 RIJ)
- **Editorial Board**: Ezechiel Havrenne (Editor-in-Chief), Delphine Filsack (Associate Editor), Karlo Definis (Managing Editor)
- **No titles shown** on website - only names and roles

### Articles
- IMJ-2025-001: "Closed-Ended Luxembourg ELTIFs..."
- IMJ-2025-002: "Investor Oversight or Undue Influence?..."
- IMJ-2025-003: "Luxembourg SICARs, SIFs, and RAIFs..."
- RIJ-2026-001: "Compartment Insolvency in Luxembourg Investment Funds..."
- RIJ-2026-002: "Ipso Jure Dissolution and Liquidation in Luxembourg Investment Funds..."
- RIJ-2026-003: "Ruling 1019 and the Architecture of Liquidation in Luxembourg Investment Funds..."

---

## For AI/Developers

### When Working with Journals
1. **Read** `WEBSITE_JOURNALS_DATA.md` first
2. **Verify** against actual website if unsure
3. **Do NOT** assume information
4. **Do NOT** add titles/credentials
5. **Update** documentation when content changes

### When Adding New Journal
1. Follow checklist in `JOURNALS_SYSTEM_REQUIREMENTS.md`
2. Update `WEBSITE_JOURNALS_DATA.md` with new journal
3. Only include published information
4. No assumptions about editorial board

---

## File Locations

- **Primary Data**: `docs/WEBSITE_JOURNALS_DATA.md`
- **System Requirements**: `docs/JOURNALS_SYSTEM_REQUIREMENTS.md`
- **Overview**: `docs/JOURNALS_OVERVIEW.md`
- **This File**: `docs/README_JOURNALS.md`

---

**Always use WEBSITE_JOURNALS_DATA.md as the primary source of truth.**
