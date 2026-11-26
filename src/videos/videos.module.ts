import { Module } from '@nestjs/common';

import { VideosController } from './videos.controller.js';
import { VideosService } from './videos.service.js';

import { SequelizeModule } from '@nestjs/sequelize';

import { Video } from './videos.model.js';
import { FilesModule } from '../files/files.module.js';
import { UsersModule } from '../users/users.module.js'
import { User } from '../users/users.model.js'

@Module({
  imports: [
    SequelizeModule.forFeature([Video, User]),
    FilesModule,
    UsersModule
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}