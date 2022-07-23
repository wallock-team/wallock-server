import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from '../src/users/users.service';
import { UsersModule } from '../src/users/users.module';
jest.setTimeout(70000);
describe('Test add new User', () => {
  let app: INestApplication;
  // let userController: UsersController;
  let userService: UsersService;
  let outPutMessage = 'test';
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication();
    await app.init();
  });

  
  afterEach(async () => {

  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // it('UNit test Get all users',async () => {
  //   return request(app.getHttpServer())
  //     .get('/user')
  //     .expect(200)
  //     .expect({
  //       message: userService.findAll(),
  //     });
  // });
  
   afterAll(async () => {
     await app.close()
   })
});