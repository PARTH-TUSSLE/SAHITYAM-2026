# Admin Role Implementation Guide

## Overview

Role-based access control has been implemented with two roles: **USER** (default) and **ADMIN**.

## Database Changes

### Schema Updates

The `User` model now includes a `role` field:

```prisma
enum Role {
  USER
  ADMIN
}

model User {
  // ... other fields
  role          Role           @default(USER)
}
```

## Setup Instructions

### 1. Start PostgreSQL

Make sure PostgreSQL is running on your system.

### 2. Configure Environment

The `.env` file has been created in the backend directory. Update it with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/sahityam_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5000
NODE_ENV=development
```

### 3. Run Migration

```bash
cd backend
npm run prisma:migrate
```

When prompted, name the migration: `add_user_roles`

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Seed Database (Optional - if starting fresh)

```bash
npm run seed
```

### 6. Create an Admin User

After registering a user normally, you can manually update their role in the database:

**Option 1: Using Prisma Studio**

```bash
npm run prisma:studio
```

- Navigate to the User table
- Find your user
- Change `role` from `USER` to `ADMIN`

**Option 2: Using SQL**

```sql
-- Connect to your database
psql -U postgres -d sahityam_db

-- Update a user to admin
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

**Option 3: Using psql command line**

```bash
psql -U postgres -d sahityam_db -c "UPDATE \"User\" SET role = 'ADMIN' WHERE email = 'your-email@example.com';"
```

## API Endpoints

### Admin Routes (requires authentication + ADMIN role)

All admin routes are prefixed with `/api/admin` and require:

- Valid JWT token in Authorization header
- User role must be ADMIN

#### Get All Events with Registrations

```
GET /api/admin/events
```

Returns all events with registration counts and user details.

#### Get Specific Event Registrations

```
GET /api/admin/events/:eventId
```

Returns detailed registrations for a specific event.

#### Get All Users

```
GET /api/admin/users
```

Returns all users with their registration details.

#### Get Specific User

```
GET /api/admin/users/:userId
```

Returns detailed information about a specific user.

## Frontend Features

### Admin Dashboard

- **Route**: `/admin`
- **Access**: Only users with ADMIN role
- **Features**:
  - View all events with registration statistics
  - See total registrations across all events
  - View detailed list of users registered for each event
  - User information includes: name, username, email, registration date

### Navigation

- Admin users will see an "Admin Dashboard" link in the navbar
- Non-admin users won't see this link
- Direct access to `/admin` redirects non-admin users to home page

## Security Features

### Backend

1. **Admin Middleware**: Validates user role before granting access to admin routes
2. **JWT Token Enhancement**: JWT tokens now include user role
3. **Route Protection**: All admin routes use both `authMiddleware` and `adminMiddleware`

### Frontend

1. **Route Guards**: Admin page checks user role before rendering
2. **Conditional UI**: Admin-only features are hidden from regular users
3. **Automatic Redirection**: Non-admin users are redirected from admin pages

## Testing

### Test Admin Access

1. Register a new user or login with existing user
2. Make that user an admin (see "Create an Admin User" above)
3. Logout and login again with the admin user
4. You should now see "Admin Dashboard" in the navbar
5. Click it to access the admin panel

### Test Regular User Access

1. Try accessing `/admin` as a regular user
2. You should be redirected to the home page
3. Admin Dashboard link should not appear in navbar

## Backend Files Modified/Created

### Created:

- `backend/src/controllers/adminController.ts` - Admin-specific controllers
- `backend/src/routes/adminRoutes.ts` - Admin route definitions
- `backend/.env` - Environment configuration

### Modified:

- `backend/prisma/schema.prisma` - Added Role enum and role field
- `backend/src/utils/jwt.ts` - Include role in JWT tokens
- `backend/src/controllers/authController.ts` - Return role in auth responses
- `backend/src/middleware/auth.ts` - Added adminMiddleware and role to AuthRequest
- `backend/src/server.ts` - Registered admin routes

## Frontend Files Modified/Created

### Created:

- `frontend/app/admin/page.tsx` - Admin dashboard page

### Modified:

- `frontend/lib/auth.ts` - Added role to User interface
- `frontend/components/Navbar.tsx` - Conditional admin link based on user role

## Example Request/Response

### Login Response (now includes role)

```json
{
  "user": {
    "id": "clxxx...",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Admin Events Response

```json
[
  {
    "id": "evt1",
    "title": "Youth Parliament",
    "registrationCount": 15,
    "registrations": [
      {
        "id": "reg1",
        "user": {
          "id": "user1",
          "name": "Jane Smith",
          "username": "janesmith",
          "email": "jane@example.com",
          "createdAt": "2025-11-20T10:00:00Z"
        },
        "createdAt": "2025-11-21T14:30:00Z"
      }
    ]
  }
]
```

## Troubleshooting

### Issue: Can't run migration

**Solution**: Make sure PostgreSQL is running and DATABASE_URL in .env is correct

### Issue: Admin link not showing

**Solution**:

1. Verify user role is set to ADMIN in database
2. Logout and login again to get new JWT token with updated role
3. Check browser console for any errors

### Issue: 403 Forbidden on admin routes

**Solution**:

1. Verify your JWT token is valid
2. Check that user role is ADMIN in the database
3. Make sure you logged in after changing the role

## Future Enhancements

Potential features to add:

- Admin ability to promote/demote users
- Admin can create/edit/delete events
- Export registration data to CSV
- Email notifications to registered users
- Event capacity management
- Registration approval system
