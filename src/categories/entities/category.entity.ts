import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
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
  @JoinColumn({ name: "userId"})
  user: User

  @OneToMany(() => Transaction, transaction => transaction.categories)
  @JoinColumn()
  transaction: Transaction[]
}
