import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async findAllByUserId(userId: number) {
    return await this.categoryRepository.find({
      where: {
        userId: userId,
        isDeleted: false
      }
    })
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, userId, icon, group, isExpense } = { ...createCategoryDto }
    const isDuplicate = await this.categoryRepository
      .findOne({
        where: {
          userId: userId,
          name: name,
          icon: icon,
          group: group
        }
      })
    if (!isDuplicate) {
      await this.categoryRepository.save(createCategoryDto)
      return { name, icon, group, isExpense }
    }
  }


  async findOne(id: number) {
    // userID only can find it cate
    let category = await this.categoryRepository.findOne({
      where: {
        id: id,
        isDeleted: false
      }
    })
    if (category) {
      let { userId, name, isExpense, icon, group } = category
      return { userId, name, isExpense, icon, group }
    }
    // To Do access denied
    // To Do can not find
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id: updateCategoryDto.id, isDeleted: false } })
    if (category) {
      await this.categoryRepository.update(category.id, updateCategoryDto);
      let {  name, icon, group } = {...updateCategoryDto}
      return {  name, icon, group }
    }
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id: id, isDeleted: false } })
    if (category) {
      category.isDeleted = true
      await this.categoryRepository.save(category)
    }
  }
}

