-- AlterTable
ALTER TABLE "AccessLog" ADD COLUMN     "mustRevalidate" BOOLEAN NOT NULL DEFAULT true;
