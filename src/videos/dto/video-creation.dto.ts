import { IsString, MaxLength } from 'class-validator'

export class VideoCreationDto {
  @IsString()
  @MaxLength(50, { message: 'Название должно быть не длиннее 50 символов.'})
  declare readonly name: string;
  
  @IsString()
  @MaxLength(300, {message: 'Описание должно быть не длиннее 300 символов.'})
  declare readonly description: string;
}