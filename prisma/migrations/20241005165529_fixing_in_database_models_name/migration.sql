/*
  Warnings:

  - You are about to drop the `Org` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_pets" DROP CONSTRAINT "tb_pets_org_id_fkey";

-- DropTable
DROP TABLE "Org";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "tb_orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "States" NOT NULL,

    CONSTRAINT "tb_orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_pets" ADD CONSTRAINT "tb_pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "tb_orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
