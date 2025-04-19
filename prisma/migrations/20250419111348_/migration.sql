/*
  Warnings:

  - You are about to drop the `FinishesModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaterialsModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FinishesModel";

-- DropTable
DROP TABLE "MaterialsModel";

-- CreateTable
CREATE TABLE "FinishesPhone" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "FinishesPhone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialsPhone" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "MaterialsPhone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinishesPhone_value_key" ON "FinishesPhone"("value");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialsPhone_value_key" ON "MaterialsPhone"("value");
