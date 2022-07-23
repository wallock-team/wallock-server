import { Column, Double, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique(['iss', 'sub'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  iss: string

  @Column()
  sub: string

  @Column()
  username: string

  @Column()
  picture: string

  @Column()
  balance: Number

}
