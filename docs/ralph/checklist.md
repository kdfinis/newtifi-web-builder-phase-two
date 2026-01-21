# Deployment Fix Checklist

## Step 1: Determine GitHub Pages Source Branch
- [ ] Check which branch has `.nojekyll` file
- [ ] Verify GitHub Pages configuration
- [ ] Document which branch is the source

## Step 2: Build Latest Code
- [ ] Run `npm run build`
- [ ] Verify dist/ contains latest code
- [ ] Check ArticleViewer.tsx is in dist
- [ ] Check ArticlePage fixes are in dist
- [ ] Verify security fixes are included

## Step 3: Deploy to Correct Branch
- [ ] Determine correct deployment method
- [ ] Deploy built files to correct branch
- [ ] Verify files are committed and pushed
- [ ] Check deployment succeeded

## Step 4: Verify Live Site
- [ ] Check newtifi.com loads correctly
- [ ] Verify /admin/articles works
- [ ] Verify /publishing/article/eltifs-compulsory-redemptions works
- [ ] Verify all latest features present
- [ ] Test key functionality

## Step 5: Document Process
- [ ] Document which branch GitHub Pages uses
- [ ] Document correct deployment command
- [ ] Update any deployment guides
