import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users.model.js'

@Module({
  imports: [
    SequelizeModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
