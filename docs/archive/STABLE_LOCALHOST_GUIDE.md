# Stable Localhost Prevention Guide

## 🚨 Why Black Screen Happens

The black screen issue occurs when:
1. **Missing main script tag** in `index.html`
2. **Syntax errors** in React/TypeScript files
3. **Import statements in wrong places** (inside functions/components)
4. **Self-assignment errors** in JavaScript
5. **Malformed import statements**

## ✅ Prevention Measures

### 1. Automated Validation
Run the validation script before any development work:
```bash
node scripts/validate-codebase.js
```

### 2. Pre-commit Hook
A pre-commit hook is installed to automatically validate code before commits.

### 3. Critical Checks

#### Index.html Requirements
- Must have: `<div id="root"></div>`
- Must have: `<script type="module" src="/src/main.tsx"></script>`

#### Import Statement Rules
- ✅ All imports must be at the top of files
- ✅ No imports inside functions or components
- ✅ Multi-line imports are allowed
- ✅ CSS imports are allowed without `from` clause

#### Common Syntax Errors to Avoid
- ❌ `import { something } from '@/path';` inside a function
- ❌ `variable = variable` (self-assignment)
- ❌ Missing `from` in import statements (except CSS)

## 🔧 Quick Fixes

### If you see a black screen:
1. Check browser console for errors
2. Run `node scripts/validate-codebase.js`
3. Fix any reported errors
4. Restart dev server: `npm run dev`

### If imports are in wrong place:
```typescript
// ❌ WRONG - inside component
const MyComponent = () => {
  import { something } from '@/path'; // This will break!
  return <div>...</div>;
};

// ✅ CORRECT - at top of file
import { something } from '@/path';
const MyComponent = () => {
  return <div>...</div>;
};
```

## 🛠️ Development Workflow

1. **Before starting work**: Run validation script
2. **During development**: Check browser console regularly
3. **Before committing**: Pre-commit hook runs automatically
4. **If issues arise**: Use validation script to identify problems

## 📋 Validation Checklist

- [ ] All imports at top of files
- [ ] No self-assignment errors
- [ ] TypeScript compilation passes
- [ ] Index.html has required script tag
- [ ] No malformed import statements
- [ ] Dev server starts without errors

## 🚀 Stable Localhost Commands

```bash
# Start development server
npm run dev

# Validate codebase
node scripts/validate-codebase.js

# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npx eslint src --ext .ts,.tsx
```

## 📞 Emergency Recovery

If localhost is completely broken:
1. Stop dev server: `pkill -f vite`
2. Clear caches: `rm -rf node_modules/.vite`
3. Reinstall: `npm install`
4. Validate: `node scripts/validate-codebase.js`
5. Restart: `npm run dev`

Remember: **Prevention is better than cure!** Always run validation before committing.
