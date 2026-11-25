import { DataTypes } from 'sequelize'
import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'

import { Video } from '../videos/videos.model.js'
import type { Video as VideoType } from '../videos/videos.model.js'

import { Music } from '../music/music.model.js'
import type { Music as MusicType } from '../music/music.model.js'

import { Playlist } from '../playlists/playlists.model.js'
import type { Playlist as PlaylistType } from '../playlists/playlists.model.js'

import { UserSubscription } from './user-subscription.model.js'

interface UserCreationAttrs {
  id?: string
  name: string
  username: string
  email: string
  password: string
  avatar?: string | null
  subscribers?: number
  subscribes?: number
}

@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAttrs> {

  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare name: string

  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  })
  declare username: string

  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare password: string

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare avatar: string | null

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare subscribers: number

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare subscribes: number

  @HasMany(() => Video)
  declare videos: VideoType[]

  @HasMany(() => Music)
  declare music: MusicType[]

  @HasMany(() => Playlist)
  declare playlists: PlaylistType[]

  @BelongsToMany(
    () => User,
    () => UserSubscription,
    'followerId',
    'followingId',
  )
  declare following: User[]

  @BelongsToMany(
    () => User,
    () => UserSubscription,
    'followingId',
    'followerId',
  )
  declare followers: User[]
}