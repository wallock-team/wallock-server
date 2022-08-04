import { PassportStrategy } from '@nestjs/passport'
import { Client, Issuer, Strategy, TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import AuthService from './auth.service'
import facebookIssuerMetadata from './facebook-oidc-issuer-metadata'

export default class FacebookOidcStrategy extends PassportStrategy(
  Strategy,
  'facebook-oidc'
) {
  private static setupClient(): Client {
    const facebookIssuer = new Issuer(facebookIssuerMetadata)

    return new facebookIssuer.Client({
      client_id: process.env.OIDC_FACEBOOK_CLIENT_ID,
      client_secret: process.env.OIDC_FACEBOOK_CLIENT_SECRET
    })
  }

  constructor(private authService: AuthService) {
    super({
      client: FacebookOidcStrategy.setupClient(),
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
    const user = await this.authService.getOrCreateUserFromTokenSet(tokenSet)
    done(null, user)
  }
}
