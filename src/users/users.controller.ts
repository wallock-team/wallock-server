import { Controller, Post, Body, Get, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from './http-exception.filter'
import { CreateUserDto } from './dto/create-user.dto' 
//line createdUserDto: CreateUserDto it will auto validate the data 

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  async findALl() {
    return await this.usersService.findAll();;
  }
}
