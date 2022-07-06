import { IsDefined, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  //U can customize the display of validate codition and message using anotation.
  @IsNotEmpty({
    message: 'User can not be empty. Pls enter correctly',
  })
  username: string

  @IsDefined()
  password: string
}
