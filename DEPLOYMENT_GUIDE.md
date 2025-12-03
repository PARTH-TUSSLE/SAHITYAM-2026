# 🚀 QUICK DEPLOYMENT GUIDE

## Prerequisites Checklist

- [ ] Cloudinary account created (https://cloudinary.com)
- [ ] Backend hosting ready (Railway, Render, Heroku, etc.)
- [ ] Frontend hosting ready (Vercel, Netlify, etc.)
- [ ] Domain names configured (optional but recommended)

## Step 1: Get Cloudinary Credentials (5 minutes)

1. Go to https://cloudinary.com and sign up/login
2. On Dashboard, copy:
   - Cloud Name (e.g., "dxxx1234")
   - API Key (e.g., "123456789012345")
   - Click "API Secret" to reveal it
3. Save these for next step

## Step 2: Configure Backend Environment (2 minutes)

Update `backend/.env`:

```env
# Generate strong secret: openssl rand -base64 32
JWT_SECRET="<PASTE_GENERATED_SECRET_HERE>"

# Paste Cloudinary credentials from Step 1
CLOUDINARY_CLOUD_NAME="<YOUR_CLOUD_NAME>"
CLOUDINARY_API_KEY="<YOUR_API_KEY>"
CLOUDINARY_API_SECRET="<YOUR_API_SECRET>"

# Update after deploying frontend
FRONTEND_URL="https://your-frontend-domain.com"
NODE_ENV="production"
```

## Step 3: Test Backend Locally (3 minutes)

```bash
cd backend
npm install
npm run dev
```

✅ Should start successfully (no errors about missing env vars)
✅ Visit http://localhost:5000/api/health (should return "ok")

## Step 4: Deploy Backend (10 minutes)

Choose your platform:

### Option A: Railway

```bash
cd backend
railway login
railway init
railway add  # Add all environment variables from .env
railway up
```

### Option B: Render

1. Connect GitHub repo
2. Choose "backend" folder
3. Add environment variables from .env
4. Deploy

### Option C: Heroku

```bash
cd backend
heroku create sahityam-backend
heroku config:set JWT_SECRET="your-secret"
heroku config:set CLOUDINARY_CLOUD_NAME="your-name"
# ... set all other env vars
git push heroku main
```

**Copy your backend URL** (e.g., https://sahityam-backend.railway.app)

## Step 5: Configure Frontend Environment (1 minute)

Update `frontend/.env.production`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

## Step 6: Test Frontend Locally (2 minutes)

```bash
cd frontend
npm install
npm run dev
```

✅ Should start successfully
✅ Try logging in/registering

## Step 7: Deploy Frontend (5 minutes)

### Option A: Vercel (Recommended)

```bash
cd frontend
vercel login
vercel  # Follow prompts
# Add environment variable: NEXT_PUBLIC_API_URL
```

### Option B: Netlify

1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variable: NEXT_PUBLIC_API_URL
5. Deploy

## Step 8: Update Backend CORS (1 minute)

After frontend is deployed, update backend environment:

```env
FRONTEND_URL="https://your-actual-frontend-domain.com"
```

Redeploy backend.

## Step 9: Run Database Migrations (1 minute)

On your hosting platform, run:

```bash
npx prisma migrate deploy
```

## Step 10: Final Testing (10 minutes)

Test on production:

- [ ] Visit your frontend URL
- [ ] Register a new account
- [ ] Login
- [ ] View events
- [ ] Register for an event with payment screenshot
- [ ] Login as admin
- [ ] Verify payment in admin panel
- [ ] Check that everything works smoothly

## Troubleshooting

### Backend won't start

- Check all environment variables are set
- Run `npm run build` first
- Check logs for specific error messages

### Frontend can't connect to backend

- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings in backend
- Ensure backend URL is accessible

### Images won't upload

- Verify Cloudinary credentials are correct
- Check file size < 5MB
- Check file format (JPEG, PNG, GIF, WebP only)

### Rate limiting issues during testing

- Use different IPs or wait 15 minutes
- Temporarily increase limits in development

## Environment Variables Reference

### Backend (.env)

```env
DATABASE_URL=<from Neon/your DB provider>
JWT_SECRET=<strong random secret>
CLOUDINARY_CLOUD_NAME=<from cloudinary>
CLOUDINARY_API_KEY=<from cloudinary>
CLOUDINARY_API_SECRET=<from cloudinary>
FRONTEND_URL=<your frontend domain>
NODE_ENV=production
PORT=5000
```

### Frontend (.env.production)

```env
NEXT_PUBLIC_API_URL=<your backend URL>/api
```

## Quick Commands Reference

### Generate JWT Secret

```bash
openssl rand -base64 32
```

### Check Backend Health

```bash
curl https://your-backend-url.com/api/health
```

### View Backend Logs

```bash
# Railway
railway logs

# Heroku
heroku logs --tail

# Render
# Check dashboard
```

### Rebuild Frontend

```bash
cd frontend
npm run build
```

## Post-Deployment Monitoring (First 24 Hours)

- [ ] Monitor error logs
- [ ] Check database connections
- [ ] Verify image uploads work
- [ ] Test user registrations
- [ ] Monitor API response times
- [ ] Check rate limiting is working

## Success Criteria

✅ Users can register and login
✅ Events are displayed
✅ Payment screenshots upload successfully
✅ Admin can verify payments
✅ No error messages in logs
✅ Site loads quickly (< 3 seconds)
✅ Mobile responsive

## Support Resources

- Backend logs: Check your hosting platform dashboard
- Frontend logs: Check browser console
- Database: Check Neon/Prisma Studio
- Images: Check Cloudinary dashboard

---

**Estimated Total Time:** 30-45 minutes
**Difficulty:** ⭐⭐⭐ (Intermediate)

Need help? Check the logs first, then review FIXES_COMPLETED.md for troubleshooting tips.
