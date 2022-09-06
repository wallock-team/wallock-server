import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import * as dotenv from 'dotenv'
dotenv.config()

export default async function buildApp() {
  return (await NestFactory.create(AppModule))
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
}
