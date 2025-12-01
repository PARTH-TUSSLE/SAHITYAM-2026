-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "paymentScreenshotId" TEXT,
ADD COLUMN     "paymentScreenshotUrl" TEXT,
ADD COLUMN     "paymentVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "registrantEmail" TEXT,
ADD COLUMN     "registrantMobile" TEXT,
ADD COLUMN     "registrantName" TEXT,
ADD COLUMN     "transactionId" TEXT;
