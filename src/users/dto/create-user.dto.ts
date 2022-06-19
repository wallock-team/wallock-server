import { IsDefined, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
  //U can customize the display of validate codition and message using anotation.
  @MinLength(4)
  @IsNotEmpty({
    message: 'User can not be empty. pls enter correctly',
  })
  username: string

  @IsDefined()
  password: string
}
