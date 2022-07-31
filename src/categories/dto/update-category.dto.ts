import { IsNotEmpty } from 'class-validator'

export class UpdateCategoryDto {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    icon: string

    @IsNotEmpty()
    group: string
}
