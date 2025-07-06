"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  return (
    <KindeProvider
      cookieDomain={process.env.NEXT_PUBLIC_SERVER_URL} // Ej: ".dominio.com"
      cookieSecure={true}
    >
      {children}
    </KindeProvider>
  );
};
