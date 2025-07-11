"use server";

import { prisma } from "@/db/prisma";
// import { prisma } from '@/db/prisma'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log("action -> getPaymentStatus", "User data:", user);
  console.log("action -> getPaymentStatus", "orderId:", orderId);

  if (!user?.id || !user.email) {
    throw new Error(
      `You need to be logged in to view this page. user ${JSON.stringify(
        user
      )} `
    );
  }

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });
  // Simulating an order for demonstration purposes
  console.log("action -> getPaymentStatus", "Order data:", order);

  if (!order) throw new Error("This order does not exist.");

  console.log("llego al final o no");

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
