import { Product } from '../models/product';

export interface CartResponseDto {
  id: number;
  price: number;
  product: Product;
  quantity: number;
}
