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
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetAllProductDto } from './dto/get-all.product.dto';
import { Auth } from '../auth/decorators/auth.decorator';

import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto);
  }

  @Get('similar/:id')
  async getSimilarProducts(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getSimilarProducts(id);
  }

  @Get('by-slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.getByPayload('slug', slug);
  }

  @Get('by-category/:categorySlug')
  async getProductByCategorySlug(@Param('categorySlug') categorySlug: string) {
    return this.productService.getByCategorySlug(categorySlug);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getById(id);
  }

  @Post()
  @HttpCode(200)
  @Auth()
  async createProduct() {
    return this.productService.createProduct();
  }

  @Put(':id')
  @HttpCode(200)
  @Auth()
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  @Auth()
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
