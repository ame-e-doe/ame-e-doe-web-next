import { Category } from "./category-type";
import { Image } from "./image-type";

export type Product = {
  id: number;
  description: string;
  title: string;
  value: number;
  category: Category;
  image: Image;
};
