import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { returnCategoryObject } from './return-category.object';
import { Category, Prisma, User } from '@prisma/client';
import slug from 'slug';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByPayload(
    data: keyof Prisma.CategoryWhereUniqueInput,
    value: number | string,
  ) {
    const _category = await this.prismaService.category.findUnique({
      where: { [data]: value },
      select: returnCategoryObject,
    });

    if (!_category) {
      throw new NotFoundException('Category not found');
    }

    return _category;
  }

  async getBySlug(slug: string) {
    const _category = await this.prismaService.category.findUnique({
      where: { slug },
      select: returnCategoryObject,
    });

    if (!_category) {
      throw new NotFoundException('Category not found');
    }

    return _category;
  }

  async getById(id: number) {
    const _category = await this.prismaService.category.findUnique({
      where: { id },
      select: {
        ...returnCategoryObject,
      },
    });

    if (!_category) {
      throw new NotFoundException('Category not found');
    }

    return _category;
  }

  async getAll() {
    return this.prismaService.category.findMany({
      select: returnCategoryObject,
    });
  }

  async createCategory() {
    return this.prismaService.category.create({
      data: {
        name: '',
        slug: '',
      },
    });
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: slug(dto.name),
      },
    });
  }

  async deleteCategory(id: number) {
    return this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
