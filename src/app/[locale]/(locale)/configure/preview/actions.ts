"use server";

import { prisma } from "@/db/prisma";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ConfigurationInterface } from "../interfaceConfigure";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const BASE_PRICE = 14.0;

  const configuration = (await prisma.configuration.findUnique({
    where: {
      id: configId,
    },
    include: {
      finish: {
        select: {
          label: true,
          id: true,
          value: true,
          description: true,
          price: true,
        },
      },
      material: {
        select: {
          label: true,
          id: true,
          value: true,
          description: true,
          price: true,
        },
      },
      ColorsPhone: {
        select: {
          label: true,
          id: true,
          value: true,
        },
      },
      model: {
        select: {
          label: true,
          id: true,
          value: true,
        },
      },
    },
  })) as ConfigurationInterface;

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  const { finish, material } = configuration;

  const totalPrice = formatPrice(BASE_PRICE + finish.price + material.price);
  console.log("Total Price", totalPrice);

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("User", user);

  if (!user) {
    throw new Error("You need to be logged in");
  }

  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
    include: {
      configuration: true,
      user: true,
      shippingAddress: true,
      billingAddress: true,
    },
  });

  console.log("existingOrder",existingOrder);
  
  if (!existingOrder) {
    console.log("entramos aca");
    
    const existingOrderBB = await prisma.order.create({
      data: {
        amount: Number(totalPrice),
        userId: user.id,
        configurationId: configuration.id,
      },
    });
    console.log("existingOrderBB",existingOrder);
  }
  

  return {};
};
