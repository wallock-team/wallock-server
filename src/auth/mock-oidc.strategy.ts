import { forwardRef, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import AuthService from './auth.service'
import OidcClientsManager from './oidc-clients-manager'

export default class MockOidcStrategy extends PassportStrategy(
  Strategy,
  'mock-oidc'
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => OidcClientsManager))
    oidcClientsManager: OidcClientsManager
  ) {
    super({
      client: oidcClientsManager.getClient('mock'),
      params: {
        redirect_uri: oidcClientsManager.getRedirectUri('mock'),
        scope: 'openid',
        response_type: 'code'
      },
      usePKCE: false
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
