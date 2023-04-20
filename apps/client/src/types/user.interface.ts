import { User } from '@prisma/client';

import { IProduct } from '@/types/product.interface';

import { IOrder } from '@/services/interfaces/order-response.interface';

// export interface IUser extends Omit<User, 'createdAt' | 'updatedAt'> {
//   id: number;
//   createdAt: Date;
//   updatedAt: Date;
//   email: string;
//   password: string;
//   name: string;
//   avatarPath: string;
//   phone: string | null;
// }
export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  avatarPath: string;
  phone: string;
}

export interface IFullUser extends IUser {
  favorites: IProduct[];
  orders: IOrder[];
}
