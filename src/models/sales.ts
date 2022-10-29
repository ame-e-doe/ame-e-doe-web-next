import { Product } from "./product";

export type Sales = {
  id: number;
  value: number;
  products: Product[];
};
