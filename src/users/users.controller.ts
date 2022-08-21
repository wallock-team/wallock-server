import { Controller, Body, Patch, BadRequestException, Get, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Request } from 'express'
import JwtAuthGuard from '../auth/jwt-auth.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req: Request) {
    if (req.user) return req.user
    throw new BadRequestException('Not Found User')
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateUserDto: UpdateUserDto) {
    let result = await this.usersService.update(updateUserDto)
    if (result) return result
    throw new BadRequestException('Not Found User')
  }
}
