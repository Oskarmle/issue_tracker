/*
  Warnings:

  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- Step 1: Add columns as nullable
ALTER TABLE "User"
ADD COLUMN "firstName" VARCHAR(255),
ADD COLUMN "lastName" VARCHAR(255);

-- Step 2: Set default values for existing rows
UPDATE "User"
SET "firstName" = 'Default', "lastName" = 'User'
WHERE "firstName" IS NULL OR "lastName" IS NULL;

-- Step 3: Enforce NOT NULL constraint
ALTER TABLE "User"
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;