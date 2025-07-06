import { prisma } from '@/db/prisma'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  // Configuración de CORS
  const origin = (await headers()).get('origin') || 'https://tudominio.com';
  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, stripe-signature'
  };

  try {
    console.log("🔔 Webhook received");
    const body = await req.text()
    const signature = (await headers()).get('stripe-signature')

    if (!signature) {
      return new NextResponse('Invalid signature', { 
        status: 400,
        headers: corsHeaders
      })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }

      const session = event.data.object as Stripe.Checkout.Session
      console.log('💰 Payment received for order:', session.metadata?.orderId);

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata')
      }

      const billingAddress = session.customer_details!.address

      // Validación de dirección más segura
      const addressFields = {
        name: session.customer_details!.name || '',
        city: billingAddress?.city || '',
        country: billingAddress?.country || '',
        postalCode: billingAddress?.postal_code || '',
        street: billingAddress?.line1 || '',
        state: billingAddress?.state || null,
      }

      const updatedOrder = await prisma.order.update({
        where: {
          id: orderId,
          isPaid: false // Mejor práctica: solo actualizar órdenes no pagadas
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: addressFields
          },
          billingAddress: {
            create: addressFields
          },
        },
      })

      console.log('✅ Order updated:', updatedOrder.id);
    }

    return new NextResponse(
      JSON.stringify({ result: event, ok: true }),
      {
        status: 200,
        headers: corsHeaders
      }
    )
  } catch (err) {
    console.error('❌ Webhook error:', err)

    return new NextResponse(
      JSON.stringify({ 
        message: 'Something went wrong', 
        ok: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: corsHeaders
      }
    )
  }
}

// Configuración importante para Next.js
export const dynamic = 'force-dynamic'; // Desactiva caching
export const runtime = 'nodejs'; // Especifica el entorno de ejecución