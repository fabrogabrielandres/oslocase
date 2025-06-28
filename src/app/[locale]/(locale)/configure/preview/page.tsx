import { prisma } from "@/db/prisma";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";
import { ConfigurationInterface } from "../interfaceConfigure";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }
  const { getUser } = await getKindeServerSession();
  const user: KindeUser<Record<string, unknown>> | null = await getUser();
  

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
      <div>{user ? JSON.stringify(user) : "No user logged in page"}</div>;

      <DesignPreview configuration={configuration} user={user} />
    </>
  );
}
