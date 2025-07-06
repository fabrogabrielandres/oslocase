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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();
//   const isProduction = request.nextUrl.hostname !== "localhost";

//   // 1. Configura cookies solo en producción
//   if (isProduction) {
//     const domain = `.${request.nextUrl.hostname.replace("www.", "")}`;

//     // Cookies de Kinde que deben persistir
//     ["kinde_session", "access_token", "id_token"].forEach((cookieName) => {
//       const cookieValue = request.cookies.get(cookieName)?.value;
//       if (cookieValue) {
//         response.cookies.set({
//           name: cookieName,
//           value: cookieValue,
//           secure: true,
//           sameSite: "none",
//           domain: domain,
//           path: "/",
//         });
//       }
//     });
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|login|api/webhooks|auth).*)",
//   ],
// };

import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(async function middleware(req: unknown) {
  console.log("look at me", req);
  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
