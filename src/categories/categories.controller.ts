import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards
} from '@nestjs/common'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import { AuthenticatedRequest } from '../commons'
import { handleError } from '../error/errorHandler'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    return await this.categoriesService.create(req.user, createCategoryDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllByUserId(@Req() req) {
    let userId = req.user.id
    try {
      if (userId) {
        return await this.categoriesService.findAllByUserId(userId)
      }
    } catch (error) {
      handleError(error.message)
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number, @Req() req) {
    let userId = req.user.id
    try {
      let category = await this.categoriesService.findByIdForUser(+id, userId)
      if (category) return category
    } catch (error) {
      handleError(error.message)
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req: AuthenticatedRequest,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return await this.categoriesService.update(req.user, updateCategoryDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Req() req) {
    let userId = req.user.id
    try {
      return await this.categoriesService.delete(+id, userId)
    } catch (error) {
      handleError(error.message)
    }
  }
}
