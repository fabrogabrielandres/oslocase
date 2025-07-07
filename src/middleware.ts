// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export function middleware(request: NextRequest) {
//   return NextResponse.next();
// }

// // Opcional: Configurar matcher para filtrar rutas
// export const config = {
//   matcher: [
//     /*
//      * Match todas las rutas excepto:
//      * - _next/static (archivos estáticos)
//      * - _next/image (imágenes optimizadas)
//      * - favicon.ico
//      * - rutas públicas (opcional)
//      */
//     "/((?!_next/static|_next/image|favicon.ico|login|api).*)",
//   ],
// };

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const isProduction = request.nextUrl.hostname !== "localhost";
    const isAuthApiPath = request.nextUrl.pathname.startsWith("/api/auth");

    if (isAuthApiPath) {
      return response;
    }

    const authCookies = ["kinde_session", "access_token", "id_token"] as const;

    authCookies.forEach((cookieName) => {
      const cookieValue = request.cookies.get(cookieName)?.value;

      if (cookieValue) {
        // Configuración de cookies con tipos explícitos
        const cookieOptions = {
          secure: isProduction,
          sameSite: (isProduction ? "none" : "lax") as
            | "none"
            | "lax"
            | "strict",
          path: "/" as const,
          ...(isProduction && {
            domain: `.${request.nextUrl.hostname.replace("www.", "")}`,
          }),
        };

        const currentCookie = request.cookies.get(cookieName);
        if (!currentCookie || currentCookie.value !== cookieValue) {
          // Sintaxis correcta y completamente tipada
          response.cookies.set(cookieName, cookieValue, cookieOptions);
        }
      }
    });

    return response;
  },
  {
    publicPaths: [
      "/",
      "/api/auth",
      "/api/kinde_callback",
      "/api/uploadthing",
      "/api/webhooks",
      "/configure",
      "/configure/design",
      "/configure/preview",
      "/configure/upload",
      "/thank-you",
    ],
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
