-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "registrationFee" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "rejectionReason" TEXT;
