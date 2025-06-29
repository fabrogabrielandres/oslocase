import { prisma } from "@/db/prisma";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";
import { ConfigurationInterface } from "../interfaceConfigure";
import { AuthTest } from "@/components/testauth/AuthTest";
import AuthKindeBrosertest from "@/components/testauth/AuthKindeBrosertest";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = (await prisma.configuration.findUnique({
    where: {
      id,
    },
    include: {
      finish: {
        select: {
          label: true,
          id: true,
          value: true,
          description: true,
          price: true,
        },
      },
      material: {
        select: {
          label: true,
          id: true,
          value: true,
          description: true,
          price: true,
        },
      },
      ColorsPhone: {
        select: {
          label: true,
          id: true,
          value: true,
        },
      },
      model: {
        select: {
          label: true,
          id: true,
          value: true,
        },
      },
    },
  })) as ConfigurationInterface;

  if (configuration == null) {
    return notFound();
  }

  return (
    <>
      <AuthTest></AuthTest>
      <AuthKindeBrosertest></AuthKindeBrosertest>
      <DesignPreview configuration={configuration} />
    </>
  );
}
