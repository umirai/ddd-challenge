/*
  Warnings:

  - You are about to drop the `user_belongs_pair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_belongs_team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_belongs_pair" DROP CONSTRAINT "user_belongs_pair_pair_id_fkey";

-- DropForeignKey
ALTER TABLE "user_belongs_pair" DROP CONSTRAINT "user_belongs_pair_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_belongs_team" DROP CONSTRAINT "user_belongs_team_team_id_fkey";

-- DropForeignKey
ALTER TABLE "user_belongs_team" DROP CONSTRAINT "user_belongs_team_user_id_fkey";

-- DropTable
DROP TABLE "user_belongs_pair";

-- DropTable
DROP TABLE "user_belongs_team";

-- CreateTable
CREATE TABLE "user_affiliation" (
    "user_id" TEXT NOT NULL,
    "affiliation_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "affiliations" (
    "id" SERIAL NOT NULL,
    "team_id" TEXT NOT NULL,
    "pair_id" TEXT NOT NULL,

    CONSTRAINT "affiliations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_affiliation_user_id_key" ON "user_affiliation"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "affiliations_pair_id_key" ON "affiliations"("pair_id");

-- AddForeignKey
ALTER TABLE "user_affiliation" ADD CONSTRAINT "user_affiliation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_affiliation" ADD CONSTRAINT "user_affiliation_affiliation_id_fkey" FOREIGN KEY ("affiliation_id") REFERENCES "affiliations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliations" ADD CONSTRAINT "affiliations_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliations" ADD CONSTRAINT "affiliations_pair_id_fkey" FOREIGN KEY ("pair_id") REFERENCES "pairs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
