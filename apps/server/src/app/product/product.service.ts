import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  returnProductObject,
  returnProductObjectFull,
} from '../product/return-product.object';
import slug from 'slug';
import { UpdateProductDto } from './dto/update-product.dto';
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto';
import { PaginationService } from '../pagination/pagination.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(dto: GetAllProductDto = {}) {
    const { sort, searchTerm } = dto;

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    switch (sort) {
      case EnumProductSort.HIGH_PRICE:
        prismaSort.push({ price: 'desc' });
        break;
      case EnumProductSort.LOW_PRICE:
        prismaSort.push({ price: 'asc' });
        break;
      case EnumProductSort.NEWEST:
        prismaSort.push({ createdAt: 'desc' });
        break;
      case EnumProductSort.OLDEST:
        prismaSort.push({ createdAt: 'asc' });
        break;
      default:
        prismaSort.push({ price: 'desc' });
        break;
    }

    const prismaSearchFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const { perPage, skip } = await this.paginationService.getPagination(dto);

    const products = await this.prismaService.product.findMany({
      where: prismaSearchFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: returnProductObject
    });

    return {
      products,
      length: await this.prismaService.product.count({
        where: prismaSearchFilter,
      }),
    };
  }

  async getById(id: number) {
    const _product = await this.prismaService.product.findUnique({
      where: { id },
      select: returnProductObjectFull,
    });

    if (!_product) {
      throw new NotFoundException('Product not found');
    }

    return _product;
  }

  async getByCategorySlug(categorySlug: string) {
    const _product = await this.prismaService.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: returnProductObjectFull,
    });

    if (!_product) {
      throw new NotFoundException('Product not found');
    }

    return _product;
  }

  async getByPayload(
    data: keyof Prisma.ProductWhereUniqueInput,
    value: number | string,
  ) {
    const _product = await this.prismaService.product.findUnique({
      where: { [data]: value },
      select: returnProductObject,
    });

    if (!_product) {
      throw new NotFoundException('Product not found');
    }

    return _product;
  }

  async getSimilarProducts(id: number) {
    const currentProduct = await this.getById(id);

    if (!currentProduct) {
      throw new NotFoundException('Current product not found');
    }

    const products = await this.prismaService.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name,
        },
        NOT: { id: currentProduct.id },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: returnProductObject,
    });
  }

  async createProduct() {
    const product = await this.prismaService.product.create({
      data: {
        name: '',
        slug: '',
        price: 0,
        description: '',
      },
    });

    return product.id;
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    const _category = await this.categoryService.getById(dto.categoryId);

    if (!_category) {
      throw new NotFoundException('Category not found');
    }

    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        images: dto.images,
        slug: slug(dto.name),
        description: dto.description,
        price: dto.price,
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
      },
    });
  }

  async deleteProduct(id: number) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
