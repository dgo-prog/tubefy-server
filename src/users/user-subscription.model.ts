import { DataTypes } from 'sequelize'
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

import { User } from './users.model.js'
import type { User as UserType } from './users.model.js'

@Table({
  tableName: 'user_subscriptions',
  timestamps: false,
})
export class UserSubscription extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare followerId: string

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare followingId: string

  @BelongsTo(() => User, 'followerId')
  declare follower: UserType

  @BelongsTo(() => User, 'followingId')
  declare following: UserType
}