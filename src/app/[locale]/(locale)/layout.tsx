import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../../globals.css";
import Navbar from "@/components/NavBar/NavBar";
import { AuthProvider, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/Provaiders/QueryClientProvider/QueryClientProvider";



import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Custom Phone Cases | Design Your Unique Case with Your Photos",
  description: "Personalize your phone case with your favorite images. Choose materials (plastic, silicone, eco-friendly) and order online. Fast shipping worldwide!",
  keywords: ["custom phone cases", "personalized phone cover", "design your own case", "photo phone case", "eco-friendly phone cases"],
  openGraph: {
    title: "Custom Phone Cases | Design Your Unique Case with Your Photos",
    description: "Personalize your phone case with your favorite images. Choose materials and order online. Fast shipping!",
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
    description: "Create a one-of-a-kind phone case with your photos. Order today!",
    images: [`${process.env.NEXT_PUBLIC_SERVER_URL}/moose-1.png`],
  },
};




export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "es" | "en" | "no")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
          <ReactQueryProvider>
            <NextIntlClientProvider messages={messages}>
              <Navbar></Navbar>
              <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
                <div className="flex-1 flex flex-col h-full">{children}</div>
                <Footer />
              </main>
              <Toaster />
            </NextIntlClientProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
