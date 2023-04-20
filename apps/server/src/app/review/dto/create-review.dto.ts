import { IsNumber, isNumber, IsString, Max, Min } from 'class-validator';
import { Review } from '@prisma/client';

export class CreateReviewDto {
  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;

  @IsString()
  text: string;
}
