import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './auth.dto';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: UserDto) {
    const _user = await this.usersService.findByEmail(dto.email);

    if (_user) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.usersService.create(dto);

    const tokens = this._createTokens(user);

    return {
      user: this._returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const tokens = this._createTokens(user);

    return {
      user: this._returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verify(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findById(result.id);

    const tokens = this._createTokens(user);
    return {
      user: this._returnUserFields(user),
      ...tokens,
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordEqual = await argon2.verify(user.password, pass);

    if (!passwordEqual) {
      throw new UnauthorizedException('Invalid password');
    }

    if (user && passwordEqual) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private _createTokens(user: Partial<User>) {
    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private _returnUserFields(user: Partial<User>) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
