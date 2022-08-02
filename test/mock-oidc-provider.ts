import { OAuth2Server } from 'oauth2-mock-server'

const server = new OAuth2Server()

export async function start() {
  await server.issuer.keys.generate('RS256')
  await server.start(8080, 'localhost')
}

export async function stop() {
  await server.stop()
}
