import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, BadRequestException, InternalServerErrorException, ConflictException, Req, UseGuards } from '@nestjs/common'
import JwtAuthGuard from 'src/auth/jwt-auth.guard'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }
  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    let result = await this.categoriesService.create(createCategoryDto)
    if (result) return result
    throw new ConflictException('Invalid input')
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllByUserId(@Req() req) {
    let userId = req.user.id
    if (req.user) return await this.categoriesService.findAllByUserId(userId)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number, @Req() req) {
    let userId = req.user.id
    try {
      let category = await this.categoriesService.findByIdForUser(+id, userId)
      if (category) return category
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateCategoryDto: UpdateCategoryDto) {
    let result = await this.categoriesService.update(updateCategoryDto)
    if (result) return result
    throw new BadRequestException()
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return await this.categoriesService.delete(+id)
  }
}
