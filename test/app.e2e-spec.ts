import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const SECONDS = 1000
jest.setTimeout(70* SECONDS);
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Categorise Unit Test',() =>{
    it('Post to create new categories', () => {
      return request(app.getHttpServer())
        .post('/categories')
        .expect(201)
        .expect('This action adds a new category');
    });
  })
});
