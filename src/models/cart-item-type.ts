import { Product } from "./product-type";

export type CartItem = {
  id: number;
  quantity: number;
  price: number;
  product: Product;
};
