import { Column, PrimaryGeneratedColumn } from 'typeorm'
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: false })
  isDeleted: boolean

  //timestamp not support in sqlite3
  // { type: 'timestamp',
  // nullable: true,
  // default: new Date() }
  @Column({
    type: 'date',
    nullable: true,
    default: Date()
  })
  createdAt: String
}
