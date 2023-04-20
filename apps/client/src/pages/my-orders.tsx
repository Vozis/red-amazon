import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';

import Heading from '@/ui/Heading';
import Meta from '@/ui/Meta';
import Layout from '@/ui/layout/Layout';

import { NextPageAuth } from '@/providers/auth-provider/auth-page.type';

import { convertPrice } from '@/utils/convert-price';

import { OrderService } from '@/services/order.service';

const MyOrdersPage: NextPageAuth = () => {
  const { data: orders } = useQuery(
    ['my orders'],
    () => OrderService.getAll(),
    {
      select: ({ data }) => data,
    },
  );

  return (
    <Meta title={'Orders'}>
      <Layout>
        <Heading>My orders</Heading>
        <section className={'flex flex-col gap-5 mt-5'}>
          {orders && orders.length ? (
            orders.map(order => (
              <div
                key={order.id}
                className={'bg-white shadow-sm rounded-lg p-5 flex gap-10'}
              >
                <p>id: #{order.id}</p>
                <p>status: {order.status}</p>
                <p>date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>total price: {convertPrice(order.total)}</p>
              </div>
            ))
          ) : (
            <p>Orders not found</p>
          )}
        </section>
      </Layout>
    </Meta>
  );
};

MyOrdersPage.isOnlyUser = true;
export default MyOrdersPage;
