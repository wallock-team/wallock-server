import { forwardRef, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Issuer, Strategy, TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import AuthService from './auth.service'
import { Request } from 'express'
import googleOidcIssuerMetadata from './google-oidc-issuer-metadata'

export default class GoogleOidcStrategy extends PassportStrategy(
  Strategy,
  'google-oidc'
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => ConfigService))
    configService: ConfigService
  ) {
    const clientId = configService.getOrThrow<string>('OIDC_GOOGLE_CLIENT_ID')
    const clientSecret = configService.getOrThrow<string>(
      'OIDC_GOOGLE_CLIENT_SECRET'
    )
    const client = new new Issuer(googleOidcIssuerMetadata).Client({
      client_id: clientId,
      client_secret: clientSecret
    })
    const redirectUri =
      configService.getOrThrow<string>('BASE_URL') + '/auth/login-with-google'

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
      .redirect(req.cookies['authorized_uri'])

    return await this.authService.getOrCreateUserFromTokenSet(tokenSet)
  }
}
