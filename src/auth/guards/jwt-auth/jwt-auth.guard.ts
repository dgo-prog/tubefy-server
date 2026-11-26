import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const auth = request.headers.authorization

    if (!auth) {
      throw new UnauthorizedException('Пользователь не зарегистрирован.')
    }

    const [type, token] = auth.split(' ')

    if (type != 'Bearer' || !token) {
      throw new UnauthorizedException('Неправильный формат авторизации.')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET
      })

      request.user = payload

      return true     
    } catch (error) {
      throw new UnauthorizedException('Токен неправильный или его срок действия истёк.')
    }
  }
}
