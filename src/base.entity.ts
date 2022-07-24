import { Column, Entity, PrimaryGeneratedColumn, Timestamp, Unique } from 'typeorm'

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({default: 0})
  is_deleted: number

  @Column({ type: 'timestamp', nullable: true, default: new Date() })
  create_at: Date

}