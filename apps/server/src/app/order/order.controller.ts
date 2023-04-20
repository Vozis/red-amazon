import {Body, Controller, Get, HttpCode, ParseIntPipe, Post} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import {OrderDto} from './dto/order.dto';
import {PaymentStatusDto} from './dto/payment-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  @Auth()
  async getAllOrders(@CurrentUser('id') id: number) {
    return this.orderService.getAll(id);
  }

  @Post()
  @HttpCode(200)
  @Auth()
  async placeOrder(@CurrentUser('id') id: number,
  @Body() dto: OrderDto
  ) {
    return this.orderService.placeOrder(dto,id);
  }

  @Post('status')
  @HttpCode(200)
  @Auth()
  async changeOrderStatus(
  @Body() dto: PaymentStatusDto
  ) {
    return this.orderService.changeOrderStatus(dto);
  }
}
