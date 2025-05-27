import { ConfigurationInterface } from "./interfaceConfigure";
import { UserInter } from "./interfaceUser";
export interface OrderInt {
  id: string;
  configurationId: string;
  configuration: ConfigurationInterface;
  user: UserInter;
  userId: string;
  amount: number;
  isPaid: boolean;
  status: OrderStatusInter;

  //   shippingAddress   ShippingAddress
  shippingAddressId: string;
  //   billingAddress    BillingAddress
  billingAddressId: string;

  //   createdAt
  //   updated
}

export type OrderStatusInter = "fulfilled" | "shipped" | "awaiting_shipment";
