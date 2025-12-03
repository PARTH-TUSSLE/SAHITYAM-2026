# Email Configuration Guide for Contact Form

## Overview

The contact form sends emails to **parthgartan26feb@gmail.com** when users submit inquiries. It uses Gmail SMTP with Nodemailer.

## Setup Steps

### 1. Generate Gmail App Password

Since Gmail now requires 2-factor authentication for SMTP, you need to create an **App Password**:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** section
3. Enable **2-Step Verification** if not already enabled
4. Once 2FA is enabled, go to **App passwords**: https://myaccount.google.com/apppasswords
5. Select:
   - App: **Mail**
   - Device: **Other (Custom name)** - enter "SAHITYAM Website"
6. Click **Generate**
7. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### 2. Update Environment Variables

Open `backend/.env` and update the email credentials:

```env
EMAIL_USER="parthgartan26feb@gmail.com"
EMAIL_PASSWORD="your-16-character-app-password"
```

**Important:** Use the App Password (16 characters), NOT your regular Gmail password!

### 3. Test the Contact Form

1. Make sure both backend and frontend are running:

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. Visit: http://localhost:3000/contact

3. Fill out and submit the contact form

4. You should receive:
   - Admin notification email at parthgartan26feb@gmail.com
   - User confirmation email at the submitted email address

## Features Implemented

### Backend (`backend/src/`)

1. **Email Configuration** (`config/email.ts`):

   - Gmail SMTP transporter setup
   - HTML email templates
   - Admin notification email
   - User confirmation email

2. **Contact Controller** (`controllers/contactController.ts`):

   - Form validation (name, email, subject, message required)
   - Email format validation
   - Rate limiting (5 submissions per hour per IP)
   - Error handling

3. **Contact Routes** (`routes/contactRoutes.ts`):

   - POST `/api/contact` endpoint

4. **Server Integration** (`server.ts`):
   - Registered contact routes
   - CORS configured

### Frontend (`frontend/app/contact/`)

1. **Contact Form** (`page.tsx`):
   - API integration with backend
   - Loading state during submission
   - Success/error message display
   - Form validation
   - Auto-clear on success

## API Endpoint

### POST /api/contact

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 123 456 7890",
  "subject": "Event Inquiry",
  "message": "I would like to know more about SAHITYAM 2026..."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Your message has been sent successfully! We will get back to you soon."
}
```

**Error Response (400/429/500):**

```json
{
  "success": false,
  "error": "Error message here"
}
```

## Rate Limiting

- **Limit:** 5 submissions per hour per IP address
- **Window:** 1 hour (3600 seconds)
- **Error Code:** 429 (Too Many Requests)

This prevents spam and abuse of the contact form.

## Email Templates

### Admin Notification Email

- Styled HTML template
- Includes all form fields (name, email, phone, subject, message)
- Reply-to address set to user's email
- SAHITYAM 2026 branding with gradient header

### User Confirmation Email

- Thank you message
- Expected response time (24-48 hours)
- Direct contact email
- Event details (5th - 6th Feb 2026)
- Link back to website
- Professional branding

## Troubleshooting

### Email Not Sending

1. **Check App Password:**

   - Make sure you're using the 16-character App Password, not your regular password
   - Verify no extra spaces in `.env` file

2. **Check 2FA:**

   - 2-Step Verification must be enabled on parthgartan26feb@gmail.com
   - Without 2FA, App Passwords cannot be generated

3. **Check Backend Logs:**

   ```bash
   cd backend
   npm run dev
   ```

   Look for error messages when form is submitted

4. **Test Email Configuration:**
   - Verify EMAIL_USER and EMAIL_PASSWORD are set in `.env`
   - Restart backend server after changing `.env`

### Rate Limiting Issues

If testing multiple times quickly:

1. Wait 1 hour between submissions from same IP
2. Or restart backend server (clears in-memory rate limit)
3. Or use different network/VPN for testing

### CORS Issues

If you see CORS errors in browser console:

1. Verify `FRONTEND_URL` in backend `.env` is `http://localhost:3000`
2. Check backend server is running on port 5000
3. Restart both servers

## Security Notes

1. **Never commit `.env` file** - it contains sensitive credentials
2. **Use App Passwords** - more secure than regular passwords
3. **Rate limiting** prevents spam attacks
4. **Email validation** prevents invalid submissions
5. **Input sanitization** prevents injection attacks

## Alternative Email Services

If you want to use a different email service:

### SendGrid (Recommended for Production)

```typescript
// In config/email.ts
const transporter = nodemailer.createTransporter({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

### Outlook/Office365

```typescript
const transporter = nodemailer.createTransporter({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### AWS SES

```typescript
const transporter = nodemailer.createTransporter({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASSWORD,
  },
});
```

## Production Deployment

Before deploying:

1. Update `EMAIL_USER` and `EMAIL_PASSWORD` in production `.env`
2. Consider using a dedicated email service (SendGrid, AWS SES)
3. Increase rate limits if needed for high traffic
4. Enable email logging for monitoring
5. Set up email bounce handling
6. Configure SPF/DKIM records for better deliverability

## Support

If you encounter issues:

- Check backend console for error logs
- Verify all environment variables are set
- Ensure Gmail App Password is correct
- Contact: parthgartan26feb@gmail.com
