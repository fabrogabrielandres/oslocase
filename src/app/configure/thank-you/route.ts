import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request) {
  const { getUser } = getKindeServerSession();
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id');
  
  // 1. Verificar sesión de Stripe
  const stripeSession = await stripe.checkout.sessions.retrieve(sessionId!);
  
  // 2. Recuperar usuario desde metadata o cookie
  const user = await getUser();
  const userIdFromMetadata = stripeSession.metadata?.user_id;

  // 3. Si no hay sesión activa pero tenemos user_id en metadata
  if (!user && userIdFromMetadata) {
    const redirectUrl = new URL('/api/auth/login', request.url);
    redirectUrl.searchParams.set('post_login_redirect_url', `/thank-youu?session_id=${sessionId}`);
    return NextResponse.redirect(redirectUrl);
  }

  // 4. Redirigir a página de éxito con parámetros
  const successUrl = new URL('/thank-youu', request.url);
  successUrl.searchParams.set('session_id', sessionId!);
  
  return NextResponse.redirect(successUrl);
}