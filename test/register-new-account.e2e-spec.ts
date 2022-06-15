import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('Register new account', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it(`When user registers new account with an username and a password
Then user should receive successful response`, async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        username: 'johndoe',
        password: '12345'
      })
      .expect(201)
      .expect({
        username: 'johndoe',
        password: '12345',
        id: 1
      })
  })
})
