import { BaseEntity } from '../../base.entity'
import { Column, Entity, OneToMany, OneToOne, Unique } from 'typeorm'
import { Category } from 'src/categories/entities/category.entity'
import { Transaction } from 'src/transactions/entities/transaction.entity'

@Entity()
@Unique(['iss', 'sub'])
export class User extends BaseEntity {
  @Column()
  iss: string

  @Column()
  sub: string

  @Column()
  name: string

  @Column({nullable: true})
  picture?: string

  @Column({ default: 0 })
  balance: number

  @OneToMany(() => Category, category => category.user)
  categories: Category[]

  @OneToOne(() => Transaction, transaction => transaction.user)
  transaction: Transaction
}
