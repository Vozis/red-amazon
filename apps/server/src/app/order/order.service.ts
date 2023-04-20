import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto/order.dto';
import {returnProductObject} from '../product/return-product.object';
import YooKassa from 'yookassa'
import {PaymentStatusDto} from './dto/payment-status.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const YooKassa = require('yookassa');

const yooKassa = new YooKassa({
  shopId: process.env.SHOP_ID,
  secretKey: process.env.PAYMENT_TOKEN
});

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll(userId: number) {
    return this.prismaService.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            email: true
          }
        },
        items: {
          select: {
            product: {
              select: returnProductObject
            }
          }
        }
      }
    });
  }

  async placeOrder(dto: OrderDto, userId: number) {
    const total = dto.items.reduce((acc, item) => acc + item.quantity*item.price, 0);


    const order = await this.prismaService.order.create({
      data: {
        status: dto.status,
        items: {
          create: dto.items,
        },
        total,
        user: {
          connect: {
            id: userId,
          }
        }

      }
    })

    const payment = await yooKassa.createPayment({
      amount: {
        value: total.toFixed(2),
        currency: 'RUB'
      },
      payment_method_data: {
        type: 'bank_card'
      },
      confirmation: {
        type: 'redirect',
        return_url: 'http://localhost:3333/thanks'
      },
      description: `Order ${order.id}`,
    })

    return payment;
  }

  async changeOrderStatus(dto:PaymentStatusDto ) {
  if (dto.event === 'payment_waiting_for_capture') {
  const payment = await yooKassa.createPayment(dto.object.id)
    return payment;
  }

  if (dto.event === 'payment_succeeded') {
    console.log(dto);
    // const order = await this.prismaService.order.update({
    //   where: {
    //     id: dto.object.id
    //   },
    //   data: {
    //     status: 'paid'
    //   }
    // })
  }


  }
}
