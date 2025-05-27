import { OrderInt } from "./interfaceOrder";

export interface UserInter {
  id: string;
  email: string;
  Order: Array<OrderInt>;
  createdAt: Date;
  updatedAt: Date;
}
