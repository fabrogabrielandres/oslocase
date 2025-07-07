// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log(request);
  
  const kindeLogoutUrl = `${process.env.KINDE_ISSUER_URL}/logout?redirect=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL || '/')}`;
  
  // Crear respuesta de redirección
  const response = NextResponse.redirect(kindeLogoutUrl);

  // Configurar headers CORS
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Configuración para eliminar cookies
  const deleteOptions = {
    path: "/",
    maxAge: 0,
    sameSite: 'none' as const,
    secure: true,
    ...(process.env.NODE_ENV === 'production' && {
      domain: `.${new URL(process.env.NEXT_PUBLIC_SITE_URL || '').hostname.replace('www.', '')}`
    })
  };

  // Eliminar cookies de autenticación
  (['kinde_session', 'access_token', 'id_token'] as const).forEach(cookieName => {
    response.cookies.set(cookieName, '', deleteOptions);
  });

  return response;
}

// Manejar solicitudes OPTIONS para CORS
export async function OPTIONS() {
  const response = new NextResponse(null, {
    status: 204,
  });

  // Configurar headers CORS para preflight
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}