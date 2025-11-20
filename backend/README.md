# SAHITYAM 2026 Backend

Backend API for the SAHITYAM 2026 event management system.

## Tech Stack

- Node.js + Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/sahityam_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV=development
```

### 3. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database with events
npm run seed
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user

  ```json
  {
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/profile` - Get user profile (requires auth)
  - Header: `Authorization: Bearer <token>`

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID

### Registrations

- `POST /api/registrations` - Register for an event (requires auth)

  ```json
  {
    "eventId": "event-id-here"
  }
  ```

- `DELETE /api/registrations/:eventId` - Unregister from event (requires auth)
- `GET /api/registrations/my-registrations` - Get user's registrations (requires auth)

### Health Check

- `GET /api/health` - Server health status

## Database Schema

### User

- id (String, UUID)
- name (String)
- username (String, unique)
- email (String, unique)
- password (String, hashed)
- registrations (Registration[])

### Event

- id (String, UUID)
- title (String)
- subtitle (String, optional)
- description (String)
- image (String, URL)
- rules (String[])
- registrations (Registration[])

### Registration

- id (String, UUID)
- userId (String)
- eventId (String)
- unique constraint on [userId, eventId]

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run seed` - Seed database with events

## Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── authController.ts
│   │   ├── eventController.ts
│   │   └── registrationController.ts
│   ├── routes/           # Route definitions
│   │   ├── authRoutes.ts
│   │   ├── eventRoutes.ts
│   │   └── registrationRoutes.ts
│   ├── middleware/       # Express middleware
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── utils/           # Helper functions
│   │   ├── jwt.ts
│   │   └── validators.ts
│   └── server.ts        # Express app entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeder
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies
```
