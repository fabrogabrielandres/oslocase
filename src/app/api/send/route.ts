import { ShippingAddressInter } from "@/app/configure/interfaceAddress";
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
import { Resend } from "resend";

export interface SendEmailRequestBody {
  shippingAddress: Partial<ShippingAddressInter>;
  orderId: string;
  orderDate: Date;
  email: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
resend.domains.create({ name: "example.com" });

export async function POST(request: Request) {
  const body: SendEmailRequestBody = await request.json();
  const { email, orderDate, orderId, shippingAddress } = body;

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Thanks for your order!",
      react: OrderReceivedEmail({
        orderId: orderId,
        orderDate: orderDate.toLocaleDateString(),
        shippingAddress: {
          name: shippingAddress.name,
          city: shippingAddress.city,
          country: shippingAddress.country,
          postalCode: shippingAddress.postalCode,
          street: shippingAddress.street,
          state: shippingAddress.state,
        },
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
