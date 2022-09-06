import { IsIn, IsNotEmpty } from 'class-validator'

export class UpdateCategoryDto {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  group: string

  @IsNotEmpty()
  @IsIn(['income', 'expense'])
  type: 'Income' | 'expense'

  icon?: string
}
