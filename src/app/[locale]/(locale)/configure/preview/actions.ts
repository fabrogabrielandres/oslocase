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

  const { finish, material } = configuration;

  const totalPrice = formatPrice(BASE_PRICE + finish.price + material.price);
  console.log("Total Price", totalPrice);

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("User", user);

    if (!user) {
      throw new Error("You need to be logged in");
    }

  console.log("configuration", configuration);

  return {};
};
