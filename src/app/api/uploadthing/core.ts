/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { UploadthingActions as Uploadthing } from ".";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;
      const res = await fetch(file.ufsUrl);
      const buffer = await res.arrayBuffer();
      const image = await sharp(buffer);
      const { height, width } = await image.metadata();
      if (!configId) {
        const res = await Uploadthing.POST({
          height: height || 500,
          width: width || 500,
          imageUrl: file.ufsUrl,
        });

        return { configId: res.id };
      } else {
        const res = await Uploadthing.PATCH({
          id: configId,
          height: height || 500,
          width: width || 500,
        });
        return { configId: res.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
