import { IsDefined, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  /**
   * @example 'johndoe'
   */
  @IsNotEmpty({
    message: 'Usename can not be empty'
  })
  username: string

  /**
   * @example T#1s is a $trong p@55w0rd!
   */
  @IsDefined()
  password: string
}
