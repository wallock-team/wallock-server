import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

const SECONDS = 1000
jest.setTimeout(70 * SECONDS)
describe('Test usersModule', () => {
  let app: INestApplication

  const createDTO = {
    userId: 1,
    name: 'Food1',
    isExpense: true,
    icon: 'smile',
    group: 'Basic'
  }
  const updateDTO = {
    id: 1,
    name: 'Food1 updated',
    icon: 'Food',
    group: 'Basic'
  }


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('Create new category', () => {
    return request(app.getHttpServer())
      .post('/categories')
      .send(createDTO)
      .expect(201)
      .expect(
        {
          "name": "Food1",
          "userId": 1,
          "icon": "smile",
          "group": "Basic"
        }
      )
  })

  it('Create same category will return 400', () => {
    return request(app.getHttpServer())
      .post('/categories')
      .send(createDTO)
      .expect(400)
  })

  it('Get all categories by Userid', () => {
    return request(app.getHttpServer())
      .get('/categories?userId=1')
      .expect(200)
  })

  it('Get categories info by id', () => {
    return request(app.getHttpServer())
      .get('/categories/1')
      .expect(200)
      .expect(
        {
          "userId": 1,
          "name": "Food1",
          "isExpense": true,
          "icon": "smile",
          "group": "Basic"
        }
      )
  })

  it('Not exited categories will return 400', () => {
    return request(app.getHttpServer())
      .get('/categories/2')
      .expect(400)
  })

  it('Update categories by id', () => {
    return request(app.getHttpServer())
      .patch('/categories')
      .send(updateDTO)
      .expect(200)
      .expect({
        "userId": 1,
        "name": "Food1 updated",
        "isExpense": true,
        "icon": "Food",
        "group": "Basic"
      })
  })

  it('Delete categories by id', () => {
    return request(app.getHttpServer())
      .del('/categories/1')
      .expect(200)
      .expect('true')
  })

  it('Delete deleted categories by id', () => {
    return request(app.getHttpServer())
      .del('/categories/1')
      .expect(200)
      .expect('false')
  })

  it('Get deleted categories will return 400', () => {
    return request(app.getHttpServer())
      .get('/categories/1')
      .expect(400)
  })

  it('Update deleted categories will return 400', () => {
    return request(app.getHttpServer())
      .patch('/categories')
      .send(updateDTO)
      .expect(400)
  })
})


