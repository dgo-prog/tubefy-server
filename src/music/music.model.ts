import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

interface MusicCreationAttrs {
	id?: string
	name: string
	description: string
	audio: string
	albumImage?: string | null
	album: string
}

@Table({
	tableName: 'music'
})
export class Music extends Model<Music, MusicCreationAttrs> {

	@Column({
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		unique: true,
		allowNull: false
	})
	declare id: string

  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
  })
  declare name: string

  @Column({
    type: DataTypes.STRING(5000),
    allowNull: true
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
    allowNull: true
  })
  declare album: string
}
