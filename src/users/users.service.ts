import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'

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
    const user = await this.userRepository.findOne({
      where: {
        iss: createUserDto.iss,
        sub: createUserDto.sub
      }
    })

    if (user) {
      throw new ConflictException(
        `User with iss '${createUserDto.iss}' and sub '${createUserDto.sub}' is already created`
      )
    } else {
      return this.userRepository.save(createUserDto)
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async find(options?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(options)
  }

  async findOne(options?: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(options)
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const find_user = await this.userRepository.findOne({ where: { id: id } })
    if (find_user) {
      await this.userRepository.update(find_user.id, updateUserDto)
      return {
        statusCode: 201,
        message: 'Update successfully.'
      }
    }
    return {
      statusCode: 404,
      message: "Can't find user."
    }
  }
}
