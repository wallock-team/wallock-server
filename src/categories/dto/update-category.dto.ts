import { IsIn, IsNotEmpty } from 'class-validator'

export class UpdateCategoryDto {
  @IsNotEmpty()
  id: number

  name?: string

  group?: string

  @IsIn(['income', 'expense'])
  type?: 'income' | 'expense'

  icon?: string
}
