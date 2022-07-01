import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: ' Receive Data And Create New User' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'String',
          example: 'Cuong',
          description: 'This pro is not empty'
        },
        password: {
          type: 'String',
          example: '123456',
          description: 'This pro is not empty'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'It will return Username.'
  })
  @ApiResponse({
    status: 400,
    description: 'It will return error message'
  })
  @ApiResponse({
    status: 409,
    description: 'It will return message : Email is taken'
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: ' Find All Users' })
  async findALl() {
    return await this.usersService.findAll()
  }

  @Get(':username')
  @ApiOperation({ summary: ' Find A Specific User' })
  @ApiParam({
    name: 'username',
    type: 'String',
    description: 'enter a username',
    required: true
  })
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username)
  }
}
