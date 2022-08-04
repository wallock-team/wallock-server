import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  iss: string

  @IsNotEmpty()
  sub: string

  @IsNotEmpty()
  name: string

  picture?: string
}
