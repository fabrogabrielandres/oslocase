import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Navbar from "@/components/NavBar/NavBar";
import { AuthProvider, Footer } from "@/components";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar language={locale}></Navbar>
            <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
              <div className="flex-1 flex flex-col h-full">{children}</div>
              <Footer />
            </main>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
