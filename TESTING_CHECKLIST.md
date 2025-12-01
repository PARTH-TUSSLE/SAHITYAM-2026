# 🧪 Payment Flow Testing Checklist

## ✅ Pre-Test Verification Complete

### Backend Status:

- ✅ Cloudinary credentials added to `.env`
  - Cloud Name: `dywm7ehhu`
  - API Key: Configured ✓
  - API Secret: Configured ✓
- ✅ Dependencies installed (cloudinary v2.8.0, multer v1.4.5-lts.2)
- ✅ Database schema up to date (4 migrations applied)
- ✅ All backend files have no errors
- ✅ Registration route configured: `POST /api/registrations/with-payment`
- ✅ File upload middleware active (Multer with 5MB limit)
- ✅ Cloudinary upload utility configured with optimization

### Frontend Status:

- ✅ PaymentModal component created and functional
- ✅ Form validation implemented
- ✅ File upload with preview working
- ✅ Backend integration code activated (FormData multipart/form-data)
- ✅ Fee badge display (₹200) on all event cards

### Database Schema:

- ✅ Registration table has payment fields:
  - `transactionId` (String?)
  - `paymentScreenshotUrl` (String?)
  - `paymentScreenshotId` (String?)
  - `registrantName` (String?)
  - `registrantEmail` (String?)
  - `registrantMobile` (String?)
  - `paymentVerified` (Boolean, default: false)

---

## 🚀 Testing Steps

### Step 1: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**

```
🚀 Server is running on port 5000
📍 Health check: http://localhost:5000/api/health
```

**✓ Verify:** Server starts without errors

---

### Step 2: Start Frontend Server

```bash
cd frontend
npm run dev
```

**Expected Output:**

```
Ready on http://localhost:3000
```

**✓ Verify:** Frontend starts without errors

---

### Step 3: Test Authentication

1. Go to `http://localhost:3000/login`
2. Login with a test user
3. **✓ Verify:** You can see the profile icon/username

---

### Step 4: Navigate to Events Page

1. Click on "Events" in navigation
2. **✓ Verify:** All events load and display
3. **✓ Verify:** Each event card shows "₹200" badge in top-left corner

---

### Step 5: Test Payment Modal Opening

1. Click "Register" button on any event
2. **✓ Verify:** Payment modal opens
3. **✓ Verify:** Modal shows:
   - Event title
   - Fee amount (₹200)
   - QR code placeholder section
   - Form fields (Name, Email, Mobile, Transaction ID)
   - File upload section

---

### Step 6: Test Form Validation

#### Test 6.1: Empty Form Submission

- Leave all fields empty
- Click "Complete Registration"
- **✓ Verify:** Error messages appear for required fields

#### Test 6.2: Invalid Email

- Enter invalid email (e.g., "test@")
- **✓ Verify:** Email validation error shows

#### Test 6.3: Invalid Mobile Number

- Enter less than 10 digits
- **✓ Verify:** Mobile validation error shows

#### Test 6.4: Invalid Mobile (non-numeric)

- Enter letters in mobile field
- **✓ Verify:** Validation error shows

---

### Step 7: Test File Upload

#### Test 7.1: Valid Image Upload

1. Fill all form fields correctly
2. Upload a valid image (JPG/PNG < 5MB)
3. **✓ Verify:** Preview appears below upload button
4. **✓ Verify:** File name displays

#### Test 7.2: Invalid File Type

1. Try to upload a non-image file (PDF, TXT, etc.)
2. **✓ Verify:** Error message: "Only image files are allowed"

#### Test 7.3: File Too Large

1. Try to upload image > 5MB
2. **✓ Verify:** Error message: "File size should be less than 5MB"

---

### Step 8: Test Complete Registration Flow

#### Test 8.1: Successful Registration

1. Fill all fields with valid data:
   - Name: "Test User"
   - Email: "test@example.com"
   - Mobile: "9876543210"
   - Transaction ID: "TEST123456789"
2. Upload a valid payment screenshot
3. Click "Complete Registration"

**✓ Verify:**

- Loading state appears
- Modal closes after success
- Alert shows: "Registration successful! Your payment will be verified shortly."
- Event card now shows "Registered" status

#### Test 8.2: Check Backend Logs

In backend terminal, **✓ Verify:**

- No errors in console
- Cloudinary upload should show in logs

#### Test 8.3: Verify in Database

```bash
cd backend
npx prisma studio
```

In Prisma Studio:

