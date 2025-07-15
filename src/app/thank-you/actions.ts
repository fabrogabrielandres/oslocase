"use server";

import { prisma } from "@/db/prisma";
// import { prisma } from '@/db/prisma'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { OrderInt } from "../configure/interfaceOrder";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user.email) {
    throw new Error(
      `You need to be logged in to view this page. user ${JSON.stringify(
        user
      )} `
    );
  }

  // const order = await prisma.order.findFirst({
  //   where: { id: orderId },
  //   include: {
  //     billingAddress: true,
  //     shippingAddress: true,
  //     user: true,
  //   },
  // });

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      configuration: {
        include: {
          ColorsPhone: true,
          finish: true,
          material: true,
          model: true,
        },
      },
      user: true,
      shippingAddress: true,
      billingAddress: true,
    },
  });


  if (!order) throw new Error("This order does not exist.");

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
