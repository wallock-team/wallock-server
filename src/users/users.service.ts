import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const exist_user = await this.userRepository.findOne({ where: { sub: createUserDto.sub } })
    if (exist_user) {
      return {
        username: createUserDto.username,
        picture: exist_user.picture
      }
    } else {
      const new_user = await this.userRepository.save(createUserDto)
      return {
        username: new_user.username,
        picture: new_user.picture
      }
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } })
  }

  async update(updateUserDto: UpdateUserDto) {
    const find_user = await this.userRepository.findOne({ where: { id: updateUserDto.id } })
    if (find_user) {
      await this.userRepository.update(find_user.id, updateUserDto)
      return await this.userRepository.findOne({ where: { id: updateUserDto.id } })
    }
  }

  async delete(id: number) {
    const del_user = await this.userRepository.findOne({ where: { id: id } })
    if (del_user) {
      return await this.userRepository.remove(del_user)
    }
  }
}
