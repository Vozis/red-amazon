import { FC } from 'react';

import Heading from '@/ui/Heading';
import Button from '@/ui/button/Button';
import SortDropDown from '@/ui/catalog/SortDropDown';
import ProductItem from '@/ui/catalog/product-item/ProductItem';
import Loader from '@/ui/input/Loader';

import { IProduct } from '@/types/product.interface';

interface ICatalog {
  products: IProduct[];
  isLoading?: boolean;
  title?: string;
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
  if (isLoading) return <Loader />;

  return (
    <section>
      {title && <Heading className={'mb-3'}>{title}</Heading>}
      {products.length ? (
        <>
          <div className={'grid grid-cols-4 gap-10'}>
            {products.map(product => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </>
      ) : (
        <p>There are no products</p>
      )}
    </section>
  );
};

export default Catalog;
