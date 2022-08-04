import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    isExpense: boolean

    icon?: string

    group?: string
}