1. Open "Registration" table
2. Find your new registration
3. **✓ Verify fields:**
   - `transactionId`: "TEST123456789"
   - `paymentScreenshotUrl`: Contains Cloudinary URL
   - `paymentScreenshotId`: Contains public_id
   - `registrantName`: "Test User"
   - `registrantEmail`: "test@example.com"
   - `registrantMobile`: "9876543210"
   - `paymentVerified`: false

---

### Step 9: Verify Cloudinary Upload

1. Login to Cloudinary dashboard: https://cloudinary.com/console
2. Go to Media Library
3. Navigate to folder: `sahityam-2026/payment-screenshots`
4. **✓ Verify:** Your uploaded image is there
5. **✓ Verify:** Image is optimized (check file size reduced)

---

### Step 10: Test Duplicate Registration Prevention

1. Try to register for the same event again
2. Click "Register" button
3. **✓ Verify:** Error message: "Already registered for this event"

---

### Step 11: Test Unregistration with Image Deletion

1. Click "Unregister" button on the registered event
2. Confirm unregistration
3. **✓ Verify:** Registration removed successfully
4. **Check Cloudinary:**
   - Go to Media Library
   - **✓ Verify:** Image is deleted from Cloudinary folder

---

### Step 12: Test Admin Dashboard (if applicable)

1. Login as admin
2. Go to admin dashboard
3. Click on event to see registrations
4. **✓ Verify:** Registration details show:
   - User name
   - Transaction ID
   - Payment screenshot URL
   - Payment verification status (false/unverified)

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cloudinary configuration error"

**Solution:** Check `.env` file has correct credentials with no extra spaces

### Issue 2: "File upload failed"

**Solution:**

- Check file is an image (JPG, PNG, GIF, WEBP)
- Check file size < 5MB
- Check backend multer middleware is working

### Issue 3: "Payment screenshot not appearing in Cloudinary"

**Solution:**

- Verify Cloudinary credentials are correct
- Check backend console for upload errors
- Ensure folder name is correct: `sahityam-2026/payment-screenshots`

### Issue 4: "Registration shows but no payment details"

**Solution:** Database migration may not have run. Run:

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### Issue 5: "CORS error on file upload"

**Solution:** Backend CORS is already configured, but verify:

- Backend is running on port 5000
- Frontend API client points to correct backend URL

---

## 📊 Expected API Responses

### Successful Registration:

```json
{
  "message": "Registration successful! Payment will be verified shortly.",
  "registration": {
    "id": "clxxx...",
    "userId": "clyyy...",
    "eventId": "clzzz...",
    "transactionId": "TEST123456789",
    "paymentScreenshotUrl": "https://res.cloudinary.com/...",
    "paymentScreenshotId": "sahityam-2026/payment-screenshots/...",
    "registrantName": "Test User",
    "registrantEmail": "test@example.com",
    "registrantMobile": "9876543210",
    "paymentVerified": false,
    "createdAt": "2025-12-02T..."
  }
}
```

### Error: Already Registered:

```json
{
  "error": "Already registered for this event"
}
```

### Error: Missing Fields:

```json
{
  "error": "All fields are required"
}
```

### Error: Missing Screenshot:

```json
{
  "error": "Payment screenshot is required"
}
```

---

## ✅ Final Checklist

Before going to production:

- [ ] All tests pass successfully
- [ ] Images upload to Cloudinary correctly
- [ ] Images are optimized (check file sizes)
- [ ] Database stores all payment details
- [ ] Duplicate registrations are prevented
- [ ] Unregistration deletes Cloudinary images
- [ ] Form validation works on all fields
- [ ] Error messages are user-friendly
- [ ] Loading states appear correctly
- [ ] Admin can view payment screenshots
- [ ] Mobile responsiveness tested
- [ ] Different image formats tested (JPG, PNG, GIF, WEBP)
- [ ] Large file rejection works (>5MB)
- [ ] Invalid file type rejection works

---

## 🎯 Next Features to Implement

1. **Admin Payment Verification:**

   - Add button in admin panel to verify payments
   - Toggle `paymentVerified` status
   - Display verified/unverified badge

2. **Email Notifications:**

   - Send confirmation email after registration
   - Notify when payment is verified

3. **Payment Status Page:**

   - Let users see their payment verification status
   - Show payment screenshot in user profile

4. **Better Error Handling:**
   - Toast notifications instead of alerts
   - Retry mechanism for failed uploads

---

**✨ Everything is ready for testing! Follow the steps above and check each verification point.**
