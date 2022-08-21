import { Test } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import * as MockOidcServer from './mock-oidc-provider'
import { AppModule } from '../src/app.module'
import cookieParser from 'cookie-parser'
import session from 'express-session'

describe('Login', () => {
  let app: INestApplication

  beforeAll(async () => {
    await MockOidcServer.start()

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    await app
      .useGlobalPipes(new ValidationPipe({ transform: true }))
      .use(cookieParser())
      .use(
        session({
          secret: process.env.SESSION_SECRET ?? '123',
          resave: false,
          saveUninitialized: false,
          rolling: true,
          cookie: {
            maxAge: 30 * 60 * 1000,
            httpOnly: true,
            secure: process.env.env === 'production'
          }
        })
      )
      .init()
  })

  afterAll(async () => {
    MockOidcServer.stop()
  })

  it('Test 1', async () => {
    const client = request(app.getHttpServer())

    const getOidcCodeRessponse = await client
      .get('/auth/login-with-mock')
      .redirects(1)
      .expect(302)

    // `getOidcCodeRessponse.text` has the following form:
    // Found. Redirecting to http://localhost:3000/auth/login-with-mock-callback
    //   ?code=...
    //   &scope=openid
    //   &state=...
    //
    // In testing, NestJS only initializes the server (with `app.init()` above)
    // without exposing it to the network (with `app.listen(3000)`)
    //
    // Therefore, requests to 'localhost:3000' - including the url above - will be rejected.
    // We can only interact with the server through code (`app.getHttpServer()`).
    //
    // Like writing test cases in NestJS, we only pass the part after 'localhost:3000`
    // for it to work.

    const redirectUri = getOidcCodeRessponse.text.substring(
      getOidcCodeRessponse.text.indexOf('/auth/')
    )

    const exchangeCodeForTokenResponse = await client
      .get(redirectUri)
      .expect(302)

    await client
      .get('/auth/greet')
      .set('Cookie', exchangeCodeForTokenResponse.header['set-cookie'])
      .expect(200)
  })
})
