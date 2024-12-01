import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PrismaService } from '../prisma.service';
import { ConsoleModule } from 'nestjs-console';
import { SeedCommand } from './seed.command';
import { PasswordService } from '../common/password';

@Module({
  imports: [ConsoleModule],
  providers: [SeedService, PrismaService, SeedCommand, PasswordService],
})
export class SeedModule {}
