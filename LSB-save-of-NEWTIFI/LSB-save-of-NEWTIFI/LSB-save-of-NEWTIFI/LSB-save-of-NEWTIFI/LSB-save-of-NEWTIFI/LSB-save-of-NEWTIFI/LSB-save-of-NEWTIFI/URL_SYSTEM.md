# Permanent URL System Documentation

## Overview
This system ensures that article URLs are **permanent and static**, never changing even when article titles, metadata, or other content is modified.

## URL Structure
- **Format**: `/article/{urlId}`
- **Example**: `/article/eltifs-2025-001`

## Permanent URL IDs
These are the **permanent, never-changing** identifiers for each article:

| URL ID | Article Title |
|--------|---------------|
| `eltifs-2025-001` | Closed-Ended Luxembourg ELTIFs Compulsory Redemption Matters and Compartment Termination & Amalgamation Provisions |
| `bafin-2025-002` | Investor Oversight or Undue Influence? Reassessing BaFin's Stance on AIFM Portfolio Control |
| `luxembourg-2025-003` | Luxembourg SICARs, SIFs, and RAIFs: A 20-year Perspective on the Well-Informed Investor Notion |

## URL Generation Rules
1. **urlId**: `{topic}-{year}-{idNumber}` (e.g., `eltifs-2025-001`)
2. **slug**: Human-readable version (can change, not used for routing)
3. **Permanent**: Once assigned, urlId NEVER changes

## Adding New Articles
When adding a new article, follow these steps:

1. **Generate urlId**: Use the pattern `{topic}-{year}-{idNumber}`
2. **Add to mapping**: Update `src/lib/urlMapping.ts`
3. **Add to data**: Include urlId in `data/articles.json`
4. **Test**: Ensure the URL works and is permanent

## Topic Keywords
Use these keywords to generate topic-based URLs:
- `eltifs` - ELTIF-related articles
- `bafin` - BaFin regulatory articles
- `aifm` - AIFM-related articles
- `luxembourg` - Luxembourg-specific articles
- `sicars`, `sifs`, `raifs` - Fund structure articles
- `investor` - Investor-related articles
- `portfolio` - Portfolio management articles

## Backward Compatibility
The system maintains backward compatibility with:
- Old filename-based URLs
- Slug-based URLs
- ID-based URLs

## Files to Update When Adding Articles
1. `src/lib/urlMapping.ts` - Add permanent URL mapping
2. `data/articles.json` - Add article with urlId
3. `data/admin_articles.json` - Add article with urlId
4. `admin-server.js` - URL generation functions (automatic)

## Important Notes
- **NEVER change urlId** once assigned
- **NEVER delete urlId** mappings
- **Always test** new URLs before deployment
- **Update documentation** when adding new articles

## Testing URLs
Test all URL formats work:
- `/article/eltifs-2025-001` (urlId)
- `/article/eltifs-compulsory-redemptions` (slug)
- `/article/IMJ-2025-001` (id)

## SEO Benefits
- Permanent URLs improve search engine rankings
- No broken links when content changes
- Consistent URL structure across the site
- Better user experience with memorable URLs 