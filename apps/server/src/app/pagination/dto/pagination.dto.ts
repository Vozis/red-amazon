import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class PaginationDto {
  // @ValidateIf(o => o !== null)
  @IsOptional()
  @IsString()
  page?: string;

  // @ValidateIf(o => o !== null)
  @IsOptional()
  @IsString()
  perPage?: string;
}
