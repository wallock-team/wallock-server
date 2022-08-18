import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  BadRequestException
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async findOne() {
    //let id = cookie.id.value
    let id = 1
    let result = await this.usersService.findOne({where: {id: id}})
    if (result) return result
    throw new BadRequestException('Not Found User')
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    //let id = cookie.id.value
    //updateUserDto.id = id
    let result = await this.usersService.update(updateUserDto)
    if (result) return result
    throw new BadRequestException('Not Found User')
  }
}
