# Rejection Message Feature

## Feature Overview

Added functionality for admins to provide a custom rejection message when rejecting payment verification. This message is displayed to users wherever rejected payments are shown.

## Changes Made

### 1. Database Schema (Backend)

- **File**: `backend/prisma/schema.prisma`
- **Change**: Added optional `rejectionReason` field to the `Registration` model
- **Migration**: Created migration `20251213140855_add_rejection_reason`

```prisma
model Registration {
  // ... existing fields
  rejectionReason      String?
  // ... rest of fields
}
```

### 2. Backend Controller (Backend)

- **File**: `backend/src/controllers/adminController.ts`
- **Change**: Modified `verifyPayment` function to accept and save `rejectionReason`

```typescript
const { verified, rejectionReason } = req.body;

// When rejecting:
data: {
  paymentVerified: false,
  paymentStatus: "REJECTED",
  rejectionReason: rejectionReason || null,
}
```

### 3. Admin Panel Modal (Frontend)

- **File**: `frontend/components/PendingPaymentsModal.tsx`
- **Changes**:
  - Added `rejectionReason` field to `PendingPayment` interface
  - Added state management for rejection modal and reason
  - Created rejection reason modal with textarea input (500 char limit)
  - Modified reject button to open modal instead of directly rejecting
  - Display rejection reason in rejected payments cards

**New UI Elements**:

- **Rejection Modal**: Appears when admin clicks "Reject" button
  - Text area for entering rejection reason (optional)
  - Character counter (max 500 characters)
  - Cancel and Confirm buttons
- **Rejection Reason Display** (in admin panel):
  - Shows in red alert box for rejected payments
  - Includes warning icon
  - Displays custom reason or falls back to default message

### 4. User Profile Page (Frontend)

- **File**: `frontend/app/profile/page.tsx`
- **Changes**:
  - Added `rejectionReason` field to `Registration` interface
  - Updated rejection notice to display custom rejection reason
  - Falls back to default message if no reason provided

**User Experience**:

- Rejected payment cards show a red alert box
- Custom rejection reason is displayed prominently
- If no reason provided, shows default message

## Usage

### For Admins:

1. Go to Admin Panel
2. Click on "Pending" tab to see pending payments
3. Click "Reject" button for a payment
4. A modal appears asking for rejection reason (optional)
5. Enter reason (e.g., "Invalid transaction ID", "Blurry screenshot", etc.)
6. Click "Reject Payment" to confirm
7. The rejection reason is saved and visible in the "Rejected" tab

### For Users:

1. If payment is rejected, user sees red alert in their profile
2. The rejection reason from admin is displayed
3. User can understand why their payment was rejected
4. User can re-register with corrected information

## Examples of Rejection Reasons

Common reasons admins might provide:

- "Invalid transaction ID - please provide correct UPI transaction ID"
- "Payment screenshot is blurry - please upload a clear screenshot"
- "Payment amount doesn't match registration fee"
- "Duplicate payment - already registered for this event"
- "Screenshot shows cancelled transaction"
- "Incorrect event selected in payment"

## Database Field Details

- **Field Name**: `rejectionReason`
- **Type**: `String` (optional/nullable)
- **Max Length**: 500 characters (enforced in frontend)
- **Default**: `null`
- **Usage**: Stored only when payment is rejected with a reason

## API Changes

### Endpoint: `PATCH /api/admin/verify-payment/:registrationId`

**Request Body** (updated):

```json
{
  "verified": false,
  "rejectionReason": "Invalid transaction ID - please check and resubmit"
}
```

**Response** (unchanged):

```json
{
  "message": "Payment rejected. User has been notified via email.",
  "registration": {
    /* updated registration object */
  },
  "rejected": true
}
```

## Display Locations

The rejection reason is displayed in:

1. **Admin Panel** - "Rejected" tab (for admin reference)
2. **User Profile** - Rejected registration cards (for user feedback)
3. **Database** - Stored permanently for audit trail

## Benefits

1. **Better Communication**: Users understand exactly why their payment was rejected
2. **Reduced Support Queries**: Clear reasons reduce confusion and support tickets
3. **Audit Trail**: Rejection reasons are stored for future reference
4. **Improved UX**: Users can correct specific issues instead of guessing
5. **Admin Flexibility**: Rejection reason is optional - admins can reject without reason if preferred

## Testing

To test this feature:

1. **Backend**: Restart backend server to use updated Prisma schema
2. **Frontend**: No restart needed (Next.js hot reload)
3. **Test Flow**:
   - Register for an event with payment
   - Login as admin
   - Open pending payments modal
   - Click "Reject" on a payment
   - Enter a rejection reason
   - Verify it appears in rejected tab
   - Login as the user and check profile page
   - Verify rejection reason is displayed

## Notes

- The rejection reason is **optional** - admins can reject without providing a reason
- Maximum length is 500 characters to prevent abuse
- The feature is backward compatible - existing rejected payments show default message
- The rejection modal has a clean, modern UI matching the app's design system
