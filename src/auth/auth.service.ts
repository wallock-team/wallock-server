import { Injectable } from '@nestjs/common'
import { TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import OidcClientsManager from './oidc-clients-manager'

@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly oidcClientsManager: OidcClientsManager
  ) {}

  public async getOrCreateUserFromTokenSet(tokenSet: TokenSet): Promise<User> {
    const jwtClaims = tokenSet.claims()

    const user = await this.usersService.findOne({
      where: {
        iss: jwtClaims.iss,
        sub: jwtClaims.sub
      }
    })

    if (user) {
      return user
    } else {
      const newlyCreatedUser = await this.usersService.create({
        iss: jwtClaims.iss,
        sub: jwtClaims.sub
      })

      return newlyCreatedUser
    }
  }

  public async exchangeOidcCode(
    issuerName: string,
    code: string
  ): Promise<TokenSet> {
    const client = this.oidcClientsManager.getClient(issuerName)
    return await client.grant({
      grant_type: 'authorization_code',
      redirect_uri: this.oidcClientsManager.getRedirectUri(issuerName),
      client_id: client.metadata.client_id,
      client_secret: client.metadata.client_secret,
      code
    })
  }
}
