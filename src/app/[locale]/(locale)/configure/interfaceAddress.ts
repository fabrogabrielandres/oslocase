import { OrderInt } from "./interfaceOrder";
export interface ShippingAddressInter {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  state?: string;
  phoneNumber?: string;
  orders: Array<OrderInt>;
}

export interface BillingAddressInter {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  state?: string;
  phoneNumber?: string;
  orders: Array<OrderInt>;
}
