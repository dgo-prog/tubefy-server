import { IsString } from 'class-validator'


export class PlaylistCreationDto {
  @IsString()
  declare readonly name: string
}