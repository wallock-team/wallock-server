import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
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
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exist_user = await this.userRepository.findOne({ where: { sub: createUserDto.sub } })
    if (exist_user) {
      return {
        statusCode: 201,
        message: "Login in existed Email.",
        data: { username: createUserDto.username, id: exist_user.id
        }
      }
    } else {
      const new_user = await this.userRepository.save(createUserDto)
      return {
        statusCode: 201,
        message: "Login and create new user success",
        data: { username: new_user.username, id: new_user.id }
      }
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } })
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const find_user = await this.userRepository.findOne({ where: { id: id } })
    if(find_user){
      await this.userRepository.update(find_user.id, updateUserDto)
      return {
        statusCode: 201,
        message: "Update successfully."
      } 
    }return {
      statusCode: 404,
      message: "Can't find user."
    }
  }
}
