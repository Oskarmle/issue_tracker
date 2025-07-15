-- Migration: Add User table and link existing Issue records to a default user
-- This follows Option 1 (make the column nullable, back‑fill, then enforce NOT NULL)

-- 1️⃣  Add the new column on Issue as nullable so existing rows don’t break
ALTER TABLE "Issue" ADD COLUMN "userId" INTEGER;

-- 2️⃣  Create the User table
CREATE TABLE "User" (
    "id"         SERIAL       NOT NULL,
    "email"      VARCHAR(255) NOT NULL,
    "password"   VARCHAR(255) NOT NULL,
    "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"  TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Unique index on email
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- 3️⃣  Insert a default user (⚠️  replace with a real hashed password in production)
INSERT INTO "User" ("email", "password", "createdAt", "updatedAt")
VALUES ('default@example.com', 'defaultpassword', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 4️⃣  Assign every existing Issue that lacks a user to this default user
UPDATE "Issue"
SET    "userId" = (SELECT "id" FROM "User" WHERE "email" = 'default@example.com')
WHERE  "userId" IS NULL;

-- 5️⃣  Now that every Issue has a user, enforce NOT NULL on the column
ALTER TABLE "Issue" ALTER COLUMN "userId" SET NOT NULL;

-- 6️⃣  Add the foreign‑key constraint
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
