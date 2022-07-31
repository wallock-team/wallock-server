import { BaseEntity } from 'src/base.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, Unique } from 'typeorm'

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
}
