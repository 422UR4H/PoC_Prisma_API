-- DropIndex
DROP INDEX "characters_name_key";

-- CreateTable
CREATE TABLE "exp" (
    "lvl" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,

    CONSTRAINT "exp_pkey" PRIMARY KEY ("lvl")
);

-- CreateIndex
CREATE UNIQUE INDEX "exp_lvl_key" ON "exp"("lvl");
