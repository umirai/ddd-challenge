/*
  Warnings:

  - You are about to drop the `UserBelongsPair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBelongsTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBelongsPair" DROP CONSTRAINT "UserBelongsPair_pair_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBelongsPair" DROP CONSTRAINT "UserBelongsPair_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBelongsTeam" DROP CONSTRAINT "UserBelongsTeam_team_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBelongsTeam" DROP CONSTRAINT "UserBelongsTeam_user_id_fkey";

-- DropTable
DROP TABLE "UserBelongsPair";

-- DropTable
DROP TABLE "UserBelongsTeam";

-- CreateTable
CREATE TABLE "user_belongs_pair" (
    "user_id" TEXT NOT NULL,
    "pair_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_belongs_team" (
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_belongs_pair_user_id_key" ON "user_belongs_pair"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_belongs_team_user_id_key" ON "user_belongs_team"("user_id");

-- AddForeignKey
ALTER TABLE "user_belongs_pair" ADD CONSTRAINT "user_belongs_pair_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_belongs_pair" ADD CONSTRAINT "user_belongs_pair_pair_id_fkey" FOREIGN KEY ("pair_id") REFERENCES "pairs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_belongs_team" ADD CONSTRAINT "user_belongs_team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_belongs_team" ADD CONSTRAINT "user_belongs_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
