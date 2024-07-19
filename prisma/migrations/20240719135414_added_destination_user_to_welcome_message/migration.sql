-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_destinationUserId_fkey" FOREIGN KEY ("destinationUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
