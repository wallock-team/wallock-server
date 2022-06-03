import { IsDefined, IsEmail, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @IsDefined()
  @MinLength(8)
  @Matches(/^.*[A-Z]+.*$/)
  @Matches(/^.*[a-z]+.*$/)
  @Matches(/^.*[0-9]+.*$/)
  @Matches(/^.*[`~!@#$%^&*()-_=+{[\]}\\|;:'",<.>/?]+.*$/)
  password?: string;
}
