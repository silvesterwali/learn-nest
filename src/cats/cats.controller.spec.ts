import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats } from '@prisma/client';
import { PrismaService } from '../prisma.service';

describe('CatsController', () => {
  let controller: CatsController;
  let catSetvice: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService, PrismaService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    catSetvice = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cat', async () => {
    const newCat = {
      name: 'meo',
      age: 1,
      breed: 'meo',
    };

    const resutl = {
      id: 1,
      name: 'meo',
      age: 1,
      breed: 'meo',
    };

    jest
      .spyOn(catSetvice, 'create')
      .mockImplementation(async (): Promise<Cats> => resutl);

    expect(await controller.create(newCat)).toBe(resutl);
  });
});
