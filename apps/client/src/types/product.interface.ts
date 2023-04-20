import { ICategory } from '@/types/category.interface';
import { IReview } from '@/types/review.interface';

export interface IProduct {
  id: number;
  createdAt: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: ICategory;
  reviews: IReview[];
}

export interface IProductDetails {
  products: IProduct;
}

export type TypeProducts = {
  products: IProduct[];
};

export type TypePaginationProducts = {
  length: number;
  products: IProduct[];
};
