import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoriesService } from 'src/categories/categories.service'
import { UsersService } from 'src/users/users.service'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Transaction } from './entities/transaction.entity'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private userService: UsersService,
    private cateService: CategoriesService
  ) {}

  async find(options?: FindManyOptions<Transaction>) {
    return await this.transactionRepository.find(options)
  }

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    const user = await this.userService.findOne({ where: { id: userId, isDeleted: false } })
    const category = await this.cateService.findByIdForUser(createTransactionDto.cateId, userId)
    
    if (category.isExpense == true) {
      user.balance -= createTransactionDto.amount
    }
    else {
      user.balance += createTransactionDto.amount
    }
    await this.userService.update(user)
    return await this.transactionRepository.save(createTransactionDto)
  }

  async findAllByUserId(userId: number) {
      const user = await this.userService.findOne({ where: { id: userId, isDeleted: false } })

      if (!user) {
        throw new Error("Can't find User")
      }
      
      return await this.transactionRepository.find({ where: { userId: userId, isDeleted: false } })
  }

  async update(updateTransactionDto: UpdateTransactionDto, userId: number) {
    const user = await this.userService.findOne({ where: { id: userId, isDeleted: false } })
    const category = await this.cateService.findByIdForUser(updateTransactionDto.cateId, userId)
    const currentTransactionCategory = await this.cateService.findByIdForUser(updateTransactionDto.id, userId)
    const currentTransaction = await this.findByIdForUser(updateTransactionDto.id, userId)

    if (category.isExpense == currentTransactionCategory.isExpense) {
      const different = updateTransactionDto.amount - currentTransaction.amount
      if (category.isExpense) {
        user.balance -= different
      }
      else user.balance += different
    } else {
      if (category.isExpense) {
        user.balance = user.balance - updateTransactionDto.amount - currentTransaction.amount
      }
      else user.balance = user.balance + updateTransactionDto.amount + currentTransaction.amount
    }

    currentTransaction.amount = updateTransactionDto.amount
    currentTransaction.cateId = updateTransactionDto.cateId
    currentTransaction.note = updateTransactionDto.note
    currentTransaction.date = updateTransactionDto.date

    await this.userService.update(user)
    await this.transactionRepository.update(currentTransaction.id, currentTransaction)
    return updateTransactionDto
  }

  async remove(id: number, userId: number) {
      const transaction = await this.findByIdForUser(id, userId)
      const user = await this.userService.findOne({ where: { id: userId, isDeleted: false } })
      const category = await this.cateService.findByIdForUser(transaction.cateId, userId)

      if (category.isExpense == true) {
        user.balance += transaction.amount
      }
      else {
        user.balance -= transaction.amount
      }

      await this.userService.update(user)
      await this.transactionRepository.remove(transaction)
      return `Delete transaction with id is #${id} `
  }

  async findByIdForUser(id: number, userId: number): Promise<Transaction> {
    let transaction = await this.transactionRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      }
    })
    if (transaction) {
      if (transaction.userId == userId)
        return transaction
      else throw new Error('Access Denied')
    }
    throw new Error('Not found Transaction')
  }
}
