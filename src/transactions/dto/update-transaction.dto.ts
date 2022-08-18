import { IsNotEmpty } from 'class-validator'

export class UpdateTransactionDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    cateId: number

    amount?: number

    note?: String

    date?: Date
}
