import { DataTypes } from 'sequelize'
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

import { User } from '../users/users.model.js'
import type { User as UserType } from '../users/users.model.js'

import { Playlist } from '../playlists/playlists.model.js'
import type { Playlist as PlaylistType } from '../playlists/playlists.model.js'

import { MusicPlaylist } from './music-playlists.model.js'

interface MusicCreationAttrs {
  id?: string
  name: string
  description: string
  audio: string
  albumImage?: string | null
  album: string
}

@Table({
  tableName: 'music',
  timestamps: false,
})
export class Music extends Model<Music, MusicCreationAttrs> {

  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  declare id: string

  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
  })
  declare name: string

  @Column({
    type: DataTypes.STRING(5000),
    allowNull: true,
  })
  declare description: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare audio: string

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare albumImage: string | null

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare album: string

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare userId: string

  @BelongsTo(() => User)
  declare user: UserType

  @BelongsToMany(
    () => Playlist,
    () => MusicPlaylist,
  )
  declare playlists: PlaylistType[]
}