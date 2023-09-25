/*
  Warnings:

  - You are about to drop the column `email` on the `players` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `players` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "players_email_key";

-- AlterTable
ALTER TABLE "players" DROP COLUMN "email",
DROP COLUMN "password";
