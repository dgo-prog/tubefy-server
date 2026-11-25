import { DataTypes } from 'sequelize'
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

import { Video } from '../videos/videos.model.js'
import type { Video as VideoType } from '../videos/videos.model.js'

import { Playlist } from '../playlists/playlists.model.js'
import type { Playlist as PlaylistType } from '../playlists/playlists.model.js'

@Table({
  tableName: 'video_playlists',
  timestamps: false,
})
export class VideoPlaylist extends Model {

  @ForeignKey(() => Playlist)
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare playlistId: string

  @ForeignKey(() => Video)
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare videoId: string

  @BelongsTo(() => Playlist)
  declare playlist: PlaylistType

  @BelongsTo(() => Video)
  declare video: VideoType
}