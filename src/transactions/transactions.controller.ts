import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Between } from "typeorm";
import JwtAuthGuard from 'src/auth/jwt-auth.guard';

// TypeORM Query Operators
export const BetweenDates = (from: Date, to: Date) =>
  Between(
    from.getTime(),
    to.getTime(),
  );

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/current')
  // @UseGuards(JwtAuthGuard)
  async getCurrentTrans(@Req() req) {
    let userId = req.cookie.userid
    
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(firstDay + " : " + lastDay)

    const test = await this.transactionsService.find({
      where: {
        userId: userId,
        date: Between(firstDay, lastDay),
      }
    })
    return test
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTransaction(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    let userId = req.user.id
    try {
      const trans = this.transactionsService.create(createTransactionDto, userId);
      if (trans) return trans
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllTransaction(@Req() req) {
    let userId = req.user.id
    try {
      return this.transactionsService.findAllByUserId(userId);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getTransaction(@Param('id') id: number, @Req() req) {
    let userId = req.user.id
    try {
      return this.transactionsService.findByIdForUser(+id, userId);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateTransaction(@Body() updateTransactionDto: UpdateTransactionDto, @Req() req) {
    let userId = req.user.id
    try {
      return this.transactionsService.update(updateTransactionDto, userId);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delTransaction(@Param('id') id: number, @Req() req) {
    let userId = req.user.id
    try {
      return this.transactionsService.remove(+id, userId);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
