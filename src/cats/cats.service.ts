import { Injectable } from '@nestjs/common';
import { Cats } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  async create(createCatDto: CreateCatDto): Promise<Cats> {
    return await this.prisma.cats.create({ data: createCatDto });
  }

  async findAll(): Promise<Cats[]> {
    return await this.prisma.cats.findMany();
  }

  async findOne(id: number): Promise<Cats | null> {
    return await this.prisma.cats.findUnique({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cats> {
    return await this.prisma.cats.update({ where: { id }, data: updateCatDto });
  }

  async remove(id: number): Promise<Cats> {
    return await this.prisma.cats.delete({ where: { id } });
  }
}
