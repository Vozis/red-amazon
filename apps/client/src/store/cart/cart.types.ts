import { ICartItem } from '@/types/cart.interface';

export interface ICartInitialState {
  items: ICartItem[];
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {
  discount?: EnumCartDiscount;
}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
  type: 'minus' | 'plus';
}

export enum EnumCartDiscount {
  NONE = '0',

  SMALL = '10',
  MEDIUM = '20',
  LARGE = '30',
  VERY_LARGE = '40',
}
