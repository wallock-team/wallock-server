import { forwardRef, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Issuer, Strategy, TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import AuthService from './auth.service'
import mockOidcIssuerMetadata from './mock-oidc-issuer-metadata'
import { Request } from 'express'

export default class MockOidcStrategy extends PassportStrategy(
  Strategy,
  'mock-oidc'
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => ConfigService))
    configService: ConfigService
  ) {
    const clientId = '123'
    const clientSecret = '123'
    const client = new new Issuer(mockOidcIssuerMetadata).Client({
      client_id: clientId,
      client_secret: clientSecret
    })
    const redirectUri =
      configService.getOrThrow<string>('BASE_URL') + '/auth/login-with-mock'

    super({
      client,
      params: {
        redirect_uri: redirectUri,
        scope: 'openid profile',
        response_type: 'code'
      },
      passReqToCallback: true,
      usePKCE: false
    })
  }

  async validate(req: Request, tokenSet: TokenSet): Promise<User> {
    req.res
      .cookie('id_token', tokenSet.id_token, { httpOnly: true })
      .status(200)

    return await this.authService.getOrCreateUserFromTokenSet(tokenSet)
  }
}
