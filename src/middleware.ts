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


import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function middleware(req: any) {
  const pathname = req.nextUrl.pathname;

  // Excluye las rutas de API y auth-callback
  if (pathname.startsWith("/api") || pathname.startsWith("/auth-callback")) {
    return;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(es|en|no)/:path*"],
};