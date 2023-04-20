import { IReview } from '@/types/review.interface';

import { getContentType } from '@/api/api.helper';
import { axiosClassic, instance } from '@/api/api.interceptor';

import { IReviewResponse } from '@/services/interfaces/review-response.interface';

const REVIEW = 'reviews';

const TypeData = {};
export const ReviewService = {
  async getAverageRating(productId: number) {
    return instance<number>({
      method: 'GET',
      url: `${REVIEW}/average/${productId}`,
    });
  },

  async getAll() {
    return axiosClassic<IReview[]>({
      method: 'GET',
      url: REVIEW,
    });
  },

  async getById(id: string | number) {
    return axiosClassic<IReview>({
      method: 'GET',
      url: `${REVIEW}/${id}`,
    });
  },

  async leave(productId: string | number, data: IReviewResponse) {
    return instance<IReview>({
      method: 'POST',
      url: `${REVIEW}/leave/${productId}`,
      headers: getContentType(),
      data,
    });
  },

  async update(id: string | number, data: Partial<IReviewResponse>) {
    return instance<IReview>({
      method: 'PUT',
      url: `${REVIEW}/${id}`,
      headers: getContentType(),
      data,
    });
  },

  async delete(id: string | number) {
    return instance<IReview>({
      method: 'DELETE',
      url: `${REVIEW}/${id}`,
      headers: getContentType(),
    });
  },
};
