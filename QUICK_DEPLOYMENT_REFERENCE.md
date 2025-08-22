# 🚀 QUICK DEPLOYMENT REFERENCE
## Avoid the Black Page Issue - Fast Reference

### ⚡ **FAST DEPLOYMENT CHECK**
```bash
# 1. Check which branch GitHub Pages uses
ls -la | grep .nojekyll
# If .nojekyll exists in main branch → main branch is the source
# If no .nojekyll in main → gh-pages branch is the source
```

### 🔧 **DEPLOYMENT METHODS**

#### **If Main Branch is Source** (Your Current Setup):
```bash
npm run build
cp -r dist/* .
git add .
git commit -m "Update built files"
git push origin main
```

#### **If gh-pages Branch is Source**:
```bash
npm run deploy
```

### ✅ **POST-DEPLOYMENT VERIFICATION**
```bash
# Wait 10-15 minutes, then test:
curl -s -o /dev/null -w "%{http_code}" https://newtifi.com
curl -s -o /dev/null -w "%{http_code}" https://newtifi.com/assets/index-CoLkRZRg.css
curl -s -o /dev/null -w "%{http_code}" https://newtifi.com/assets/index-BY1sSkkS.js

# All should return HTTP 200
```

### 🚨 **RED FLAGS (Stop and Investigate)**
- CSS/JS files return HTML instead of their content
- Asset files return HTTP 404
- Site loads but shows black page
- `npm run deploy` doesn't update the live site

### 📍 **Your Current Configuration**
- **GitHub Pages Source**: `main` branch
- **Custom Domain**: `newtifi.com`
- **Deployment Method**: Copy built files to main branch
- **Repository**: `kdfinis/newtifi-web-builder-phase-two`

---
**Remember**: Always verify the source branch before deploying!
