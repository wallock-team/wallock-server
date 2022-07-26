import { IsDefined, IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    isExpense: number

    @IsNotEmpty()
    tier: number

    @IsNotEmpty()
    icon: string

    @IsNotEmpty()
    parentID: number | null
}
