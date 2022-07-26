import { Controller, Post, Body, Get, Param, Patch, UseGuards, HttpCode, Delete, BadRequestException, UseFilters, ExceptionFilter, Catch, HttpException, Res, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { BaseExceptionFilter } from '@nestjs/core'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findALl() {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    let result = await this.usersService.findOne(id);
    if (result){
      return result;
    }else{
      throw  new BadRequestException('Not Found User');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    let result = await this.usersService.update(id, updateUserDto);
    if (result){
      return 'Update Success';
    }else{
      throw  new BadRequestException('Not Found User');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number){
    let result = await this.usersService.delete(id)
    if (result){
      return 'Delete Success';
    }else{
      throw  new BadRequestException('Not Found User');
    }
  }
}
