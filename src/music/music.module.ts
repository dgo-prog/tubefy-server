import { Module } from '@nestjs/common';
import { MusicController } from './music.controller.js';
import { MusicService } from './music.service.js';
import { SequelizeModule } from '@nestjs/sequelize'
import { Music } from './music.model.js'
import { FilesModule } from '../files/files.module.js'

@Module({
  imports: [
    SequelizeModule.forFeature([Music]),
    FilesModule
  ],
  controllers: [MusicController],
  providers: [MusicService]
})
export class MusicModule {}
