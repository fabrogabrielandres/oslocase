/*
  Warnings:

  - You are about to drop the `Models` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Models";

-- CreateTable
CREATE TABLE "ModelsPhone" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ModelsPhone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialsModel" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "MaterialsModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishesModel" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "FinishesModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModelsPhone_value_key" ON "ModelsPhone"("value");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialsModel_value_key" ON "MaterialsModel"("value");

-- CreateIndex
CREATE UNIQUE INDEX "FinishesModel_value_key" ON "FinishesModel"("value");
