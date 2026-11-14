import { DataTypes } from 'sequelize';
import {
  Column,
  Model,
  Table,
} from 'sequelize-typescript';

interface VideoCreationAttrs {
  id?: string;
  name: string;
  description: string;
  video: string;
  preview?: string | null;
}

@Table({
  tableName: 'videos',
})
export class Video extends Model<Video, VideoCreationAttrs> {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  declare video: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare preview: string | null;
}