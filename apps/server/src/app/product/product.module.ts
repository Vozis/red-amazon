import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PaginationModule } from '../pagination/pagination.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule, PaginationModule, CategoryModule],
  exports: [ProductService],
})
export class ProductModule {}
