-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "nick" VARCHAR(16) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "briefDescription" VARCHAR(64),
    "birthday" DATE NOT NULL,
    "avatarUrl" TEXT,
    "backgroundImgUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_nick_key" ON "characters"("nick");

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "characters"("name");
