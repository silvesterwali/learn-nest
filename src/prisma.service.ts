import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    // @ts-expect-error
    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');

    // @ts-expect-error
    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
  }
}
