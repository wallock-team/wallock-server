import { IsNotEmpty } from 'class-validator'

export class CreateTransactionDto {
    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    cateId: number

    amount?: number

    note?: String

    date?: String
}

