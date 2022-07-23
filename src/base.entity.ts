import { Column, Entity, PrimaryGeneratedColumn, Timestamp, Unique } from 'typeorm'

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  is_deleted: number

  @Column()
  create_at: Timestamp

  @Column()
  name: string

}