import { ErrorMessage } from '../error/errorMessage'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CategoriesService } from '../categories/categories.service'
import { UsersService } from '../users/users.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { Transaction } from './entities/transaction.entity'
import { User } from '../users/entities/user.entity'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private userService: UsersService,
    private cateService: CategoriesService
  ) { }

  async create(user: User, createTransactionDto: CreateTransactionDto) {
    const findUser = await this.userService.findOne({
      where: {
        id: user.id
      }
    })
    const category = await this.cateService.findByIdForUser(
      createTransactionDto.cateId,
      user.id
    )

    if (category.type === 'expense') {
      findUser.balance -= createTransactionDto.amount
    } else {
      findUser.balance += createTransactionDto.amount
    }
    await this.userService.update(findUser, user.id)
    return await this.transactionRepository.insert({
      user: { id: user.id },
      categories: { id: createTransactionDto.cateId },
      ...createTransactionDto
    })
  }

  async update(updateTransactionDto: UpdateTransactionDto, user: User) {
    const findUser = await this.userService.findOne({
      where: {
        id: user.id
      }
    })
    const category = await this.cateService.findByIdForUser(
      updateTransactionDto.cateId,
      user.id
    )
    const currentTransactionCategory = await this.cateService.findByIdForUser(
      updateTransactionDto.id,
      user.id
    )
    const currentTransaction = await this.findByIdForUser(
      user,
      updateTransactionDto.id
    )

    if (category.type === currentTransactionCategory.type) {
      const different = updateTransactionDto.amount - currentTransaction.amount
      if (category.type === 'expense') {
        findUser.balance -= different
      } else findUser.balance += different
    } else {
      if (category.type === 'expense') {
        findUser.balance =
          findUser.balance - updateTransactionDto.amount - currentTransaction.amount
      } else
        findUser.balance =
          findUser.balance + updateTransactionDto.amount + currentTransaction.amount
    }

    currentTransaction.amount = updateTransactionDto.amount
    currentTransaction.categories.id = updateTransactionDto.cateId
    currentTransaction.note = updateTransactionDto.note
    currentTransaction.date = updateTransactionDto.date

    await this.userService.update(findUser, findUser.id)
    await this.transactionRepository.update(
      currentTransaction.id,
      currentTransaction
    )
    return updateTransactionDto
  }

  async remove(user: User, id: number) {
    const transaction = await this.findByIdForUser(user, id)
    const findUser = await this.userService.findOne({
      where: {
        id: user.id
      }
    })
    const category = await this.cateService.findByIdForUser(
      transaction.categories.id,
      user.id
    )

    if (category.type === 'expense') {
      findUser.balance += transaction.amount
    } else {
      findUser.balance -= transaction.amount
    }

    await this.userService.update(findUser, findUser.id)
    await this.transactionRepository.remove(transaction)
    return `Delete transaction with id is #${id} `
  }

  async find(options?: FindManyOptions<Transaction>) {
    return await this.transactionRepository.find(options)
  }

  async findAllByUserId(user: User, includesDeleted?: boolean) {
    const findUser = await this.userService.findOne({
      where: {
        id: user.id
      }
    })

    if (!findUser) {
      throw new NotFoundException('Can not find user')
    }

    return await this.transactionRepository.find({
      relations: {
        categories: true
      },
      where: {
        user: {
          id: user.id
        }
      },
      withDeleted: includesDeleted
    })
  }

  async findByIdForUser(user: User, id: number): Promise<Transaction> {
    let transaction = await this.transactionRepository.findOne({
      relations: {
        categories: true
      },
      where: {
        id: id
      }
    })
    if (!transaction) throw new NotFoundException("Not found transaction")
    return transaction
  }
}
