import { Category } from "./category";
import { Image } from "./image";

export type Product = {
  id: number;
  description: string;
  title: string;
  value: string;
  category: Category;
  image: Image;
};
