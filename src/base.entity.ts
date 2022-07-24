import { Column, Entity, PrimaryGeneratedColumn, Timestamp, Unique } from 'typeorm'

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  is_deleted: number

  @Column({ type: 'timestamp', nullable: true })
  create_at: Date

  @Column()
  name: string

}