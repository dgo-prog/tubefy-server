import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

interface UserCreationAttrs {
  id: string
  name: string
  username: string
  email: string
  password: string
  subscribers?: string[]
  subscribes?: string[]
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
    allowNull: false,
    defaultValue: 0,
  })
  subscribers: string

  @Column({
    type: DataTypes.STRING,
    defaultValue: 0,
    allowNull: false,
  })
  declare subscribes: string
}