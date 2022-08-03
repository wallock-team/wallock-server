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
    return await this.categoryRepository.find({ where: { userId: userId,
isDeleted: false } })
  }

  async create(createCategoryDto: CreateCategoryDto) {
    let { name, userId, icon, group } = { ...createCategoryDto }
    let isDuplicate = await this.categoryRepository.findOne({ where: { userId: userId,
    name: name,
    icon: icon,
    group: group } })
    if (!isDuplicate) {
      await this.categoryRepository.save(createCategoryDto)
      return { name, userId, icon, group }
    }
  }


  async findOne(id: number) {
    let category = await this.categoryRepository.findOne({ where: { id: id,
      isDeleted: false } })
    if(category){
      let { userId, name, isExpense, icon, group } = category
      return { userId, name, isExpense, icon, group }
    }
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id: updateCategoryDto.id, isDeleted: false } })
    if (category) {
      await this.categoryRepository.update(category.id, updateCategoryDto);
      let {userId, name, isExpense, icon, group} = 
      await this.categoryRepository.findOne({ where: { id: updateCategoryDto.id } })
      return {userId, name, isExpense, icon, group}
    }
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id: id, isDeleted: false } })
    if (category) {
      category.isDeleted = true
      await this.categoryRepository.save(category)
      return true
    }
    return false
  }
}

