import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { PrismaService } from '../prisma.service';

describe('CatsService', () => {
  let catService: CatsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService, PrismaService],
    }).compile();

    catService = module.get<CatsService>(CatsService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.cats.deleteMany();
  });

  describe('create cat', () => {
    it('should be create a new cat', async () => {
      const createCatDto = {
        name: 'meo',
        age: 1,
        breed: 'meo',
      };
      const result = await catService.create(createCatDto);
      expect(result.name).toBe(createCatDto.name);
      expect(result.age).toBe(1);
    });
  });

  describe('all cat', () => {
    it('should get all cats', async () => {
      const payloads = [
        {
          name: 'meo',
          age: 1,
          breed: 'meo',
        },
        {
          name: 'other meo',
          age: 2,
          breed: 'meo',
        },
      ];
      await prisma.cats.createMany({
        data: payloads,
      });

      const result = await catService.findAll();
      expect(result).toMatchObject(payloads);
    });
  });

  describe('find one cat', () => {
    it('should be find one', async () => {
      const newCats = {
        name: 'new meo',
        age: 2,
        breed: 'new meo',
      };

      const object = await prisma.cats.create({ data: newCats });
      const result = await catService.findOne(object.id);
      expect(result).toMatchObject(object);
    });
  });

  describe('update', () => {
    it('should able to delete object cat', async () => {
      const createCatDto = {
        name: 'meo',
        age: 1,
        breed: 'meo',
      };

      const updatedCat = {
        name: 'new meo',
        age: 2,
        breed: 'new meo',
      };
      const result = await catService.create(createCatDto);
      const objectUpdate = await catService.update(result.id, updatedCat);
      expect(objectUpdate).toMatchObject(updatedCat);
    });
  });

  describe('remove', () => {
    it('should able to remove object cats', async () => {
      const objectCats = {
        name: 'hallo meo',
        age: 2,
        breed: 'hallo meo',
      };
      const result = await prisma.cats.create({ data: objectCats });
      await catService.remove(result.id);
      const response = await catService.findAll();
      expect(response).toEqual([]);
    });
  });
});
