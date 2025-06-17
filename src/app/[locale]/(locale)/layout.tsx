import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../../globals.css";
import Navbar from "@/components/NavBar/NavBar";
import { AuthProvider, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/Provaiders/QueryClientProvider/QueryClientProvider";

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
