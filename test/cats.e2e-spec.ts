import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    await app.init();
    await prisma.cats.deleteMany();
  });

  it('/ (GET)', async () => {
    const cats = {
      name: 'meo',
      age: 1,
      breed: 'hallo',
    };
    await prisma.cats.create({ data: cats });
    return request(app.getHttpServer())
      .get('/api/v1/cats')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject([{ ...cats }]);
      });
  });
});
