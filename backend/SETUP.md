# Quick Setup Guide

## Prerequisites

- PostgreSQL installed and running
- Node.js 18+ installed

## Setup Steps

1. **Update .env file** with your PostgreSQL credentials:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/sahityam_db"
   ```

2. **Create the database** (if it doesn't exist):

   ```bash
   psql -U postgres
   CREATE DATABASE sahityam_db;
   \q
   ```

3. **Run migrations**:

   ```bash
   npm run prisma:migrate
   ```

4. **Seed the database**:

   ```bash
   npm run seed
   ```

5. **Start the server**:

   ```bash
   npm run dev
   ```

6. **Test the API**:
   Visit `http://localhost:5000/api/health`

## Note

If you encounter any Prisma errors, make sure:

- PostgreSQL is running
- Database credentials in `.env` are correct
- The database `sahityam_db` exists
