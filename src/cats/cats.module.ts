import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, PrismaService],
})
export class CatsModule {}
