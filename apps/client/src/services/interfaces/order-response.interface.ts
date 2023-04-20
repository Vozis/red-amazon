import { ICartItem } from '@/types/cart.interface';
import { IUser } from '@/types/user.interface';

export enum EnumOrderStatus {
  PENDING = 'pending',
  PAYED = 'payed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

export interface IOrder {
  id: string;
  status: EnumOrderStatus;
  createdAt: string;
  updatedAt: string;
  items: ICartItem[];
  user: IUser;
  total: number;
}
