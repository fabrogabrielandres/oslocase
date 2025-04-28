-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('fulfilled', 'shipped', 'awaiting_shipment');

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "croppedImageUrl" TEXT,
    "imageUrl" TEXT,
    "modelsPhoneId" TEXT NOT NULL,
    "materialsPhoneId" TEXT NOT NULL,
    "finishesPhoneId" TEXT NOT NULL,
    "colorsId" TEXT NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorsPhone" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "tw" TEXT NOT NULL,

    CONSTRAINT "ColorsPhone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelsPhone" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ModelsPhone_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "ColorsPhone_value_key" ON "ColorsPhone"("value");

-- CreateIndex
CREATE UNIQUE INDEX "ModelsPhone_value_key" ON "ModelsPhone"("value");

-- CreateIndex
CREATE UNIQUE INDEX "FinishesPhone_value_key" ON "FinishesPhone"("value");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialsPhone_value_key" ON "MaterialsPhone"("value");

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_modelsPhoneId_fkey" FOREIGN KEY ("modelsPhoneId") REFERENCES "ModelsPhone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_materialsPhoneId_fkey" FOREIGN KEY ("materialsPhoneId") REFERENCES "MaterialsPhone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_finishesPhoneId_fkey" FOREIGN KEY ("finishesPhoneId") REFERENCES "FinishesPhone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "ColorsPhone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
