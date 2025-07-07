// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const kindeLogoutUrl = `${
    process.env.KINDE_ISSUER_URL
  }/logout?redirect=${encodeURIComponent(
    process.env.NEXT_PUBLIC_SITE_URL || "/"
  )}`;
  const response = NextResponse.redirect(kindeLogoutUrl);
  console.log("request",request);

  // Configuración para eliminar cookies
  const deleteOptions = {
    path: "/" as const,
    maxAge: 0,
    ...(process.env.NODE_ENV === "production" && {
      domain: `.${new URL(
        process.env.NEXT_PUBLIC_SITE_URL || ""
      ).hostname.replace("www.", "")}`,
    }),
  };

  // Eliminar cada cookie individualmente
  (["kinde_session", "access_token", "id_token"] as const).forEach(
    (cookieName) => {
      response.cookies.set(
        cookieName,
        "", // Valor vacío
        deleteOptions
      );
    }
  );

  return response;
}
