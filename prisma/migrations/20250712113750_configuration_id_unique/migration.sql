/*
  Warnings:

  - A unique constraint covering the columns `[configurationId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_configurationId_key" ON "Order"("configurationId");
