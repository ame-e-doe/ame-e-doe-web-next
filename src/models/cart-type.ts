import { CartItem } from "./cart-item-type";

export type CartType = {
  cartItems: CartItem[] | null;
  total: number;
};
