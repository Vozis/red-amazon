import {EnumOrderItemStatus} from '@prisma/client';
import {ArrayMinSize, IsArray, IsEnum, IsOptional, ValidateIf, ValidateNested} from 'class-validator';
import {OrderItemDto} from './order-item.dto';
import {Type} from 'class-transformer';


export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderItemStatus)
  status: EnumOrderItemStatus;


  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}
