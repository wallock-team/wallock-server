import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './../src/users/users.module';

describe('UsersModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST with available email and strong password should receive 201', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'foo@example.com',
        password: 'Password123!',
      })
      .expect(201);
  });

  it('POST without email should receive 400', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ password: 'Password123!' })
      .expect(400);
  });

  it('POST with taken email should receive 409', () => {
    request(app.getHttpServer())
      .post('/users')
      .send({ email: 'foo@example.com', password: 'Password123!' })
      .expect(201);

    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'foo@example.com',
        password: 'Password123!',
      })
      .expect(409);
  });

  it('POST without password should receive 400', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'foo@example.com' })
      .expect(400);
  });

  it('POST with weak password should receive 400', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'foo@example.com',
        password: 'password',
      })
      .expect(400);
  });
});
