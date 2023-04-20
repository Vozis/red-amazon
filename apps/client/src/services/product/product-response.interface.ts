import { ICategory } from '@/types/category.interface';
import { IProduct } from '@/types/product.interface';
import { IReview } from '@/types/review.interface';

export interface IProductResponse {
  name: string;
  description?: string;
  price: number;
  images: string[];
  categoryId: number;
}

export type TypeProductFilters = {
  sort?: EnumProductSort;
  searchTerm?: string;
  page?: string | number;
  perPage?: string | number;
};

export enum EnumProductSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}
