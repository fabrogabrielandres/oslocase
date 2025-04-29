import { prisma } from "@/db/prisma";

export interface CreateUpdateImg {
  id?: string;
  width?: number;
  height?: number;
  croppedImageUrl?: string | null;
  imageUrl?: string | null;
}

export async function POST({ height, width, imageUrl }: CreateUpdateImg) {
  const resp: CreateUpdateImg = await prisma.configuration.create({
    data: {
      height: height || 500,
      width: width || 500,
      imageUrl: imageUrl,
    },
  });
  return { ...resp };
}

export async function PATCH({
  id,
  croppedImageUrl,
}: CreateUpdateImg) {
  const res = await prisma.configuration.update({
    where: { id },
    data: {
      croppedImageUrl: croppedImageUrl,
    },
  });
  return { ...res };
}

export async function GET(id: string) {
  const data = await prisma.configuration.findUnique({
    where: {
      id,
    },
  });
  return data;
}
