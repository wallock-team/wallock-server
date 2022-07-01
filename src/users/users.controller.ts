import { Controller, Post, Body } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse
} from '@nestjs/swagger'
import { ReadUserDto } from './dto/read-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create new user
   */
  @ApiCreatedResponse({
    description: 'Creates user successfully',
    type: ReadUserDto
  })
  @ApiBadRequestResponse({
    description:
      'The data provided is invalid. Inspect the response body for more information.'
  })
  @ApiConflictResponse({
    description: 'The provided username is taken.'
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }
}
