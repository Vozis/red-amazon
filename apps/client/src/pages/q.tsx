import { useQuery, useQueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Meta from '@/ui/Meta';
import Catalog from '@/ui/catalog/Catalog';
import Layout from '@/ui/layout/Layout';

import { ProductService } from '@/services/product/product.service';

const SearchPage: NextPage = () => {
  const { query } = useRouter();

  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries(['search products']);

  const { data } = useQuery(['search products', query, query.term], () =>
    ProductService.getAll({
      searchTerm: query.term as string,
    }),
  );

  return (
    <Meta title={'Search'}>
      <Layout>
        <Catalog
          products={data?.products || []}
          title={`Поиск по запросу "${query.term || ''}"`}
        />
      </Layout>
    </Meta>
  );
};

export default SearchPage;
