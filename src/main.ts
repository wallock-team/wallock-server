import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'

import * as dotenv from 'dotenv'
dotenv.config()

async function bootstrap() {
  const app = (await NestFactory.create(AppModule))
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .use(cookieParser())
    .use(
      session({
        secret: process.env.SESSION_SECRET || '123',
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
  await app.listen(3000)
}
bootstrap()
