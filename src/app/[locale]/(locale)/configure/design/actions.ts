"use server";

import { prisma } from "@/db/prisma";

export type SaveConfigArgs = {
  id: string;
  colorsPhoneId: string;
  finishesPhoneId: string;
  materialsPhoneId: string;
  modelsPhoneId: string;
};

export async function upDateConfig({
  id,
  colorsPhoneId,
  finishesPhoneId,
  materialsPhoneId,
  modelsPhoneId,
}: SaveConfigArgs) {
  try {
    await prisma.configuration.update({
      where: { id: id },
      data: { colorsPhoneId, finishesPhoneId, materialsPhoneId, modelsPhoneId },
    });
  } catch (error) {
    return error;
  }
}
