import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

import Heading from '@/ui/Heading';
import Button from '@/ui/button/Button';
import SortDropDown from '@/ui/catalog/SortDropDown';
import ProductItem from '@/ui/catalog/product-item/ProductItem';
import Loader from '@/ui/input/Loader';

import { IProduct, TypePaginationProducts } from '@/types/product.interface';

import {
  EnumProductSort,
  IProductResponse,
} from '@/services/product/product-response.interface';
import { ProductService } from '@/services/product/product.service';

interface ICatalogPagination {
  data: TypePaginationProducts;

  title?: string;
}

const CatalogPagination: FC<ICatalogPagination> = ({
  data,

  title,
}) => {
  const [sortType, setSortType] = useState<EnumProductSort>(
    EnumProductSort.NEWEST,
  );

  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useQuery(
    ['products', sortType, page],
    () =>
      ProductService.getAll({
        page,
        perPage: 4,
        sort: sortType,
      }),
    {
      initialData: data,
    },
  );

  if (isLoading) return <Loader />;

  return (
    <section>
      {title && <Heading>{title}</Heading>}
      <SortDropDown sortType={sortType} setSortType={setSortType} />

      {response.products.length ? (
        <>
          <div className={'grid grid-cols-4 gap-10'}>
            {response.products.map(product => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
          <div className={'text-center mt-10'}>
            {Array.from({ length: response.length / 4 }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <Button
                  className={'mx-3'}
                  key={i}
                  variant={page === pageNumber ? 'orange' : 'white'}
                  size={'sm'}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
        </>
      ) : (
        <p>There are no products</p>
      )}
    </section>
  );
};

export default CatalogPagination;
