import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service.js'
import { UserCreationDto } from './dto/user-creation.dto.js'

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id)
  }
  
  @Post('/user')
  createUser(@Body() dto: UserCreationDto) {
    return this.usersService.createUser(dto)
  }
}
