# 🎯 What You Need to Do - Quick Checklist

## 1️⃣ Get Cloudinary Credentials (5 minutes)

### Go to Cloudinary:

🔗 **[https://cloudinary.com/](https://cloudinary.com/)**

### Sign Up / Login:

- Click "Sign Up Free"
- Use email or Google/GitHub
- Verify email

### Copy These 3 Values from Dashboard:

```
✅ Cloud Name: _________________
✅ API Key: _________________
✅ API Secret: _________________ (click eye icon to reveal)
```

## 2️⃣ Add to Your .env File

Open: `backend/.env`

Add these lines:

```env
CLOUDINARY_CLOUD_NAME="paste-your-cloud-name"
CLOUDINARY_API_KEY="paste-your-api-key"
CLOUDINARY_API_SECRET="paste-your-api-secret"
```

**Example:**

```env
CLOUDINARY_CLOUD_NAME="dxyz1234"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcXYZ123_secretKey"
```

## 3️⃣ Install New Packages

In your backend folder, run:

```bash
cd backend
npm install
```

This installs:

- ✅ `cloudinary` - For uploading images
- ✅ `multer` - For handling file uploads

## 4️⃣ Update Database

Run this to add new fields to database:

```bash
npx prisma migrate dev --name add_payment_fields
npx prisma generate
```

## 5️⃣ Start Your Server

```bash
npm run dev
```

✅ **Done!** Backend is ready to handle image uploads!

---

## 📋 What Changed in Backend

### New Files Created:

1. `src/config/cloudinary.ts` - Cloudinary configuration
2. `src/config/multer.ts` - File upload handler
3. `src/utils/cloudinaryUpload.ts` - Upload/delete functions

### Updated Files:

1. `package.json` - Added cloudinary & multer
2. `prisma/schema.prisma` - Added payment fields
3. `src/controllers/registrationController.ts` - Added payment logic
4. `src/routes/registrationRoutes.ts` - Added new endpoint

### New API Endpoint:

```
POST /api/registrations/with-payment
```

Accepts:

- `eventId` - Event ID
- `transactionId` - UPI transaction ID
- `name` - User's name
- `email` - User's email
- `mobileNumber` - 10-digit mobile
- `paymentScreenshot` - Image file

### Database Fields Added:

- `transactionId` - UPI transaction ID
- `paymentScreenshotUrl` - Cloudinary URL
- `paymentScreenshotId` - For deletion
- `registrantName` - Name from form
- `registrantEmail` - Email from form
- `registrantMobile` - Mobile from form
- `paymentVerified` - Admin verification status

---

## 🎁 Free Tier Benefits

✅ **25 GB Storage** - Thousands of images  
✅ **25 GB Bandwidth/month** - Fast delivery  
✅ **Unlimited Transformations** - Auto optimization  
✅ **Free CDN** - Global fast access  
✅ **Auto Compression** - Saves bandwidth

---

## 🚀 Next Step for Frontend

Update your frontend API call to send multipart/form-data:

```typescript
const formData = new FormData();
formData.append("eventId", selectedEvent.id);
formData.append("name", paymentData.name);
formData.append("email", paymentData.email);
formData.append("mobileNumber", paymentData.mobileNumber);
formData.append("transactionId", paymentData.transactionId);
formData.append("paymentScreenshot", paymentData.paymentScreenshot);

await apiClient.post("/registrations/with-payment", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
```

---

## 📞 Need Help?

Check: `backend/CLOUDINARY_SETUP.md` for detailed guide

---

**That's it! Just get the 3 credentials from Cloudinary and paste them in .env** 🎉
