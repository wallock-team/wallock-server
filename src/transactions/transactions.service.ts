import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm'
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

  async create(createTransactionDto: CreateTransactionDto) {
    const findUser = await this.userService.findOne(createTransactionDto.userId)
    const findCate = await this.cateService.findOne(createTransactionDto.cateId)

    if(!findUser){
      throw new NotFoundException("Can't find User")
    }
    if(!findCate){
      throw new NotFoundException("Can't find Category")
    }

    if(findUser.balance < createTransactionDto.amount &&
       findCate.isExpense == true){
      throw new BadRequestException("User don't have enough money")
    }
    else if(findCate.isExpense == true){
      findUser.balance -= createTransactionDto.amount
    }
    else{
      findUser.balance += createTransactionDto.amount
    }
    await this.userService.update(findUser)
    return await this.transactionRepository.save(createTransactionDto)
  }

  async findAllByUserId(userId: number) {
    const findUser = await this.userService.findOne(userId)
    if(!findUser){
      throw new NotFoundException("Can't find User")
    }
    return await this.transactionRepository.find({where: {userId: userId}})
  }

  async findOne(id: number) {
    const findTrans = await this.transactionRepository.findOne({where: {id: id}})
    if(!findTrans){
      throw new NotFoundException("Can't find Transaction")
    }
    return findTrans
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
