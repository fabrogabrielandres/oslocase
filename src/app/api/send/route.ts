import { ShippingAddressInter } from "@/app/configure/interfaceAddress";
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
import { CreateEmailResponseSuccess, Resend } from "resend";

export interface SendEmailRequestBody {
  shippingAddress: Partial<ShippingAddressInter>;
  orderId: string;
  orderDate: string;
  email: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body: SendEmailRequestBody = await request.json();
  const { email, orderDate, orderId, shippingAddress } = body;
  console.log("body", body);
  console.log("{ email, orderDate, orderId, shippingAddress }", {
    email,
    orderDate,
    orderId,
    shippingAddress,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: "oslocase@resend.dev",
      to: [email],
      subject: "Thanks for your order!",
      react: OrderReceivedEmail({
        orderId: orderId,
        orderDate: "orderDate",
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

    return Response.json(data as CreateEmailResponseSuccess);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
