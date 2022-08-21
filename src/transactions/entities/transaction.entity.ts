import { BaseEntity } from '../../base.entity'
import { Column, Entity, FindOperator, OneToOne } from 'typeorm'
import { Category } from '../../categories/entities/category.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Transaction extends BaseEntity {
  @Column()
  userId: number

  @Column()
  cateId: number

  @Column({ default: 0 })
  amount: number

  @Column({ default: null })
  note: String

  @Column({
    type: 'int',
    nullable: true,
    transformer: {
      from: (millisFromEpoch: number): Date => new Date(millisFromEpoch),
      to(jsValue?: unknown) {
        if (!jsValue) {
          return null
        } else if (jsValue instanceof Date) {
          return convertDateToMilliesFromEpoch(jsValue)
        } else if (jsValue instanceof FindOperator<Date>) {
          return new FindOperator<Date>(
            jsValue.type,
            jsValue.value.map
              ? jsValue.value.map(convertDateToMilliesFromEpoch)
              : convertDateToMilliesFromEpoch(jsValue.value),
            jsValue.useParameter,
            jsValue.multipleParameters
          )
        } else {
          throw new Error(
            `Unexpected type: ${typeof jsValue}. Expected types: Date, FindOperator<Date>.`
          )
        }
      }
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

function convertDateToMilliesFromEpoch(date: Date): number {
  return date.getTime()
}
