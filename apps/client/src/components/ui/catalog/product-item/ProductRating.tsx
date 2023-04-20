import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

import { IProduct } from '@/types/product.interface';
import { IReview } from '@/types/review.interface';

import { ReviewService } from '@/services/review.service';

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
  const [rating, setRating] = useState(
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length,
    ) || 0,
  );

  return (
    <div className={''}>
      <p className={'mr-1 flex items-center'}>
        <Rating
          readonly
          initialValue={rating}
          SVGstyle={{
            display: 'inline-block',
          }}
          size={20}
          allowFraction
          transition
        />
        <span className={'text-primary ml-2'}>{rating}</span>
      </p>
      <span className={'text-sm'}>{product.reviews.length} reviews</span>
    </div>
  );
};

export default ProductRating;
