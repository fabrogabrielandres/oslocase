import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export function constructMetadata({
  title = "Custom Phone Cases | Design Your Unique Case with Your Photos",
  description = "Personalize your phone case with your favorite images. Choose materials (plastic, silicone, eco-friendly) and order online. Fast shipping worldwide!",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: "Custom Phone Cases | Design Your Unique Case with Your Photos",
      description:
        "Personalize your phone case with your favorite images. Choose materials and order online. Fast shipping!",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      siteName: "Oslo Case",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/moose-1.png`, // Replace with your OG image (1200x630px)
          width: 1200,
          height: 630,
          alt: "Custom phone case with personalized photo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Custom Phone Cases | Design Your Unique Case with Your Photos",
      description:
        "Create a one-of-a-kind phone case with your photos. Order today!",
      images: [`${process.env.NEXT_PUBLIC_SERVER_URL}/moose-1.png`],
    },
    icons,
    metadataBase: new URL("https://oslocase.vercel.app/"),
    keywords: [
      "custom phone cases",
      "personalized phone cover",
      "design your own case",
      "photo phone case",
      "eco-friendly phone cases",
    ],
  };
}
