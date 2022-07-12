import { PassportStrategy } from '@nestjs/passport'
import { Client, Issuer, Strategy, TokenSet } from 'openid-client'
import AuthService from 'src/auth/auth.service'
import { User } from 'src/users/entities/user.entity'
import GoogleMetadata from './issuer/google.metadata'

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  private static setupGoogleClient(): Client {
    const googleIssuer = new Issuer(GoogleMetadata)

    return new googleIssuer.Client({
      client_id: process.env.GOOGLE_OAUTH20_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH20_CLIENT_SECRET
    })
  }

  constructor(private authService: AuthService) {
    super({
      client: OidcStrategy.setupGoogleClient(),
      params: {
        redirect_uri: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_REDIRECT_URI
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
