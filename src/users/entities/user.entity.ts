import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  /**
   * @example 42
   */
  @PrimaryGeneratedColumn()
  id: number

  /**
   * @example johndoe
   */
  @Column()
  username: string

  /**
   * @example T#1s is a $trong p@55w0rd!
   */
  @Column()
  password: string
}
