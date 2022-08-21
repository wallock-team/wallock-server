import { IsNotEmpty } from 'class-validator'

export class CreateTransactionDto {
    @IsNotEmpty()
    cateId: number

    @IsNotEmpty()
    amount: number

    note?: String

    date?: Date
}

