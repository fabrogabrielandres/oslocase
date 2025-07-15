"use server";

import { prisma } from "@/db/prisma";

interface Props {
  configurationId: string;
  userId: string;
  amount: number;
  transactionId?: string;
}

export const setTransactionIdMyDb = async ({
  configurationId,
  userId,
  amount,
  transactionId,
}: Props) => {
  try {
    const isposibleUpdateOrder = await prisma.order.findFirst({
      where: {
        configurationId,
        userId,
      },
    });

    if (isposibleUpdateOrder) {
      const orderUpdated = await prisma.order.update({
        where: {
          id: isposibleUpdateOrder.id,
        },
        data: {
          amount: amount,
          transactionId: transactionId,
        },
      });
      return { order: orderUpdated };
    } else {
      const orderCreated = await prisma.order.create({
        data: {
          amount: amount,
          userId: userId,
          configurationId: configurationId,
          transactionId: transactionId,
        },
      });
      return {
        order: orderCreated,
        ok: true,
        message: "Orden creada correctamente",
      };
    }
  } catch (error) {
    return {
      order: null,
      ok: false,
      message: `No se pudo actualizar el id de la transacción ${error}`,
    };
  }
};
