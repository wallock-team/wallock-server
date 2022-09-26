import { BaseEntity } from '../../base.entity'
import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { Transaction } from '../../transactions/entities/transaction.entity'
import { Category } from '../../categories/entities/category.entity'

@Entity()
@Unique(['iss', 'sub'])
export class User extends BaseEntity {
  @Column()
  iss: string

  @Column()
  sub: string

  @Column({
    nullable: true
  })
  name?: string

  @Column({ nullable: true })
  picture?: string

  @Column({ default: 0 })
  balance: number

  @OneToMany(() => Category, category => category.user)
  categories: Category[]

  @OneToMany(() => Transaction, transaction => transaction.user)
  transaction: Transaction[]
}
