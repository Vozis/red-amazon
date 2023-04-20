import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async getMainStatistics(userId: number) {
    const user = await this.usersService.findById(userId, {
      orders: {
        select: {
          items: true,
        },
      },
      reviews: true,
    });

    const orders = user.orders;

    console.log(orders);

    return [
      {
        name: 'Orders',
        value: user.orders.length,
      },
      {
        name: 'Reviews',
        value: user.reviews.length,
      },
      {
        name: 'Favorites',
        value: user.favorites.length,
      },
      {
        name: 'Total amount',
        value: 1000,
      },
    ];
  }
}
