import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

import AddToCartButton from '@/ui/catalog/product-item/AddToCartButton';
import ProductRating from '@/ui/catalog/product-item/ProductRating';

import { EnumCartDiscount } from '@/store/cart/cart.types';

import { IProduct } from '@/types/product.interface';

import { convertPrice } from '@/utils/convert-price';

const DynamicFavoriteButton = dynamic(() => import('./FavoriteButton'), {
  ssr: false,
});
const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  const [discount, setDiscount] = useState<EnumCartDiscount>(
    EnumCartDiscount.NONE,
  );

  return (
    <div className={'animate-scaleIn'}>
      <div className={'bg-white rounded-xl relative overflow-hidden p-3'}>
        <div className={'absolute top-2 right-2 z-2'}>
          <DynamicFavoriteButton productId={product.id} />
          <AddToCartButton product={product} discount={discount} />
        </div>
        <Link href={`/products/by-slug/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={250}
            height={250}
          />
        </Link>
        <Link href={`/products/by-slug/${product.slug}`}>
          <h3 className={'my-2 font-semibold'}>{product.name}</h3>
        </Link>
        <Link
          className={'text-blue text-xs mb-2'}
          href={`/category/${product.category.slug}`}
        >
          {product.category.name}
        </Link>
        <ProductRating product={product} />
        <p className={'text-2xl font-semibold'}>
          {convertPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
