import { BaseEntity } from '../../base.entity'
import { Column, Entity, OneToMany, Unique } from 'typeorm'
import { Category } from 'src/categories/entities/category.entity'

@Entity()
@Unique(['iss', 'sub'])
export class User extends BaseEntity {
  @Column()
  iss: string

  @Column()
  sub: string

  @Column()
  name: string

  @Column()
  picture: string

  @Column({ default: 0 })
  balance: Number

  @OneToMany(() => Category, category => category.user)
  categories: Category[]
}
