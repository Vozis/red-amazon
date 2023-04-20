import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [PrismaModule, UsersModule],
})
export class StatisticsModule {}
