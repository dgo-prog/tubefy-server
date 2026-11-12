import { DataTypes } from 'sequelize'
import { Column, Table } from 'sequelize-typescript'


@Table({
  tableName: 'users',
})
export class User {

  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  })
  username: string

  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  })
  email: string

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password: string

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
  subscribes: string
}