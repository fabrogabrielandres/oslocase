import { prisma } from "@/db/prisma";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await prisma.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration) {
    return notFound();
  }

  return (
    <>
      <DesignPreview configuration={configuration} />
    </>
  );
}
