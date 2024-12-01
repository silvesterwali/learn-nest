import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { PasswordService } from '../common/password';

@Injectable()
export class SeedService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async seed() {
    const passwordHash = await this.passwordService.hashPassword('password');

    const listUsers = [
      {
        name: 'admin',
        email: 'admin@admin.com',
        password: passwordHash,
      },
      {
        name: 'halo',
        email: 'hallo@gmail.com',
        password: passwordHash,
      },
    ];

    await this.prisma.users.createMany({
      data: listUsers,
    });
  }
}
