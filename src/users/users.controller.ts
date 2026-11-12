import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  getAllUsers() {}

  @Get(':id')
  getUserById() {}
  
  @Post('/user')
  createUser() {}
}
