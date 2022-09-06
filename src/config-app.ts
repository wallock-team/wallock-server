import { INestApplication, ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import session from 'express-session'

export default function configApp(app: INestApplication) {
  return app
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
