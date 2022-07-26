import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Client, UserinfoResponse, TokenSet, Issuer } from 'openid-client'
import { AuthService } from './auth.service'

import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'

export const buildOpenIdClient = async () => {
  const TrustIssuer = await Issuer.discover(`${process.env.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration`)
  const client = new TrustIssuer.Client({
    client_id: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID,
    client_secret: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET
  })
  return client
}

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  client: Client

  constructor(private readonly authService: AuthService, client: Client) {
    super({
      client: client,
      params: {
        redirect_uri: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_REDIRECT_URI,
        scope: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_SCOPE
      },
      passReqToCallback: false,
      usePKCE: false
    })

    this.client = client
  }

  async validate(tokenset: TokenSet, usersService: UsersService): Promise<any> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokenset)

    try {
      const [header, payload, signature] = tokenset.id_token.split('.')

      const decodedPayload = Buffer.from(payload, 'base64').toString()
      const Payload = JSON.parse(decodedPayload)

      const user : CreateUserDto = new CreateUserDto()
      user.sub = Payload.sub
      user.iss = Payload.iss
      user.username = Payload.name
      user.picture = Payload.picture

      return { id_token: tokenset.id_token,
userinfo: userinfo }
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
