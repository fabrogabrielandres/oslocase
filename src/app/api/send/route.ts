// import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY!); // Usa variables de entorno

// export async function POST(request: Request) {
//   // Configura los headers CORS
//   const headers = {
//     "Access-Control-Allow-Origin": "*", // O reemplaza * con tu dominio en producción
//     "Access-Control-Allow-Methods": "POST, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type",
//   };

//   // Maneja la preflight request (OPTIONS)
//   if (request.method === "OPTIONS") {
//     return new Response(null, {
//       headers,
//     });
//   }

//   try {
//     const { data, error } = await resend.emails.send({
//       from: "CaseCobra <fabrogabrielandres@gmail.com>",
//       to: ["fabrogabi@gmail.com"],
//       subject: "Thanks for your order!",
//       react: OrderReceivedEmail({
//         orderId: "laskjdf",
//         orderDate: new Date().toLocaleDateString(),
//         shippingAddress: {
//           name: "session.customer_details!.name!",
//           city: "shippingAddress!.city!",
//           country: "shippingAddress!.country!",
//           postalCode: "shippingAddress!.postal_code!",
//           street: "shippingAddress!.line1!",
//           state: "shippingAddress!.state",
//         },
//       }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500, headers });
//     }

//     return Response.json(data, { headers });
//   } catch (error) {
//     return Response.json({ error }, { status: 500, headers });
//   }
// }

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
resend.domains.create({ name: 'example.com' });

export async function GET() {
  console.log("holaa");
  
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["fabrogabrielandres@gmail.com"],
      subject: "Hello world",
      // react: EmailTemplate({ firstName: "John" }),
      html: '<h1>helloa</h1>'
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
