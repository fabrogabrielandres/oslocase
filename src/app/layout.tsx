import { AuthProvider } from "@/components";
import ReactQueryProvider from "@/components/Provaiders/QueryClientProvider/QueryClientProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default async function RootLayout({ children }: Props) {
  const messages = await getMessages();

  return (
    <>
      <AuthProvider>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </AuthProvider>
    </>
  );
}
