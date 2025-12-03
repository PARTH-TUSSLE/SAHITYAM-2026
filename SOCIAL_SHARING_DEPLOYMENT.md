# 🚀 SOCIAL SHARING & DEPLOYMENT GUIDE

## Variables to Update After Deployment

This document tracks all URLs and variables that need to be updated once you deploy your SAHITYAM 2026 website.

---

## 📋 Required Environment Variables

### Frontend (.env.local or .env.production)

Create a `.env.local` file (for local testing) or configure these in your hosting platform (Vercel/Netlify):

```env
# CRITICAL: Update after deployment
NEXT_PUBLIC_FRONTEND_URL=https://your-production-domain.com
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com

# Optional: Social Media Handles
NEXT_PUBLIC_TWITTER_HANDLE=@SAHITYAM2026
NEXT_PUBLIC_FACEBOOK_PAGE_ID=your-facebook-page-id
```

### Backend (.env)

Already configured, but verify:

```env
DATABASE_URL=your-neon-postgres-url
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
EMAIL_USER=parthgartan26feb@gmail.com
EMAIL_PASSWORD=uonvxceoakditypc
JWT_SECRET=your-jwt-secret
```

---

## 🔧 Files Requiring Updates

### 1. **frontend/lib/config.ts**

**Current State:**

```typescript
frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
```

**Action Required:**

- Set `NEXT_PUBLIC_FRONTEND_URL` environment variable in Vercel/Netlify
- Example: `NEXT_PUBLIC_FRONTEND_URL=https://sahityam2026.vercel.app`

**What This Affects:**

- Social sharing URLs (all platforms)
- Email links in registration confirmations
- QR code generation (future feature)
- Event detail page URLs

---

### 2. **Social Sharing Configuration**

**Location:** `frontend/lib/config.ts`

**Current Hashtags:**

```typescript
hashtags: ["SAHITYAM2026", "LiteratureFestival", "IndianLiterature"];
```

**Optional Updates:**

- Add Twitter handle: `twitterHandle: '@SAHITYAM2026'`
- Add Facebook Page ID: `facebookPageId: 'your-page-id'`

**How to Find Facebook Page ID:**

1. Go to your Facebook Page
2. Click "About" → "More Info"
3. Look for "Page ID" or use: https://findmyfbid.com/

---

## 🌐 Deployment Steps

### Step 1: Deploy Backend (Render/Railway/Heroku)

1. **Deploy backend first** (PostgreSQL + Express.js)
2. **Get backend URL** (e.g., `https://sahityam-backend.onrender.com`)
3. **Verify backend is running:**
   ```bash
   curl https://your-backend-url.com/health
   ```

### Step 2: Configure Frontend Environment Variables

**On Vercel:**

1. Go to Project Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_FRONTEND_URL = https://sahityam2026.vercel.app
   NEXT_PUBLIC_API_URL = https://your-backend-url.com
   ```
3. Redeploy

**On Netlify:**

1. Site Settings → Environment Variables
2. Add same variables as above
3. Trigger new deployment

### Step 3: Test Social Sharing

After deployment, test each platform:

1. **Copy Link** - Should copy production URL
2. **WhatsApp** - Should share production link
3. **Twitter** - Should include hashtags and production URL
4. **Facebook** - Should fetch OpenGraph metadata
5. **LinkedIn** - Should fetch metadata from production

---

## ✅ Post-Deployment Checklist

### Immediately After Deployment:

- [ ] Verify `NEXT_PUBLIC_FRONTEND_URL` is set correctly
- [ ] Test event page URL: `https://yourdomain.com/events?id=1`
- [ ] Click share button on any event
- [ ] Verify copied link is production URL (not localhost)
- [ ] Test sharing to WhatsApp (on mobile)
- [ ] Test sharing to Twitter
- [ ] Check Facebook OpenGraph preview: https://developers.facebook.com/tools/debug/
- [ ] Check LinkedIn post inspector: https://www.linkedin.com/post-inspector/

### Within 24 Hours:

- [ ] Monitor registration emails (check spam folder)
- [ ] Test payment verification emails
- [ ] Verify Cloudinary images load
- [ ] Check contact form emails arrive
- [ ] Test all authentication flows (login, signup, logout)

### Optional Enhancements:

