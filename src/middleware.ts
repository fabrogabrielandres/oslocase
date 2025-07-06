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
  const isProduction = request.nextUrl.hostname !== "localhost";

  // 1. Configura cookies solo en producción
  if (isProduction) {
    const domain = `.${request.nextUrl.hostname.replace("www.", "")}`;

    // Cookies de Kinde que deben persistir
    ["kinde_session", "access_token", "id_token"].forEach((cookieName) => {
      const cookieValue = request.cookies.get(cookieName)?.value;
      if (cookieValue) {
        response.cookies.set({
          name: cookieName,
          value: cookieValue,
          secure: true,
          sameSite: "none",
          domain: domain,
          path: "/",
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

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const response = NextResponse.next()

//   // Configura cookies para Kinde
//   response.cookies.set({
//     name: 'kinde_session',
//     value: request.cookies.get('kinde_session')?.value || '',
//     sameSite: 'lax',
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//   })

//     response.cookies.set({
//     name: 'access_token',
//     value: request.cookies.get('access_token')?.value || '',
//     sameSite: 'lax',
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//   })

//     response.cookies.set({
//     name: 'id_token',
//     value: request.cookies.get('id_token')?.value || '',
//     sameSite: 'lax',
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//   })

//   // Repite para access_token e id_token si es necesario

//   return response
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|webhook).*)',
//   ],
// }

// import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

// export default withAuth({
//   cookieOptions: {
//     sameSite: "none",
//     secure: true,
//     domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
//   },
// });

// export const config = {
//   matcher: [],
// };
