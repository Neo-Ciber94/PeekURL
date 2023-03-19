-- DropForeignKey
ALTER TABLE "AccessLog" DROP CONSTRAINT "AccessLog_shortUrlId_fkey";

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_shortUrlId_fkey" FOREIGN KEY ("shortUrlId") REFERENCES "ShortUrl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
