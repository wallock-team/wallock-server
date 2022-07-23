import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
describe('Test add new User', () => {
  let app: INestApplication;
  let userController: UsersController;
  //let userService: UserService;
  let userService = { findAll: () => 'test' };
  let outPutMessage = 'test'

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })      
      // .overrideProvider(userService)
      // .useValue(userService)
      .compile();

    // userService = new UserService();
    // userController = new UserController(userService);

    app = moduleFixture.createNestApplication();
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

  it('UNit test Get all users',async () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect({
        message: userService.findAll(),
      });
  });
});