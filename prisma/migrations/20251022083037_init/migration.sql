-- CreateTable
CREATE TABLE "brand_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "logoUrl" TEXT,
    "logoHeight" INTEGER NOT NULL DEFAULT 32,
    "logoMaxWidth" INTEGER,
    "phone" TEXT,
    "email" TEXT,
    "hours" TEXT,
    "ctaPrimary" TEXT,
    "ctaSecondary" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "brand_settings_history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "logoUrl" TEXT,
    "logoHeight" INTEGER NOT NULL DEFAULT 32,
    "logoMaxWidth" INTEGER,
    "phone" TEXT,
    "email" TEXT,
    "hours" TEXT,
    "ctaPrimary" TEXT,
    "ctaSecondary" TEXT,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");
