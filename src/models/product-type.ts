import { Category } from "./category-type";
import { Image } from "./image-type";

export type Product = {
  id: number;
  description: string;
  title: string;
  value: string;
  category: Category;
  image: Image;
};
