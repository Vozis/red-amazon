import { IReview } from '@/types/review.interface';

export interface IReviewResponse extends Pick<IReview, 'rating' | 'text'> {}
