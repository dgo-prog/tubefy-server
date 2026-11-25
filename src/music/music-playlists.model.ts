import { DataTypes } from 'sequelize'
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

import { Music } from '../music/music.model.js'
import type { Music as MusicType } from '../music/music.model.js'

import { Playlist } from '../playlists/playlists.model.js'
import type { Playlist as PlaylistType } from '../playlists/playlists.model.js'

@Table({
  tableName: 'music_playlists',
  timestamps: false,
})
export class MusicPlaylist extends Model {

  @ForeignKey(() => Playlist)
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare playlistId: string

  @ForeignKey(() => Music)
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare musicId: string

  @BelongsTo(() => Playlist)
  declare playlist: PlaylistType

  @BelongsTo(() => Music)
  declare music: MusicType
}