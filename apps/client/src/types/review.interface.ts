import { IUser } from '@/types/user.interface';

export interface IReview {
  id: number;
  createdAt: string;
  rating: number;
  text: string;
  user: IUser;
}
