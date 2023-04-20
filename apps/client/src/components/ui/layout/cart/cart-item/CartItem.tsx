import Image from 'next/image';
import { FC } from 'react';

import CartActions from '@/ui/layout/cart/cart-item/cart-actions/CartActions';

import { ICartItem } from '@/types/cart.interface';

import { convertPrice } from '@/utils/convert-price';

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
  return (
    <div className={'flex gap-6 my-6'}>
      <Image
        src={item.product.images[0]}
        alt={item.product.name}
        width={100}
        height={100}
      />
      <div>
        <p className={''}>{item.product.name}</p>
        <p>{convertPrice(item.product.price)}</p>
        <CartActions item={item} />
      </div>
    </div>
  );
};

export default CartItem;
