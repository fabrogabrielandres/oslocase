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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isProduction = request.nextUrl.hostname !== 'localhost';

  // 1. Configura cookies solo en producción
  if (isProduction) {
    const domain = `.${request.nextUrl.hostname.replace('www.', '')}`;

    // Cookies de Kinde que deben persistir
    ['kinde_session', 'access_token', 'id_token'].forEach(cookieName => {
      const cookieValue = request.cookies.get(cookieName)?.value;
      if (cookieValue) {
        response.cookies.set({
          name: cookieName,
          value: cookieValue,
          secure: true,
          sameSite: 'none',
          domain: domain,
          path: '/'
        });
      }
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|login|api/webhooks|auth).*)",
  ],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();
//   const isProduction = process.env.NODE_ENV === "production";
//   const domain = isProduction
//     ? `.${request.nextUrl.hostname.replace("www.", "")}`
//     : undefined;

//   // 1. Manejo especial para rutas de autenticación de Kinde
//   if (request.nextUrl.pathname.startsWith("/api/auth")) {
//     // Para logout - borrar cookies
//     if (request.nextUrl.pathname === "/api/auth/logout") {
//       const logoutResponse = NextResponse.redirect(new URL("/", request.url));

//       ["kinde_session", "access_token", "id_token"].forEach((cookieName) => {
//         // Eliminación segura en todos los entornos
//         logoutResponse.cookies.set({
//           name: cookieName,
//           value: "",
//           maxAge: -1, // Esto expira la cookie inmediatamente
//           path: "/",
//           domain: domain,
//           secure: isProduction,
//           sameSite: isProduction ? "none" : "lax",
//         });
//       });

//       return logoutResponse;
//     }

//     // Para otras rutas de auth, no modificar la respuesta
//     return response;
//   }

//   // 2. Configuración de cookies para rutas normales (solo en producción)
//   if (isProduction) {
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
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };


