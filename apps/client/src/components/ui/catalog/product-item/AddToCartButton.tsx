import { FC, useState } from 'react';
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';

import { EnumCartDiscount } from '@/store/cart/cart.types';

import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';

import { IProduct } from '@/types/product.interface';

const AddToCartButton: FC<{
  product: IProduct;
  discount: EnumCartDiscount;
}> = ({ product, discount = 0 }) => {
  const { addToCart, removeFromCart } = useActions();

  const { items } = useCart();

  const currentElement = items.find(item => item.product.id === product.id);

  return (
    <div>
      <button
        className={'text-primary'}
        onClick={() =>
          currentElement
            ? removeFromCart({ id: currentElement.id })
            : addToCart({
                product,
                quantity: 1,
                price: product.price * (1 - +discount / 100),
              })
        }
      >
        {currentElement ? <BsFillCartDashFill /> : <BsFillCartPlusFill />}
      </button>
    </div>
  );
};

export default AddToCartButton;
