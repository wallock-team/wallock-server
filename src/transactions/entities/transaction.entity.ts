import { BaseEntity } from '../../base.entity'
import { Column, Entity, OneToOne } from 'typeorm'
import { Category } from 'src/categories/entities/category.entity'
import { User } from 'src/users/entities/user.entity'

@Entity()
export class Transaction extends BaseEntity {
  @Column()
  userId: number

  @Column()
  cateId: number

  @Column({default: 0})
  amount: number

  @Column({default: null})
  note: String

  @Column({
    type: 'int',
    nullable: true,
    transformer: {
      from: (millisFromEpoch: number): Date => new Date(millisFromEpoch),
      to: (date?: Date): number => date?.getTime()
    },
    default: Date.now()
  })
  // @Column({ type: 'date', nullable: true, default: Date()})
  date: Date

  @OneToOne(() => Category, category => category.transaction)
  categories: Category

  @OneToOne(() => User, user => user.transaction)
  user: User
}