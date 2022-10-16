import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm'
import { BaseEntity } from '../../base.entity'
import { Transaction } from '../../transactions/entities/transaction.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
@Unique(['name', 'group', 'type', 'userId'])
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

  @Column()
  userId: number

  @ManyToOne(() => User, user => user.categories, {
    cascade: false
  })
  user: User

  @OneToMany(() => Transaction, transaction => transaction.category)
  transaction: Transaction[]
}
