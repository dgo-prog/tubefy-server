import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator'


export class UserCreationDto {
  @IsString()
  declare readonly id: string;

  @IsString()
  declare readonly name: string;

  @IsString()
  declare readonly username: string;

  @IsEmail({}, {message: 'Некорректный email'})
  declare readonly email: string;
  
  @IsString()
  @MinLength(6, {message: 'Пароль должен содержать минимум 6 символов.'})
  declare readonly password: string;

  @IsString()
  declare readonly avatar: string | null

  @IsNumber()
  declare readonly subscribers: number

  @IsNumber()
  declare readonly subscribes: number
}