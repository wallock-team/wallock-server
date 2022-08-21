import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from '../../base.entity'
import { Transaction } from '../../transactions/entities/transaction.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Category extends BaseEntity {
  @Column()
  userId: number

  @Column()
  name: string

  @Column()
  isExpense: boolean

  @Column()
  icon: string

  @Column()
  group: string

  @ManyToOne(() => User, user => user.categories)
  user: User

  @OneToOne(() => Transaction, transaction => transaction.categories)
  transaction: Transaction
}
