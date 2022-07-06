import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async signInWithGoogle(data) {
    if (!data.user) throw new BadRequestException()

    // let user = (
    //   await this.usersService.findOne(data.user)
    // )[0]
    // if (user) return this.login(user)
    // console.log('email : ' + data.user.email)
    // user = (
    //   await this.usersService.findOne(data.user.email)
    // )[0]
    // if (user) throw new ForbiddenException(
    //     'User already exists, but Google account was not connected to user\'s account'
    //   )

    try {
      const newUser = new User()
      newUser.firstName = data.user.firstName
      newUser.lastName = data.user.lastName
      newUser.email = data.user.email
      newUser.googleId = data.user.id

      //await this.usersService.create(newUser)
      return data.user
    } catch (e) {
      throw new Error(e)
    }
  }
}
