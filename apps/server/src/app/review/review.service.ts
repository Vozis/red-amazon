import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { returnReviewObject } from '../review/return-review.object';
import { UpdateReviewDto } from '../review/dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductService } from '../product/product.service';
@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async getById(id: number) {
    const _review = await this.prismaService.review.findUnique({
      where: { id },
      select: {
        ...returnReviewObject,
      },
    });

    if (!_review) {
      throw new NotFoundException('Review not found');
    }

    return _review;
  }

  async getAll() {
    return this.prismaService.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnReviewObject,
    });
  }

  async createReview(userId: number, dto: CreateReviewDto, productId: number) {
    const _product = await this.productService.getById(productId);

    if (!_product) {
      throw new NotFoundException('Product not found');
    }

    return this.prismaService.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateReview(id: number, dto: UpdateReviewDto) {
    return this.prismaService.review.update({
      where: {
        id,
      },
      data: {
        rating: dto.rating,
        text: dto.text,
      },
    });
  }

  async deleteReview(id: number) {
    return this.prismaService.review.delete({
      where: {
        id,
      },
    });
  }

  async getAverageRating(productId: number) {
    return this.prismaService.review
      .aggregate({
        where: {
          productId,
        },
        _avg: {
          rating: true,
        },
      })
      .then(data => data._avg);
  }
}
