import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import Navbar from "@/components/NavBar/NavBar";
import { AuthProvider, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/Provaiders/QueryClientProvider/QueryClientProvider";
import PaypalProvider from "@/components/Provaiders/PaypalProvider/PaypalProvider";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata();
export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
          <ReactQueryProvider>
            <NextIntlClientProvider messages={messages}>
              <PaypalProvider>
                <Navbar></Navbar>
                <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
                  <div className="flex-1 flex flex-col h-full">{children}</div>
                  {/* <div>*******************************</div> */}
                  {/* <AuthTest></AuthTest> */}
                  {/* <AuthKindeBrosertest></AuthKindeBrosertest> */}
                  <Footer />
                </main>
                <Toaster />
              </PaypalProvider>
            </NextIntlClientProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
