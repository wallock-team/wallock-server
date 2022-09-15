import { IsNotEmpty } from 'class-validator'

export class UpdateTransactionDto {
    @IsNotEmpty()
    id: number

    amount?: number

    note?: String

    date?: Date
}
