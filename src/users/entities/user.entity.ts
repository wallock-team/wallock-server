import { BaseEntity } from 'src/base.entity'
import { Column, Double, Entity, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique(['iss', 'sub'])
export class User extends BaseEntity{

  @Column()
  iss: string

  @Column()
  sub: string

  @Column()
  username: string

  @Column()
  picture: string

  @Column({default: 0})
  balance: Number

}
