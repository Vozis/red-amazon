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

import { ReviewService } from './review.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    const reviews = await this.reviewService.getAll();
    return reviews;
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.getById(id);
  }

  @Post('leave/:productId')
  @HttpCode(200)
  @Auth()
  async leaveReview(
    @CurrentUser('id') id: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewService.createReview(id, dto, productId);
  }

  @Put(':id')
  @HttpCode(200)
  @Auth()
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(id, dto);
  }

  @Delete(':id')
  @Auth()
  async deleteReview(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.deleteReview(id);
  }

  @Get('average/:productId')
  @Auth()
  async getAverageRating(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewService.getAverageRating(productId);
  }
}
