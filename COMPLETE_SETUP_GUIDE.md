# 🚀 SAHITYAM 2026 - Complete Setup Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Initial Setup](#initial-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Database Setup](#database-setup)
7. [Third-Party Services Configuration](#third-party-services-configuration)
8. [Running the Application](#running-the-application)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- **A code editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### Accounts You'll Need to Create:

- **Cloudinary** (for image uploads) - [Sign Up](https://cloudinary.com/)
- **Gmail Account** (for sending emails via SMTP)

---

## Project Overview

SAHITYAM 2026 is a full-stack event management system consisting of:

### Tech Stack:

**Backend:**

- Node.js + Express.js
- TypeScript
- Prisma ORM
- PostgreSQL Database
- JWT Authentication
- Cloudinary (Image Storage)
- Nodemailer (Email Service)

**Frontend:**

- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- Three.js (3D Graphics)
- Axios (API Calls)

### Key Features:

- User authentication (Register/Login)
- Event browsing and registration
- Payment screenshot upload with verification
- Admin panel for managing registrations
- Contact form with email notifications
- Responsive design with modern UI

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd SAHITYAM-2026
```

### 2. Project Structure

```
SAHITYAM-2026/
├── backend/              # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation, etc.
│   │   ├── config/       # Configuration files
│   │   └── server.ts     # Entry point
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── seed.ts       # Database seeder
│   └── package.json
│
└── frontend/             # Frontend UI (Next.js)
    ├── app/              # Next.js app directory
    ├── components/       # React components
    ├── lib/              # Utilities
    └── package.json
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Express.js, Prisma, JWT, bcryptjs, CORS
- Cloudinary, Multer (file uploads)
- Nodemailer (email)
- TypeScript and dev dependencies

### Step 3: Create Environment File

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Or create it manually with the following content:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/sahityam_db?sslmode=require&connection_limit=20&pool_timeout=20"

# JWT Secret - Generate using: openssl rand -base64 32
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=5000
NODE_ENV="development"

# Frontend URL for CORS
FRONTEND_URL="http://localhost:3000"

# Cloudinary Configuration (Get from https://cloudinary.com/console)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email Configuration (For Gmail, use App Password)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
```

### Step 4: Generate JWT Secret

Generate a strong JWT secret:

**On Linux/Mac:**

```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Copy the generated string and paste it as the `JWT_SECRET` value in your `.env` file.

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd ../frontend
# (or from project root: cd frontend)
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Next.js, React, React DOM
- Tailwind CSS, Framer Motion
- Three.js, GSAP (animations)
- Axios, React Hot Toast
- TypeScript

### Step 3: Create Environment File

Create a `.env.local` file in the `frontend` directory:

```bash
cp .env.example .env.local
```

Or create it manually:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Database Setup

### Step 1: Create PostgreSQL Database

Open your PostgreSQL client (pgAdmin, psql, or any GUI tool):

**Using psql (command line):**

```bash
psql -U postgres
```

Then run:

```sql
CREATE DATABASE sahityam_db;
```

Exit psql:

```sql
\q
```

### Step 2: Update Database URL

In `backend/.env`, update the `DATABASE_URL` with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/sahityam_db"
```

**Example:**

```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/sahityam_db"
```

### Step 3: Run Prisma Migrations

From the `backend` directory:

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with initial events
npm run seed
```

The migration will create the following tables:

- `User` - User accounts
- `Event` - Events (competitions/workshops)
- `Registration` - User registrations with payment info

### Step 4: Create Admin Account (Optional)

You can create an admin account by registering normally and then manually updating the database:

```bash
npx prisma studio
```

This opens Prisma Studio in your browser. Find your user and change the `role` field from `USER` to `ADMIN`.

---

## Third-Party Services Configuration

### 1. Cloudinary Setup (Image Storage)

#### Step A: Create Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click "Sign Up Free"
3. Sign up with email or Google/GitHub
4. Verify your email address

#### Step B: Get Credentials

1. After login, go to your Dashboard
2. You'll see "Product Environment Credentials" section
3. Copy these three values:
   - **Cloud Name** (e.g., "dxyz1234")
   - **API Key** (e.g., "123456789012345")
   - **API Secret** (click eye icon to reveal)

#### Step C: Add to Environment File

Update `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME="your-actual-cloud-name"
CLOUDINARY_API_KEY="your-actual-api-key"
CLOUDINARY_API_SECRET="your-actual-api-secret"
```

**Important:** Keep your API Secret confidential!

#### Cloudinary Free Tier Limits:

- ✅ 25 GB Storage
- ✅ 25 GB Bandwidth per month
- ✅ Unlimited transformations
- ✅ Free CDN included

### 2. Email Setup (Gmail SMTP)

#### Step A: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled

#### Step B: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select:
   - **App:** Mail
   - **Device:** Other (Custom name) - enter "SAHITYAM Website"
3. Click "Generate"
4. Copy the 16-character password (format: `abcd efgh ijkl mnop`)

#### Step C: Add to Environment File

Update `backend/.env`:

```env
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-char-app-password"
```

**Note:** Use the App Password (16 characters), NOT your regular Gmail password!

#### Email Features:

- ✅ Contact form submissions send email to admin
- ✅ Users receive confirmation emails
- ✅ Rate limited (5 submissions per hour per IP)

---

## Running the Application

### Option 1: Run Backend and Frontend Separately

#### Terminal 1 - Backend:

```bash
cd backend
npm run dev
```

The backend server will start at: `http://localhost:5000`

#### Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

The frontend will start at: `http://localhost:3000`

### Option 2: Using Separate Terminal Sessions

**In VS Code:**

- Open two terminal tabs (Ctrl + Shift + `)
- Run backend in first terminal
- Run frontend in second terminal

### Verify Everything is Running:

1. **Backend Health Check:**

   - Visit: http://localhost:5000/api/health
   - Should return: `{"status": "ok"}`

2. **Frontend:**
   - Visit: http://localhost:3000
   - You should see the SAHITYAM homepage

---

## Testing

### Manual Testing Checklist:

#### 1. User Authentication

- [ ] Register a new user at `/register`
- [ ] Login with credentials at `/login`
- [ ] View profile at `/profile`
- [ ] Logout functionality

#### 2. Events

- [ ] Browse events on homepage
- [ ] View event details (click on event card)
- [ ] Check event modal shows rules and details

#### 3. Event Registration

- [ ] Register for a free event (if available)
- [ ] Register for a paid event
- [ ] Upload payment screenshot
- [ ] Enter UPI transaction ID
- [ ] Verify registration appears in profile

#### 4. Admin Panel

- [ ] Login as admin
- [ ] Access admin panel at `/admin`
- [ ] View all registrations
- [ ] Filter by payment status
- [ ] Verify/reject payments
- [ ] View payment screenshots

#### 5. Contact Form

- [ ] Visit `/contact` page
- [ ] Submit contact form
- [ ] Check email received (both admin and user)

#### 6. Gallery & Schedule

- [ ] View gallery at `/gallery`
- [ ] View schedule at `/schedule`

### API Testing:

You can use tools like **Postman** or **Thunder Client** (VS Code extension) to test API endpoints.

See [backend/API_TESTING.md](backend/API_TESTING.md) for detailed API documentation.

#### Example API Tests:

**Register User:**

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "mobileNumber": "9876543210"
}
```

**Login:**

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Get Events:**

```bash
GET http://localhost:5000/api/events
```

---

## Deployment

### Production Deployment Guide

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete deployment instructions.

### Quick Deployment Overview:

#### 1. Backend Deployment Options:

- **Railway** (Recommended) - Free tier available
- **Render** - Free tier available
- **Heroku** - Paid
- **DigitalOcean App Platform**

#### 2. Frontend Deployment Options:

- **Vercel** (Recommended) - Free for hobby projects
- **Netlify** - Free tier available
- **Cloudflare Pages**

#### 3. Database Options:

- **Neon** (Recommended) - Serverless PostgreSQL, free tier
- **Railway** - PostgreSQL addon
- **Supabase** - PostgreSQL with additional features
- **ElephantSQL** - Free tier available

#### 4. Pre-Deployment Checklist:

- [ ] Update `JWT_SECRET` with a strong production secret
- [ ] Update `DATABASE_URL` with production database
- [ ] Update `FRONTEND_URL` with production frontend URL
- [ ] Update `NODE_ENV` to "production"
- [ ] Verify all Cloudinary credentials
- [ ] Test email functionality
- [ ] Run `npm run build` locally to check for errors
- [ ] Set up environment variables on hosting platform
- [ ] Run database migrations on production: `npx prisma migrate deploy`

---

## Troubleshooting

### Common Issues and Solutions:

#### 1. Backend won't start

**Error:** "DATABASE_URL is not defined"

```
✅ Solution: Ensure .env file exists in backend directory with correct DATABASE_URL
```

**Error:** "Port 5000 already in use"

```
✅ Solution: Change PORT in .env or kill the process using port 5000
```

On Windows:

```powershell
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

On Linux/Mac:

```bash
lsof -ti:5000 | xargs kill -9
```

#### 2. Database Connection Issues

**Error:** "Can't reach database server"

```
✅ Solution:
1. Verify PostgreSQL is running
2. Check database credentials in .env
3. Ensure database 'sahityam_db' exists
4. Check firewall settings
```

**Error:** "SSL connection required"

```
✅ Solution: Add ?sslmode=require to DATABASE_URL if using cloud database
```

#### 3. Prisma Migration Issues

**Error:** "Migration failed to apply cleanly"

```
✅ Solution: Reset database (ONLY IN DEVELOPMENT)
npx prisma migrate reset
```

**Error:** "Prisma Client not generated"

```
✅ Solution:
npx prisma generate
```

#### 4. Frontend Issues

**Error:** "Cannot connect to backend"

```
✅ Solution:
1. Verify backend is running on port 5000
2. Check NEXT_PUBLIC_API_URL in frontend/.env.local
3. Check browser console for CORS errors
```

**Error:** "Module not found"

```
✅ Solution:
rm -rf node_modules package-lock.json
npm install
```

#### 5. Cloudinary Issues

**Error:** "Invalid cloud_name"

```
✅ Solution: Double-check CLOUDINARY_CLOUD_NAME in .env
```

**Error:** "Upload failed"

```
✅ Solution:
1. Verify all three Cloudinary credentials are correct
2. Check file size (max 5MB)
3. Check file format (JPEG, PNG, GIF, WebP only)
```

#### 6. Email Issues

**Error:** "Authentication failed"

```
✅ Solution:
1. Ensure you're using Gmail App Password (16 chars), not regular password
2. Verify 2FA is enabled on Google Account
3. Regenerate App Password if needed
```

#### 7. TypeScript Errors

**Error:** Type errors during build

```
✅ Solution:
1. Check tsconfig.json is present
2. Run: npm install --save-dev @types/node @types/express
3. Restart VS Code / TypeScript server
```

#### 8. Next.js Build Issues

**Error:** "Module parse failed"

```
✅ Solution:
1. Delete .next directory: rm -rf .next
2. Rebuild: npm run build
```

### Getting Help:

If you encounter issues not covered here:

1. Check the error message carefully
2. Search GitHub issues
3. Check individual setup guides:
   - [backend/SETUP.md](backend/SETUP.md)
   - [backend/CLOUDINARY_SETUP.md](backend/CLOUDINARY_SETUP.md)
   - [backend/EMAIL_SETUP.md](backend/EMAIL_SETUP.md)
4. Check logs in terminal for detailed error messages

---

## Additional Resources

### Documentation Files:

- [backend/README.md](backend/README.md) - Backend API documentation
- [backend/API_TESTING.md](backend/API_TESTING.md) - API endpoint testing guide
- [backend/QUICK_START.md](backend/QUICK_START.md) - Quick setup checklist
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Production deployment guide
- [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - Complete testing checklist

### Useful Commands Reference:

#### Backend Commands:

```bash
npm run dev              # Start development server
npm run build            # Build TypeScript to JavaScript
npm start                # Start production server
npm run seed             # Seed database with events
npx prisma studio        # Open Prisma Studio (DB GUI)
npx prisma migrate dev   # Create and run new migration
npx prisma generate      # Generate Prisma Client
```

#### Frontend Commands:

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
```

### Project Scripts:

#### Backend (package.json):

- `dev` - Start dev server with hot reload (tsx watch)
- `build` - Compile TypeScript to JavaScript
- `start` - Run compiled JavaScript
- `prisma:generate` - Generate Prisma Client
- `prisma:migrate` - Run database migrations
- `prisma:studio` - Open Prisma Studio GUI
- `seed` - Seed database with initial data

#### Frontend (package.json):

- `dev` - Start Next.js dev server
- `build` - Build optimized production bundle
- `start` - Start Next.js production server
- `lint` - Run ESLint for code quality

---

## Quick Start Summary

For a super quick setup (assuming PostgreSQL is already running):

```bash
# 1. Clone and enter project
git clone <repo-url>
cd SAHITYAM-2026

# 2. Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
# Backend running on http://localhost:5000

# 3. Frontend setup (new terminal)
cd ../frontend
npm install
cp .env.example .env.local
# Edit .env.local
npm run dev
# Frontend running on http://localhost:3000
```

Visit http://localhost:3000 and start using the application!

---

## Environment Variables Summary

### Backend (.env) - Required:

```env
DATABASE_URL          # PostgreSQL connection string
JWT_SECRET           # Strong random secret (32+ characters)
PORT                 # Server port (default: 5000)
NODE_ENV             # development/production
FRONTEND_URL         # Frontend URL for CORS
CLOUDINARY_CLOUD_NAME    # From Cloudinary dashboard
CLOUDINARY_API_KEY       # From Cloudinary dashboard
CLOUDINARY_API_SECRET    # From Cloudinary dashboard
EMAIL_USER               # Gmail address
EMAIL_PASSWORD           # Gmail App Password
```

### Frontend (.env.local) - Required:

```env
NEXT_PUBLIC_API_URL  # Backend API URL (http://localhost:5000/api)
```

---

## Security Best Practices

1. **Never commit `.env` files** to version control
2. Use **strong JWT secrets** (32+ random characters)
3. Use **Gmail App Passwords**, not regular passwords
4. Keep **Cloudinary API Secret** confidential
5. Use **HTTPS in production**
6. Enable **rate limiting** (already configured)
7. **Validate all user inputs** (already implemented)
8. **Sanitize data** before database operations (Prisma handles this)

---

## Contributing

If you'd like to contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

[Add your license information here]

---

## Support

For issues, questions, or contributions:

- Create an issue on GitHub
- Contact: parthgartan26feb@gmail.com

---

**Last Updated:** December 13, 2025

---

## ✅ Final Checklist

After following this guide, verify:

- [ ] Backend runs without errors (`npm run dev` in backend/)
- [ ] Frontend runs without errors (`npm run dev` in frontend/)
- [ ] Can access http://localhost:3000
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Can view events
- [ ] Can register for events
- [ ] Payment screenshot upload works
- [ ] Admin panel accessible
- [ ] Contact form sends emails
- [ ] Database contains seeded events
- [ ] All environment variables are set correctly

**🎉 Congratulations! Your SAHITYAM 2026 application is now running!**
