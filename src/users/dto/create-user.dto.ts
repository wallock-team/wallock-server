import { IsDefined, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  iss: string

  @IsNotEmpty()
  sub: string

  @IsDefined()
  username: string

  @IsDefined()
  picture: string

}
