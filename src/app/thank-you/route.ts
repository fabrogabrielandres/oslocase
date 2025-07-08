import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { isAuthenticated } = getKindeServerSession();
  
  // Verificar autenticación
  const authStatus = await isAuthenticated();
  
  if (!authStatus) {
    // Construir URL de login con return URL
    const loginUrl = new URL('/api/auth/login', request.url);
    loginUrl.searchParams.set('return_url', new URL(request.url).pathname);
    
    return NextResponse.redirect(loginUrl);
  }
  
  // Usuario autenticado - redirigir a página de éxito
  return NextResponse.redirect(new URL('/payment-success', request.url));
}