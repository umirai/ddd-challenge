/*
  Warnings:

  - You are about to drop the `admnis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "admnis";

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
