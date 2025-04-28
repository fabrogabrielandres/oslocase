import { UploadthingActions } from "@/app/api/uploadthing";
import { notFound } from "next/navigation";
import { DesignConfiguration } from "./DesignConfiguration";
import { prisma } from "@/db/prisma";
import {
  COLORS_INTERFACE,
  FINISHES_INTERFACE,
  MATERIAL_INTERFACE,
  MODELS_INTERFACE,
} from "@/interfaces/Colors.Interface";
import { Suspense } from "react";

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<{ [id: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;
  if (!id || typeof id != "string") {
    notFound();
  }
  const data = await UploadthingActions.GET(id);
  if (!data) {
    notFound();
  }

  const { croppedImageUrl, height, imageUrl, width } = data;

  const colorsMasters: Array<COLORS_INTERFACE> =
    await prisma.colorsPhone.findMany();
  const modelsMasters: Array<MODELS_INTERFACE> =
    await prisma.modelsPhone.findMany();
  const materialsMasters: Array<MATERIAL_INTERFACE> =
    await prisma.materialsPhone.findMany();
  const finishesMasters: Array<FINISHES_INTERFACE> =
    await prisma.finishesPhone.findMany();

  return (
    <>
      <Suspense
        fallback={<div className="h-full w-full bg-red-500">Loading...</div>}
      >
        <DesignConfiguration
          materialsMasters={materialsMasters}
          finishesMasters={finishesMasters}
          colorsMasters={colorsMasters}
          modelsMasters={modelsMasters}
          id={id}
          imgUrl={croppedImageUrl! || imageUrl!}
          imageDimensions={{ width, height }}
        />
      </Suspense>
    </>
  );
}
