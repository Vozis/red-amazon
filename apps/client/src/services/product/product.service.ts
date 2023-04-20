import { IProduct, TypePaginationProducts } from '@/types/product.interface';

import { getContentType } from '@/api/api.helper';
import { axiosClassic, instance } from '@/api/api.interceptor';

import {
  IProductResponse,
  TypeProductFilters,
} from '@/services/product/product-response.interface';

const PRODUCT = 'products';

export const ProductService = {
  async getAll(queryData = {} as TypeProductFilters) {
    const { data } = await axiosClassic<TypePaginationProducts>({
      method: 'GET',
      url: PRODUCT,
      params: queryData,
    });

    return data;
  },

  async getSimilarProducts(id: string | number) {
    return axiosClassic<IProduct[]>({
      method: 'GET',
      url: `${PRODUCT}/similar/${id}`,
    });
  },

  async getBySlug(slug: string) {
    return axiosClassic<IProduct>({
      method: 'GET',
      url: `${PRODUCT}/by-slug/${slug}`,
    });
  },

  async getByCategorySlug(categorySlug: string) {
    return axiosClassic<IProduct>({
      method: 'GET',
      url: `${PRODUCT}/by-category/${categorySlug}`,
    });
  },

  async getById(id: string | number) {
    return instance<IProduct>({
      method: 'GET',
      url: `${PRODUCT}/${id}`,
    });
  },

  async create() {
    return instance<IProduct>({
      method: 'POST',
      url: `${PRODUCT}`,
      headers: getContentType(),
    });
  },

  async update(id: string | number, data: Partial<IProductResponse>) {
    return instance<IProduct>({
      method: 'PUT',
      url: `${PRODUCT}/${id}`,
      headers: getContentType(),
      data,
    });
  },

  async delete(id: string | number) {
    return instance<IProduct>({
      method: 'DELETE',
      url: `${PRODUCT}/${id}`,
      headers: getContentType(),
    });
  },
};
