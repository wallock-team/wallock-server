import { Controller, Body, Patch, Get, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Request } from 'express'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import { handleError } from '../error/errorHandler'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req: Request) {
    try {
      if (req.user) return req.user
    } catch (err) {
      handleError(err.Message)
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    let userId = req.user.id
    try {
      return await this.usersService.update(updateUserDto, userId)
    } catch (error) {
      handleError(error.message)
    }
  }
}
