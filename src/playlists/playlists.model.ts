import { DataTypes } from 'sequelize'
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

import { MusicPlaylist } from '../music/music-playlists.model.js'
import { Music } from '../music/music.model.js'
import type { Music as MusicType } from '../music/music.model.js'

import { User } from '../users/users.model.js'
import type { User as UserType } from '../users/users.model.js'

import { VideoPlaylist } from '../videos/video-playlists.model.js'
import { Video } from '../videos/videos.model.js'
import type { Video as VideoType } from '../videos/videos.model.js'

interface PlaylistCreationAttrs {
  id?: string
  name: string
}

@Table({
  tableName: 'playlists',
})
export class Playlist extends Model<Playlist, PlaylistCreationAttrs> {

  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  declare id: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare name: string

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare userId: string

  @BelongsTo(() => User)
  declare user: UserType

  @BelongsToMany(
    () => Video,
    () => VideoPlaylist,
  )
  declare videos: VideoType[]

  @BelongsToMany(
    () => Music,
    () => MusicPlaylist,
  )
  declare music: MusicType[]
}