import { prisma } from "../db/prisma";
import { COLORS } from "../validators/option-validator";

async function Main() {
  if (process.env.NODE_ENV === "production") return;

  //delete all users configuration , colors
  await prisma.configuration.deleteMany();
  await prisma.colors.deleteMany();

  //insert configuration, colors
  await prisma.colors.createMany({ data: COLORS });
}

(() => {
  Main();
})();
