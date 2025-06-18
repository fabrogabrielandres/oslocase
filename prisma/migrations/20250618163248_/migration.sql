-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('fulfilled', 'shipped', 'awaiting_shipment');

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "croppedImageUrl" TEXT,
    "imageUrl" TEXT,
    "modelsPhoneId" TEXT,
    "materialsPhoneId" TEXT,
    "finishesPhoneId" TEXT,
    "colorsPhoneId" TEXT,

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
CREATE UNIQUE INDEX "ColorsPhone_value_key" ON "ColorsPhone"("value");

-- CreateIndex
CREATE UNIQUE INDEX "ModelsPhone_value_key" ON "ModelsPhone"("value");

-- CreateIndex
CREATE UNIQUE INDEX "FinishesPhone_value_key" ON "FinishesPhone"("value");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialsPhone_value_key" ON "MaterialsPhone"("value");

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
