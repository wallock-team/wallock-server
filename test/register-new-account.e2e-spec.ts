import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Register new account', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`When user registers new account with an username and a password
  Then user should receive successful response`, async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'johndoe',
        password: '12345',
      })
      .expect(201)
      .expect({
        username: 'johndoe',
        id: 1,
      });
  });

  it(`When user registers new account with an username and a password
  But the username already be taken. Then user should receive error response`, async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'johndoe',
        password: '12345',
      })
      .expect(409)
      .expect({
        mess: "Email or UserName is taken"
      });
  });

  it(`When user registers new account with an username and a password
  But the username are null or undentified. Then user should receive error response`, async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: null,
        password: '12345',
      })
      .expect(400)
      .expect({
        mess: "Invalid data"
      });
  });
});
