import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthDto, TokenDto } from './auth.dto';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-new-tokens')
  async getNewTokens(@Body() dto: TokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }
}
