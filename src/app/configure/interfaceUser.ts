import { OrderInt } from "./interfaceOrder";

export interface UserInter {
  id: string;
  email: string;
  Order: Array<OrderInt>;
  createdAt: Date;
  updatedAt: Date;
}


export interface UserKindeAuth {
    id: string;
    email: string | null;
    given_name: string | null;
    family_name: string | null;
    picture: string | null;
} 