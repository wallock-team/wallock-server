import { forwardRef, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import AuthService from './auth.service'
import OidcClientsManager from './oidc-clients-manager'

export default class GoogleOidcStrategy extends PassportStrategy(
  Strategy,
  'google-oidc'
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => OidcClientsManager))
    oidcClientsManager: OidcClientsManager,
    configService: ConfigService
  ) {
    super({
      client: oidcClientsManager.getClient('google'),
      params: {
        redirect_uri: `${configService.get('baseUrl')}/auth/oidc-callback`,
        scope: 'openid',
        response_type: 'code'
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
