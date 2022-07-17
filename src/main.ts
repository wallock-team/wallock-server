import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as passport from 'passport'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(cookieParser())
  app.use(session({
    secret: process.env.SESSION_SECRET, // to sign session id
    resave: false, // will default to false in near future: https://github.com/expressjs/session#resave
    saveUninitialized: false, // will default to false in near future: https://github.com/expressjs/session#saveuninitialized
    rolling: true, // keep session alive
    cookie: {
      maxAge: 30 * 60 * 1000, // session expires in 1hr, refreshed by `rolling: true` option.
      httpOnly: true // so that cookie can't be accessed via client-side script
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
}
bootstrap()
