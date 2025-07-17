"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { setTransactionIdMyDb } from "@/actions/payment/setTransactionIdMyDb";
import { paypalCheckPayment } from "@/actions/payment/paypal-check-payment";
import { useRouter } from "next/navigation";
import { ShippingAddressInter } from "@/app/configure/interfaceAddress";


interface Props {
  configurationId: string;
  userId: string;
  amount: number;
}

export const PayPalButton = ({ configurationId, userId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const createOrder = await setTransactionIdMyDb({
      configurationId,
      userId,
      amount,
    });
    if (!createOrder.order) {
      throw new Error("No se pudo crear la orden");
    }

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: createOrder.order!.id,
          amount: {
            value: `${createOrder.order!.amount}`,
            currency_code: "USD",
          },
        },
      ],
      application_context: {
        shipping_preference: "GET_FROM_FILE", // Obliga a ingresar dirección
        user_action: "PAY_NOW",
      },
      intent: "CAPTURE",
    });

    const orderUpdateWithTransctionId = await setTransactionIdMyDb({
      configurationId,
      userId,
      amount,
      transactionId,
    });
    const { message, ok } = orderUpdateWithTransctionId;

    if (ok === null) {
      throw new Error(`No se pudo actualizar la orden ${message}`);
    }
    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log("se aprobo data", data);
    console.log("se aprobo actions", actions);
    const details = await actions.order?.capture();
    console.log("details", details);

    if (!details) return;
    const address: Partial<ShippingAddressInter> = {
      name: details.purchase_units?.[0]?.shipping?.name?.full_name,
      street: details.purchase_units?.[0]?.shipping?.address?.address_line_1,
      city:
        details.purchase_units?.[0]?.shipping?.address?.admin_area_1 ||
        details.purchase_units?.[0]?.shipping?.address?.admin_area_2 ||
        "",
      postalCode:
        details.purchase_units?.[0]?.shipping?.address?.postal_code || "",
      country:
        details.purchase_units?.[0]?.shipping?.address?.country_code || "",
    };

    const { url, OrderUpdate } = await paypalCheckPayment({
      paypalTransactionId: details.id!,
      address,
    });
    console.log(OrderUpdate);
    
    
    if (url) router.push(url);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons
        createOrder={createOrder}
        onError={(error) => {
          console.error("PayPal Button Error:", error);
        }}
        onApprove={onApprove}
      />
    </div>
  );
};
