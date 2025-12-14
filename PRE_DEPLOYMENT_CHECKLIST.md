# 🚀 PRE-DEPLOYMENT CHECKLIST FOR VM

## ✅ CRITICAL FIXES NEEDED

### 1. **Replace Hardcoded localhost URLs in Email Templates**

All email templates currently have `http://localhost:3000` hardcoded. These need to use environment variables.

**Files to update:**

- `backend/src/config/registrationEmail.ts` (lines 115, 123, 126, 215, 274, 275)
- `backend/src/config/email.ts` (line 129)

**Replace:**

```typescript
<a href="http://localhost:3000/profile" class="button">
  View Your Profile
</a>
```

**With:**

```typescript
<a href="${process.env.FRONTEND_URL}/profile" class="button">
  View Your Profile
</a>
```

**All URLs to replace:**

- `http://localhost:3000/profile` → `${process.env.FRONTEND_URL}/profile`
- `http://localhost:3000` → `${process.env.FRONTEND_URL}`
- `http://localhost:3000/contact` → `${process.env.FRONTEND_URL}/contact`
- `http://localhost:3000/schedule` → `${process.env.FRONTEND_URL}/schedule`
- `http://localhost:3000/register` → `${process.env.FRONTEND_URL}/register`

---

### 2. **Fix Gmail Email Authentication**

**Current Issue:** `EMAIL_PASSWORD` is incorrect - causing "Invalid login" errors

**Fix:**

1. Enable 2-Factor Authentication on mindbendersclub01@gmail.com
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Update `backend/.env`:
   ```env
   EMAIL_USER="mindbendersclub01@gmail.com"
   EMAIL_PASSWORD="your_16_character_app_password"
   ```

---

### 3. **Environment Variables for Production**

**Backend `.env` file - Update these for production VM:**

```env
# Database (keep your existing Neon URL)
DATABASE_URL="postgresql://neondb_owner:npg_...?sslmode=require"

# JWT Secret (IMPORTANT: Generate new one for production)
JWT_SECRET="<generate_new_with: openssl rand -base64 32>"

# Server Configuration
PORT=5000
NODE_ENV="production"

# Frontend URL (UPDATE THIS TO YOUR VM DOMAIN)
FRONTEND_URL="http://your-vm-ip-or-domain:3000"

# Cloudinary (keep existing)
CLOUDINARY_CLOUD_NAME="dywm7ehhu"
CLOUDINARY_API_KEY="497933291633571"
CLOUDINARY_API_SECRET="nmx2OjR0EVJr2JaubZxXN4HE3hA"

# Email Configuration
EMAIL_USER="mindbendersclub01@gmail.com"
EMAIL_PASSWORD="your_app_password_here"
```

**Frontend `.env.local` file - Update for production VM:**

```env
# API URL (UPDATE THIS TO YOUR VM DOMAIN)
NEXT_PUBLIC_API_URL="http://your-vm-ip-or-domain:5000/api"
```

---

### 4. **Security - Add .gitignore Entries**

Make sure these are in `.gitignore`:

**Backend:**

```
.env
.env.local
.env.production
node_modules/
dist/
```

**Frontend:**

```
.env.local
.env.production
.next/
node_modules/
out/
```

---

## 📋 DEPLOYMENT STEPS FOR VM

### Step 1: Prepare VM

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install nginx (optional, for reverse proxy)
sudo apt install -y nginx
```

### Step 2: Clone and Setup Backend

```bash
# Clone repository
git clone <your-repo-url>
cd SAHITYAM-2026/backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build TypeScript
npm run build

# Test run (should work without errors)
npm start
```

### Step 3: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Build for production
npm run build

# Test run
npm start
```

### Step 4: Configure PM2 (Process Manager)

Create `ecosystem.config.js` in project root:

```javascript
module.exports = {
  apps: [
    {
      name: "sahityam-backend",
      cwd: "./backend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "sahityam-frontend",
      cwd: "./frontend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
```

