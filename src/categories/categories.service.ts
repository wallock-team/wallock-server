import { ErrorMessage } from '../error/errorMessage';
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'
import initialCategories from "./initialCategories.json"

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async findAllByUserId(userId: number) {
    let categories = await this.categoryRepository.find({
      relations: {
        transaction: true
      },
      where: {
        userId: userId,
        isDeleted: false
      }
    })
    if (categories) {
      return categories
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, userId, icon, group, isExpense } = { ...createCategoryDto }

    const isDuplicate = await this.categoryRepository.findOne({
      where: {
        userId: userId,
        name: name,
        icon: icon,
        group: group
      }
    })

    if (!isDuplicate) {
      await this.categoryRepository.save(createCategoryDto)
      return {
        name,
        icon,
        group,
        isExpense
      }
    }
    throw new Error(ErrorMessage.CategoryAlreadyExists)
  }

  async update(updateCategoryDto: UpdateCategoryDto, userId: number) {
    const category = await this.findByIdForUser(updateCategoryDto.id, userId)

    await this.categoryRepository.update(category.id, updateCategoryDto)
    let { name, icon, group } = { ...updateCategoryDto }

    return {
      name,
      icon,
      group
    }
  }

  async delete(id: number, userId: number) {
    const category = await this.findByIdForUser(id, userId)

    category.isDeleted = true
    await this.categoryRepository.save(category)
  }

  async findByIdForUser(id: number, userId: number) {
    let category = await this.categoryRepository.findOne({
      relations: {
        transaction: true,
      },
      where: {
        id: id,
        isDeleted: false
      }
    })
    if (category) {
      if (category.userId == userId) {
        let { id, name, isExpense, isDeleted, icon, group, transaction } = category
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
      this.categoryRepository.insert({userId, ...initialCategories[i]})
    }
  }
}

