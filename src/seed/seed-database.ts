import { prisma } from "../db/prisma";
import { COLORS, MODELS } from "../validators/option-validator";

async function Main() {
  if (process.env.NODE_ENV === "production") return;

  //delete all users configuration , colors
  await prisma.configuration.deleteMany();
  await prisma.colors.deleteMany();
  // await prisma.models.deleteMany();

  //insert configuration, colors
  await prisma.colors.createMany({ data: COLORS });
  // await prisma.models.createMany({ data: MODELS });
}

(() => {
  Main();
})();