Start with PM2:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 5: Configure Firewall

```bash
# Allow required ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 3000  # Frontend
sudo ufw allow 5000  # Backend API
sudo ufw enable
```

### Step 6: Setup Nginx Reverse Proxy (Optional but Recommended)

Create `/etc/nginx/sites-available/sahityam`:

```nginx
# Frontend
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/sahityam /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔍 PRE-DEPLOYMENT TESTING

### Test Backend Locally

```bash
cd backend
npm run build
npm start

# In another terminal:
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}
```

### Test Frontend Locally

```bash
cd frontend
npm run build
npm start

# Visit: http://localhost:3000
```

### Test Email Functionality

1. Register a new user
2. Check if confirmation email arrives
3. Register for an event
4. Admin verifies payment
5. Check if verification email arrives

---

## 🛡️ SECURITY CHECKLIST

- [ ] JWT_SECRET is strong (32+ characters)
- [ ] .env files are NOT committed to git
- [ ] EMAIL_PASSWORD is an App Password (not regular password)
- [ ] CORS is configured to only allow your frontend domain
- [ ] Database connection uses SSL (`sslmode=require`)
- [ ] All sensitive data is in environment variables
- [ ] Rate limiting is enabled (already configured ✅)
- [ ] File uploads are restricted (already configured ✅)

---

## 📊 MONITORING COMMANDS

```bash
# View logs
pm2 logs sahityam-backend
pm2 logs sahityam-frontend

# Check status
pm2 status

# Restart services
pm2 restart sahityam-backend
pm2 restart sahityam-frontend

# Monitor resource usage
pm2 monit
```

---

## 🔄 DEPLOYMENT UPDATES

When you need to update code:

```bash
# Pull latest code
git pull origin main

# Backend updates
cd backend
npm install
npx prisma generate
npm run build
pm2 restart sahityam-backend

# Frontend updates
cd ../frontend
npm install
npm run build
pm2 restart sahityam-frontend
```

---

## ⚠️ KNOWN ISSUES TO FIX BEFORE DEPLOYMENT

1. **Email URLs**: All hardcoded `localhost:3000` in email templates
2. **Gmail Authentication**: App password not working - needs regeneration
3. **Console.logs**: Many console.logs in production code (can be left for debugging initially)

---

## 📝 ENVIRONMENT VARIABLES SUMMARY

### Required for Backend:

- `DATABASE_URL` ✅
- `JWT_SECRET` ✅
- `FRONTEND_URL` ⚠️ (needs production URL)
- `CLOUDINARY_CLOUD_NAME` ✅
- `CLOUDINARY_API_KEY` ✅
- `CLOUDINARY_API_SECRET` ✅
- `EMAIL_USER` ✅
- `EMAIL_PASSWORD` ❌ (needs valid app password)
- `PORT` ✅
- `NODE_ENV` ✅

### Required for Frontend:

- `NEXT_PUBLIC_API_URL` ⚠️ (needs production URL)

---

## 🎯 IMMEDIATE ACTION ITEMS

1. **Fix email templates** - Replace all hardcoded localhost URLs
2. **Generate valid Gmail app password** - Current one is not working
3. **Update production environment variables** - Set correct VM URLs
4. **Test email functionality** - Ensure emails are sent and received
5. **Deploy to VM** - Follow steps above

---

## 📞 POST-DEPLOYMENT VERIFICATION

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Registration confirmation email is received
- [ ] Events page displays all events
- [ ] Event registration works
- [ ] Payment screenshot upload works
- [ ] Admin panel accessible
- [ ] Admin can verify/reject payments
- [ ] Payment verification/rejection emails are sent
- [ ] Contact form works
- [ ] Contact form emails are received at mindbenders@cgcuniversity.org
- [ ] All images load from Cloudinary
- [ ] Social media link (Instagram) works
- [ ] Footer displays correct email

---

Good luck with your deployment! 🚀
