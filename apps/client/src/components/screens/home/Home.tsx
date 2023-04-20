import Cookies from 'js-cookie';
import { FC, PropsWithChildren } from 'react';

import Meta from '@/ui/Meta';
import CatalogPagination from '@/ui/catalog/CatalogPagination';
import Layout from '@/ui/layout/Layout';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import { CookieEnum } from '@/types/cookie.enum';
import { TypePaginationProducts } from '@/types/product.interface';

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
  const { user } = useAuth();
  const { logout } = useActions();

  return (
    <>
      <Meta title={'Home'}>
        <Layout>
          <CatalogPagination
            data={{ products, length }}
            title={'Fresh products'}
          />
        </Layout>
      </Meta>
    </>
  );
};

export default Home;
