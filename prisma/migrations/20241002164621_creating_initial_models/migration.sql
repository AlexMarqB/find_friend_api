-- CreateEnum
CREATE TYPE "Personality" AS ENUM ('CALM', 'ACTIVE', 'LAZY', 'SLEEPY');

-- CreateEnum
CREATE TYPE "Species" AS ENUM ('DOG', 'CAT', 'RODENT', 'BIRD');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "States" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "tb_pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "personality" "Personality" NOT NULL,
    "age" INTEGER NOT NULL,
    "species" "Species" NOT NULL,
    "color" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "tb_pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "States" NOT NULL,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "org_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_pets" ADD CONSTRAINT "tb_pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE SET NULL ON UPDATE CASCADE;
