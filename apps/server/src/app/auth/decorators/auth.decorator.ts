import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';

export const Auth = () => UseGuards(JwtAuthGuard);
