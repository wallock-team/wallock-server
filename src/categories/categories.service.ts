import { ErrorMessage } from '../error/errorMessage'
import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'
import initialCategories from './initialCategories.json'
import { User } from '../users/entities/user.entity'
import { omit } from 'lodash'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async findAllByUserId(userId: number) {
    let categories = await this.categoryRepository.find({
      relations: {
        transaction: true
      },
      where: {
        user: {
          id: userId
        }
      }
    })
    if (categories) {
      return categories
    }
  }

  async create(createCategoryDto: CreateCategoryDto, user: User) {
    const { name, type, group } = createCategoryDto

    const similarCategoryExists = await this.categoryRepository.findOne({
      where: {
        user: {
          id: user.id
        },
        name,
        group,
        type
      }
    })

    if (similarCategoryExists) {
      throw new ConflictException(
        'Category must have unique name - type - group'
      )
    } else {
      return this.categoryRepository.insert(createCategoryDto)
    }
  }

  async update(updateCategoryDto: UpdateCategoryDto, user: User) {
    const categoryToBeUpdated = await this.categoryRepository.findOne({
      where: {
        id: updateCategoryDto.id
      }
    })

    if (categoryToBeUpdated.user.id !== user.id) {
      throw new NotFoundException('Cannot find the requested category')
    }

    const similarCategoryExists = await this.categoryRepository.findOne({
      where: {
        name: updateCategoryDto.name ?? categoryToBeUpdated.name,
        type: updateCategoryDto.type ?? categoryToBeUpdated.type,
        group: updateCategoryDto.group ?? categoryToBeUpdated.group
      }
    })

    if (similarCategoryExists) {
      throw new ConflictException(
        'Category must have unique name - type - group'
      )
    }

    return await this.categoryRepository.update(
      updateCategoryDto.id,
      omit(updateCategoryDto, 'id')
    )
  }

  async delete(id: number, userId: number) {
    const category = await this.findByIdForUser(id, userId)

    category.isDeleted = true
    await this.categoryRepository.save(category)
  }

  async findByIdForUser(id: number, userId: number) {
    let category = await this.categoryRepository.findOne({
      relations: {
        transaction: true
      },
      where: {
        id: id,
        isDeleted: false
      }
    })
    if (category) {
      if (category.userId == userId) {
        let { id, name, isExpense, isDeleted, icon, group, transaction } =
          category
        return {
          id,
          name,
          isDeleted,
          isExpense,
          icon,
          group,
          transaction
        }
      } else throw new Error(ErrorMessage.AccessDenied)
    }
    throw new Error(ErrorMessage.NotFoundCategory)
  }

  async createInitCate(userId: number) {
    for (let i = 0; i < initialCategories.length; i++) {
      this.categoryRepository.insert({
        user: {
          id: userId
        },
        ...initialCategories[i]
      })
    }
  }
}
