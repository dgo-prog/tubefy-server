import { Module } from '@nestjs/common';

import { VideosController } from './videos.controller.js';
import { VideosService } from './videos.service.js';

import { SequelizeModule } from '@nestjs/sequelize';

import { Video } from './videos.model.js';
import { FilesModule } from '../files/files.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([Video]),
    FilesModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}