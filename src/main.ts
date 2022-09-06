import buildApp from './build-app'

async function bootstrap() {
  const app = await buildApp()
  await app.listen(3000)
}
bootstrap()
