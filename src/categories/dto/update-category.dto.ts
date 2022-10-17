import { IsDefined, IsNumber } from 'class-validator'

export class UpdateCategoryDto {
  @IsDefined({
    message: 'Category ID must be provided'
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false
    },
    {
      message: 'Category ID must be a number'
    }
  )
  id: number

  name?: string

  group?: string

  icon?: string
}
