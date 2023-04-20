import { ICategory } from '@/types/category.interface';

import { getContentType } from '@/api/api.helper';
import { axiosClassic, instance } from '@/api/api.interceptor';

const CATEGORY = 'category';
export const CategoryService = {
  async getAll() {
    return axiosClassic<ICategory[]>({
      method: 'GET',
      url: CATEGORY,
    });
  },

  async getById(id: string | number) {
    return instance<ICategory>({
      method: 'GET',
      url: `${CATEGORY}/${id}`,
    });
  },

  async getBySlug(slug: string) {
    return axiosClassic<ICategory>({
      method: 'GET',
      url: `${CATEGORY}/by-slug/${slug}`,
    });
  },

  async create() {
    return instance<ICategory>({
      method: 'POST',
      url: CATEGORY,
      headers: getContentType(),
    });
  },

  async update(id: string | number, name: string) {
    return instance<ICategory>({
      method: 'PUT',
      url: `${CATEGORY}/${id}`,
      headers: getContentType(),
      data: { name },
    });
  },

  async delete(id: string | number) {
    return instance<ICategory>({
      method: 'DELETE',
      url: `${CATEGORY}/${id}`,
      headers: getContentType(),
    });
  },
};
