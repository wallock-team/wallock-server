import { IsDefined, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  iss: string

  @IsNotEmpty()
  sub: string

  picture?: string
}
