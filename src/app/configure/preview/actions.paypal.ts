// "use server";

// import { prisma } from "@/db/prisma";
// import { ConfigurationInterface } from "../interfaceConfigure";
// // import { stripe } from "@/lib/stripe";
// import { OrderInt } from "../interfaceOrder";
// import { UserKindeAuth } from "../interfaceUser";
// export const createCheckoutSession = async ({
//   configId,
//   user,
// }: {
//   configId: string;
//   user: UserKindeAuth | null;
// }) => {
//   const BASE_PRICE = 14.0;
//   const configuration = (await prisma.configuration.findUnique({
//     where: {
//       id: configId,
//     },
//     include: {
//       finish: {
//         select: {
//           label: true,
//           id: true,
//           value: true,
//           description: true,
//           price: true,
//         },
//       },
//       material: {
//         select: {
//           label: true,
//           id: true,
//           value: true,
//           description: true,
//           price: true,
//         },
//       },
//       ColorsPhone: {
//         select: {
//           label: true,
//           id: true,
//           value: true,
//         },
//       },
//       model: {
//         select: {
//           label: true,
//           id: true,
//           value: true,
//         },
//       },
//     },
//   })) as ConfigurationInterface;
//   if (!configuration) {
//     throw new Error("No such configuration found");
//   }
//   const { finish, material } = configuration;
//   const totalPriceNumber = BASE_PRICE + finish.price + material.price;
//   // const { getUser } = getKindeServerSession();
//   // const user = await getUser();
//   if (!user) {
//     throw new Error("You need to be logged in");
//   }
//   let order: OrderInt | null = null;
//   const existingOrder = await prisma.order.findFirst({
//     where: {
//       userId: user.id,
//       configurationId: configuration.id,
//     },
//   });
//   if (existingOrder) {
//     order = existingOrder as OrderInt;
//   } else {
//     order = (await prisma.order.create({
//       data: {
//         amount: totalPriceNumber * 100,
//         userId: user.id,
//         configurationId: configuration.id,
//       },
//     })) as OrderInt;
//   }

//   return { order: order };
// };
