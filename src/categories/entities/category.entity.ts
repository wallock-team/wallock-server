import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '../../base.entity'
import { Transaction } from '../../transactions/entities/transaction.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string

  @Column()
  type: 'income' | 'expense'

  @Column()
  icon: string

  @Column()
  group: string

  @ManyToOne(() => User, user => user.categories, {
    cascade: false
  })
  user: User

  @OneToMany(() => Transaction, transaction => transaction.categories)
  @JoinColumn()
  transaction: Transaction[]
}
