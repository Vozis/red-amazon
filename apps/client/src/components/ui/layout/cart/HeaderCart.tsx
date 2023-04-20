import { useMutation } from '@tanstack/react-query';
import cn from 'clsx';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';

import Button from '@/ui/button/Button';
import SquareButton from '@/ui/button/SquareButton';
import CartItem from '@/ui/layout/cart/cart-item/CartItem';

import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';
import { useOutside } from '@/hooks/useOutside';

import { convertPrice } from '@/utils/convert-price';

import { OrderService } from '@/services/order.service';

const HeaderCart: FC = () => {
  const { ref, isShow, setIsShow } = useOutside(true);

  const { items, total } = useCart();

  const { reset } = useActions();
  const { push } = useRouter();

  const { mutate } = useMutation(
    ['create order and payment'],
    () =>
      OrderService.placeOrder({
        items: items.map(item => ({
          quantity: item.quantity,
          price: item.price,
          productId: item.product.id,
        })),
      }),
    {
      onSuccess: ({ data }) => {
        push(data.confirmation.confirmation_url).then(() => reset());
      },
    },
  );

  return (
    <div className={'relative'} ref={ref}>
      <SquareButton
        Icon={RiShoppingCartLine}
        onClick={() => setIsShow(!isShow)}
        number={items.length}
      />
      <div
        className={cn(
          'absolute top-[4.2rem] -left-[12.5rem] w-80 z-20 bg-secondary rounded-xl px-5 py-3 text-sm menu text-white',
          isShow ? 'open-menu' : 'close-menu',
        )}
      >
        <p className={'font-normal text-lg mb-5'}>My Cart</p>

        <div>
          {items.length ? (
            items.map(item => <CartItem key={item.id} item={item} />)
          ) : (
            <p className={'font-light'}>Cart is Empty</p>
          )}
        </div>
        <div>
          <p>Total:</p>
          <p>{convertPrice(total)}</p>
        </div>
        <div className={'text-center'}>
          <Button
            variant={'white'}
            size={'sm'}
            className={'btn-link mt-5 mb-2'}
            onClick={() => mutate()}
          >
            Place order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
