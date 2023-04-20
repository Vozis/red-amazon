import { Prisma } from '@prisma/client';

import { returnCategoryObject } from '../category/return-category.object';
import { returnReviewObject } from '../review/return-review.object';

export const returnProductObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  slug: true,
  createdAt: true,
  category: {
    select: returnCategoryObject,
  },
  reviews: {
    select: returnReviewObject,
  },
};

export const returnProductObjectFull: Prisma.ProductSelect = {
  ...returnProductObject,
  reviews: {
    select: returnReviewObject,
  },
  category: {
    select: returnCategoryObject,
  },
};
