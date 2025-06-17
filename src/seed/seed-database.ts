import { prisma } from "../db/prisma";
import { COLORS, FINISHES, MATERIALS, MODELS } from "../validators/option-validator";

async function Main() {
  if (process.env.NODE_ENV === "production") return;

  //delete all users configuration , colors
  // await prisma.configuration.deleteMany();
  await prisma.colorsPhone.deleteMany();
  await prisma.modelsPhone.deleteMany();
  await prisma.finishesPhone.deleteMany();
  await prisma.materialsPhone.deleteMany();
  await prisma.configuration.deleteMany()

  //insert configuration, colors
  await prisma.colorsPhone.createMany({ data: COLORS });
  await prisma.modelsPhone.createMany({ data: MODELS });
  await prisma.finishesPhone.createMany({data: FINISHES});
  await prisma.materialsPhone.createMany({data:MATERIALS});
}

(() => {
  Main();
})();
