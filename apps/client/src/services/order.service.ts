import { ICartItem } from '@/types/cart.interface';

import { getContentType } from '@/api/api.helper';
import { instance } from '@/api/api.interceptor';

import { IOrder } from '@/services/interfaces/order-response.interface';

const ORDER = 'orders';

enum EnumOrderStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

type TypeData = {
  status?: EnumOrderStatus;
  items: {
    quantity: number;
    price: number;
    productId: number;
  }[];
};
export const OrderService = {
  async getAll() {
    return instance<IOrder[]>({
      method: 'GET',
      url: ORDER,
    });
  },

  async placeOrder(data: TypeData) {
    return instance<{ confirmation: { confirmation_url: string } }>({
      method: 'POST',
      url: ORDER,
      data,
    });
  },
};
