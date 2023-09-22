-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "nick" VARCHAR(16) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "description" VARCHAR(255),
    "birthday" DATE NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_nick_key" ON "players"("nick");

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");
