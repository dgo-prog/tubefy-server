import { IsString } from 'class-validator'


export class MusicCreationDto {

  @IsString()
  declare readonly name: string

  @IsString()
  declare readonly description: string

  @IsString()
  declare readonly album: string
}