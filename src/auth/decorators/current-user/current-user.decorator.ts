import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RequestUserInterface } from '../../interfaces/request-user.interface/request-user.interface.interface.js'

export const CurrentUser = createParamDecorator(
  (
    data: keyof RequestUserInterface | undefined, 
    context: ExecutionContext
  ): RequestUserInterface | RequestUserInterface[keyof RequestUserInterface] | undefined => {

    const request = context.switchToHttp().getRequest<{user: RequestUserInterface}>()

    const user = request.user

    return data ? user?.[data] : user
  }
);
