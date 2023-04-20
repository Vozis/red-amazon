import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    const categories = await this.categoryService.getAll();
    return categories;
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.getByPayload('slug', slug);
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getByPayload('id', id);
  }

  @Put(':id')
  @HttpCode(200)
  @Auth()
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Post()
  @Auth()
  @HttpCode(200)
  async createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory();
  }

  @Delete(':id')
  @Auth()
  @HttpCode(200)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
