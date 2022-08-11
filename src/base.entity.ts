import { Column, PrimaryGeneratedColumn } from 'typeorm'
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: false })
  isDeleted: boolean

  @Column({
    type: 'int',
    nullable: true,
    transformer: {
      from: (millisFromEpoch: number): Date => new Date(millisFromEpoch),
      to: (date: Date): number => date.getTime()
    }
  })
  createdAt: Date
}
