import { IsDefined } from 'class-validator'

export class CreateUserDto {
  @IsDefined()
  username: string

  @IsDefined()
  password: string
}
