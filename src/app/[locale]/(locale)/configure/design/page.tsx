import { UploadthingActions } from "@/app/api/uploadthing";
import { notFound } from "next/navigation";
import { DesignConfiguration } from "./DesignConfiguration";

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

  return (
    <>
      <DesignConfiguration
        id={id}
        imgUrl={croppedImageUrl! || imageUrl!}
        imageDimenisons={{ width, height }}
      />
    </>
  );
}
