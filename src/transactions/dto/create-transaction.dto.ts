import { IsNotEmpty } from 'class-validator'

export class CreateTransactionDto {
  @IsNotEmpty()
  categoryId: number

  @IsNotEmpty()
  amount: number

  note?: String

  date?: Date
}
