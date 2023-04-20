import { Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { PaginationController } from './pagination.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PaginationController],
  providers: [PaginationService],
  imports: [PrismaModule],
  exports: [PaginationService],
})
export class PaginationModule {}
