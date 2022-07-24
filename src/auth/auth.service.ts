import { Injectable } from '@nestjs/common'
import { TokenSet } from 'openid-client'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export default class AuthService {
  constructor(private usersService: UsersService) {}

  public async validateUser(tokenSet: TokenSet): Promise<User> {
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
}
