import { IsNotEmpty } from 'class-validator'

export class UpdateTransactionDto {
    @IsNotEmpty()
    transId: number

    @IsNotEmpty()
    cateId: number

    amount?: number

    note?: String

    date?: Date
}
