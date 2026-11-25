import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller.js';
import { PlaylistsService } from './playlists.service.js';
import { SequelizeModule } from '@nestjs/sequelize'
import { Playlist } from './playlists.model.js'

@Module({
  imports: [
    SequelizeModule.forFeature([Playlist])
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService]
})
export class PlaylistsModule {}
