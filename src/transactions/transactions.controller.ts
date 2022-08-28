import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Req, UseGuards } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Between } from 'typeorm'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import { handleError } from '../error/errorHandler'

// TypeORM Query Operators
export const BetweenDates = (from: Date, to: Date) => Between(
  from.getTime(),
  to.getTime(),
)

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Get('/current')
  @UseGuards(JwtAuthGuard)
  async getCurrentTrans(@Req() req) {
    let userId = req.user.id

    var date = new Date()
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    console.log(firstDay + ' : ' + lastDay)

    const test = await this.transactionsService.find({
      where: {
        userId: userId,
        date: Between(firstDay, lastDay)
      }
    })
    return test
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    let userId = req.user.id
    try {
      const trans = await this.transactionsService.create(createTransactionDto, userId)
      if (trans) return trans
    } catch (error) {
      handleError(error.message)
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTransaction(@Req() req) {
    let userId = req.user.id
    try {
      return await this.transactionsService.findAllByUserId(userId)
    } catch (error) {
      handleError(error.message)
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTransaction(@Param('id') id: number, @Req() req) {
    let userId = req.user.id
    try {
      return await this.transactionsService.findByIdForUser(+id, userId)
    } catch (error) {
      handleError(error.message)
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateTransaction(@Body() updateTransactionDto: UpdateTransactionDto, @Req() req) {
    let userId = req.user.id
    try {
      return await this.transactionsService.update(updateTransactionDto, userId)
    } catch (error) {
      handleError(error.message)
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delTransaction(@Param('id') id: number, @Req() req) {
    let userId = req.user.id
    try {
      return await this.transactionsService.remove(+id, userId)
    } catch (error) {
      handleError(error.message)
    }
  }
}
