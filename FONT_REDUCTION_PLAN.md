# Font Size Reduction Plan - NewTIFI Website

## Current State Analysis
**Total Font Sizes: 39** (from CSS analysis)

### Current Font Size Breakdown:
1. **Tailwind Standard Sizes (13 sizes):**
   - `.75rem` (12px) - Extra small
   - `.875rem` (14px) - Small  
   - `.8rem` (12.8px) - Custom small
   - `1rem` (16px) - Base
   - `1.125rem` (18px) - Large
   - `1.25rem` (20px) - Extra large
   - `1.5rem` (24px) - 2XL
   - `1.875rem` (30px) - 3XL
   - `2.25rem` (36px) - 4XL
   - `2.4rem` (38.4px) - Custom large
   - `3rem` (48px) - 5XL
   - `3.75rem` (60px) - 6XL
   - `6rem` (96px) - 8XL

2. **Pixel-based Sizes (10 sizes):**
   - `10px`, `11px`, `12px`, `13px`, `14px`, `15px`, `16px`, `18px`, `24px`, `30px`

3. **Percentage-based Sizes (4 sizes):**
   - `75%`, `80%`, `93.75%`, `100%`

4. **CSS Variables (3 sizes):**
   - `var(--rdp-caption-font-size)`, `var(--vscode-editor-font-size)`, `var(--vscode-font-size)`

5. **Other (9 sizes):**
   - `inherit`, `1em`, `0.75em`, etc.

## Proposed Simplified Typography System (9 Sizes)

### 1. **Hero/Display Text** - `text-6xl` (60px)
- **Usage:** Main page headlines, hero sections
- **Current examples:** "FOCUS RESEARCH INNOVATE IMPLEMENT", "404" page
- **Replaces:** `text-6xl`, `text-8xl`, `6rem`, `3.75rem`

### 2. **Page Headings** - `text-4xl` (36px)
- **Usage:** Section titles, main page headings
- **Current examples:** "New Technologies and Investment Funds Institute", "Choose Your Path to Innovation"
- **Replaces:** `text-4xl`, `text-5xl`, `2.25rem`, `2.4rem`, `3rem`

### 3. **Section Headings** - `text-2xl` (24px)
- **Usage:** Subsection titles, card headings
- **Current examples:** "Featured Articles", "Scholarship & Education", "Insights"
- **Replaces:** `text-2xl`, `text-3xl`, `1.5rem`, `1.875rem`

### 4. **Subsection Headings** - `text-xl` (20px)
- **Usage:** Article titles, feature headings
- **Current examples:** Article titles, feature descriptions
- **Replaces:** `text-xl`, `1.25rem`

### 5. **Body Text Large** - `text-lg` (18px)
- **Usage:** Important body text, descriptions
- **Current examples:** Main descriptions, important paragraphs
- **Replaces:** `text-lg`, `1.125rem`, `18px`

### 6. **Body Text** - `text-base` (16px)
- **Usage:** Standard body text, paragraphs
- **Current examples:** Regular paragraphs, list items
- **Replaces:** `text-base`, `1rem`, `16px`, `100%`

### 7. **Small Text** - `text-sm` (14px)
- **Usage:** Captions, metadata, secondary information
- **Current examples:** Dates, author names, tags
- **Replaces:** `text-sm`, `.875rem`, `14px`, `93.75%`

### 8. **Extra Small Text** - `text-xs` (12px)
- **Usage:** Labels, badges, fine print
- **Current examples:** Tags, badges, fine print
- **Replaces:** `text-xs`, `.75rem`, `.8rem`, `12px`, `11px`, `10px`, `75%`, `80%`

### 9. **Inherited Text** - `inherit`
- **Usage:** Buttons, form elements, special cases
- **Current examples:** Button text, form inputs
- **Replaces:** `inherit`, `1em`, `0.75em`, CSS variables

## Implementation Strategy

### Phase 1: Update Tailwind Config
```typescript
// tailwind.config.ts
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
  'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
  'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
  'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
  '6xl': ['3.75rem', { lineHeight: '1' }],          // 60px
}
```

### Phase 2: Update CSS Classes
```css
/* Remove custom font sizes */
.text-\[0\.8rem\], .text-\[1\.2rem\], .text-\[12px\], .text-\[2\.4rem\] {
  /* Remove these custom sizes */
}

/* Standardize on 9 sizes */
```

### Phase 3: Update Component Usage
- Replace all custom font sizes with standard Tailwind classes
- Update responsive variants to use consistent sizing
- Remove redundant font size declarations

## Benefits of This Reduction

1. **Consistency:** 9 sizes vs 39 sizes = 77% reduction
2. **Maintainability:** Easier to manage and update
3. **Performance:** Smaller CSS bundle
4. **Design System:** More cohesive typography hierarchy
5. **Accessibility:** Better defined text scaling
6. **Responsive Design:** Cleaner breakpoint management

## Migration Checklist

- [ ] Update Tailwind config
- [ ] Remove custom font size classes
- [ ] Update all component font sizes
- [ ] Test responsive behavior
- [ ] Verify accessibility compliance
- [ ] Update documentation
- [ ] Test across all pages

## Expected Results

**Before:** 39 different font sizes
**After:** 9 standardized font sizes
**Reduction:** 77% fewer font size variations
**Maintenance:** Significantly easier to manage
**Consistency:** Much more cohesive design system
