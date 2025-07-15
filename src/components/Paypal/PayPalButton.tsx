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
    if (!details) return;
    const { url } = await paypalCheckPayment(details.id!);
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
