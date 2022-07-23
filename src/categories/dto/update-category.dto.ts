import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsDefined, IsNotEmpty } from "class-validator"

export class UpdateCategoryDto {
    @IsNotEmpty()
    cateID: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    isExpense: number

    @IsNotEmpty()
    icon: string

    @IsNotEmpty()
    parentID: number | null
}
