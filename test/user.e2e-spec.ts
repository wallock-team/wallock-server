// import { Test, TestingModule } from '@nestjs/testing'
// import { INestApplication, ValidationPipe } from '@nestjs/common'
// import * as request from 'supertest'
// import { AppModule } from './../src/app.module'

// const SECONDS = 1000
// jest.setTimeout(70 * SECONDS)
// describe('Test usersModule', () => {
//   let app: INestApplication

//   const updateDTO =
//   {
//     id: 2,
//     username: 'Walock1@gmail.com',
//     picture: 'some picture link',
//     balance: 123
//   }

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule]
//     }).compile()

//     app = moduleFixture.createNestApplication()
//     app.useGlobalPipes(new ValidationPipe())
//     await app.init()
//   })

//   afterEach(async () => {
//     await app.close()
//   })

//   it('Update user information', () => {
//     return request(app.getHttpServer())
//       .patch('/users')
//       .send(updateDTO)
//       .expect(200)
//       .expect({
//         'id': 2,
//         'is_deleted': 0,
//         'create_at': '2022-07-26T07:57:52.809Z',
//         'iss': 'https://accounts.google.com',
//         'sub': '234744606244304758098',
//         'username': 'Walock1@gmail.com',
//         'picture': 'some picture link',
//         'balance': 123
//       })
//   })

//   it('Fine user information', () => {
//     return request(app.getHttpServer())
//       .get('/users/me')
//       .expect(200)
//       .expect({
//         'id': 2,
//         'is_deleted': 0,
//         'create_at': '2022-07-26T07:57:52.809Z',
//         'iss': 'https://accounts.google.com',
//         'sub': '234744606244304758098',
//         'username': 'Walock1@gmail.com',
//         'picture': 'some picture link',
//         'balance': 123
//       })
//   })
// })


