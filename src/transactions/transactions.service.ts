import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private userService: UsersService,
    private cateService: CategoriesService,
  ) { }

  async find(options?: FindManyOptions<Transaction>){
    return await this.transactionRepository.find(options)
  }

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const findUser = await this.userService.findOne({where : { id: createTransactionDto.userId, isDeleted: false}})
      const findCate = await this.cateService.findOne(createTransactionDto.cateId)

      if (!findUser) {
        throw new Error("Can't find User")
      }
      if (!findCate) {
        throw new Error("Can't find Category")
      }
      if (findUser.balance < createTransactionDto.amount &&
        findCate.isExpense == true) {
        throw new Error("User don't have enough money")
      }
      else if (findCate.isExpense == true) {
        findUser.balance -= createTransactionDto.amount
      }
      else {
        findUser.balance += createTransactionDto.amount
      }
      await this.userService.update(findUser)
      return await this.transactionRepository.save(createTransactionDto)
    } catch (error) {
      throw new Error(error.message)
    }

  }

  async findAllByUserId(userId: number) {
    try {
      const findUser = await this.userService.findOne({where : { id: userId, isDeleted: false}})
      if (!findUser) {
        throw new Error("Can't find User")
      }
      return await this.transactionRepository.find({ where: { userId: userId, isDeleted: false } })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async findOne(id: number) {
    try {
      const findTrans = await this.transactionRepository.findOne({ where: { id: id, isDeleted: false } })
      if (!findTrans) {
        throw new Error("Can't find Transaction")
      }
      return findTrans
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async update(updateTransactionDto: UpdateTransactionDto) {
    try {
      const findCate = await this.cateService.findOne(updateTransactionDto.cateId)
      const findTrans = await this.transactionRepository.findOne
        ({
          where: {
            id: updateTransactionDto.transId,
            isDeleted: false
          }
        })
      const findUser = await this.userService.findOne({where : { id: findTrans.userId, isDeleted: false}})

      if (!findCate) {
        throw new Error("Can't find category")
      }
      if (findCate.isExpense == false) {
        findUser.balance += updateTransactionDto.amount - findTrans.amount
      }else {
        findUser.balance += findTrans.amount - updateTransactionDto.amount
      }

      findTrans.amount = updateTransactionDto.amount
      findTrans.cateId = updateTransactionDto.cateId
      findTrans.note = updateTransactionDto.note
      findTrans.date = updateTransactionDto.date

      await this.userService.update(findUser)
      await this.transactionRepository.update(findTrans.id, findTrans)
      return updateTransactionDto

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async remove(id: number) {
    try {
      const delTrans = await this.transactionRepository.findOne({ where: { id: id, isDeleted: false } })
      const findUser = await this.userService.findOne({where : { id: delTrans.userId, isDeleted: false}})
      const findCate = await this.cateService.findOne(delTrans.cateId)
      if (delTrans) {
        if(findCate.isExpense == true){
          findUser.balance += delTrans.amount
        }else{
          findUser.balance -= delTrans.amount
        }
        delTrans.isDeleted = true

        await this.userService.update(findUser)
        await this.transactionRepository.update(delTrans.id, delTrans)
        return `Delete transaction with id is #${id} `
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
