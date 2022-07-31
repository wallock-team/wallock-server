import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    let result = await this.categoriesService.create(createCategoryDto)
    if (result) return result
    throw new BadRequestException('Invalid input')
  }

  @Get()
  async findAllByUserId(@Query('userId') userId: number) {
    // let userId = cookie.id
    // createCategoryDto.userId = userId
    return await this.categoriesService.findAllByUserId(userId)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    let category = await this.categoriesService.findOne(+id)
    if (category) return category
    throw new BadRequestException()
  }

  @Patch()
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    let result = await this.categoriesService.update(updateCategoryDto)
    if (result) return result
    throw new BadRequestException()
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.categoriesService.delete(+id)
  }
}
