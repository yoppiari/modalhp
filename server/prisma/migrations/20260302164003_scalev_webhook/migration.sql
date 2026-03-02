/*
  Warnings:

  - A unique constraint covering the columns `[scalevOrderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "scalevOrderId" TEXT;

-- CreateTable
CREATE TABLE "FeatureRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "authorEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FeatureVote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "featureRequestId" TEXT NOT NULL,
    "voterEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FeatureVote_featureRequestId_fkey" FOREIGN KEY ("featureRequestId") REFERENCES "FeatureRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scalevOrderId" TEXT NOT NULL,
    "scalevEvent" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "productName" TEXT,
    "amount" TEXT,
    "paymentStatus" TEXT NOT NULL,
    "rawPayload" TEXT NOT NULL,
    "processedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FeatureVote_featureRequestId_voterEmail_key" ON "FeatureVote"("featureRequestId", "voterEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_scalevOrderId_key" ON "Payment"("scalevOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_scalevOrderId_key" ON "User"("scalevOrderId");
