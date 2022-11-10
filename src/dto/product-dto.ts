import { Category } from "../models/category-type";
import { Image } from "../models/image-type"
import { ProductImage } from "./product-image-dto";

export interface ProductDto {
    productId: number
    productDescription: string;
    productTitle: string;
    productValue: number;
    productCategory: Category;
    productImage: Image;
  }