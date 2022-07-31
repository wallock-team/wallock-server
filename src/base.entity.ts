import { Column, PrimaryGeneratedColumn } from 'typeorm'
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: false })
  isDeleted: boolean

  @Column({ type: 'timestamp',
  nullable: true,
  default: new Date() })
  createdAt: Date
}
