import { BaseEntity } from 'src/base.entity'
import { Column, Entity, PrimaryGeneratedColumn, Timestamp, Unique } from 'typeorm'

@Entity()
export class Category extends BaseEntity {
  @Column()
  userId: number

  @Column()
  parentId: number | null

  @Column()
  isExpense: number

  @Column()
  tier: number

  @Column()
  icon: string
}
