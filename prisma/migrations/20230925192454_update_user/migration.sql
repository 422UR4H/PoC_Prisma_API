/*
  Warnings:

  - You are about to drop the column `nick` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_nick_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nick";
