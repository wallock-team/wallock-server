import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Between } from "typeorm";
import format from 'date-fns/format';

// TypeORM Query Operators
export const BetweenDates = (from: Date, to: Date) =>
  Between(
    from.getTime(),
    to.getTime(),
);

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Get('/current')
  async getCurrentTrans() {
    // userId = req.cookie.userid
    let userId = 1
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(firstDay+" : "+ lastDay)
    const test = await this.transactionsService.find({
      where: {
        userId: userId,
        date: Between(firstDay,lastDay),
      }
    })
    return test
  }

  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    const trans = this.transactionsService.create(createTransactionDto);
    if (trans) return trans
    throw new BadRequestException()
  }

  @Get()
  getAllTransaction(@Query('userId') userId: number) {
    return this.transactionsService.findAllByUserId(userId);
  }

  @Get(':id')
  getTransaction(@Param('id') id: number) {
    return this.transactionsService.findOne(+id);
  }

  @Patch()
  updateTransaction(@Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(updateTransactionDto);
  }

  @Delete(':id')
  delTransaction(@Param('id') id: number) {
    return this.transactionsService.remove(+id);
  }
}
