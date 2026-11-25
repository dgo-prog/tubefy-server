import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

interface RefreshTokenCreationAttrs {
  id?: string
  tokenHash: string
  userId: string
  expiresAt: Date
  revokedAt?: Date | null
}

@Table({
  tableName: 'refresh_tokens',
  timestamps: true,
})
export class RefreshToken extends Model<
  RefreshToken,
  RefreshTokenCreationAttrs
> {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string

  @Column({
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  })
  declare tokenHash: string

  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  declare userId: string

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  declare expiresAt: Date

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
  })
  declare revokedAt: Date | null
}