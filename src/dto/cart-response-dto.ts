import { Product } from "../models/product-type";

export interface CartResponseDto {
  id: number;
  price: number;
  product: Product;
  quantity: number;
}
