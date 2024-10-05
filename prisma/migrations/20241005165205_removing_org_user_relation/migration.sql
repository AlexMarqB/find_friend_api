/*
  Warnings:

  - You are about to drop the column `org_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_org_id_fkey";

-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "org_id";
