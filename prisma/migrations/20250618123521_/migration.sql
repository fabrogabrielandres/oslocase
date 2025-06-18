/*
  Warnings:

  - You are about to drop the column `colorsId` on the `Configuration` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_colorsId_fkey";

-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_finishesPhoneId_fkey";

-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_materialsPhoneId_fkey";

-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_modelsPhoneId_fkey";

-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "colorsId",
ADD COLUMN     "colorsPhoneId" TEXT,
ALTER COLUMN "modelsPhoneId" DROP NOT NULL,
ALTER COLUMN "materialsPhoneId" DROP NOT NULL,
ALTER COLUMN "finishesPhoneId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "status" "OrderStatus" NOT NULL DEFAULT 'awaiting_shipment',
    "shippingAddressId" TEXT,
    "billingAddressId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "BillingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_colorsPhoneId_fkey" FOREIGN KEY ("colorsPhoneId") REFERENCES "ColorsPhone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_finishesPhoneId_fkey" FOREIGN KEY ("finishesPhoneId") REFERENCES "FinishesPhone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_materialsPhoneId_fkey" FOREIGN KEY ("materialsPhoneId") REFERENCES "MaterialsPhone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_modelsPhoneId_fkey" FOREIGN KEY ("modelsPhoneId") REFERENCES "ModelsPhone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "BillingAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
