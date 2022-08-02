import { forwardRef, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import AuthService from './auth.service'
import OidcClientsManager from './oidc-clients-manager'

export default class MocklabOidcStrategy extends PassportStrategy(
  Strategy,
  'mocklab-oidc'
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => OidcClientsManager))
    oidcClientsManager: OidcClientsManager
  ) {
    super({
      client: oidcClientsManager.getClient('mocklab'),
      params: {
        redirect_uri: oidcClientsManager.getRedirectUri('mocklab'),
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
