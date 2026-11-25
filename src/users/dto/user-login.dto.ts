import { IsEmail, IsString, MinLength } from 'class-validator'


export class LoginDto {
  @IsEmail({}, {message: 'Некорректный email'})
  declare readonly email: string
  
  @IsString()
  @MinLength(6, {message: 'Пароль должен содержать минимум 6 символов.'})
  declare readonly password: string
}