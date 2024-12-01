import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '@prisma/client';

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
