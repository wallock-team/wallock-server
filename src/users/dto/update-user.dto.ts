import { PartialType } from '@nestjs/mapped-types'
import { IsDefined } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsDefined()
    id: number

    @IsDefined()
    balance: number
}
