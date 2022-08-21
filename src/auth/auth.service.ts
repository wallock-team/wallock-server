import { Injectable } from '@nestjs/common'
import { TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from './../users/users.service'

@Injectable()
export default class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async getOrCreateUserFromTokenSet(tokenSet: TokenSet): Promise<User> {
    const jwtClaims = tokenSet.claims()

    const user = await this.usersService.findByIssSub(jwtClaims.iss, jwtClaims.sub)

    if (user) {
      return user
    } else {
      const newlyCreatedUser = await this.usersService.create({
        iss: jwtClaims.iss,
        sub: jwtClaims.sub,
        name: jwtClaims.name
      })

      return newlyCreatedUser
    }
  }
}
