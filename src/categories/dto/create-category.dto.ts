import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    isExpense: boolean

    @IsNotEmpty()
    icon: string

    @IsNotEmpty()
    group: string
}
