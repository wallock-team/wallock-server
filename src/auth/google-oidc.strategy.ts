import { PassportStrategy } from '@nestjs/passport'
import { Client, Issuer, Strategy, TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import AuthService from './auth.service'
import googleIssuerMetadata from './google-oidc-issuer-metadata'

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  private static setupGoogleClient(): Client {
    const googleIssuer = new Issuer(googleIssuerMetadata)

    return new googleIssuer.Client({
      client_id: process.env.GOOGLE_OAUTH20_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH20_CLIENT_SECRET
    })
  }

  constructor(private authService: AuthService) {
    super({
      client: OidcStrategy.setupGoogleClient(),
      params: {
        redirect_uri: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_REDIRECT_URI,
        scope: 'openid',
        response_type: 'id_token',
        response_mode: 'form_post'
      }
    })
  }

  async validate(
    tokenSet: TokenSet,
    done: (err: any, user?: User) => void
  ): Promise<void> {
    const user = await this.authService.validateUser(tokenSet)
    done(null, user)
  }
}
