import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body) {
    try {
      //feature hash password before save in database(not do yet)
      if(!body.username){
        return ({
          code: 400,
          mess: "Invalid data"
        })
      }
      else if((await this.usersService.findOne(body.username))){
        return ({
          code: 409,
          mess: "Email or UserName is taken"
        })
      }
      else{
        await this.usersService.create(body)
        return ({
          code: 201,
          data: body.username,
        });
      }
    } catch (error) {
      return ({
        mess: error.message,
      })
    }
  }

  @Get()
  async findALl() {
    return await this.usersService.findAll();;
  }
}
