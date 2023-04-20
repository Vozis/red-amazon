import { BadRequestException, Injectable } from '@nestjs/common';
import { Category, Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { returnUserObject } from './return-user.object';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: UserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: dto.email,
        password: await argon2.hash(dto.password),
        name: faker.name.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number('8-999-###-##-##'),
      },
    });
  }

  async findByPayload(
    data: keyof User,
    value: any,
    selectObject: Prisma.UserSelect = {},
  ) {
    return this.prismaService.user.findUnique({
      where: { [data]: value },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
          },
        },
        ...selectObject,
      },
    });
  }

  async findById(id: number, selectObject: Prisma.UserSelect = {}) {
    const _user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            category: {
              select: {
                slug: true
              }
            },
            reviews: true
          },
        },
        ...selectObject,
      },
    });

    return _user;
  }

  async findByEmail(email: string) {
    const _user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return _user;
  }

  async updateProfile(id: number, dto: UpdateUserDto): Promise<User> {
    if (dto.email) {
      const isSameUser = await this.prismaService.user.findUnique({
        where: { email: dto.email },
      });

      if (isSameUser && id !== isSameUser.id) {
        throw new BadRequestException('Email already in use');
      }
    } else {
      const user = await this.findById(id);

      return this.prismaService.user.update({
        where: { id },
        data: {
          ...dto,
          password: dto.password
            ? await argon2.hash(dto.password)
            : user.password,
        },
      });
    }
  }

  async toggleFavorite(id: number, productId: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isExists = user.favorites.some(product => product.id === productId);

    await this.prismaService.user.update({
      where: { id },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId,
          },
        },
      },
    });

    return (isExists ? 'add to favorites' : 'remove from favorites');
  }
}
