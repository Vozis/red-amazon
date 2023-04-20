import { cartSlice } from '@/store/cart/cart-slice';

import * as userActions from './user/user.actions';

export const rootActions = { ...userActions, ...cartSlice.actions };
