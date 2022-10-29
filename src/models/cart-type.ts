import { CartItem } from "./cart-item-type";

export type CartType = {
  cartItems: CartItem[];
  total: number;
};
