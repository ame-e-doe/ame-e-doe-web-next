import { Product } from "./product-type";

export type Sales = {
  id: number;
  value: number;
  products: Product[];
};
