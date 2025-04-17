import { UploadthingActions } from "@/app/api/uploadthing";
import { notFound } from "next/navigation";
import { DesignConfiguration } from "./DesignConfiguration";
import { prisma } from "@/db/prisma";
import { COLORS_INTERFACE, MODELS_INTERFACE } from "@/interfaces/Colors.Interface";

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

  const colors: Array<COLORS_INTERFACE> = await prisma.colors.findMany();
  const models: Array<MODELS_INTERFACE> = await prisma.modelsPhone.findMany();

  return (
    <>
      <DesignConfiguration
        colors={colors}
        models={models}
        id={id}
        imgUrl={croppedImageUrl! || imageUrl!}
        imageDimenisons={{ width, height }}
      />
    </>
  );
}