- [ ] Set up custom domain (e.g., sahityam2026.com)
- [ ] Enable HTTPS (usually automatic on Vercel/Netlify)
- [ ] Configure CORS for backend (allow only your frontend domain)
- [ ] Add Google Analytics (future)
- [ ] Set up monitoring (Sentry, LogRocket)

---

## 🔍 How to Verify URLs Are Correct

### Method 1: Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Click share button
4. Check copied URL - should be production URL

### Method 2: Test Social Media Preview

1. Copy event URL from share button
2. Go to:
   - **Twitter**: https://cards-dev.twitter.com/validator
   - **Facebook**: https://developers.facebook.com/tools/debug/
   - **LinkedIn**: https://www.linkedin.com/post-inspector/
3. Paste URL and verify preview shows correct metadata

### Method 3: Test on Mobile

1. Open site on mobile browser
2. Click share button
3. Select WhatsApp
4. Verify message contains production URL

---

## 🐛 Common Issues & Solutions

### Issue 1: Share button copies localhost URL

**Cause:** `NEXT_PUBLIC_FRONTEND_URL` not set

**Solution:**

```bash
# Add to .env.local
NEXT_PUBLIC_FRONTEND_URL=https://yourdomain.com

# Or set in Vercel/Netlify dashboard
# Then redeploy
```

### Issue 2: Facebook shows wrong preview

**Cause:** Facebook cached old metadata

**Solution:**

1. Go to https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Click "Scrape Again"

### Issue 3: Email links point to localhost

**Cause:** Backend not aware of production URL

**Solution:**

1. Add `FRONTEND_URL` to backend .env:
   ```env
   FRONTEND_URL=https://yourdomain.com
   ```
2. Update email templates to use this variable

### Issue 4: Twitter hashtags not working

**Cause:** Hashtags array in config.ts

**Solution:**

- Hashtags are already configured: `['SAHITYAM2026', 'LiteratureFestival', 'IndianLiterature']`
- No action needed unless you want to change them

---

## 📧 Email Configuration

**Already Configured:**

- Email: parthgartan26feb@gmail.com
- Gmail App Password: `uonvxceoakditypc`

**No Changes Needed** - Emails will work after deployment.

**Test After Deployment:**

1. Register for an event
2. Check email inbox for confirmation
3. Admin verifies payment
4. Check email for verification notification

---

## 🎯 Quick Command Reference

### Update Frontend URL (Local Testing)

```bash
cd frontend
echo "NEXT_PUBLIC_FRONTEND_URL=https://yourdomain.com" >> .env.local
echo "NEXT_PUBLIC_API_URL=https://your-backend.com" >> .env.local
npm run dev
```

### Verify Configuration

```bash
# Check if env vars are loaded
cd frontend
npm run build
# Look for NEXT_PUBLIC_FRONTEND_URL in build output
```

### Test Share URLs

```bash
# Open browser console and run:
console.log(process.env.NEXT_PUBLIC_FRONTEND_URL)
# Should output: https://yourdomain.com (not localhost)
```

---

## 📝 Summary

**Before Deployment:**

- All share features use `localhost:3000` URLs
- Configuration file ready at `frontend/lib/config.ts`

**After Deployment:**

1. Set `NEXT_PUBLIC_FRONTEND_URL` environment variable
2. Set `NEXT_PUBLIC_API_URL` environment variable
3. Redeploy frontend
4. Test share button - should copy production URL
5. Verify social media previews

**That's it!** 🎉

No code changes needed - just set environment variables and redeploy.

---

## 🆘 Need Help?

**After deployment, provide me with:**

1. Frontend URL (e.g., `https://sahityam2026.vercel.app`)
2. Backend URL (e.g., `https://sahityam-api.onrender.com`)

**I'll help you verify:**

- Environment variables are set correctly
- Share URLs are using production domain
- Social media previews are working
- Email links point to production

---

## 🎉 Features Enabled

✅ **Social Sharing:**

- WhatsApp, Twitter, Facebook, LinkedIn, Telegram, Email
- Copy to clipboard
- Mobile-responsive with native share API
- Beautiful dropdown UI

✅ **Share Locations:**

- Event cards (compact button)
- Event modal (full dropdown)
- After registration success

✅ **SEO Ready:**

- OpenGraph tags for Facebook
- Twitter Cards for Twitter
- Meta descriptions for LinkedIn
- All configured in `app/layout.tsx`

**Ready for viral marketing!** 🚀
