import { Column, PrimaryGeneratedColumn } from 'typeorm'
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: false })
  isDeleted: boolean

  @Column({
    type: 'int',
    nullable: false,
    transformer: {
      from: (millisFromEpoch: number) => new Date(millisFromEpoch),
      to: (date?: Date) => date?.getTime()
    },
    default: Date.now()
  })
  createdAt: Date
}
