import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findOne(createUserDto.username)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: ['Email Already Be Taken'],
          error: 'Conflict Error'
        },
        HttpStatus.CONFLICT
      )
    } else {
      await this.userRepository.save(createUserDto)
      return {
        statusCode: 201,
        data: { username: createUserDto.username }
      }
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: username } })
  }
}
