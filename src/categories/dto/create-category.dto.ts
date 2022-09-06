import { IsIn, IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string

  @IsIn(['income', 'expense'])
  @IsNotEmpty()
  type: 'income' | 'expense'

  @IsNotEmpty()
  group: string

  icon?: string
}
