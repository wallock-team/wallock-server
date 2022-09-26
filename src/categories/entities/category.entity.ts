import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique
} from 'typeorm'
import { BaseEntity } from '../../base.entity'
import { Transaction } from '../../transactions/entities/transaction.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
@Unique(['name', 'group', 'type'])
export class Category extends BaseEntity {
  @Column()
  name: string

  @Column()
  type: 'income' | 'expense'

  @Column()
  group: string

  @Column({
    nullable: true
  })
  icon?: string

  @ManyToOne(() => User, user => user.categories, {
    cascade: false
  })
  user: User

  @OneToMany(() => Transaction, transaction => transaction.categories)
  transaction: Transaction[]
}
