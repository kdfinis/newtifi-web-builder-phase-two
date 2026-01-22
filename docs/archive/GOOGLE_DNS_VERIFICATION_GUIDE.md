# Google DNS Verification for newtifi.com

## 🎯 **GOOGLE'S DNS VERIFICATION REQUIREMENTS:**

### **✅ ADD THESE RECORDS:**
```
Type: A
Domain: newtifi.com
Value: 199.36.158.100
```

```
Type: TXT
Domain: newtifi.com
Value: hosting-site=newtifi-web
```

### **❌ REMOVE THESE RECORDS:**
```
Type: A
Domain: newtifi.com
Value: 185.199.108.153
```

```
Type: A
Domain: newtifi.com
Value: 185.199.109.153
```

```
Type: A
Domain: newtifi.com
Value: 185.199.110.153
```

```
Type: A
Domain: newtifi.com
Value: 185.199.111.153
```

## 🔧 **IMPLEMENTATION STEPS:**

### **Step 1: Access Firebase DNS Management**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `newtifi-web`
3. Go to **Hosting** → **Custom Domain** → **newtifi.com**
4. Click **"Manage DNS"** or **"DNS Settings"**

### **Step 2: Add Required Records**
1. **Add A Record:**
   - Type: `A`
   - Name: `@` (or leave blank for root domain)
   - Value: `199.36.158.100`
   - TTL: `3600` (or default)

2. **Add TXT Record:**
   - Type: `TXT`
   - Name: `@` (or leave blank for root domain)
   - Value: `hosting-site=newtifi-web`
   - TTL: `3600` (or default)

### **Step 3: Remove Old Records**
1. **Find and delete** the old A records with values:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

### **Step 4: Verify Changes**
```bash
# Check A record
dig newtifi.com A

# Check TXT record
dig newtifi.com TXT
```

## ⏱️ **TIMELINE:**
- **DNS Propagation**: 15 minutes to 24 hours
- **Google Verification**: Usually within 1-2 hours
- **Full Propagation**: Up to 48 hours globally

## 🔍 **VERIFICATION COMMANDS:**

### **Check Current DNS:**
```bash
# Check A records
nslookup newtifi.com

# Check TXT records
nslookup -type=TXT newtifi.com
```

### **Expected Results:**
```
# A record should show:
newtifi.com.    3600    IN    A    199.36.158.100

# TXT record should show:
newtifi.com.    3600    IN    TXT    "hosting-site=newtifi-web"
```

## 🚨 **IMPORTANT NOTES:**

### **⚠️ DNS Changes Affect Website:**
- **Adding the new A record** will point your domain to Google's servers
- **This might temporarily affect** your Firebase hosting
- **You may need to update** Firebase hosting configuration

### **🔄 Alternative Approach:**
If DNS changes break your website, consider:
1. **Use HTML meta tag method** instead
2. **Add verification tag** to your website
3. **Keep current DNS** configuration

## 🎯 **FIREBASE DNS CONFIGURATION:**

### **Current Firebase Setup:**
- Domain: `newtifi.com`
- Hosting: Firebase Hosting
- DNS Provider: Firebase/Google Cloud DNS

### **Required Changes:**
1. **Update A record** to point to Google's IP
2. **Add TXT record** for verification
3. **Remove old A records** that conflict

## ✅ **SUCCESS INDICATORS:**
- DNS records propagate globally
- Google Search Console shows "Verified"
- Website remains accessible
- No DNS conflicts

## 🚀 **NEXT STEPS:**
1. **Access Firebase DNS management**
2. **Add the required A and TXT records**
3. **Remove conflicting A records**
4. **Wait for DNS propagation**
5. **Verify in Google Search Console**

