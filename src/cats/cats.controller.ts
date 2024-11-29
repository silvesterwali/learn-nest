import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import {Cats} from "@prisma/client"


@Controller({
  path: 'api/v1/cats',
})
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
 async create(@Body() createCatDto: CreateCatDto): Promise<Cats> {
    return await this.catsService.create(createCatDto);
  }

  @Get()
async  findAll(): Promise<Cats[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string): Promise<Cats|null> {
    return await this.catsService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cats> {
    return await this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Cats> {
    return await this.catsService.remove(+id);
  }
}
