import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  IAddToCartPayload,
  ICartInitialState,
  IChangeQuantityPayload,
} from '@/store/cart/cart.types';

const initialState: ICartInitialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const isExist = state.items.some(
        item => item.product.id === action.payload.product.id,
      );

      if (!isExist) {
        state.items.push({ ...action.payload, id: state.items.length });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const newCartItems = state.items.filter(
        item => item.id !== action.payload.id,
      );
      state.items = newCartItems;
    },
    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const { id, type } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) type === 'plus' ? item.quantity++ : item.quantity--;
    },
    reset: state => initialState,
  },
});
