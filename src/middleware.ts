// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(es|en|no)/:path*']
// };

// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// const intlMiddleware = createMiddleware(routing);

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function middleware(req: any) {
//   const pathname = req.nextUrl.pathname;

//   // Excluye las rutas de API y auth-callback
//   if (pathname.startsWith("/api") || pathname.startsWith("/auth-callback")) {
//     return;
//   }

//   return intlMiddleware(req);
// }

// export const config = {
//   matcher: ["/", "/(es|en|no)/:path*"],
// };

// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// const intlMiddleware = createMiddleware(routing);

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function middleware(req: any) {
//   const pathname = req.nextUrl.pathname;

//   // Excluye las rutas de API y auth-callback
//   if (pathname.startsWith("/api") || pathname.startsWith("/auth-callback")) {
//     return;
//   }

//   return intlMiddleware(req);
// }

// export const config = {
//   matcher: ["/", "/(es|en|no)/:path*"],
// };

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
//   const isProduction = request.nextUrl.hostname !== 'localhost';

//   // 1. Configura cookies solo en producción
//   if (isProduction) {
//     const domain = `.${request.nextUrl.hostname.replace('www.', '')}`;

//     // Cookies de Kinde que deben persistir
//     ['kinde_session', 'access_token', 'id_token'].forEach(cookieName => {
//       const cookieValue = request.cookies.get(cookieName)?.value;
//       if (cookieValue) {
//         response.cookies.set({
//           name: cookieName,
//           value: cookieValue,
//           secure: true,
//           sameSite: 'none',
//           domain: domain,
//           path: '/'
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





import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isProduction = request.nextUrl.hostname !== 'localhost';
  const domain = isProduction ? `.${request.nextUrl.hostname.replace('www.', '')}` : undefined;

  // 1. Manejo especial para logout - Eliminar cookies
  if (request.nextUrl.pathname === '/api/auth/logout') {
    const logoutResponse = NextResponse.redirect(new URL('/', request.url));
    
    ['kinde_session', 'access_token', 'id_token'].forEach(cookieName => {
      logoutResponse.cookies.delete(cookieName);
      // Forzar eliminación en producción
      if (isProduction) {
        logoutResponse.cookies.set({
          name: cookieName,
          value: '',
          expires: new Date(0),
          secure: true,
          sameSite: 'none',
          domain: domain,
          path: '/'
        });
      }
    });
    
    return logoutResponse;
  }

  // 2. Configura cookies en producción (rutas normales)
  if (isProduction) {
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
    "/((?!_next/static|_next/image|favicon.ico|login|api/webhooks).*)",
  ],
};