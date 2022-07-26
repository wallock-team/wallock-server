import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
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
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const find_user = await this.userRepository.findOne({ where: { id: id } })
    if (find_user) {
      return await this.userRepository.update(find_user.id, updateUserDto)
    }
  }

  async delete(id: number) {
    const del_user = await this.userRepository.findOne({ where: { id: id } })
    if (del_user) {
      return await this.userRepository.remove(del_user);
    }
  }
}
