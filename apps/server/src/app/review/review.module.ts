import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [PrismaModule, ProductModule],
})
export class ReviewModule {}
