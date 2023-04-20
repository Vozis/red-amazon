import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.usersService.findById(id);
  }

  @Put('profile')
  @Auth()
  async updateProfile(
    @CurrentUser('id') id: number,
    @Body() dto: Partial<UpdateUserDto>,
  ) {
    return this.usersService.updateProfile(id, dto);
  }

  @Patch('profile/favorites/:productId')
  @Auth()
  async toggleFavorite(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser('id') id: number,
  ) {
    return this.usersService.toggleFavorite(id, productId);
  }

  @Get('test')
  @Auth()
  async getTest(@CurrentUser('email') email: number) {
    return this.usersService.findByPayload('email', email);
  }
}
