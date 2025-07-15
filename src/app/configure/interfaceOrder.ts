import { BillingAddressInter, ShippingAddressInter } from "./interfaceAddress";
import { ConfigurationInterface } from "./interfaceConfigure";
import { UserInter } from "./interfaceUser";
export interface OrderInt {
  id?: string;
  configurationId: string;
  configuration: ConfigurationInterface;
  user: UserInter;
  userId: string;
  amount: number;
  isPaid: boolean;
  status: OrderStatusInter;

  shippingAddress: ShippingAddressInter;
  shippingAddressId: string;
  billingAddress: BillingAddressInter;
  billingAddressId: string;
  createdAt: Date;
  updated: Date;
  transactionId: string;
}

export type OrderStatusInter = "fulfilled" | "shipped" | "awaiting_shipment";
