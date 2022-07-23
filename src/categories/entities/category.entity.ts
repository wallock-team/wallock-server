import { BaseEntity } from 'src/base.entity'
import { Column, Entity, PrimaryGeneratedColumn, Timestamp, Unique } from 'typeorm'

@Entity()
export class Category extends BaseEntity {
  @Column()
  uID: number

  @Column()
  parentID: number | null

  @Column()
  isExpense: number

  @Column()
  tier: number

  @Column()
  icon: string

}
