import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    return {
        name: 'Home',
        isExpense: 0,
        tier: 0,
        icon: 'home Icon',
        parentID: null,
        uID: 1,
        cateID: 1
    }
  }

  findAll(id: number) {
    return {
      status_code: 201,
      data:
      [
        {
          name: 'C Home',
          isExpense: 'out come',
          tier: 0,
          icon: 'Cuong Home Icon',
          cateID: '123',
          children: [
            {
              name: 'C Home',
              is_expense: 'out come',
              tier: 1,
              icon: 'Some icon'
            }
          ]
        }
      ]
    }
  }

  findOne(id: number) {
    return {
      status_code: 201,
      data:
      {
        name: 'C Home',
        isExpense: 0,
        tier: 0,
        icon: 'Cuong Home Icon',
        parentID: null,
        uID: 1,
        cateID: 1
      }
    }
  }

  update(updateCategoryDto: UpdateCategoryDto) {
    return {
      status_code: 201,
      data:
      {
        name: 'C Home',
        isExpense: 0,
        tier: 0,
        icon: 'Cuong Home Icon',
        parentID: null,
        uID: 1,
        cateID: 1
      }
    }
  }

  remove(id: number) {
    return {
      status_code: 201,
      message: 'delete categories success'
    }
  }
}
