import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userCreateDto: CreateUserDto): Promise<Users> {
    return await this.prisma.users.create({
      data: userCreateDto,
    });
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    return await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
  }
}
