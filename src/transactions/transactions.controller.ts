import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  HttpCode
} from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Between } from 'typeorm'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import { AuthenticatedRequest } from '../commons'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
  
  @Get('/current-month')
  @UseGuards(JwtAuthGuard)
  async getCurrentMonth(@Req() req: AuthenticatedRequest) {
    var date = new Date()
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const currentMonth = await this.transactionsService.find({
      relations: { categories: true },
      where: {
        user:{
          id: req.user.id
        },
        date: Between(firstDay, lastDay)
      }
    })
    return currentMonth
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTransaction(
    @Req() req: AuthenticatedRequest,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    createTransactionDto.date = new Date();
    return await this.transactionsService.create(req.user, createTransactionDto)
  }
  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateTransaction(
    @Req() req: AuthenticatedRequest,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
      return await this.transactionsService.update(updateTransactionDto, req.user)
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delTransaction(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number
  ) {
      return await this.transactionsService.remove(req.user, id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTransaction(
    @Req() req: AuthenticatedRequest,
    @Query('includes-deleted') includesDeleted?: boolean
  ) {
      return await this.transactionsService.findAllByUserId(req.user, includesDeleted)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTransaction(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number
  ) {
      return await this.transactionsService.findByIdForUser(req.user, id)
  }

}
