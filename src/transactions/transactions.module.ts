import { Module } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { TransactionsController } from './transactions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { UsersModule } from '../users/users.module'
import { CategoriesModule } from '../categories/categories.module'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UsersModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule {}
