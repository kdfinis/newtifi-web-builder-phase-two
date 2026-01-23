# ISSN Application Integration Analysis

**Date**: 2026-01-23  
**Source Document**: `2026.01.15_NewTIFI Investment Management Journal_BNL _ Demande d'ISSN.pdf`  
**Purpose**: Analyze how ISSN application data integrates with website and documentation

---

## How ISSN Application Interacts with Website

### 1. Journal Title
✅ **Matches**: "NewTIFI Investment Management Journal"  
- Website uses: "Investment Management Journal" or "NewTIFI Publishing – Investment Management Journal"
- ISSN Application: "NewTIFI Investment Management Journal"
- **Status**: Consistent - no changes needed

### 2. First Issue Designation
⚠️ **Important Finding**: 
- **ISSN Application**: Lists IMJ-2025-003 as first issue
- **Website**: Shows all 3 articles (IMJ-2025-001, 002, 003) published on same date
- **Impact**: May affect volume/issue numbering
- **Action**: Verify if this changes how articles are numbered or cited

### 3. Publication Frequency
✅ **Matches**: Quarterly (Trimestrielle)  
- Website: "Quarterly"
- ISSN Application: "Trimestrielle" (Quarterly)
- **Status**: Consistent

### 4. Publication Date
✅ **Matches**: June 2025  
- Website: Articles published 2025-06-28
- ISSN Application: June 2025
- **Status**: Consistent

### 5. ISSN Status
🔄 **Pending Update**:
- **Current Website**: Shows "TBD" or "XXXX-XXXX" in 5+ locations
- **ISSN Application**: Submitted 2026-01-15, pending assignment
- **Action Required**: Update all ISSN references when number is assigned

### 6. Publisher Information
📝 **Clarification Needed**:
- **ISSN Application**: Publisher is individual (HAVRENNE Ezechiel)
- **Editorial Brand**: "NewTIFI Publishing" (appears on publications)
- **Website**: Shows "NewTIFI" or "New Technologies & Investment Funds Institute"
- **Status**: Both are valid - editorial brand vs. organization name
- **Action**: No immediate change needed, but document the distinction

### 7. Official Description
📝 **New Information**:
- **ISSN Application**: Provides official journal description
- **Website**: Has different description (more detailed)
- **Action**: Consider using official description for:
  - Academic database submissions
  - Citation metadata
  - SEO meta descriptions
  - External references

### 8. Contact Information
✅ **Matches**: 
- Email: ezechiel.havrenne@newtifi.com (matches website)
- Website: https://newtifi.com (matches)
- **New Information**: Official phone number and address from application

---

## Files That Need Updates (When ISSN is Assigned)

### Priority 1: Configuration Files
1. **`config/journals.json`**
   - Line 7: Change `"issn": "XXXX-XXXX"` to actual ISSN

### Priority 2: Website Components
2. **`src/pages/publishing/journals/investment-management.tsx`**
   - Line 10: Change `issn: "TBD"` to actual ISSN

3. **`src/pages/publishing/journals/ArticlePage.tsx`**
   - Line 115: Change `issn: "TBD"` to actual ISSN

4. **`src/pages/Publishing.tsx`**
   - Lines 367-370: Update "ISSN: TBD – eISSN: TBD" to actual numbers

5. **`data/submissionRules.ts`**
   - Line 293: Update `<p><strong>ISSN:</strong> XXXX-XXXX</p>` to actual ISSN

### Priority 3: Documentation
6. **`docs/WEBSITE_JOURNALS_DATA.md`**
   - Update ISSN status section

7. **`docs/ISSN_APPLICATION_DATA.md`**
   - Add assigned ISSN number

---

## Key Integration Points

### Publisher Structure
The ISSN application reveals a two-tier publisher structure:

1. **Legal Publisher** (for registration): HAVRENNE Ezechiel (Individual)
2. **Editorial Brand** (on publications): NewTIFI Publishing
3. **Organization** (on website): New Technologies & Investment Funds Institute

**All three are valid** and serve different purposes:
- Legal registration requires individual or organization name
- Publications show editorial brand
- Website can show organization name

### First Issue Implications
The designation of IMJ-2025-003 as the first issue may affect:
- Volume/Issue numbering on future articles
- Citation formats
- Article ordering in journal archives
- Volume 1, Issue 1 designation

**Action**: Verify if this changes how articles should be numbered or if it's just administrative.

### Official Description Usage
The official description from the ISSN application is shorter and more focused:
- **ISSN Description**: "Rigorous, peer-reviewed scholarship and practitioner insight on investment management - legal, regulatory, tax and tech - spanning namely fund structuring, capital raising, strategy, M&A and liquidations across leading jurisdictions."
- **Website Description**: More detailed, includes mission statement

**Recommendation**: Use ISSN description for:
- External databases (DOAJ, etc.)
- Academic citations
- Meta descriptions
- Short summaries

Use website description for:
- Journal landing page
- About section
- Detailed information

---

## Documentation Updates Made

### Created Files
1. **`docs/ISSN_APPLICATION_DATA.md`**
   - Complete documentation of ISSN application
   - Official publisher information
   - Contact details
   - First issue information
   - Integration notes

### Updated Files
2. **`docs/WEBSITE_JOURNALS_DATA.md`**
   - Added ISSN application status
   - Added official publisher information
   - Added official journal description
   - Noted first issue designation
   - Added reference to ISSN application document

3. **`docs/README_JOURNALS.md`**
   - Added reference to ISSN application data
   - Noted it as official registration source

---

## Action Items

### Immediate (No Action Required)
- ✅ Documentation updated
- ✅ Publisher information documented
- ✅ First issue noted

### When ISSN is Assigned
- [ ] Update `config/journals.json` with actual ISSN
- [ ] Update all website components showing "TBD" or "XXXX-XXXX"
- [ ] Update documentation files
- [ ] Verify first issue designation doesn't affect article numbering
- [ ] Consider using official description in external submissions

### Optional Enhancements
- [ ] Add publisher address to contact page (if appropriate)
- [ ] Add official phone number to contact information
- [ ] Use official description in meta tags for SEO
- [ ] Verify volume/issue numbering matches first issue designation

---

## Summary

The ISSN application provides **official registration data** that:
1. **Confirms** journal information (title, frequency, date)
2. **Clarifies** publisher structure (individual + editorial brand)
3. **Designates** first issue (IMJ-2025-003)
4. **Provides** official description for external use
5. **Requires** updates when ISSN number is assigned

The website and documentation have been updated to reflect this official information while maintaining the existing website content and structure.

---

**This analysis documents how the ISSN application integrates with the website and what actions are required.**
