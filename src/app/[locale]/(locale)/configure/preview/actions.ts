"use server";

import { prisma } from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ConfigurationInterface } from "../interfaceConfigure";
import { stripe } from "@/lib/stripe";
import { OrderInt } from "../interfaceOrder";

export const createCheckoutSession = async ({
  configId,
  language = "en",
}: {
  configId: string;
  language: string;
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

  const { finish, material, croppedImageUrl } = configuration;

  const totalPriceNumber = BASE_PRICE + finish.price + material.price;
  
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  console.log("user", user);
  if (!user) {
    throw new Error("You need to be logged in");
  }

  let order: OrderInt | null = null;

  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder as OrderInt;
  } else {
    order = (await prisma.order.create({
      data: {
        amount: totalPriceNumber * 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    })) as OrderInt;
  }


  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [croppedImageUrl || ""],
    default_price_data: {
      currency: "USD",
      unit_amount: totalPriceNumber * 100, // Stripe expects the amount in cents
    },
  });

  console.log("product stripeccccccccccccccccccccccccccccc");
  console.log("existingOrder", existingOrder);
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${language}/thank-you?orderId=${
      order!.id
    }`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${language}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card", "paypal"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US"] },
    metadata: {
      userId: user.id,
      orderId: order.id!,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
    locale: "auto",
  });

  console.log("stripeSession", stripeSession);

  return { url: stripeSession.url };
};
