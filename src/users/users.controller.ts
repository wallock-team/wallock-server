import { Controller, Body, Patch, BadRequestException } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { get } from 'http'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    //let id = cookie.id.value
    //updateUserDto.id = id
    let result = await this.usersService.update(updateUserDto)
    if (result) return result
    throw new BadRequestException('Not Found User')
  }

  @Get()
  async findAll(){
    return await this.usersService.findAll()
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }
}
