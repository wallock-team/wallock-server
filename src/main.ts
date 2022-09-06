import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import configApp from './config-app'

async function bootstrap() {
  const app = configApp(await NestFactory.create(AppModule))
  await app.listen(3000)
}
bootstrap()
