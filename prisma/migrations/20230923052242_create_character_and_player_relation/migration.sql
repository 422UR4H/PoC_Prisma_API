/*
  Warnings:

  - Added the required column `playerId` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" ADD COLUMN     "playerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
