# Cloudinary Setup Guide for SAHITYAM 2026

## Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click on **"Sign Up Free"**
3. Fill in your details or sign up with Google/GitHub
4. Verify your email address

## Step 2: Get Your Credentials

After signing up and logging in:

1. You'll be redirected to the **Dashboard**
2. You'll see a section called **"Account Details"** or **"Product Environment Credentials"**
3. You'll find three important values:

   ```
   Cloud Name: dxxxxxx (your unique cloud name)
   API Key: 123456789012345 (15-digit number)
   API Secret: abc***************xyz (click eye icon to reveal)
   ```

4. Click on the **eye icon** next to "API Secret" to reveal the full secret

## Step 3: Add Credentials to Your Backend

1. Open your backend `.env` file
2. Add the following lines with your actual credentials:

   ```env
   CLOUDINARY_CLOUD_NAME="your-cloud-name-here"
   CLOUDINARY_API_KEY="your-api-key-here"
   CLOUDINARY_API_SECRET="your-api-secret-here"
   ```

### Example:

```env
CLOUDINARY_CLOUD_NAME="dxyz1234"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcdefGHIJKLmnopqrsTUVWxyz12345"
```

## Step 4: Install Dependencies

Run the following command in your backend folder:

```bash
cd backend
npm install
```

This will install:
- `cloudinary` - Cloudinary SDK
- `multer` - File upload middleware

## Step 5: Run Database Migration

Update your database schema with the new fields:

```bash
npx prisma migrate dev --name add_payment_fields
npx prisma generate
```

## Step 6: Test the Setup

1. Start your backend server:
   ```bash
   npm run dev
   ```

2. The server should start without errors

3. Check the console - you shouldn't see any Cloudinary configuration errors

## Important Notes

### Free Tier Limits:
- ✅ **25 GB** Storage
- ✅ **25 GB** Bandwidth per month
- ✅ **Unlimited** transformations
- ✅ **Free** CDN included

### Storage Organization:
Images will be stored in folders:
- `sahityam-2026/payment-screenshots/` - Payment screenshots

### Image Optimization:
Images are automatically:
- Compressed for optimal size
- Limited to max 1200x1200 pixels
- Served in best format for each browser
- Delivered via CDN for fast loading

### Security:
- Never commit your `.env` file
- Keep your API Secret private
- API Secret is already in `.gitignore`

## Cloudinary Dashboard Features

Access your Cloudinary console at: [https://console.cloudinary.com/](https://console.cloudinary.com/)

You can:
- View all uploaded images
- See storage usage
- Monitor bandwidth
- Delete images manually
- Create upload presets
- View analytics

## Troubleshooting

### Error: "Must supply cloud_name"
- Check if `CLOUDINARY_CLOUD_NAME` is set in `.env`
- Restart your server after adding credentials

### Error: "Invalid API Key"
- Verify your `CLOUDINARY_API_KEY` is correct
- Make sure there are no extra spaces

### Error: "Upload failed"
- Check your internet connection
- Verify file size is under 5MB
- Ensure file is an image (jpg, png, gif, webp)

### Can't find credentials?
- Go to: https://console.cloudinary.com/settings/product_environments
- Select your environment
- Credentials will be shown there

## API Endpoint

The new registration endpoint with payment:

```
POST /api/registrations/with-payment
```

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data
```

**Body (form-data):**
```
eventId: <event-id>
transactionId: <upi-transaction-id>
name: <full-name>
email: <email>
mobileNumber: <10-digit-number>
paymentScreenshot: <image-file>
```

## Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- Support: https://support.cloudinary.com/
