import { Category } from '@prisma/client';

export type ICategory = Omit<Category, 'createdAt' | 'updatedAt'>;
