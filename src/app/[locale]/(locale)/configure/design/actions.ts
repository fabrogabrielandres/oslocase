"use server";

import { prisma } from "@/db/prisma";

export type SaveConfigArgs = {
  id: string;
  colorsId: string;
  finishesPhoneId: string;
  materialsPhoneId: string;
  modelsPhoneId: string;
};

export async function upDateConfig({
  id,
  colorsId,
  finishesPhoneId,
  materialsPhoneId,
  modelsPhoneId,
}: SaveConfigArgs) {
  await prisma.configuration.update({
    where: { id: id },
    data: { colorsId, finishesPhoneId, materialsPhoneId, modelsPhoneId },
  });
}
